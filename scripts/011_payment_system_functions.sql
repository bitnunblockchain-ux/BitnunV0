-- BTN Transfer Function
CREATE OR REPLACE FUNCTION transfer_btn(
  from_user UUID,
  to_user UUID,
  transfer_amount NUMERIC,
  transfer_description TEXT DEFAULT ''
)
RETURNS JSON AS $$
DECLARE
  from_balance NUMERIC;
  to_balance NUMERIC;
  transfer_id UUID;
BEGIN
  -- Get current balances
  SELECT balance INTO from_balance FROM btn_balances WHERE user_id = from_user;
  SELECT balance INTO to_balance FROM btn_balances WHERE user_id = to_user;
  
  -- Check sufficient balance
  IF from_balance < transfer_amount THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;
  
  -- Create transfer record
  INSERT INTO btn_transfers (from_user_id, to_user_id, amount, description)
  VALUES (from_user, to_user, transfer_amount, transfer_description)
  RETURNING id INTO transfer_id;
  
  -- Update balances atomically
  UPDATE btn_balances SET balance = balance - transfer_amount WHERE user_id = from_user;
  UPDATE btn_balances SET balance = balance + transfer_amount WHERE user_id = to_user;
  
  -- Get new balance
  SELECT balance INTO from_balance FROM btn_balances WHERE user_id = from_user;
  
  RETURN json_build_object(
    'id', transfer_id,
    'new_balance', from_balance,
    'success', true
  );
END;
$$ LANGUAGE plpgsql;

-- Update User Balance Function
CREATE OR REPLACE FUNCTION update_user_balance(
  user_id UUID,
  amount NUMERIC,
  currency TEXT
)
RETURNS JSON AS $$
DECLARE
  new_balance NUMERIC;
BEGIN
  -- Update balance based on currency
  IF currency = 'BTN' THEN
    UPDATE btn_balances SET balance = balance + amount WHERE user_id = user_id;
    SELECT balance INTO new_balance FROM btn_balances WHERE user_id = user_id;
  ELSE
    -- Handle fiat currencies
    INSERT INTO user_balances (user_id, currency, balance)
    VALUES (user_id, currency, amount)
    ON CONFLICT (user_id, currency)
    DO UPDATE SET balance = user_balances.balance + amount;
    
    SELECT balance INTO new_balance FROM user_balances WHERE user_id = user_id AND currency = currency;
  END IF;
  
  RETURN json_build_object(
    'new_balance', new_balance,
    'currency', currency,
    'success', true
  );
END;
$$ LANGUAGE plpgsql;

-- Create missing tables
CREATE TABLE IF NOT EXISTS btn_balances (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance NUMERIC(20,8) DEFAULT 0,
  locked_balance NUMERIC(20,8) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS btn_transfers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(20,8) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_balances (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  currency TEXT NOT NULL,
  balance NUMERIC(20,8) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, currency)
);

-- Enable RLS
ALTER TABLE btn_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_balances ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own BTN balance" ON btn_balances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transfers" ON btn_transfers FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY "Users can view own balances" ON user_balances FOR SELECT USING (auth.uid() = user_id);
