-- Creating onramp/offramp and currency exchange schemas
-- Currency Pairs Table
CREATE TABLE IF NOT EXISTS currency_pairs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  base_currency TEXT NOT NULL,
  quote_currency TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  min_amount NUMERIC(20,8) DEFAULT 0,
  max_amount NUMERIC(20,8) DEFAULT 1000000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(base_currency, quote_currency)
);

-- Liquidity Pools Table
CREATE TABLE IF NOT EXISTS liquidity_pools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pair_id UUID REFERENCES currency_pairs(id) ON DELETE CASCADE,
  base_reserve NUMERIC(20,8) NOT NULL DEFAULT 0,
  quote_reserve NUMERIC(20,8) NOT NULL DEFAULT 0,
  total_liquidity NUMERIC(20,8) NOT NULL DEFAULT 0,
  fee_rate NUMERIC(5,4) DEFAULT 0.003, -- 0.3% default fee
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Onramp/Offramp Orders Table
CREATE TABLE IF NOT EXISTS exchange_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('onramp', 'offramp', 'swap')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  from_currency TEXT NOT NULL,
  to_currency TEXT NOT NULL,
  from_amount NUMERIC(20,8) NOT NULL,
  to_amount NUMERIC(20,8) NOT NULL,
  exchange_rate NUMERIC(20,8) NOT NULL,
  fee NUMERIC(20,8) DEFAULT 0,
  provider TEXT, -- moonpay, ramp, coinbase, etc.
  external_order_id TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected', 'not_required')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KYC Verification Table
CREATE TABLE IF NOT EXISTS kyc_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  level TEXT NOT NULL DEFAULT 'basic' CHECK (level IN ('basic', 'advanced', 'premium')),
  documents JSONB DEFAULT '{}',
  verification_data JSONB DEFAULT '{}',
  provider TEXT DEFAULT 'jumio',
  external_verification_id TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Market Making Orders Table
CREATE TABLE IF NOT EXISTS market_making_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pair_id UUID REFERENCES currency_pairs(id) ON DELETE CASCADE,
  side TEXT NOT NULL CHECK (side IN ('buy', 'sell')),
  price NUMERIC(20,8) NOT NULL,
  amount NUMERIC(20,8) NOT NULL,
  filled_amount NUMERIC(20,8) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'filled', 'cancelled')),
  is_automated BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE currency_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE liquidity_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_making_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Currency pairs are public" ON currency_pairs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Liquidity pools are public" ON liquidity_pools FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can view own exchange orders" ON exchange_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exchange orders" ON exchange_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own KYC" ON kyc_verifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own KYC" ON kyc_verifications FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Market making orders are public" ON market_making_orders FOR SELECT TO authenticated USING (true);

-- Insert initial currency pairs
INSERT INTO currency_pairs (base_currency, quote_currency, min_amount, max_amount) VALUES
('USD', 'BTN', 10, 50000),
('EUR', 'BTN', 10, 50000),
('GBP', 'BTN', 10, 50000),
('BTC', 'BTN', 0.001, 10),
('ETH', 'BTN', 0.01, 100),
('USDC', 'BTN', 10, 100000),
('BTN', 'USD', 10, 50000),
('BTN', 'EUR', 10, 50000),
('BTN', 'BTC', 10, 50000),
('BTN', 'ETH', 10, 50000)
ON CONFLICT (base_currency, quote_currency) DO NOTHING;

-- Insert initial liquidity pools
INSERT INTO liquidity_pools (pair_id, base_reserve, quote_reserve, total_liquidity)
SELECT 
  cp.id,
  CASE 
    WHEN cp.base_currency = 'BTN' THEN 1000000
    WHEN cp.base_currency = 'USD' THEN 500000
    WHEN cp.base_currency = 'BTC' THEN 20
    WHEN cp.base_currency = 'ETH' THEN 300
    ELSE 100000
  END,
  CASE 
    WHEN cp.quote_currency = 'BTN' THEN 1000000
    WHEN cp.quote_currency = 'USD' THEN 500000
    WHEN cp.quote_currency = 'BTC' THEN 20
    WHEN cp.quote_currency = 'ETH' THEN 300
    ELSE 100000
  END,
  1000000
FROM currency_pairs cp
ON CONFLICT DO NOTHING;
