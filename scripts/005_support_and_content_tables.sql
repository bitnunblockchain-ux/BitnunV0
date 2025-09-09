-- Support, documentation, and content management tables

-- Support tickets
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  description text not null,
  category text not null, -- 'technical', 'billing', 'feature_request', 'bug_report'
  priority text default 'medium', -- 'low', 'medium', 'high', 'urgent'
  status text default 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  assigned_to uuid references public.profiles(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Support ticket messages
create table if not exists public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.support_tickets(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade,
  message text not null,
  is_internal boolean default false, -- for admin/staff notes
  created_at timestamp with time zone default now()
);

-- Documentation articles
create table if not exists public.docs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  category text not null, -- 'getting_started', 'api', 'trading', 'mining', 'governance'
  tags text[] default '{}',
  author_id uuid references public.profiles(id),
  is_published boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- FAQ entries
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null,
  order_index integer default 0,
  is_published boolean default true,
  view_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- News and announcements
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  featured_image text,
  author_id uuid references public.profiles(id),
  category text not null, -- 'announcement', 'update', 'partnership', 'technical'
  tags text[] default '{}',
  is_published boolean default false,
  is_featured boolean default false,
  view_count integer default 0,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null, -- 'info', 'success', 'warning', 'error'
  category text not null, -- 'system', 'trading', 'mining', 'governance'
  is_read boolean default false,
  action_url text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.support_tickets enable row level security;
alter table public.ticket_messages enable row level security;
alter table public.docs enable row level security;
alter table public.faqs enable row level security;
alter table public.news enable row level security;
alter table public.notifications enable row level security;

-- RLS policies for support tickets
create policy "support_tickets_select_own" on public.support_tickets for select using (auth.uid() = user_id);
create policy "support_tickets_insert_own" on public.support_tickets for insert with check (auth.uid() = user_id);
create policy "support_tickets_update_own" on public.support_tickets for update using (auth.uid() = user_id);

-- RLS policies for ticket messages
create policy "ticket_messages_select_own" on public.ticket_messages for select using (
  auth.uid() = sender_id or 
  auth.uid() in (select user_id from public.support_tickets where id = ticket_id)
);
create policy "ticket_messages_insert_own" on public.ticket_messages for insert with check (auth.uid() = sender_id);

-- Public read access for published content
create policy "docs_select_published" on public.docs for select using (is_published = true);
create policy "faqs_select_published" on public.faqs for select using (is_published = true);
create policy "news_select_published" on public.news for select using (is_published = true);

-- RLS policies for notifications
create policy "notifications_select_own" on public.notifications for select using (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications for update using (auth.uid() = user_id);

-- Indexes
create index if not exists idx_support_tickets_user_id on public.support_tickets(user_id);
create index if not exists idx_support_tickets_status on public.support_tickets(status);
create index if not exists idx_ticket_messages_ticket_id on public.ticket_messages(ticket_id);
create index if not exists idx_docs_category on public.docs(category);
create index if not exists idx_docs_slug on public.docs(slug);
create index if not exists idx_faqs_category on public.faqs(category);
create index if not exists idx_news_category on public.news(category);
create index if not exists idx_news_published_at on public.news(published_at);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_notifications_is_read on public.notifications(is_read);
