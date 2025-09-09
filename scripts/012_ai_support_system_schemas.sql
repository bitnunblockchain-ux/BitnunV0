-- AI-Powered Support System Database Schemas

-- Support Tickets Table (Enhanced)
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ticket_number TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technical', 'billing', 'mining', 'nft', 'trading', 'account', 'general')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_response', 'resolved', 'closed')),
  assigned_to UUID REFERENCES auth.users(id),
  ai_category_confidence NUMERIC(3,2) DEFAULT 0,
  ai_sentiment_score NUMERIC(3,2) DEFAULT 0,
  ai_suggested_response TEXT,
  resolution_time_minutes INTEGER,
  satisfaction_rating INTEGER CHECK (satisfaction_rating BETWEEN 1 AND 5),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Ticket Messages/Responses
CREATE TABLE IF NOT EXISTS ticket_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  is_ai_generated BOOLEAN DEFAULT false,
  ai_confidence NUMERIC(3,2),
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge Base Articles
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  helpful_votes INTEGER DEFAULT 0,
  unhelpful_votes INTEGER DEFAULT 0,
  ai_keywords TEXT[] DEFAULT '{}',
  search_vector tsvector,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Support Analytics
CREATE TABLE IF NOT EXISTS ai_support_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  total_tickets INTEGER DEFAULT 0,
  ai_resolved_tickets INTEGER DEFAULT 0,
  avg_resolution_time_minutes NUMERIC(10,2) DEFAULT 0,
  avg_satisfaction_rating NUMERIC(3,2) DEFAULT 0,
  common_issues JSONB DEFAULT '{}',
  ai_accuracy_rate NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date)
);

-- Support Agent Performance
CREATE TABLE IF NOT EXISTS agent_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  tickets_handled INTEGER DEFAULT 0,
  avg_resolution_time_minutes NUMERIC(10,2) DEFAULT 0,
  satisfaction_rating NUMERIC(3,2) DEFAULT 0,
  ai_assistance_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(agent_id, date)
);

-- Auto-generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TKT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('ticket_sequence')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS ticket_sequence START 1;

-- Trigger to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_number IS NULL THEN
    NEW.ticket_number := generate_ticket_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_ticket_number
  BEFORE INSERT ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION set_ticket_number();

-- Update search vector for knowledge base
CREATE OR REPLACE FUNCTION update_knowledge_base_search()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', NEW.title || ' ' || NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_kb_search
  BEFORE INSERT OR UPDATE ON knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_knowledge_base_search();

-- Enable RLS
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_support_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_performance ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own tickets" ON support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tickets" ON support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Agents can view assigned tickets" ON support_tickets FOR SELECT USING (auth.uid() = assigned_to);

CREATE POLICY "Users can view own ticket messages" ON ticket_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM support_tickets WHERE id = ticket_id AND user_id = auth.uid())
);
CREATE POLICY "Users can add messages to own tickets" ON ticket_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM support_tickets WHERE id = ticket_id AND user_id = auth.uid())
);

CREATE POLICY "Knowledge base is public" ON knowledge_base FOR SELECT USING (is_published = true);

-- Insert sample knowledge base articles
INSERT INTO knowledge_base (title, content, category, tags) VALUES
(
  'Getting Started with BitnunEco',
  'Welcome to BitnunEco! This guide will help you get started with our sustainable blockchain platform. First, create your account and connect your wallet. Then explore our Action Mining system to earn BTN tokens through eco-friendly activities.',
  'getting_started',
  ARRAY['beginner', 'setup', 'wallet', 'mining']
),
(
  'How Action Mining Works',
  'Action Mining is our revolutionary consensus mechanism that rewards productive actions instead of energy-intensive computations. You can earn BTN tokens by contributing to development, participating in governance, creating content, and helping community members.',
  'mining',
  ARRAY['mining', 'rewards', 'btn', 'consensus']
),
(
  'Wallet Connection Issues',
  'If you''re having trouble connecting your wallet, try these steps: 1) Clear your browser cache, 2) Disable ad blockers, 3) Make sure MetaMask is updated, 4) Switch to a supported network, 5) Refresh the page and try again.',
  'technical',
  ARRAY['wallet', 'metamask', 'connection', 'troubleshooting']
);
