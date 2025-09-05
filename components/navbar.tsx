"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Wallet,
  ShoppingBag,
  Trophy,
  Code,
  Map,
  HelpCircle,
  Menu,
  X,
  Zap,
  Brain,
  Cable as Cube,
  TrendingUp,
  Vote,
  Building2,
  Users,
  BarChart3,
  User,
  Globe,
  Rocket,
  Download,
  MessageSquare,
  GitBranch,
  Megaphone,
  FileCode,
} from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMining, setIsMining] = useState(true)
  const [btnBalance] = useState(1247.89)

  const navItems = [
    { href: "/", label: "Dashboard", icon: Leaf, category: "core" },
    { href: "/trading", label: "DeFi Trading", icon: TrendingUp, category: "defi" },
    { href: "/launchpad", label: "Launchpad", icon: Rocket, category: "defi" },
    { href: "/governance", label: "DAO Governance", icon: Vote, category: "dao" },
    { href: "/bridge", label: "Cross-Chain", icon: Cube, category: "defi" },
    { href: "/ecosystem", label: "Ecosystem Hub", icon: Globe, category: "core" },
    { href: "/social", label: "Social Trading", icon: Users, category: "social" },
    { href: "/enterprise", label: "Enterprise", icon: Building2, category: "enterprise" },
    { href: "/analytics", label: "Analytics", icon: BarChart3, category: "tools" },
    { href: "/identity", label: "Identity", icon: User, category: "core" },
    { href: "/marketplace", label: "NFT Marketplace", icon: ShoppingBag, category: "nft" },
    { href: "/wallet", label: "Wallet", icon: Wallet, category: "core" },
    { href: "/gamification", label: "Gamification", icon: Trophy, category: "social" },
    { href: "/ai-insights", label: "AI Insights", icon: Brain, category: "ai" },
    { href: "/metaverse", label: "Metaverse", icon: Cube, category: "metaverse" },
    { href: "/sdk", label: "SDK & API", icon: Download, category: "dev" },
    { href: "/contracts", label: "Smart Contracts", icon: FileCode, category: "dev" },
    { href: "/community", label: "Community", icon: MessageSquare, category: "social" },
    { href: "/opensource", label: "Open Source", icon: GitBranch, category: "dev" },
    { href: "/marketing", label: "Marketing", icon: Megaphone, category: "business" },
    { href: "/developer", label: "Developer Portal", icon: Code, category: "dev" },
    { href: "/roadmap", label: "Roadmap", icon: Map, category: "info" },
    { href: "/faq", label: "FAQ", icon: HelpCircle, category: "info" },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      core: "from-primary to-accent",
      defi: "from-blue-400 to-cyan-500",
      dao: "from-purple-400 to-pink-500",
      social: "from-green-400 to-emerald-500",
      enterprise: "from-gray-400 to-slate-500",
      tools: "from-yellow-400 to-orange-500",
      nft: "from-pink-400 to-rose-500",
      ai: "from-violet-400 to-purple-500",
      metaverse: "from-indigo-400 to-blue-500",
      dev: "from-teal-400 to-cyan-500",
      business: "from-red-400 to-pink-500",
      info: "from-amber-400 to-yellow-500",
    }
    return colors[category as keyof typeof colors] || "from-primary to-accent"
  }

  return (
    <nav className="glass-effect border-b border-primary/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-shimmer bg-[length:200%_100%]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary group-hover:scale-110 transition-all duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BitnunEco
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Next-Gen Blockchain</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`p-1 rounded bg-gradient-to-r ${getCategoryColor(item.category)} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <div className="relative group">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Menu className="w-4 h-4 mr-1" />
                More
              </Button>
              <div className="absolute top-full right-0 mt-2 w-64 glass-effect border border-primary/20 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
                <div className="grid grid-cols-1 gap-1">
                  {navItems.slice(8).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/10 transition-colors group/item"
                    >
                      <div
                        className={`p-1 rounded bg-gradient-to-r ${getCategoryColor(item.category)} group-hover/item:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Mining Status */}
            <div className="flex items-center space-x-3 px-3 py-2 glass-effect rounded-lg border border-primary/20">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${isMining ? "bg-green-500" : "bg-gray-400"}`} />
                {isMining && (
                  <>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  </>
                )}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {isMining ? "Mining Active" : "Mining Inactive"}
              </span>
              <Zap className={`w-4 h-4 ${isMining ? "text-yellow-400 animate-pulse" : "text-gray-400"}`} />
            </div>

            {/* BTN Balance */}
            <Badge className="gradient-secondary glow-accent px-4 py-2 text-sm font-bold animate-pulse">
              <Wallet className="w-4 h-4 mr-2" />
              {btnBalance.toFixed(2)} BTN
            </Badge>

            {/* Connect Wallet Button */}
            <Button className="gradient-primary glow-primary hover:scale-105 transition-all duration-300 font-semibold shadow-xl">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Connected</span>
              </div>
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 hover:bg-primary/10 transition-all duration-300"
            >
              <div className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </div>
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary/20">
            <div className="glass-effect rounded-xl p-4 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(item.category)} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* Mobile Mining Status & Wallet */}
              <div className="pt-4 mt-4 border-t border-primary/20 space-y-3">
                <div className="flex items-center justify-between p-3 glass-effect rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${isMining ? "bg-green-500" : "bg-gray-400"}`} />
                      {isMining && <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {isMining ? "Mining Active" : "Mining Inactive"}
                    </span>
                  </div>
                  <Badge className="gradient-secondary font-bold">{btnBalance.toFixed(2)} BTN</Badge>
                </div>
                <Button className="w-full gradient-primary glow-primary font-semibold shadow-xl">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connected Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
