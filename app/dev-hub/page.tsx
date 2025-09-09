import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import Link from "next/link"
import {
  ArrowRight,
  Brain,
  Cloud,
  Palette,
  Rocket,
  Users,
  Globe,
  Zap,
  Terminal,
  GitBranch,
  Database,
} from "lucide-react"

export default function DevHubPage() {
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
                COMPLETE DEVELOPMENT PLATFORM
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 text-balance animate-float">
                BUILD <span className="gradient-primary bg-clip-text text-transparent neon-glow">ANYTHING</span>
                <br />
                WITH AI
              </h1>

              <p className="text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto text-pretty">
                Complete development hub with AI-powered code generation, cloud IDE, template marketplace, and
                deployment automation. Everything you need to build the future.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link href="/dev-hub/generate">
                  <button className="btn-neon group">
                    START GENERATING CODE
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/dev-hub/templates">
                  <button className="btn-outline">BROWSE TEMPLATES</button>
                </Link>
              </div>
            </div>
          </section>

          {/* Development Tools */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6 text-balance">
                  DEVELOPMENT <span className="gradient-secondary bg-clip-text text-transparent">TOOLS</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                  Professional development environment with AI assistance and cloud infrastructure
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link href="/dev-hub/generate" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">AI CODE GENERATION</h3>
                    <p className="text-muted-foreground mb-6">
                      Generate components, APIs, and full applications with AI assistance
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      GENERATE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/cloud-ide" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
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
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">TEMPLATE MARKETPLACE</h3>
                    <p className="text-muted-foreground mb-6">
                      Thousands of templates and components for rapid development
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      BROWSE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/deploy" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">DEPLOYMENT</h3>
                    <p className="text-muted-foreground mb-6">
                      One-click deployment to Vercel, AWS, and blockchain networks
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      DEPLOY <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/collaborate" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">COLLABORATION</h3>
                    <p className="text-muted-foreground mb-6">
                      Real-time collaboration with team workspaces and version control
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      COLLABORATE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/dev-hub/web3" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">WEB3 TOOLS</h3>
                    <p className="text-muted-foreground mb-6">
                      Smart contract development, DeFi protocols, and NFT creation
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      BUILD <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6">
                  POWERFUL <span className="gradient-primary bg-clip-text text-transparent">FEATURES</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Everything you need for modern development workflows
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="glass-effect p-8 rounded-2xl blockchain-card text-center">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 glow-primary">
                    <Terminal className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">INTEGRATED TERMINAL</h3>
                  <p className="text-muted-foreground">Full terminal access with package management and CLI tools</p>
                </div>

                <div className="glass-effect p-8 rounded-2xl blockchain-card text-center">
                  <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 glow-accent">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">VERSION CONTROL</h3>
                  <p className="text-muted-foreground">Git integration with branching, merging, and collaboration</p>
                </div>

                <div className="glass-effect p-8 rounded-2xl blockchain-card text-center">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 glow-primary">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">DATABASE TOOLS</h3>
                  <p className="text-muted-foreground">Visual database management and query builder</p>
                </div>

                <div className="glass-effect p-8 rounded-2xl blockchain-card text-center">
                  <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 glow-accent">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">INSTANT PREVIEW</h3>
                  <p className="text-muted-foreground">Real-time preview with hot reload and live updates</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-6xl font-black text-foreground mb-8 animate-float">
                START <span className="gradient-secondary bg-clip-text text-transparent">BUILDING</span> TODAY
              </h2>
              <p className="text-2xl text-muted-foreground mb-12">
                Join thousands of developers using our AI-powered development platform
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/dev-hub/generate">
                  <button className="btn-neon group">
                    GENERATE CODE NOW
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/docs">
                  <button className="btn-outline">VIEW DOCUMENTATION</button>
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
