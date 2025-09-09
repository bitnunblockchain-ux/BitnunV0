-- Multi-Node Blockchain Infrastructure with Smart Contracts
-- Creates tables for managing multiple blockchain nodes, smart contracts, and real-time functionality

-- Blockchain Nodes Management
CREATE TABLE IF NOT EXISTS blockchain_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT UNIQUE NOT NULL,
  node_type TEXT NOT NULL CHECK (node_type IN ('validator', 'miner', 'full', 'light')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'syncing', 'error')),
  region TEXT NOT NULL,
  peers_connected INTEGER DEFAULT 0,
  blocks_processed BIGINT DEFAULT 0,
  hash_rate DECIMAL(20,8) DEFAULT 0,
  last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Smart Contracts Registry
CREATE TABLE IF NOT EXISTS smart_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_address TEXT UNIQUE NOT NULL,
  contract_name TEXT NOT NULL,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('token', 'nft', 'defi', 'dao', 'bridge', 'custom')),
  bytecode TEXT NOT NULL,
  abi JSONB NOT NULL,
  source_code TEXT,
  compiler_version TEXT,
  deployed_by UUID REFERENCES profiles(id),
  deployment_tx_hash TEXT,
  deployment_block BIGINT,
  gas_used BIGINT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'deprecated')),
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('verified', 'unverified', 'pending')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Smart Contract Interactions
CREATE TABLE IF NOT EXISTS contract_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES smart_contracts(id),
  user_id UUID REFERENCES profiles(id),
  transaction_hash TEXT NOT NULL,
  method_name TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  gas_used BIGINT,
  gas_price DECIMAL(20,8),
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'reverted')),
  error_message TEXT,
  block_number BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Node Load Balancing
CREATE TABLE IF NOT EXISTS node_load_balancer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id UUID REFERENCES blockchain_nodes(id),
  current_load INTEGER DEFAULT 0,
  max_capacity INTEGER DEFAULT 1000,
  response_time_ms INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 100.00,
  last_health_check TIMESTAMPTZ DEFAULT NOW(),
  is_healthy BOOLEAN DEFAULT true
);

-- Real-time Events Queue
CREATE TABLE IF NOT EXISTS realtime_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  target_users UUID[],
  broadcast BOOLEAN DEFAULT false,
  processed BOOLEAN DEFAULT false,
  retry_count INTEGER DEFAULT 0,
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cross-Chain Bridge Operations
CREATE TABLE IF NOT EXISTS bridge_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  source_chain TEXT NOT NULL,
  target_chain TEXT NOT NULL,
  source_tx_hash TEXT,
  target_tx_hash TEXT,
  token_address TEXT NOT NULL,
  amount DECIMAL(30,18) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'locked', 'minted', 'completed', 'failed')),
  bridge_fee DECIMAL(30,18) DEFAULT 0,
  estimated_time INTEGER, -- in seconds
  actual_time INTEGER,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Node Performance Metrics
CREATE TABLE IF NOT EXISTS node_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id UUID REFERENCES blockchain_nodes(id),
  metric_type TEXT NOT NULL,
  metric_value DECIMAL(20,8) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE blockchain_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_load_balancer ENABLE ROW LEVEL SECURITY;
ALTER TABLE realtime_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bridge_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view public blockchain nodes" ON blockchain_nodes FOR SELECT USING (true);
CREATE POLICY "Users can view public smart contracts" ON smart_contracts FOR SELECT USING (true);
CREATE POLICY "Users can view their contract interactions" ON contract_interactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their contract interactions" ON contract_interactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their bridge operations" ON bridge_operations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their bridge operations" ON bridge_operations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blockchain_nodes_status ON blockchain_nodes(status);
CREATE INDEX IF NOT EXISTS idx_blockchain_nodes_type ON blockchain_nodes(node_type);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_address ON smart_contracts(contract_address);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_type ON smart_contracts(contract_type);
CREATE INDEX IF NOT EXISTS idx_contract_interactions_contract ON contract_interactions(contract_id);
CREATE INDEX IF NOT EXISTS idx_contract_interactions_user ON contract_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_realtime_events_processed ON realtime_events(processed);
CREATE INDEX IF NOT EXISTS idx_bridge_operations_status ON bridge_operations(status);
CREATE INDEX IF NOT EXISTS idx_node_metrics_timestamp ON node_metrics(timestamp);

-- Functions for node management
CREATE OR REPLACE FUNCTION get_best_available_node(node_type_param TEXT DEFAULT 'full')
RETURNS TABLE(node_id TEXT, current_load INTEGER, response_time_ms INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT bn.node_id, nlb.current_load, nlb.response_time_ms
  FROM blockchain_nodes bn
  JOIN node_load_balancer nlb ON bn.id = nlb.node_id
  WHERE bn.node_type = node_type_param 
    AND bn.status = 'active'
    AND nlb.is_healthy = true
    AND nlb.current_load < nlb.max_capacity
  ORDER BY (nlb.current_load::FLOAT / nlb.max_capacity::FLOAT) ASC, nlb.response_time_ms ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to process realtime events
CREATE OR REPLACE FUNCTION process_realtime_events()
RETURNS void AS $$
DECLARE
  event_record RECORD;
BEGIN
  FOR event_record IN 
    SELECT * FROM realtime_events 
    WHERE processed = false AND scheduled_for <= NOW()
    ORDER BY created_at ASC
    LIMIT 100
  LOOP
    -- Mark as processed
    UPDATE realtime_events 
    SET processed = true, processed_at = NOW()
    WHERE id = event_record.id;
    
    -- Trigger real-time notification (handled by application layer)
    PERFORM pg_notify('realtime_event', json_build_object(
      'id', event_record.id,
      'type', event_record.event_type,
      'data', event_record.event_data,
      'target_users', event_record.target_users,
      'broadcast', event_record.broadcast
    )::text);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update node heartbeat
CREATE OR REPLACE FUNCTION update_node_heartbeat()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.last_heartbeat = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_node_heartbeat
  BEFORE UPDATE ON blockchain_nodes
  FOR EACH ROW
  EXECUTE FUNCTION update_node_heartbeat();

-- Insert initial nodes
INSERT INTO blockchain_nodes (node_id, node_type, region, peers_connected, hash_rate) VALUES
('btn_validator_us_east_1', 'validator', 'us-east-1', 15, 25.5),
('btn_validator_eu_west_1', 'validator', 'eu-west-1', 12, 22.3),
('btn_miner_us_west_1', 'miner', 'us-west-1', 8, 18.7),
('btn_full_asia_1', 'full', 'asia-southeast-1', 20, 30.2),
('btn_full_us_central_1', 'full', 'us-central-1', 18, 28.9);

-- Insert load balancer entries
INSERT INTO node_load_balancer (node_id, current_load, max_capacity, response_time_ms)
SELECT id, 0, 1000, 50 FROM blockchain_nodes;
