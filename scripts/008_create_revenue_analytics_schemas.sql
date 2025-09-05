-- Creating comprehensive revenue tracking and analytics schemas
-- Detailed Revenue Transactions Table
CREATE TABLE IF NOT EXISTS revenue_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- payment, subscription, fee, commission, etc.
  service_category TEXT NOT NULL, -- cloud, nft, defi, payments, etc.
  service_name TEXT NOT NULL, -- specific service like "database", "compute", etc.
  amount NUMERIC(20,8) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BTN',
  fee_amount NUMERIC(20,8) DEFAULT 0,
  net_amount NUMERIC(20,8) NOT NULL, -- amount - fee
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Revenue Analytics Aggregates Table
CREATE TABLE IF NOT EXISTS revenue_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  service_category TEXT NOT NULL,
  total_revenue NUMERIC(20,8) NOT NULL DEFAULT 0,
  total_fees NUMERIC(20,8) NOT NULL DEFAULT 0,
  net_revenue NUMERIC(20,8) NOT NULL DEFAULT 0,
  transaction_count INTEGER NOT NULL DEFAULT 0,
  unique_users INTEGER NOT NULL DEFAULT 0,
  average_transaction NUMERIC(20,8) NOT NULL DEFAULT 0,
  growth_rate NUMERIC(5,4) DEFAULT 0, -- percentage growth
  currency TEXT NOT NULL DEFAULT 'BTN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, period_type, service_category, currency)
);

-- User Revenue Analytics Table
CREATE TABLE IF NOT EXISTS user_revenue_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_spent NUMERIC(20,8) NOT NULL DEFAULT 0,
  total_earned NUMERIC(20,8) NOT NULL DEFAULT 0,
  net_contribution NUMERIC(20,8) NOT NULL DEFAULT 0, -- spent - earned
  transaction_count INTEGER NOT NULL DEFAULT 0,
  services_used TEXT[] DEFAULT '{}',
  ltv NUMERIC(20,8) DEFAULT 0, -- lifetime value
  currency TEXT NOT NULL DEFAULT 'BTN',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date, currency)
);

-- Revenue Forecasting Table
CREATE TABLE IF NOT EXISTS revenue_forecasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  forecast_date DATE NOT NULL,
  service_category TEXT NOT NULL,
  forecast_period TEXT NOT NULL CHECK (forecast_period IN ('next_day', 'next_week', 'next_month', 'next_quarter')),
  predicted_revenue NUMERIC(20,8) NOT NULL,
  confidence_level NUMERIC(3,2) NOT NULL, -- 0.00 to 1.00
  model_used TEXT NOT NULL DEFAULT 'linear_regression',
  actual_revenue NUMERIC(20,8), -- filled when period completes
  accuracy_score NUMERIC(3,2), -- calculated after period
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(forecast_date, service_category, forecast_period)
);

-- Revenue KPIs Table
CREATE TABLE IF NOT EXISTS revenue_kpis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  kpi_name TEXT NOT NULL,
  kpi_value NUMERIC(20,8) NOT NULL,
  target_value NUMERIC(20,8),
  variance_percentage NUMERIC(5,2), -- percentage difference from target
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')),
  category TEXT NOT NULL, -- financial, operational, user, etc.
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, kpi_name)
);

-- Revenue Reports Table
CREATE TABLE IF NOT EXISTS revenue_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'annual', 'custom')),
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  report_data JSONB NOT NULL,
  generated_by UUID REFERENCES auth.users(id),
  is_automated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE revenue_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_revenue_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can access all revenue data" ON revenue_transactions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.user_id = auth.uid() 
    AND au.admin_level IN ('super_admin', 'admin') 
    AND au.is_active = true
  )
);

CREATE POLICY "Users can view own revenue data" ON user_revenue_analytics FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_revenue_transactions_date ON revenue_transactions(created_at);
CREATE INDEX idx_revenue_transactions_service ON revenue_transactions(service_category, service_name);
CREATE INDEX idx_revenue_analytics_date_service ON revenue_analytics(date, service_category);
CREATE INDEX idx_user_revenue_date ON user_revenue_analytics(date, user_id);

