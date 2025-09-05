-- BitnunEco Comprehensive Database Schema
-- This script creates all necessary tables for the complete blockchain ecosystem

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USER MANAGEMENT & PROFILES
-- ============================================================================

-- Enhanced profiles table (extends existing)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS wallet_address TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mining_streak INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_mining_session TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_actions INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kyc_level INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES public.profiles(id);

-- User achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  achievement_description TEXT,
  rarity TEXT DEFAULT 'common',
  points_awarded INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- User wallets
CREATE TABLE IF NOT EXISTS public.user_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  wallet_type TEXT NOT NULL DEFAULT 'native',
  address TEXT NOT NULL,
  private_key_encrypted TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, address)
);

-- ============================================================================
-- BLOCKCHAIN & MINING
-- ============================================================================

-- Blockchain blocks
CREATE TABLE IF NOT EXISTS public.blockchain_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_number BIGINT UNIQUE NOT NULL,
  block_hash TEXT UNIQUE NOT NULL,
  previous_hash TEXT NOT NULL,
  merkle_root TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  miner_id UUID REFERENCES public.profiles(id),
  difficulty INTEGER NOT NULL DEFAULT 1,
  nonce BIGINT NOT NULL,
  transaction_count INTEGER DEFAULT 0,
  block_reward NUMERIC(20,8) DEFAULT 0,
  gas_used BIGINT DEFAULT 0,
  gas_limit BIGINT DEFAULT 1000000,
  size_bytes INTEGER DEFAULT 0
);

-- Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_hash TEXT UNIQUE NOT NULL,
  block_id UUID REFERENCES public.blockchain_blocks(id),
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  amount NUMERIC(20,8) NOT NULL DEFAULT 0,
  gas_price NUMERIC(20,8) DEFAULT 0,
  gas_used BIGINT DEFAULT 0,
  transaction_type TEXT NOT NULL DEFAULT 'transfer',
  status TEXT DEFAULT 'pending',
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Mining sessions
CREATE TABLE IF NOT EXISTS public.mining_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  blocks_mined INTEGER DEFAULT 0,
  actions_performed INTEGER DEFAULT 0,
  btn_earned NUMERIC(20,8) DEFAULT 0,
  hash_rate NUMERIC(15,2) DEFAULT 0,
  mining_power INTEGER DEFAULT 1,
  session_type TEXT DEFAULT 'action_mining'
);

-- Action mining events
CREATE TABLE IF NOT EXISTS public.action_mining_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.mining_sessions(id),
  action_type TEXT NOT NULL,
  action_data JSONB,
  reward_multiplier NUMERIC(4,2) DEFAULT 1.0,
  btn_reward NUMERIC(20,8) DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- NFT MARKETPLACE
-- ============================================================================

-- NFT collections
CREATE TABLE IF NOT EXISTS public.nft_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  symbol TEXT NOT NULL,
  contract_address TEXT UNIQUE,
  total_supply INTEGER DEFAULT 0,
  floor_price NUMERIC(20,8) DEFAULT 0,
  volume_traded NUMERIC(20,8) DEFAULT 0,
  royalty_percentage NUMERIC(5,2) DEFAULT 0,
  category TEXT DEFAULT 'art',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFTs
CREATE TABLE IF NOT EXISTS public.nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.nft_collections(id),
  token_id INTEGER NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.profiles(id),
  creator_id UUID NOT NULL REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  metadata JSONB,
  rarity TEXT DEFAULT 'common',
  price NUMERIC(20,8),
  is_listed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, token_id)
);

-- NFT marketplace listings
CREATE TABLE IF NOT EXISTS public.nft_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id UUID NOT NULL REFERENCES public.nfts(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES public.profiles(id),
  price NUMERIC(20,8) NOT NULL,
  currency TEXT DEFAULT 'BTN',
  listing_type TEXT DEFAULT 'fixed_price',
  auction_end_time TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFT sales history
CREATE TABLE IF NOT EXISTS public.nft_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id UUID NOT NULL REFERENCES public.nfts(id),
  seller_id UUID NOT NULL REFERENCES public.profiles(id),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id),
  price NUMERIC(20,8) NOT NULL,
  currency TEXT DEFAULT 'BTN',
  transaction_hash TEXT,
  sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- DEFI & TRADING
-- ============================================================================

-- Trading pairs
CREATE TABLE IF NOT EXISTS public.trading_pairs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_token TEXT NOT NULL,
  quote_token TEXT NOT NULL,
  price NUMERIC(20,8) NOT NULL DEFAULT 0,
  volume_24h NUMERIC(20,8) DEFAULT 0,
  price_change_24h NUMERIC(10,4) DEFAULT 0,
  liquidity NUMERIC(20,8) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(base_token, quote_token)
);

-- Liquidity pools
CREATE TABLE IF NOT EXISTS public.liquidity_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pair_id UUID NOT NULL REFERENCES public.trading_pairs(id),
  token_a TEXT NOT NULL,
  token_b TEXT NOT NULL,
  reserve_a NUMERIC(20,8) DEFAULT 0,
  reserve_b NUMERIC(20,8) DEFAULT 0,
  total_liquidity NUMERIC(20,8) DEFAULT 0,
  apr NUMERIC(8,4) DEFAULT 0,
  fee_tier NUMERIC(6,4) DEFAULT 0.003,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User positions
CREATE TABLE IF NOT EXISTS public.user_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pool_id UUID REFERENCES public.liquidity_pools(id),
  position_type TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  amount NUMERIC(20,8) NOT NULL DEFAULT 0,
  entry_price NUMERIC(20,8),
  current_price NUMERIC(20,8),
  pnl NUMERIC(20,8) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staking pools
