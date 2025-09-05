-- Creating comprehensive admin console and platform control schemas
-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  admin_level TEXT NOT NULL DEFAULT 'moderator' CHECK (admin_level IN ('super_admin', 'admin', 'moderator', 'support')),
  permissions JSONB NOT NULL DEFAULT '{}',
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id)
);

-- Platform Settings Table
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category, setting_key)
);

-- System Monitoring Table
CREATE TABLE IF NOT EXISTS system_monitoring (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC(20,8) NOT NULL,
  metric_unit TEXT,
  service_name TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Admin Actions Log Table
CREATE TABLE IF NOT EXISTS admin_actions_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  target_type TEXT, -- user, transaction, setting, etc.
  target_id TEXT,
  action_details JSONB NOT NULL DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform Revenue Summary Table
CREATE TABLE IF NOT EXISTS platform_revenue_summary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  service_category TEXT NOT NULL, -- payments, cloud, nft, etc.
  total_revenue NUMERIC(20,8) NOT NULL DEFAULT 0,
  total_transactions INTEGER NOT NULL DEFAULT 0,
  unique_users INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'BTN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, service_category, currency)
);

-- User Management Table
CREATE TABLE IF NOT EXISTS user_management (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned', 'pending')),
  risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected', 'expired')),
  total_transactions INTEGER DEFAULT 0,
  total_volume NUMERIC(20,8) DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE,
  flags JSONB DEFAULT '[]',
  notes TEXT,
  managed_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Content Moderation Table
CREATE TABLE IF NOT EXISTS content_moderation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL, -- nft, post, comment, etc.
  content_id TEXT NOT NULL,
  reported_by UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'escalated')),
  moderator_id UUID REFERENCES auth.users(id),
  moderator_notes TEXT,
  auto_flagged BOOLEAN DEFAULT false,
  severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Platform Alerts Table
CREATE TABLE IF NOT EXISTS platform_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_type TEXT NOT NULL, -- security, performance, revenue, etc.
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  source_service TEXT,
  metadata JSONB DEFAULT '{}',
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_revenue_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Admin Access
CREATE POLICY "Super admins can access everything" ON admin_users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.user_id = auth.uid() 
    AND au.admin_level = 'super_admin' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admins can access platform settings" ON platform_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.user_id = auth.uid() 
    AND au.admin_level IN ('super_admin', 'admin') 
    AND au.is_active = true
  )
);

CREATE POLICY "Admins can access monitoring" ON system_monitoring FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true
  )
);

CREATE POLICY "Admins can access revenue data" ON platform_revenue_summary FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.user_id = auth.uid() 
    AND au.admin_level IN ('super_admin', 'admin') 
    AND au.is_active = true
  )
);

-- Insert initial admin user (you'll need to update this with actual user ID)
-- INSERT INTO admin_users (user_id, admin_level, permissions) VALUES 
-- ('your-user-id-here', 'super_admin', '{"all": true}');

-- Insert initial platform settings
INSERT INTO platform_settings (category, setting_key, setting_value, description) VALUES
('general', 'platform_name', '"BitnunEco"', 'Platform name'),
('general', 'maintenance_mode', 'false', 'Enable maintenance mode'),
('payments', 'default_fee_rate', '0.003', 'Default transaction fee rate'),
('security', 'max_login_attempts', '5', 'Maximum login attempts before lockout'),
('limits', 'daily_withdrawal_limit', '50000', 'Daily withdrawal limit in USD'),
('features', 'nft_marketplace_enabled', 'true', 'Enable NFT marketplace'),
('features', 'staking_enabled', 'true', 'Enable staking features')
ON CONFLICT (category, setting_key) DO NOTHING;

-- Insert sample monitoring data
INSERT INTO system_monitoring (metric_name, metric_value, metric_unit, service_name) VALUES
('active_users', 15420, 'count', 'platform'),
('total_transactions', 89234, 'count', 'blockchain'),
('revenue_24h', 24580.50, 'USD', 'payments'),
('cpu_usage', 45.2, 'percent', 'infrastructure'),
('memory_usage', 68.7, 'percent', 'infrastructure'),
('disk_usage', 34.1, 'percent', 'infrastructure'),
('network_latency', 28, 'ms', 'infrastructure'),
('error_rate', 0.02, 'percent', 'platform');

-- Insert sample revenue data
INSERT INTO platform_revenue_summary (date, service_category, total_revenue, total_transactions, unique_users) VALUES
(CURRENT_DATE, 'payments', 12450.75, 1250, 890),
(CURRENT_DATE, 'cloud_services', 8920.30, 450, 320),
(CURRENT_DATE, 'nft_marketplace', 5680.90, 89, 67),
(CURRENT_DATE, 'staking_rewards', 2340.15, 2340, 1200),
(CURRENT_DATE - INTERVAL '1 day', 'payments', 11230.45, 1180, 850),
(CURRENT_DATE - INTERVAL '1 day', 'cloud_services', 9150.20, 480, 340),
(CURRENT_DATE - INTERVAL '1 day', 'nft_marketplace', 4920.60, 76, 58);