-- Insert sample revenue data
INSERT INTO revenue_transactions (user_id, transaction_type, service_category, service_name, amount, currency, fee_amount, net_amount, status, created_at) VALUES
-- Cloud Services
(gen_random_uuid(), 'subscription', 'cloud', 'database', 29.99, 'USD', 0.90, 29.09, 'completed', NOW() - INTERVAL '1 hour'),
(gen_random_uuid(), 'usage', 'cloud', 'compute', 45.50, 'USD', 1.37, 44.13, 'completed', NOW() - INTERVAL '2 hours'),
(gen_random_uuid(), 'subscription', 'cloud', 'storage', 19.99, 'USD', 0.60, 19.39, 'completed', NOW() - INTERVAL '3 hours'),
-- NFT Marketplace
(gen_random_uuid(), 'sale_commission', 'nft', 'marketplace', 125.00, 'BTN', 6.25, 118.75, 'completed', NOW() - INTERVAL '4 hours'),
(gen_random_uuid(), 'minting_fee', 'nft', 'minting', 15.00, 'BTN', 0.45, 14.55, 'completed', NOW() - INTERVAL '5 hours'),
-- DeFi Services
(gen_random_uuid(), 'trading_fee', 'defi', 'dex', 8.75, 'BTN', 0.26, 8.49, 'completed', NOW() - INTERVAL '6 hours'),
(gen_random_uuid(), 'staking_fee', 'defi', 'staking', 12.50, 'BTN', 0.38, 12.12, 'completed', NOW() - INTERVAL '7 hours'),
-- Payment Processing
(gen_random_uuid(), 'payment_fee', 'payments', 'gateway', 3.25, 'USD', 0.10, 3.15, 'completed', NOW() - INTERVAL '8 hours');

-- Insert sample KPIs
INSERT INTO revenue_kpis (date, kpi_name, kpi_value, target_value, variance_percentage, trend, category, description) VALUES
(CURRENT_DATE, 'daily_revenue', 24580.50, 25000.00, -1.68, 'down', 'financial', 'Total daily revenue across all services'),
(CURRENT_DATE, 'monthly_recurring_revenue', 145000.00, 150000.00, -3.33, 'down', 'financial', 'Monthly recurring revenue from subscriptions'),
(CURRENT_DATE, 'average_revenue_per_user', 127.45, 130.00, -1.96, 'down', 'financial', 'Average revenue per active user'),
(CURRENT_DATE, 'customer_acquisition_cost', 45.20, 50.00, -9.60, 'up', 'operational', 'Cost to acquire new customers'),
(CURRENT_DATE, 'customer_lifetime_value', 1250.00, 1200.00, 4.17, 'up', 'financial', 'Average customer lifetime value'),
(CURRENT_DATE, 'churn_rate', 2.5, 3.0, -16.67, 'up', 'operational', 'Monthly customer churn rate percentage'),
(CURRENT_DATE, 'gross_margin', 78.5, 75.0, 4.67, 'up', 'financial', 'Gross profit margin percentage');

-- Function to calculate revenue analytics
CREATE OR REPLACE FUNCTION calculate_revenue_analytics()
RETURNS void AS $$
BEGIN
  -- Calculate daily analytics
  INSERT INTO revenue_analytics (date, period_type, service_category, total_revenue, total_fees, net_revenue, transaction_count, unique_users, average_transaction)
  SELECT 
    DATE(created_at) as date,
    'daily' as period_type,
    service_category,
    SUM(amount) as total_revenue,
    SUM(fee_amount) as total_fees,
    SUM(net_amount) as net_revenue,
    COUNT(*) as transaction_count,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(amount) as average_transaction
  FROM revenue_transactions 
  WHERE DATE(created_at) = CURRENT_DATE
  GROUP BY DATE(created_at), service_category
  ON CONFLICT (date, period_type, service_category, currency) 
  DO UPDATE SET 
    total_revenue = EXCLUDED.total_revenue,
    total_fees = EXCLUDED.total_fees,
    net_revenue = EXCLUDED.net_revenue,
    transaction_count = EXCLUDED.transaction_count,
    unique_users = EXCLUDED.unique_users,
    average_transaction = EXCLUDED.average_transaction;
END;
$$ LANGUAGE plpgsql;
