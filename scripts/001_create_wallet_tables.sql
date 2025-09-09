-- Create comprehensive user and wallet management tables

-- Users table (extends auth.users with profile data)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  website text,
  location text,
  reputation_score integer default 0,
  level integer default 1,
  total_earnings numeric default 0,
  mining_power integer default 100,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Wallets table for managing user crypto wallets
create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  wallet_address text not null,
  wallet_type text not null, -- 'ethereum', 'bitcoin', 'solana', etc.
  balance numeric default 0,
  is_primary boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Transactions table for tracking all wallet transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  wallet_id uuid references public.wallets(id) on delete cascade,
  transaction_hash text unique,
  transaction_type text not null, -- 'deposit', 'withdrawal', 'mining_reward', 'trade', 'stake'
  amount numeric not null,
  currency text not null,
  status text default 'pending', -- 'pending', 'confirmed', 'failed'
  block_number bigint,
  gas_fee numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Mining rewards table
create table if not exists public.mining_rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  amount numeric not null,
  currency text not null default 'BTN',
  mining_power_used integer not null,
  block_height bigint,
  reward_type text default 'block_reward', -- 'block_reward', 'transaction_fee', 'staking_reward'
  created_at timestamp with time zone default now()
);

-- Staking table
create table if not exists public.stakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  amount numeric not null,
  currency text not null default 'BTN',
  stake_duration integer not null, -- in days
  apy numeric not null,
  status text default 'active', -- 'active', 'completed', 'withdrawn'
  started_at timestamp with time zone default now(),
  ends_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.transactions enable row level security;
alter table public.mining_rewards enable row level security;
alter table public.stakes enable row level security;

-- RLS policies for profiles
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- RLS policies for wallets
create policy "wallets_select_own" on public.wallets for select using (auth.uid() = user_id);
create policy "wallets_insert_own" on public.wallets for insert with check (auth.uid() = user_id);
create policy "wallets_update_own" on public.wallets for update using (auth.uid() = user_id);
create policy "wallets_delete_own" on public.wallets for delete using (auth.uid() = user_id);

-- RLS policies for transactions
create policy "transactions_select_own" on public.transactions for select using (auth.uid() = user_id);
create policy "transactions_insert_own" on public.transactions for insert with check (auth.uid() = user_id);
create policy "transactions_update_own" on public.transactions for update using (auth.uid() = user_id);

-- RLS policies for mining rewards
create policy "mining_rewards_select_own" on public.mining_rewards for select using (auth.uid() = user_id);
create policy "mining_rewards_insert_own" on public.mining_rewards for insert with check (auth.uid() = user_id);

-- RLS policies for stakes
create policy "stakes_select_own" on public.stakes for select using (auth.uid() = user_id);
create policy "stakes_insert_own" on public.stakes for insert with check (auth.uid() = user_id);
create policy "stakes_update_own" on public.stakes for update using (auth.uid() = user_id);

-- Create indexes for better performance
create index if not exists idx_wallets_user_id on public.wallets(user_id);
create index if not exists idx_transactions_user_id on public.transactions(user_id);
create index if not exists idx_transactions_wallet_id on public.transactions(wallet_id);
create index if not exists idx_mining_rewards_user_id on public.mining_rewards(user_id);
create index if not exists idx_stakes_user_id on public.stakes(user_id);
