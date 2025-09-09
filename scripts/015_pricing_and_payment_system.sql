-- Comprehensive Pricing and Payment System
-- Market-competitive rates based on research

-- Subscription Plans Table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  limits JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert competitive subscription plans
INSERT INTO subscription_plans (name, slug, price_monthly, price_yearly, features, limits) VALUES
('Free', 'free', 0.00, 0.00, 
 '["Basic trading", "5 API calls/day", "Community support", "Basic analytics"]',
 '{"api_calls_daily": 5, "trading_volume_monthly": 1000, "storage_gb": 1}'),
('Pro', 'pro', 29.99, 299.99,
 '["Advanced trading", "10,000 API calls/day", "Priority support", "Advanced analytics", "Custom bots", "Portfolio management"]',
 '{"api_calls_daily": 10000, "trading_volume_monthly": 100000, "storage_gb": 50, "custom_bots": 5}'),
('Enterprise', 'enterprise', 999.99, 9999.99,
 '["Unlimited trading", "Unlimited API calls", "24/7 dedicated support", "White-label solutions", "Custom integrations", "SLA guarantee"]',
 '{"api_calls_daily": -1, "trading_volume_monthly": -1, "storage_gb": 1000, "custom_bots": -1}');

-- Membership Tiers Table
CREATE TABLE IF NOT EXISTS membership_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  required_volume DECIMAL(15,2) NOT NULL,
  fee_discount_percent DECIMAL(5,2) DEFAULT 0,
  benefits JSONB NOT NULL DEFAULT '[]',
  color TEXT DEFAULT '#6B7280',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert membership tiers
INSERT INTO membership_tiers (name, slug, required_volume, fee_discount_percent, benefits, color) VALUES
('Silver', 'silver', 10000.00, 5.00, 
 '["5% fee discount", "Priority customer support", "Monthly market reports"]', '#C0C0C0'),
('Gold', 'gold', 50000.00, 10.00,
 '["10% fee discount", "Advanced analytics", "Exclusive webinars", "Early feature access"]', '#FFD700'),
('Diamond', 'diamond', 200000.00, 20.00,
 '["20% fee discount", "Personal account manager", "Custom trading strategies", "VIP events"]', '#B9F2FF');

-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'past_due')),
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '1 month',
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(10,2) DEFAULT 0.00,
  total_purchased DECIMAL(10,2) DEFAULT 0.00,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Transactions Table
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'spend', 'refund', 'bonus')),
  description TEXT,
  reference_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee Structure Table
CREATE TABLE IF NOT EXISTS fee_structures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  fee_type TEXT NOT NULL CHECK (fee_type IN ('percentage', 'fixed', 'tiered')),
  fee_value DECIMAL(10,6) NOT NULL,
  min_fee DECIMAL(10,2) DEFAULT 0,
  max_fee DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert competitive fee structures (lower than market rates)
INSERT INTO fee_structures (service_type, fee_type, fee_value, min_fee, max_fee, currency) VALUES
-- Trading fees (lower than Binance's 0.1%)
('crypto_trading', 'percentage', 0.05, 0.01, NULL, 'USD'),
('spot_trading', 'percentage', 0.04, 0.01, NULL, 'USD'),
('futures_trading', 'percentage', 0.03, 0.01, NULL, 'USD'),
-- API usage (competitive with market)
('api_call', 'fixed', 0.001, 0, NULL, 'USD'),
('webhook', 'fixed', 0.0005, 0, NULL, 'USD'),
-- Platform services
('withdrawal_crypto', 'fixed', 2.00, 1.00, 10.00, 'USD'),
('withdrawal_fiat', 'fixed', 5.00, 2.00, 25.00, 'USD'),
('staking_fee', 'percentage', 2.00, 0, NULL, 'USD'),
('liquidity_provision', 'percentage', 0.25, 0, NULL, 'USD');

-- Payment Methods Table
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('card', 'bank', 'crypto', 'paypal')),
  provider TEXT NOT NULL,
  external_id TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Payment Settings Table
CREATE TABLE IF NOT EXISTS admin_payment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  is_encrypted BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue Tracking Table
CREATE TABLE IF NOT EXISTS revenue_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  revenue_type TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  user_count INTEGER DEFAULT 0,
  transaction_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Functions for automatic fee calculation
CREATE OR REPLACE FUNCTION calculate_trading_fee(
  amount DECIMAL,
  service_type TEXT,
  user_id UUID DEFAULT NULL
) RETURNS DECIMAL AS $$
DECLARE
  base_fee DECIMAL;
  discount_percent DECIMAL := 0;
  final_fee DECIMAL;
BEGIN
  -- Get base fee
  SELECT fee_value INTO base_fee
  FROM fee_structures
  WHERE service_type = calculate_trading_fee.service_type
    AND is_active = true
  LIMIT 1;

  -- Get user membership discount if applicable
  IF user_id IS NOT NULL THEN
    SELECT COALESCE(mt.fee_discount_percent, 0) INTO discount_percent
    FROM profiles p
    LEFT JOIN membership_tiers mt ON p.membership_tier = mt.slug
    WHERE p.id = user_id;
  END IF;

  -- Calculate final fee with discount
  final_fee := (amount * base_fee / 100) * (1 - discount_percent / 100);
  
  RETURN GREATEST(final_fee, 0.01); -- Minimum fee of $0.01
END;
$$ LANGUAGE plpgsql;

-- Function to process subscription payments
CREATE OR REPLACE FUNCTION process_subscription_payment(
  user_id UUID,
  plan_slug TEXT,
  payment_method_id TEXT
) RETURNS JSONB AS $$
DECLARE
  plan_record subscription_plans%ROWTYPE;
  result JSONB;
BEGIN
  -- Get plan details
  SELECT * INTO plan_record
  FROM subscription_plans
  WHERE slug = plan_slug AND is_active = true;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Plan not found');
  END IF;

  -- Insert or update user subscription
  INSERT INTO user_subscriptions (user_id, plan_id, current_period_end)
  VALUES (user_id, plan_record.id, NOW() + INTERVAL '1 month')
  ON CONFLICT (user_id) DO UPDATE SET
    plan_id = plan_record.id,
    current_period_start = NOW(),
    current_period_end = NOW() + INTERVAL '1 month',
    status = 'active',
    updated_at = NOW();

  -- Record revenue
  INSERT INTO revenue_tracking (date, revenue_type, amount, user_count, transaction_count)
  VALUES (CURRENT_DATE, 'subscription', plan_record.price_monthly, 1, 1)
  ON CONFLICT (date, revenue_type) DO UPDATE SET
    amount = revenue_tracking.amount + plan_record.price_monthly,
    user_count = revenue_tracking.user_count + 1,
    transaction_count = revenue_tracking.transaction_count + 1;

  RETURN jsonb_build_object('success', true, 'plan', plan_record.name);
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own subscriptions" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own credits" ON user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own credit transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own payment methods" ON payment_methods
  FOR SELECT USING (auth.uid() = user_id);

-- Initialize user credits for existing users
INSERT INTO user_credits (user_id, balance)
SELECT id, 0.00
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;
