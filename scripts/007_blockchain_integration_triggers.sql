-- Real-time Blockchain Node to Database Integration
-- This script creates triggers and functions for seamless blockchain-to-database synchronization

-- Function to sync blockchain balance with database
CREATE OR REPLACE FUNCTION public.sync_blockchain_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_wallet_address TEXT;
  current_balance NUMERIC(20,8);
BEGIN
  -- Get user's primary wallet address
  SELECT address INTO user_wallet_address
  FROM public.user_wallets 
  WHERE user_id = NEW.user_id AND is_primary = true
  LIMIT 1;

  -- Calculate new balance based on transaction type
  SELECT COALESCE(available_balance, 0) INTO current_balance
  FROM public.btn_balances 
  WHERE wallet_address = user_wallet_address;

  -- Update balance based on transaction type
  IF NEW.transaction_type = 'mining_reward' THEN
    current_balance := current_balance + NEW.amount;
  ELSIF NEW.transaction_type = 'transfer_out' THEN
    current_balance := current_balance - NEW.amount;
  ELSIF NEW.transaction_type = 'transfer_in' THEN
    current_balance := current_balance + NEW.amount;
  ELSIF NEW.transaction_type = 'staking_reward' THEN
    current_balance := current_balance + NEW.amount;
  END IF;

  -- Upsert balance record with real-time sync
  INSERT INTO public.btn_balances (
    user_id,
    wallet_address,
    available_balance,
    total_earned,
    last_updated
  ) VALUES (
    NEW.user_id,
    user_wallet_address,
    current_balance,
    CASE WHEN NEW.transaction_type IN ('mining_reward', 'staking_reward') 
         THEN COALESCE((SELECT total_earned FROM public.btn_balances WHERE wallet_address = user_wallet_address), 0) + NEW.amount
         ELSE COALESCE((SELECT total_earned FROM public.btn_balances WHERE wallet_address = user_wallet_address), 0)
    END,
    NOW()
  )
  ON CONFLICT (wallet_address) 
  DO UPDATE SET
    available_balance = current_balance,
    total_earned = CASE WHEN NEW.transaction_type IN ('mining_reward', 'staking_reward') 
                        THEN btn_balances.total_earned + NEW.amount
                        ELSE btn_balances.total_earned
                   END,
    last_updated = NOW();

  -- Log the balance sync event
  INSERT INTO public.user_activity_logs (
    user_id,
    activity_type,
    activity_data
  ) VALUES (
    NEW.user_id,
    'balance_sync',
    jsonb_build_object(
      'transaction_hash', NEW.tx_hash,
      'amount', NEW.amount,
      'new_balance', current_balance,
      'transaction_type', NEW.transaction_type
    )
  );

  RETURN NEW;
END;
$$;

-- Trigger for real-time balance synchronization
CREATE TRIGGER on_blockchain_transaction_confirmed
  AFTER INSERT OR UPDATE OF status ON public.transactions
  FOR EACH ROW
  WHEN (NEW.status = 'confirmed')
  EXECUTE FUNCTION public.sync_blockchain_balance();

-- Function to handle mining session completion and rewards
CREATE OR REPLACE FUNCTION public.process_mining_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  reward_amount NUMERIC(20,8);
  user_wallet TEXT;
BEGIN
  -- Calculate mining reward based on session performance
  reward_amount := NEW.btn_earned;
  
  -- Get user's primary wallet
  SELECT address INTO user_wallet
  FROM public.user_wallets 
  WHERE user_id = NEW.user_id AND is_primary = true;

  -- Create transaction record for mining reward
  INSERT INTO public.transactions (
    from_address,
    to_address,
    amount,
    transaction_type,
    status,
    tx_hash,
    data
  ) VALUES (
    'mining_pool',
    user_wallet,
    reward_amount,
    'mining_reward',
    'confirmed',
    'mining_' || NEW.id || '_' || extract(epoch from NOW()),
    jsonb_build_object(
      'session_id', NEW.id,
      'mining_type', NEW.session_type,
      'blocks_mined', NEW.blocks_mined,
      'actions_performed', NEW.actions_performed
    )
  );

  -- Update user mining statistics
  UPDATE public.profiles 
  SET 
    total_earnings = total_earnings + reward_amount,
    mining_power = CASE 
      WHEN NEW.hash_rate > 0 THEN GREATEST(mining_power, FLOOR(NEW.hash_rate))
      ELSE mining_power 
    END
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$;

-- Trigger for mining reward processing
CREATE TRIGGER on_mining_session_reward
  AFTER UPDATE OF session_end ON public.mining_sessions
  FOR EACH ROW
  WHEN (NEW.session_end IS NOT NULL AND OLD.session_end IS NULL AND NEW.btn_earned > 0)
  EXECUTE FUNCTION public.process_mining_rewards();

-- Function to handle real-time action mining events
CREATE OR REPLACE FUNCTION public.process_action_mining()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  user_wallet TEXT;
BEGIN
  -- Get user's primary wallet
  SELECT address INTO user_wallet
  FROM public.user_wallets 
  WHERE user_id = NEW.user_id AND is_primary = true;

  -- Create micro-transaction for action reward
  INSERT INTO public.transactions (
    from_address,
    to_address,
    amount,
    transaction_type,
    status,
    tx_hash,
    data
  ) VALUES (
    'action_mining_pool',
    user_wallet,
    NEW.btn_reward,
    'action_reward',
    'confirmed',
    'action_' || NEW.id || '_' || extract(epoch from NOW()),
    jsonb_build_object(
      'action_type', NEW.action_type,
      'reward_multiplier', NEW.reward_multiplier,
      'session_id', NEW.session_id
    )
  );

  RETURN NEW;
