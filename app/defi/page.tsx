import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import Link from "next/link"
import { ArrowRight, TrendingUp, Layers, Coins, Zap, Shield, BarChart3, RefreshCw, Target, Globe } from "lucide-react"

export default function DeFiPage() {
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
                DECENTRALIZED FINANCE ECOSYSTEM
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 text-balance animate-float">
                DEFI <span className="gradient-primary bg-clip-text text-transparent neon-glow">REIMAGINED</span>
                <br />
                FOR EVERYONE
              </h1>

              <p className="text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto text-pretty">
                Complete DeFi ecosystem with liquidity pools, yield farming, lending protocols, and advanced trading
                features. Earn, trade, and grow your crypto portfolio.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link href="/defi/liquidity">
                  <button className="btn-neon group">
                    START EARNING
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/trading-hub">
                  <button className="btn-outline">TRADE NOW</button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">$2.1B+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Value Locked</div>
                </div>
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">45%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Max APY</div>
                </div>
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">500K+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Active Users</div>
                </div>
                <div className="glass-effect p-6 rounded-xl blockchain-card">
                  <div className="text-4xl font-black text-accent mb-2 animate-shimmer">0.05%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Trading Fees</div>
                </div>
              </div>
            </div>
          </section>

          {/* DeFi Products */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-foreground mb-6 text-balance">
                  DEFI <span className="gradient-secondary bg-clip-text text-transparent">PRODUCTS</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                  Comprehensive suite of DeFi products for earning, trading, and managing your crypto assets
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link href="/defi/liquidity" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Layers className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">LIQUIDITY POOLS</h3>
                    <p className="text-muted-foreground mb-6">
                      Provide liquidity and earn fees from trading pairs with competitive APY
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      EARN FEES <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/defi/lending" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">LENDING & BORROWING</h3>
                    <p className="text-muted-foreground mb-6">
                      Lend your assets to earn interest or borrow against your collateral
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      LEND NOW <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/staking-rewards" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">YIELD FARMING</h3>
                    <p className="text-muted-foreground mb-6">
                      Stake LP tokens in farms to earn additional rewards and tokens
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      FARM YIELD <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/trading-hub" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">DEX TRADING</h3>
                    <p className="text-muted-foreground mb-6">
                      Trade tokens directly with automated market makers and low fees
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      TRADE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/bridge" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 glow-primary">
                      <RefreshCw className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">CROSS-CHAIN BRIDGE</h3>
                    <p className="text-muted-foreground mb-6">
                      Bridge assets between different blockchains seamlessly and securely
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      BRIDGE <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link href="/portfolio" className="group">
                  <div className="glass-effect p-8 rounded-2xl blockchain-card h-full">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 glow-accent">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">PORTFOLIO TRACKER</h3>
                    <p className="text-muted-foreground mb-6">
                      Track your DeFi positions, yields, and performance across protocols
                    </p>
                    <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                      TRACK <ArrowRight className="ml-2 w-4 h-4" />
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
                  WHY CHOOSE <span className="gradient-primary bg-clip-text text-transparent">OUR DEFI</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Built for security, efficiency, and maximum returns
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="glass-effect p-10 rounded-2xl blockchain-card text-center">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 glow-primary animate-pulse-glow">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">LOWEST FEES</h3>
                  <p className="text-lg text-muted-foreground">
                    Industry-leading low fees with 0.05% trading fees and optimized gas costs
                  </p>
                </div>

                <div className="glass-effect p-10 rounded-2xl blockchain-card text-center">
                  <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-8 glow-accent animate-pulse-glow">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">BATTLE-TESTED SECURITY</h3>
                  <p className="text-lg text-muted-foreground">
                    Audited smart contracts with insurance coverage and real-time monitoring
                  </p>
                </div>

                <div className="glass-effect p-10 rounded-2xl blockchain-card text-center">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 glow-primary animate-pulse-glow">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">MULTI-CHAIN SUPPORT</h3>
                  <p className="text-lg text-muted-foreground">
                    Access DeFi across multiple blockchains with seamless cross-chain operations
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 circuit-pattern">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-6xl font-black text-foreground mb-8 animate-float">
                START <span className="gradient-secondary bg-clip-text text-transparent">EARNING</span> TODAY
              </h2>
              <p className="text-2xl text-muted-foreground mb-12">
                Join the DeFi revolution and maximize your crypto returns
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/defi/liquidity">
                  <button className="btn-neon group">
                    PROVIDE LIQUIDITY
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/defi/lending">
                  <button className="btn-outline">START LENDING</button>
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
