-- Trading and DeFi related tables

-- Trading pairs table
create table if not exists public.trading_pairs (
  id uuid primary key default gen_random_uuid(),
  base_currency text not null,
  quote_currency text not null,
  symbol text unique not null, -- e.g., 'BTC/USDT'
  price numeric not null default 0,
  volume_24h numeric default 0,
  change_24h numeric default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Trading orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  trading_pair_id uuid references public.trading_pairs(id) on delete cascade,
  order_type text not null, -- 'market', 'limit', 'stop_loss', 'take_profit'
  side text not null, -- 'buy', 'sell'
  amount numeric not null,
  price numeric, -- null for market orders
  filled_amount numeric default 0,
  status text default 'pending', -- 'pending', 'filled', 'cancelled', 'partially_filled'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Liquidity pools table
create table if not exists public.liquidity_pools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  token_a text not null,
  token_b text not null,
  reserve_a numeric default 0,
  reserve_b numeric default 0,
  total_liquidity numeric default 0,
  apy numeric default 0,
  fee_rate numeric default 0.003, -- 0.3% default
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User liquidity positions
create table if not exists public.liquidity_positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  pool_id uuid references public.liquidity_pools(id) on delete cascade,
  token_a_amount numeric not null,
  token_b_amount numeric not null,
  lp_tokens numeric not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.trading_pairs enable row level security;
alter table public.orders enable row level security;
alter table public.liquidity_pools enable row level security;
alter table public.liquidity_positions enable row level security;

-- RLS policies for orders (users can only see their own orders)
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders for insert with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders for update using (auth.uid() = user_id);

-- RLS policies for liquidity positions
create policy "liquidity_positions_select_own" on public.liquidity_positions for select using (auth.uid() = user_id);
create policy "liquidity_positions_insert_own" on public.liquidity_positions for insert with check (auth.uid() = user_id);
create policy "liquidity_positions_update_own" on public.liquidity_positions for update using (auth.uid() = user_id);

-- Public read access for trading pairs and liquidity pools
create policy "trading_pairs_select_all" on public.trading_pairs for select using (true);
create policy "liquidity_pools_select_all" on public.liquidity_pools for select using (true);

-- Indexes
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_trading_pair_id on public.orders(trading_pair_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_liquidity_positions_user_id on public.liquidity_positions(user_id);
create index if not exists idx_liquidity_positions_pool_id on public.liquidity_positions(pool_id);