END;
$$;

-- Trigger for action mining rewards
CREATE TRIGGER on_action_mining_reward
  AFTER INSERT ON public.action_mining_events
  FOR EACH ROW
  EXECUTE FUNCTION public.process_action_mining();

-- Function to monitor and update transaction status from blockchain node
CREATE OR REPLACE FUNCTION public.update_transaction_status(
  p_tx_hash TEXT,
  p_status TEXT,
  p_block_number BIGINT DEFAULT NULL,
  p_gas_used NUMERIC DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update transaction with blockchain confirmation data
  UPDATE public.transactions 
  SET 
    status = p_status,
    confirmed_at = CASE WHEN p_status = 'confirmed' THEN NOW() ELSE confirmed_at END,
    data = data || jsonb_build_object(
      'block_number', p_block_number,
      'gas_used', p_gas_used,
      'confirmed_timestamp', extract(epoch from NOW())
    )
  WHERE tx_hash = p_tx_hash;

  -- Return true if transaction was found and updated
  RETURN FOUND;
END;
$$;

-- Function to get real-time blockchain statistics
CREATE OR REPLACE FUNCTION public.get_blockchain_stats()
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_transactions', (SELECT COUNT(*) FROM public.transactions),
    'confirmed_transactions', (SELECT COUNT(*) FROM public.transactions WHERE status = 'confirmed'),
    'pending_transactions', (SELECT COUNT(*) FROM public.transactions WHERE status = 'pending'),
    'total_blocks', (SELECT COUNT(*) FROM public.blockchain_blocks),
    'total_btn_supply', (SELECT COALESCE(total_supply, 0) FROM public.btn_tokenomics LIMIT 1),
    'circulating_supply', (SELECT COALESCE(circulating_supply, 0) FROM public.btn_tokenomics LIMIT 1),
    'total_staked', (SELECT COALESCE(SUM(amount), 0) FROM public.user_stakes WHERE is_active = true),
    'active_miners', (SELECT COUNT(DISTINCT user_id) FROM public.mining_sessions WHERE session_start > NOW() - INTERVAL '24 hours'),
    'network_hash_rate', (SELECT COALESCE(AVG(hash_rate), 0) FROM public.mining_sessions WHERE session_start > NOW() - INTERVAL '1 hour'),
    'last_block_time', (SELECT MAX(timestamp) FROM public.blockchain_blocks)
  ) INTO stats;

  RETURN stats;
END;
$$;

-- Function to handle blockchain node health monitoring
CREATE OR REPLACE FUNCTION public.log_node_activity(
  p_node_id TEXT,
  p_activity_type TEXT,
  p_activity_data JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  log_id UUID;
BEGIN
  -- Log blockchain node activities for monitoring
  INSERT INTO public.platform_analytics (
    metric_type,
    metric_name,
    metric_value,
    metadata
  ) VALUES (
    'node_activity',
    p_activity_type,
    1,
    p_activity_data || jsonb_build_object('node_id', p_node_id, 'timestamp', extract(epoch from NOW()))
  )
  RETURNING id INTO log_id;

  RETURN log_id;
END;
$$;

-- Function to sync user wallet balances with blockchain node
CREATE OR REPLACE FUNCTION public.sync_wallet_with_node(
  p_user_id UUID,
  p_wallet_address TEXT,
  p_node_balance NUMERIC(20,8)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  db_balance NUMERIC(20,8);
  balance_diff NUMERIC(20,8);
BEGIN
  -- Get current database balance
  SELECT COALESCE(available_balance, 0) INTO db_balance
  FROM public.btn_balances 
  WHERE wallet_address = p_wallet_address;

  -- Calculate difference
  balance_diff := p_node_balance - db_balance;

  -- Sync balance if there's a significant difference (> 0.001 BTN)
  IF ABS(balance_diff) > 0.001 THEN
    -- Update balance to match node
    INSERT INTO public.btn_balances (
      user_id,
      wallet_address,
      available_balance,
      last_updated
    ) VALUES (
      p_user_id,
      p_wallet_address,
      p_node_balance,
      NOW()
    )
    ON CONFLICT (wallet_address)
    DO UPDATE SET
      available_balance = p_node_balance,
      last_updated = NOW();

    -- Log the sync event
    INSERT INTO public.user_activity_logs (
      user_id,
      activity_type,
      activity_data
    ) VALUES (
      p_user_id,
      'balance_sync_correction',
      jsonb_build_object(
        'wallet_address', p_wallet_address,
        'db_balance', db_balance,
        'node_balance', p_node_balance,
        'difference', balance_diff
      )
    );

    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$;

-- Create indexes for better performance on real-time operations
CREATE INDEX IF NOT EXISTS idx_transactions_status_hash ON public.transactions(status, tx_hash);
CREATE INDEX IF NOT EXISTS idx_btn_balances_wallet_updated ON public.btn_balances(wallet_address, last_updated);
CREATE INDEX IF NOT EXISTS idx_mining_sessions_user_active ON public.mining_sessions(user_id, session_start) WHERE session_end IS NULL;
CREATE INDEX IF NOT EXISTS idx_action_mining_user_timestamp ON public.action_mining_events(user_id, timestamp);

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.update_transaction_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_blockchain_stats TO authenticated;
GRANT EXECUTE ON FUNCTION public.sync_wallet_with_node TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_node_activity TO authenticated;
