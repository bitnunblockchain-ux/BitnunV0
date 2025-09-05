-- BitnunEco Initial Data Seeding

-- Insert initial trading pairs
INSERT INTO public.trading_pairs (base_token, quote_token, price, volume_24h, price_change_24h, liquidity) VALUES
('BTN', 'USDT', 0.25, 150000, 5.2, 500000),
('BTN', 'ETH', 0.000125, 75000, -2.1, 300000),
('BTN', 'BTC', 0.0000055, 25000, 1.8, 200000),
('ECO', 'BTN', 1.5, 80000, 8.5, 400000),
('GREEN', 'BTN', 0.75, 45000, -1.2, 180000)
ON CONFLICT (base_token, quote_token) DO NOTHING;

-- Insert initial liquidity pools
INSERT INTO public.liquidity_pools (pair_id, token_a, token_b, reserve_a, reserve_b, total_liquidity, apr, fee_tier)
SELECT 
  tp.id,
  tp.base_token,
  tp.quote_token,
  tp.liquidity * 0.6,
  tp.liquidity * 0.4,
  tp.liquidity,
  CASE 
    WHEN tp.base_token = 'BTN' THEN 12.5
    WHEN tp.base_token = 'ECO' THEN 18.7
    ELSE 8.2
  END,
  0.003
FROM public.trading_pairs tp
ON CONFLICT DO NOTHING;

-- Insert initial staking pools
INSERT INTO public.staking_pools (token_symbol, pool_name, apr, total_staked, min_stake, lock_period, is_active) VALUES
('BTN', 'BTN Flexible Staking', 8.5, 2500000, 10, 0, true),
('BTN', 'BTN 30-Day Lock', 12.0, 1800000, 100, 30, true),
('BTN', 'BTN 90-Day Lock', 18.5, 950000, 500, 90, true),
('ECO', 'ECO Green Pool', 15.2, 750000, 50, 14, true),
('GREEN', 'GREEN Sustainability Pool', 22.0, 320000, 25, 60, true)
ON CONFLICT DO NOTHING;

-- Insert sample NFT collections
INSERT INTO public.nft_collections (id, creator_id, name, description, symbol, total_supply, floor_price, volume_traded, royalty_percentage, category, is_verified) VALUES
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'EcoGuardians', 'Digital guardians protecting our virtual ecosystem', 'ECOG', 1000, 2.5, 15000, 5.0, 'environmental', true),
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'Renewable Energy Art', 'Artistic representations of sustainable energy', 'REA', 500, 5.0, 8500, 7.5, 'art', true),
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'Carbon Offset Certificates', 'Verified carbon offset NFT certificates', 'COC', 2000, 1.0, 25000, 2.5, 'utility', true)
ON CONFLICT DO NOTHING;

-- Insert sample DAO proposals
INSERT INTO public.dao_proposals (id, proposer_id, title, description, proposal_type, voting_end, quorum_required, status) VALUES
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'Increase Mining Rewards', 'Proposal to increase base mining rewards by 15% to incentivize more participation', 'economic', NOW() + INTERVAL '7 days', 0.15, 'active'),
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'New Eco-NFT Category', 'Add a new category for climate action NFTs with special rewards', 'feature', NOW() + INTERVAL '5 days', 0.10, 'active'),
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'Treasury Allocation for Green Initiatives', 'Allocate 100,000 BTN from treasury for environmental partnerships', 'treasury', NOW() + INTERVAL '10 days', 0.20, 'active')
ON CONFLICT DO NOTHING;

-- Insert sample launchpad projects
INSERT INTO public.launchpad_projects (id, creator_id, name, description, token_symbol, token_name, total_supply, sale_type, target_amount, token_price, sale_start, sale_end, status) VALUES
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'GreenChain Protocol', 'Revolutionary blockchain for carbon credit trading and environmental impact tracking', 'GCP', 'GreenChain Protocol Token', 1000000000, 'IDO', 500000, 0.05, NOW() + INTERVAL '2 days', NOW() + INTERVAL '9 days', 'upcoming'),
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'EcoVerse Metaverse', 'Virtual world focused on environmental education and sustainable living', 'ECOV', 'EcoVerse Token', 500000000, 'IEO', 750000, 0.15, NOW() + INTERVAL '1 day', NOW() + INTERVAL '8 days', 'upcoming'),
(gen_random_uuid(), (SELECT id FROM public.profiles LIMIT 1), 'Solar Mining Network', 'Decentralized solar-powered cryptocurrency mining network', 'SOLAR', 'Solar Mining Token', 2000000000, 'ICO', 1000000, 0.025, NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days', 'active')
ON CONFLICT DO NOTHING;

-- Insert platform analytics baseline
INSERT INTO public.platform_analytics (metric_name, metric_value, metric_type, metadata) VALUES
('total_users', 0, 'counter', '{"description": "Total registered users"}'),
('daily_active_users', 0, 'gauge', '{"description": "Users active in last 24 hours"}'),
('total_btn_supply', 21000000, 'gauge', '{"description": "Total BTN tokens in circulation"}'),
('mining_difficulty', 1, 'gauge', '{"description": "Current mining difficulty"}'),
('network_hash_rate', 0, 'gauge', '{"description": "Total network hash rate"}'),
('total_transactions', 0, 'counter', '{"description": "Total blockchain transactions"}'),
('nft_trading_volume', 0, 'counter', '{"description": "Total NFT trading volume"}'),
('defi_tvl', 0, 'gauge', '{"description": "Total Value Locked in DeFi"}')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_reputation ON public.profiles(reputation_score DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_level ON public.profiles(level DESC);
CREATE INDEX IF NOT EXISTS idx_mining_sessions_user_date ON public.mining_sessions(user_id, session_start DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_hash ON public.transactions(tx_hash);
CREATE INDEX IF NOT EXISTS idx_transactions_addresses ON public.transactions(from_address, to_address);
CREATE INDEX IF NOT EXISTS idx_nfts_owner ON public.nfts(owner_id);
CREATE INDEX IF NOT EXISTS idx_nfts_collection ON public.nfts(collection_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_user_time ON public.user_activity_logs(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_dao_proposals_status ON public.dao_proposals(status, voting_end);
CREATE INDEX IF NOT EXISTS idx_social_posts_author_time ON public.social_posts(author_id, created_at DESC);
