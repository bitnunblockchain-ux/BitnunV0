-- Creating comprehensive BTN token processing schemas
-- BTN Token Balances Table
CREATE TABLE IF NOT EXISTS btn_balances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  available_balance NUMERIC(20,8) NOT NULL DEFAULT 0,
  staked_balance NUMERIC(20,8) NOT NULL DEFAULT 0,
  locked_balance NUMERIC(20,8) NOT NULL DEFAULT 0,
  total_earned NUMERIC(20,8) NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, wallet_address)
);

-- BTN Token Operations Table
CREATE TABLE IF NOT EXISTS btn_operations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  operation_type TEXT NOT NULL CHECK (operation_type IN ('mint', 'burn', 'transfer', 'stake', 'unstake', 'reward')),
  amount NUMERIC(20,8) NOT NULL,
  from_address TEXT,
  to_address TEXT,
  tx_hash TEXT UNIQUE,
  block_number BIGINT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  gas_used NUMERIC(20,8) DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- BTN Staking Pools Table
CREATE TABLE IF NOT EXISTS btn_staking_pools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pool_name TEXT NOT NULL UNIQUE,
  pool_type TEXT NOT NULL CHECK (pool_type IN ('flexible', 'fixed', 'governance')),
  min_stake NUMERIC(20,8) NOT NULL DEFAULT 100,
  max_stake NUMERIC(20,8),
  lock_period INTEGER, -- days
  apr NUMERIC(5,2) NOT NULL, -- annual percentage rate
  total_staked NUMERIC(20,8) NOT NULL DEFAULT 0,
  total_rewards_distributed NUMERIC(20,8) NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Staking Positions Table
CREATE TABLE IF NOT EXISTS btn_staking_positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pool_id UUID REFERENCES btn_staking_pools(id) ON DELETE CASCADE,
  staked_amount NUMERIC(20,8) NOT NULL,
  rewards_earned NUMERIC(20,8) NOT NULL DEFAULT 0,
  stake_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unlock_date TIMESTAMP WITH TIME ZONE,
  last_reward_claim TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unstaking', 'completed'))
);

-- BTN Governance Proposals Table
CREATE TABLE IF NOT EXISTS btn_governance_proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  proposer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('parameter_change', 'treasury_spend', 'upgrade', 'general')),
  voting_power_required NUMERIC(20,8) NOT NULL DEFAULT 1000,
  votes_for NUMERIC(20,8) NOT NULL DEFAULT 0,
  votes_against NUMERIC(20,8) NOT NULL DEFAULT 0,
  votes_abstain NUMERIC(20,8) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'passed', 'rejected', 'expired')),
  voting_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  voting_end TIMESTAMP WITH TIME ZONE NOT NULL,
  execution_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- BTN Governance Votes Table
CREATE TABLE IF NOT EXISTS btn_governance_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID REFERENCES btn_governance_proposals(id) ON DELETE CASCADE,
  voter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_choice TEXT NOT NULL CHECK (vote_choice IN ('for', 'against', 'abstain')),
  voting_power NUMERIC(20,8) NOT NULL,
  vote_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(proposal_id, voter_id)
);

-- BTN Token Economics Table
CREATE TABLE IF NOT EXISTS btn_tokenomics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_supply NUMERIC(20,8) NOT NULL DEFAULT 0,
  circulating_supply NUMERIC(20,8) NOT NULL DEFAULT 0,
  burned_supply NUMERIC(20,8) NOT NULL DEFAULT 0,
  staked_supply NUMERIC(20,8) NOT NULL DEFAULT 0,
  treasury_balance NUMERIC(20,8) NOT NULL DEFAULT 0,
  daily_mint_rate NUMERIC(20,8) NOT NULL DEFAULT 10000,
  inflation_rate NUMERIC(5,4) NOT NULL DEFAULT 0.05, -- 5% annual
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE btn_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_staking_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_staking_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_governance_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_governance_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE btn_tokenomics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own BTN balances" ON btn_balances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own BTN operations" ON btn_operations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own BTN operations" ON btn_operations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staking pools are public" ON btn_staking_pools FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can view own staking positions" ON btn_staking_positions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own staking positions" ON btn_staking_positions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Governance proposals are public" ON btn_governance_proposals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create proposals" ON btn_governance_proposals FOR INSERT WITH CHECK (auth.uid() = proposer_id);

CREATE POLICY "Governance votes are public" ON btn_governance_votes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can vote" ON btn_governance_votes FOR INSERT WITH CHECK (auth.uid() = voter_id);

CREATE POLICY "Tokenomics are public" ON btn_tokenomics FOR SELECT TO authenticated USING (true);

-- Insert initial tokenomics data
INSERT INTO btn_tokenomics (
  total_supply, 
  circulating_supply, 
  daily_mint_rate, 
  inflation_rate
) VALUES (
  21000000, -- 21M total supply like Bitcoin
  5000000,  -- 5M circulating
  10000,    -- 10K daily mint
  0.05      -- 5% annual inflation
) ON CONFLICT DO NOTHING;

-- Insert initial staking pools
INSERT INTO btn_staking_pools (pool_name, pool_type, min_stake, apr, lock_period) VALUES
('Flexible Staking', 'flexible', 100, 8.5, NULL),
('30-Day Fixed', 'fixed', 500, 12.0, 30),
('90-Day Fixed', 'fixed', 1000, 15.5, 90),
('Governance Pool', 'governance', 10000, 20.0, 365)
ON CONFLICT (pool_name) DO NOTHING;
