-- Developer tools and governance tables

-- API keys for developers
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  key_name text not null,
  api_key text unique not null,
  api_secret text not null,
  permissions jsonb default '[]'::jsonb, -- array of permissions
  rate_limit integer default 1000, -- requests per hour
  is_active boolean default true,
  last_used_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

-- API usage tracking
create table if not exists public.api_usage (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid references public.api_keys(id) on delete cascade,
  endpoint text not null,
  method text not null,
  status_code integer not null,
  response_time_ms integer,
  created_at timestamp with time zone default now()
);

-- Governance proposals
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  proposer_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  proposal_type text not null, -- 'parameter_change', 'feature_request', 'treasury_spend'
  voting_power_required numeric default 1000,
  status text default 'active', -- 'active', 'passed', 'rejected', 'executed'
  votes_for numeric default 0,
  votes_against numeric default 0,
  voting_ends_at timestamp with time zone not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Governance votes
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete cascade,
  voter_id uuid references public.profiles(id) on delete cascade,
  vote text not null, -- 'for', 'against', 'abstain'
  voting_power numeric not null,
  created_at timestamp with time zone default now(),
  unique(proposal_id, voter_id)
);

-- Bot configurations
create table if not exists public.bot_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  bot_name text not null,
  bot_type text not null, -- 'trading', 'arbitrage', 'grid', 'dca'
  config jsonb not null default '{}'::jsonb,
  is_active boolean default false,
  performance_stats jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Bot execution logs
create table if not exists public.bot_logs (
  id uuid primary key default gen_random_uuid(),
  bot_config_id uuid references public.bot_configs(id) on delete cascade,
  action text not null,
  result jsonb,
  success boolean not null,
  error_message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.api_keys enable row level security;
alter table public.api_usage enable row level security;
alter table public.proposals enable row level security;
alter table public.votes enable row level security;
alter table public.bot_configs enable row level security;
alter table public.bot_logs enable row level security;

-- RLS policies for API keys
create policy "api_keys_select_own" on public.api_keys for select using (auth.uid() = user_id);
create policy "api_keys_insert_own" on public.api_keys for insert with check (auth.uid() = user_id);
create policy "api_keys_update_own" on public.api_keys for update using (auth.uid() = user_id);
create policy "api_keys_delete_own" on public.api_keys for delete using (auth.uid() = user_id);

-- RLS policies for API usage
create policy "api_usage_select_own" on public.api_usage for select using (
  auth.uid() in (select user_id from public.api_keys where id = api_key_id)
);

-- Public read access for proposals
create policy "proposals_select_all" on public.proposals for select using (true);
create policy "proposals_insert_authenticated" on public.proposals for insert with check (auth.uid() = proposer_id);

-- RLS policies for votes
create policy "votes_select_all" on public.votes for select using (true);
create policy "votes_insert_own" on public.votes for insert with check (auth.uid() = voter_id);

-- RLS policies for bot configs
create policy "bot_configs_select_own" on public.bot_configs for select using (auth.uid() = user_id);
create policy "bot_configs_insert_own" on public.bot_configs for insert with check (auth.uid() = user_id);
create policy "bot_configs_update_own" on public.bot_configs for update using (auth.uid() = user_id);
create policy "bot_configs_delete_own" on public.bot_configs for delete using (auth.uid() = user_id);

-- RLS policies for bot logs
create policy "bot_logs_select_own" on public.bot_logs for select using (
  auth.uid() in (select user_id from public.bot_configs where id = bot_config_id)
);

-- Indexes
create index if not exists idx_api_keys_user_id on public.api_keys(user_id);
create index if not exists idx_api_usage_api_key_id on public.api_usage(api_key_id);
create index if not exists idx_proposals_status on public.proposals(status);
create index if not exists idx_votes_proposal_id on public.votes(proposal_id);
create index if not exists idx_bot_configs_user_id on public.bot_configs(user_id);
create index if not exists idx_bot_logs_bot_config_id on public.bot_logs(bot_config_id);
