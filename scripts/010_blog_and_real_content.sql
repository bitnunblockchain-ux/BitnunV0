-- Create blog articles table and insert real content
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived'))
);

-- Insert real blog articles
INSERT INTO blog_articles (title, slug, excerpt, content, author_name, category, tags, read_time) VALUES
(
  'The Future of Sustainable Blockchain: Action Mining Revolution',
  'action-mining-revolution',
  'Discover how BitnunEco''s Action Mining technology is transforming blockchain sustainability by eliminating energy consumption while maintaining security and decentralization.',
  '# The Future of Sustainable Blockchain: Action Mining Revolution

The blockchain industry has long grappled with the environmental impact of traditional mining methods. Bitcoin''s proof-of-work consensus mechanism, while secure, consumes enormous amounts of energy. Ethereum''s transition to proof-of-stake was a step in the right direction, but BitnunEco takes sustainability even further with our revolutionary Action Mining technology.

## What is Action Mining?

Action Mining is a groundbreaking consensus mechanism that rewards users for productive actions within the ecosystem rather than computational work. Instead of solving arbitrary mathematical puzzles, users earn BTN tokens by:

- Contributing to the development ecosystem
- Participating in governance decisions  
- Creating valuable content and tutorials
- Building applications and smart contracts
- Helping other community members

## Environmental Impact

Traditional blockchain mining consumes approximately 150 TWh annually - more than entire countries. Action Mining eliminates this energy consumption entirely by running natively in web browsers without requiring specialized hardware or energy-intensive computations.

## Security and Decentralization

Despite eliminating energy consumption, Action Mining maintains the security and decentralization principles that make blockchain technology valuable. Our browser-native nodes create a truly distributed network where every user contributes to network security through their participation.

## The Future is Here

BitnunEco''s Action Mining represents the next evolution of blockchain technology - one that prioritizes sustainability without compromising on security or functionality. Join us in building a more sustainable future for Web3.',
  'BitnunEco Team',
  'Technology',
  ARRAY['blockchain', 'sustainability', 'action-mining', 'web3'],
  8
),
(
  'Building Web3 Applications with Zero Environmental Impact',
  'zero-impact-web3-development',
  'Learn how developers can create powerful DeFi applications, NFT marketplaces, and DAO governance systems using our browser-native blockchain platform.',
  '# Building Web3 Applications with Zero Environmental Impact

The Web3 revolution is here, but it doesn''t have to come at the cost of our planet. BitnunEco''s development platform enables developers to build sophisticated blockchain applications with zero environmental impact.

## Browser-Native Development

Our platform runs entirely in web browsers, eliminating the need for:
- Energy-intensive mining operations
- Specialized hardware requirements
- Complex node setup and maintenance
- High transaction fees

## Development Tools

BitnunEco provides a comprehensive suite of development tools:

### AI-Powered Code Generation
Generate smart contracts, DeFi protocols, and frontend components using our advanced AI assistant.

### Template Marketplace
Access hundreds of pre-built templates for common Web3 use cases:
- DeFi trading platforms
- NFT marketplaces
- DAO governance systems
- Gaming applications

### Cloud IDE
Develop, test, and deploy applications directly in your browser with our cloud-based development environment.

## Real-World Applications

Developers are already building amazing applications on BitnunEco:
- Sustainable DeFi protocols with automated yield farming
- Carbon-neutral NFT marketplaces
- Community-driven governance platforms
- Educational Web3 games

## Getting Started

Ready to build the future of sustainable Web3? Visit our development hub at bitnun.org/dev-hub and start building today.',
  'Dev Team',
  'Development',
  ARRAY['web3', 'development', 'defi', 'nft', 'sustainability'],
  10
);

-- Enable RLS
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Blog articles are viewable by everyone" ON blog_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Only authenticated users can create articles" ON blog_articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Update contact information across the platform
UPDATE docs SET content = REPLACE(content, 'support@example.com', 'support@bitnun.org');
UPDATE docs SET content = REPLACE(content, 'contact@example.com', 'contact@bitnun.org');
UPDATE faqs SET answer = REPLACE(answer, 'support@example.com', 'support@bitnun.org');
UPDATE support_tickets SET metadata = jsonb_set(
  COALESCE(metadata, '{}'),
  '{contact_email}',
  '"support@bitnun.org"'
);
