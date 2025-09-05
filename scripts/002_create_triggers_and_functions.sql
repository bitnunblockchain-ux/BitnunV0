-- BitnunEco Database Triggers and Functions

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles with enhanced data
  INSERT INTO public.profiles (
    id, 
    username, 
    display_name, 
    bio,
    reputation_score,
    level,
    total_earnings,
    mining_power,
    wallet_address,
    referral_code
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', 'BitnunEco User'),
    COALESCE(NEW.raw_user_meta_data ->> 'bio', 'New to the BitnunEco ecosystem'),
    100, -- Starting reputation
    1,   -- Starting level
    0,   -- Starting earnings
    1,   -- Starting mining power
    'btn_' || substr(md5(NEW.id::text), 1, 32), -- Generate wallet address
    'REF_' || substr(md5(NEW.id::text || NOW()::text), 1, 8) -- Generate referral code
  )
  ON CONFLICT (id) DO NOTHING;

  -- Create default wallet
  INSERT INTO public.user_wallets (
    user_id,
    wallet_type,
    address,
    is_primary
  )
  VALUES (
    NEW.id,
    'native',
    'btn_' || substr(md5(NEW.id::text), 1, 32),
    TRUE
  )
  ON CONFLICT (user_id, address) DO NOTHING;

  -- Award welcome achievement
  INSERT INTO public.user_achievements (
    user_id,
    achievement_id,
    achievement_name,
    achievement_description,
    rarity,
    points_awarded
  )
  VALUES (
    NEW.id,
    'welcome_aboard',
    'Welcome Aboard!',
    'Successfully joined the BitnunEco ecosystem',
    'common',
    50
  )
  ON CONFLICT (user_id, achievement_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update user stats after mining
CREATE OR REPLACE FUNCTION public.update_mining_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update user profile with mining stats
  UPDATE public.profiles 
  SET 
    total_earnings = total_earnings + NEW.btn_earned,
    total_actions = total_actions + NEW.actions_performed,
    last_mining_session = NEW.session_end,
    mining_streak = CASE 
      WHEN last_mining_session IS NULL OR last_mining_session < NOW() - INTERVAL '24 hours' 
      THEN 1 
      ELSE mining_streak + 1 
    END
  WHERE id = NEW.user_id;

  -- Check for mining achievements
  PERFORM public.check_mining_achievements(NEW.user_id);

  RETURN NEW;
END;
$$;

-- Create trigger for mining session completion
CREATE TRIGGER on_mining_session_complete
  AFTER UPDATE OF session_end ON public.mining_sessions
  FOR EACH ROW
  WHEN (NEW.session_end IS NOT NULL AND OLD.session_end IS NULL)
  EXECUTE FUNCTION public.update_mining_stats();

-- Function to check and award mining achievements
CREATE OR REPLACE FUNCTION public.check_mining_achievements(user_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  user_stats RECORD;
BEGIN
  -- Get user mining stats
  SELECT 
    total_earnings,
    mining_streak,
    total_actions,
    (SELECT COUNT(*) FROM public.mining_sessions WHERE user_id = user_uuid) as total_sessions
  INTO user_stats
  FROM public.profiles 
  WHERE id = user_uuid;

  -- First Mining Session Achievement
  IF user_stats.total_sessions = 1 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'first_mine', 'First Mining Session', 'Completed your first mining session', 'common', 100)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  -- Mining Streak Achievements
  IF user_stats.mining_streak >= 7 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'week_streak', 'Week Warrior', 'Maintained a 7-day mining streak', 'uncommon', 500)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  IF user_stats.mining_streak >= 30 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'month_streak', 'Monthly Master', 'Maintained a 30-day mining streak', 'rare', 2000)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  -- Earnings Milestones
  IF user_stats.total_earnings >= 1000 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'first_thousand', 'First Thousand', 'Earned your first 1,000 BTN', 'uncommon', 300)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  IF user_stats.total_earnings >= 10000 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'ten_thousand', 'Ten Thousand Club', 'Earned 10,000 BTN tokens', 'rare', 1000)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  -- Action Milestones
  IF user_stats.total_actions >= 100 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'action_hero', 'Action Hero', 'Performed 100 platform actions', 'common', 200)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  IF user_stats.total_actions >= 1000 THEN
    INSERT INTO public.user_achievements (user_id, achievement_id, achievement_name, achievement_description, rarity, points_awarded)
    VALUES (user_uuid, 'super_active', 'Super Active', 'Performed 1,000 platform actions', 'rare', 800)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

END;
$$;

-- Function to calculate user level based on reputation
CREATE OR REPLACE FUNCTION public.calculate_user_level(reputation INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Level calculation: Level = floor(sqrt(reputation / 100))
  RETURN GREATEST(1, FLOOR(SQRT(reputation / 100.0)));
END;
$$;

-- Function to update user level when reputation changes
CREATE OR REPLACE FUNCTION public.update_user_level()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.level = public.calculate_user_level(NEW.reputation_score);
  RETURN NEW;
END;
$$;

-- Create trigger for automatic level updates
CREATE TRIGGER on_reputation_change
  BEFORE UPDATE OF reputation_score ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_level();

-- Function to record user activity
CREATE OR REPLACE FUNCTION public.log_user_activity(
  p_user_id UUID,
  p_activity_type TEXT,
  p_activity_data JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.user_activity_logs (
    user_id,
    activity_type,
    activity_data,
    ip_address,
    user_agent
  )
  VALUES (
    p_user_id,
    p_activity_type,
    p_activity_data,
    p_ip_address,
    p_user_agent
  )
  RETURNING id INTO activity_id;

  RETURN activity_id;
END;
$$;

-- Function to get platform statistics
CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'active_miners', (SELECT COUNT(DISTINCT user_id) FROM public.mining_sessions WHERE session_start > NOW() - INTERVAL '24 hours'),
    'total_btn_mined', (SELECT COALESCE(SUM(btn_earned), 0) FROM public.mining_sessions),
    'total_nfts', (SELECT COUNT(*) FROM public.nfts),
    'total_transactions', (SELECT COUNT(*) FROM public.transactions),
    'active_proposals', (SELECT COUNT(*) FROM public.dao_proposals WHERE status = 'active'),
    'total_staked', (SELECT COALESCE(SUM(amount), 0) FROM public.user_stakes WHERE is_active = true),
    'platform_tvl', (SELECT COALESCE(SUM(total_liquidity), 0) FROM public.liquidity_pools)
  ) INTO stats;

  RETURN stats;
END;
$$;
