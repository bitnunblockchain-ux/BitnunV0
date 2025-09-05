-- Creating comprehensive payment and transaction schemas
-- Payment Methods Table
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('card', 'bank', 'crypto', 'wallet', 'btn')),
  provider TEXT NOT NULL, -- stripe, paypal, coinbase, metamask, etc.
  external_id TEXT, -- external provider ID
  details JSONB NOT NULL DEFAULT '{}', -- encrypted payment details
  is_default BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'payment', 'refund', 'mining_reward', 'staking_reward')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  amount NUMERIC(20,8) NOT NULL,
  currency TEXT NOT NULL,
  fee NUMERIC(20,8) DEFAULT 0,
  payment_method_id UUID REFERENCES payment_methods(id),
  external_tx_id TEXT, -- blockchain tx hash or payment provider ID
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Currency Exchange Rates Table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_currency TEXT NOT NULL,
  to_currency TEXT NOT NULL,
  rate NUMERIC(20,8) NOT NULL,
  provider TEXT NOT NULL DEFAULT 'coingecko',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_currency, to_currency)
);

-- Payment Gateway Settings
CREATE TABLE IF NOT EXISTS payment_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gateway TEXT NOT NULL UNIQUE,
  is_enabled BOOLEAN DEFAULT true,
  config JSONB NOT NULL DEFAULT '{}',
  fees JSONB NOT NULL DEFAULT '{}', -- fee structure
  supported_currencies TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue Tracking
CREATE TABLE IF NOT EXISTS revenue_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  service TEXT NOT NULL, -- database, compute, storage, etc.
  revenue NUMERIC(20,8) NOT NULL DEFAULT 0,
  transactions_count INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'BTN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, service, currency)
);

-- Enable RLS
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own payment methods" ON payment_methods FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payment methods" ON payment_methods FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own payment methods" ON payment_methods FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Exchange rates are public" ON exchange_rates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Payment settings are public" ON payment_settings FOR SELECT TO authenticated USING (true);

-- Admin policies for revenue tracking
CREATE POLICY "Admin can view revenue" ON revenue_tracking FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.username = 'admin'
  )
);
