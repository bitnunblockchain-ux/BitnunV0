import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import Link from "next/link"
import {
  ArrowRight,
  Zap,
  Shield,
  Leaf,
  TrendingUp,
  Users,
  Code,
  Coins,
  Bot,
  Cloud,
  Cpu,
  Layers,
  Palette,
  Briefcase,
  BookOpen,
  MessageSquare,
  Settings,
  Globe,
  Rocket,
  Brain,
  Workflow,
  Server,
  Activity,
} from "lucide-react"

export default function LandingPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background dark">
        <Navbar />

        <main className="relative overflow-hidden">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 grid-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"></div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect text-accent text-sm font-bold mb-8 animate-neon-pulse">
                <span className="w-3 h-3 bg-accent rounded-full mr-3 animate-pulse"></span>
                COMPLETE BLOCKCHAIN ECOSYSTEM & DEVELOPMENT PLATFORM
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 text-balance animate-float">
                BUILD THE <span className="gradient-primary bg-clip-text text-transparent neon-glow">FUTURE</span>
                <br />
                OF WEB3
              </h1>

              <p className="text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto text-pretty">
                Complete blockchain platform with AI-powered development tools, multi-node infrastructure, real-time
                collaboration, and comprehensive Web3 features. Everything you need to build, deploy, and scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link href="/dev-hub">
                  <button className="btn-neon group">
                    START BUILDING NOW
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="btn-outline">EXPLORE PLATFORM</button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">$2.1B+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Value Locked</div>
                </div>
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">150K+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Active Developers</div>
                </div>
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">99.9%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Platform Uptime</div>
                </div>
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">24/7</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">AI Assistant</div>
                </div>
              </div>
            </div>
          </section>

          {/* Development Hub Section */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6 text-balance">
                  COMPLETE <span className="gradient-secondary bg-clip-text text-transparent">DEVELOPMENT HUB</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                  AI-powered development platform with code generation, cloud IDE, and deployment automation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <Link href="/dev-hub" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">DEV HUB</h3>
                    <p className="text-muted-foreground mb-6">
                      Complete development environment with project management and deployment
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      BUILD <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/generate" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">AI CODEGEN</h3>
                    <p className="text-muted-foreground mb-6">
                      AI-powered code generation with real-time preview and editing
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      GENERATE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/cloud-ide" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">CLOUD IDE</h3>
                    <p className="text-muted-foreground mb-6">
                      Browser-based development environment with real-time collaboration
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      CODE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/templates" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">TEMPLATES</h3>
                    <p className="text-muted-foreground mb-6">Marketplace with thousands of templates and components</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      BROWSE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Web3 & Blockchain Features */}
          <section className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6">
                  WEB3 <span className="gradient-primary bg-clip-text text-transparent">ECOSYSTEM</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Complete blockchain platform with DeFi, NFTs, governance, and multi-chain support
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                <Link href="/trading-hub" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">TRADING</h3>
                    <p className="text-muted-foreground mb-6">Advanced DEX with spot, futures, and options trading</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      TRADE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/defi/liquidity" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Layers className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">DEFI</h3>
                    <p className="text-muted-foreground mb-6">Liquidity pools, yield farming, and lending protocols</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      EARN <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/staking-rewards" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">STAKING</h3>
                    <p className="text-muted-foreground mb-6">Secure the network and earn rewards through staking</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      STAKE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/mining" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">MINING</h3>
                    <p className="text-muted-foreground mb-6">Action mining, VR mining, and pool mining rewards</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      MINE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/community-governance" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">GOVERNANCE</h3>
                    <p className="text-muted-foreground mb-6">DAO governance with proposals and community voting</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      VOTE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Cloud Infrastructure & Nodes */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 grid-pattern">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6">
                  CLOUD <span className="gradient-secondary bg-clip-text text-transparent">INFRASTRUCTURE</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Multi-node blockchain network with global distribution and enterprise-grade reliability
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Link href="/nodes" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Server className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">NODES</h3>
                    <p className="text-muted-foreground mb-6">
                      Global node network with real-time monitoring and management
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      MONITOR <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/deploy" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">DEPLOY</h3>
                    <p className="text-muted-foreground mb-6">
                      One-click deployment to Vercel, AWS, and blockchain networks
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      DEPLOY <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/analytics-dashboard" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">ANALYTICS</h3>
                    <p className="text-muted-foreground mb-6">
                      Real-time analytics and performance monitoring dashboard
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      ANALYZE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/security-center" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">SECURITY</h3>
                    <p className="text-muted-foreground mb-6">Advanced security monitoring and threat detection</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      SECURE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* AI & Automation */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6">
                  AI & <span className="gradient-primary bg-clip-text text-transparent">AUTOMATION</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Intelligent automation tools and AI-powered features for enhanced productivity
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link href="/ai-assistant" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary animate-pulse-glow">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">AI ASSISTANT</h3>
                    <p className="text-muted-foreground mb-6">
                      Intelligent blockchain companion for trading, analysis, and development
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      CHAT <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/bots" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Workflow className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">BOT SYSTEM</h3>
                    <p className="text-muted-foreground mb-6">
                      Automated trading, mining, and portfolio management bots
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      AUTOMATE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/automation" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">AUTOMATION</h3>
                    <p className="text-muted-foreground mb-6">Smart contracts and automated workflow management</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      CONFIGURE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Platform Features */}
          <section className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6">
                  PLATFORM <span className="gradient-secondary bg-clip-text text-transparent">FEATURES</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Complete ecosystem with documentation, support, and community features
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Link href="/docs" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">DOCS</h3>
                    <p className="text-muted-foreground mb-6">Comprehensive documentation and developer guides</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      READ <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/portfolio" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">PORTFOLIO</h3>
                    <p className="text-muted-foreground mb-6">Advanced portfolio management and analytics</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      MANAGE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/support" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">SUPPORT</h3>
                    <p className="text-muted-foreground mb-6">24/7 support with ticketing and live chat</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      HELP <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/whitepaper" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">WHITEPAPER</h3>
                    <p className="text-muted-foreground mb-6">Technical architecture and business model overview</p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      LEARN <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Core Infrastructure */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 grid-pattern">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6">
                  BUILT FOR <span className="gradient-primary bg-clip-text text-transparent">SCALE</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Enterprise-grade infrastructure designed for the next generation of blockchain applications
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="glass-effect p-10 rounded-2xl blockchain-card text-center">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 glow-primary animate-pulse-glow">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">LIGHTNING FAST</h3>
                  <p className="text-lg text-muted-foreground">
                    Multi-node architecture with sub-second finality and unlimited scalability
                  </p>
                </div>

                <div className="glass-effect p-10 rounded-2xl blockchain-card text-center">
                  <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-8 glow-accent animate-pulse-glow">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">SECURE BY DESIGN</h3>
                  <p className="text-lg text-muted-foreground">
                    Military-grade encryption with real-time threat detection and automated security
                  </p>
                </div>

                <div className="glass-effect p-10 rounded-2xl blockchain-card text-center">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 glow-primary animate-pulse-glow">
                    <Leaf className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">SUSTAINABLE</h3>
                  <p className="text-lg text-muted-foreground">
                    Carbon-neutral operations with energy-efficient consensus and green mining
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-6xl font-black text-foreground mb-8 animate-float">
                READY TO BUILD THE <span className="gradient-secondary bg-clip-text text-transparent">FUTURE?</span>
              </h2>
              <p className="text-2xl text-muted-foreground mb-12">
                Join thousands of developers building the next generation of Web3 applications
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/dev-hub">
                  <button className="btn-neon group">
                    START BUILDING NOW
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="btn-outline">EXPLORE PLATFORM</button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}