CREATE TABLE IF NOT EXISTS public.staking_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_symbol TEXT NOT NULL,
  pool_name TEXT NOT NULL,
  apr NUMERIC(8,4) NOT NULL DEFAULT 0,
  total_staked NUMERIC(20,8) DEFAULT 0,
  min_stake NUMERIC(20,8) DEFAULT 1,
  lock_period INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User stakes
CREATE TABLE IF NOT EXISTS public.user_stakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pool_id UUID NOT NULL REFERENCES public.staking_pools(id),
  amount NUMERIC(20,8) NOT NULL DEFAULT 0,
  rewards_earned NUMERIC(20,8) DEFAULT 0,
  stake_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unlock_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- DAO GOVERNANCE
-- ============================================================================

-- DAO proposals
CREATE TABLE IF NOT EXISTS public.dao_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposer_id UUID NOT NULL REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposal_type TEXT NOT NULL DEFAULT 'general',
  voting_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  voting_end TIMESTAMP WITH TIME ZONE NOT NULL,
  quorum_required NUMERIC(10,4) DEFAULT 0.1,
  votes_for NUMERIC(20,8) DEFAULT 0,
  votes_against NUMERIC(20,8) DEFAULT 0,
  votes_abstain NUMERIC(20,8) DEFAULT 0,
  status TEXT DEFAULT 'active',
  execution_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DAO votes
CREATE TABLE IF NOT EXISTS public.dao_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES public.dao_proposals(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES public.profiles(id),
  vote_choice TEXT NOT NULL,
  voting_power NUMERIC(20,8) NOT NULL DEFAULT 0,
  vote_reason TEXT,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(proposal_id, voter_id)
);

-- Treasury transactions
CREATE TABLE IF NOT EXISTS public.treasury_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES public.dao_proposals(id),
  transaction_type TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  amount NUMERIC(20,8) NOT NULL,
  recipient_address TEXT,
  description TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  transaction_hash TEXT
);

-- ============================================================================
-- LAUNCHPAD & FUNDRAISING
-- ============================================================================

-- Launchpad projects
CREATE TABLE IF NOT EXISTS public.launchpad_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  token_name TEXT NOT NULL,
  total_supply NUMERIC(20,8) NOT NULL,
  sale_type TEXT NOT NULL DEFAULT 'IDO',
  target_amount NUMERIC(20,8) NOT NULL,
  raised_amount NUMERIC(20,8) DEFAULT 0,
  token_price NUMERIC(20,8) NOT NULL,
  sale_start TIMESTAMP WITH TIME ZONE NOT NULL,
  sale_end TIMESTAMP WITH TIME ZONE NOT NULL,
  vesting_schedule JSONB,
  whitelist_required BOOLEAN DEFAULT FALSE,
  kyc_required BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project investments
CREATE TABLE IF NOT EXISTS public.project_investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.launchpad_projects(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.profiles(id),
  amount_invested NUMERIC(20,8) NOT NULL,
  tokens_allocated NUMERIC(20,8) NOT NULL,
  investment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vesting_claimed NUMERIC(20,8) DEFAULT 0,
  UNIQUE(project_id, investor_id)
);

-- ============================================================================
-- SOCIAL & COMMUNITY
-- ============================================================================

-- Social posts
CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'text',
  media_urls TEXT[],
  trading_signal JSONB,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post interactions
CREATE TABLE IF NOT EXISTS public.post_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, interaction_type)
);

-- User follows
CREATE TABLE IF NOT EXISTS public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Copy trading
CREATE TABLE IF NOT EXISTS public.copy_trading (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  copier_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  trader_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  allocation_amount NUMERIC(20,8) NOT NULL,
  copy_percentage NUMERIC(5,2) DEFAULT 100.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(copier_id, trader_id)
);

-- ============================================================================
-- ANALYTICS & MONITORING
-- ============================================================================

-- Platform analytics
CREATE TABLE IF NOT EXISTS public.platform_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC(20,8) NOT NULL,
  metric_type TEXT NOT NULL DEFAULT 'counter',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- User activity logs
CREATE TABLE IF NOT EXISTS public.user_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all user-accessible tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mining_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_mining_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_trading ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies
-- Profiles policies (already exist, but ensure they're complete)
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- User achievements policies
CREATE POLICY "achievements_select_own" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "achievements_insert_own" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User wallets policies
CREATE POLICY "wallets_select_own" ON public.user_wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wallets_insert_own" ON public.user_wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wallets_update_own" ON public.user_wallets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "wallets_delete_own" ON public.user_wallets FOR DELETE USING (auth.uid() = user_id);

-- Mining sessions policies
CREATE POLICY "mining_select_own" ON public.mining_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mining_insert_own" ON public.mining_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mining_update_own" ON public.mining_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Action mining events policies
CREATE POLICY "actions_select_own" ON public.action_mining_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "actions_insert_own" ON public.action_mining_events FOR INSERT WITH CHECK (auth.uid() = user_id);

-- NFT collections policies
CREATE POLICY "collections_select_all" ON public.nft_collections FOR SELECT USING (true);
CREATE POLICY "collections_insert_own" ON public.nft_collections FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "collections_update_own" ON public.nft_collections FOR UPDATE USING (auth.uid() = creator_id);

-- NFTs policies
CREATE POLICY "nfts_select_all" ON public.nfts FOR SELECT USING (true);
CREATE POLICY "nfts_insert_own" ON public.nfts FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "nfts_update_owner" ON public.nfts FOR UPDATE USING (auth.uid() = owner_id OR auth.uid() = creator_id);

-- Continue with other policies...
-- (Additional policies would be added for all other tables following the same pattern)
