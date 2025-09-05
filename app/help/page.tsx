"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Book,
  Video,
  Download,
  ExternalLink,
  Search,
  PlayCircle,
  FileText,
  Lightbulb,
  Zap,
  Wallet,
  Coins,
  Users,
  Shield,
} from "lucide-react"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of BitnunEco",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      articles: [
        "Creating Your First Wallet",
        "Understanding Action Mining",
        "Platform Navigation Guide",
        "Setting Up Your Profile",
      ],
    },
    {
      title: "Mining & Rewards",
      description: "Maximize your BTN earnings",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      articles: [
        "Action Mining Explained",
        "Reward Calculation System",
        "VR/AR Mining Bonuses",
        "Mining Optimization Tips",
      ],
    },
    {
      title: "Wallet Management",
      description: "Secure and manage your assets",
      icon: Wallet,
      color: "from-blue-500 to-cyan-500",
      articles: [
        "Wallet Security Best Practices",
        "Backup and Recovery",
        "Transaction Management",
        "Multi-Device Sync",
      ],
    },
    {
      title: "Trading & DeFi",
      description: "Navigate our DeFi ecosystem",
      icon: Coins,
      color: "from-emerald-500 to-teal-500",
      articles: ["DEX Trading Guide", "Liquidity Pool Participation", "Staking Rewards", "Cross-Chain Bridges"],
    },
    {
      title: "NFT Marketplace",
      description: "Create and trade NFTs",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
      articles: ["Creating Your First NFT", "Marketplace Navigation", "Royalty Settings", "Collection Management"],
    },
    {
      title: "Community & DAO",
      description: "Participate in governance",
      icon: Users,
      color: "from-pink-500 to-red-500",
      articles: ["DAO Voting Process", "Proposal Creation", "Community Guidelines", "Governance Tokens"],
    },
  ]

  const videoTutorials = [
    {
      title: "BitnunEco Platform Overview",
      duration: "5:32",
      views: "12.4K",
      thumbnail: "/video-thumb-1.jpg",
    },
    {
      title: "Action Mining Deep Dive",
      duration: "8:15",
      views: "9.8K",
      thumbnail: "/video-thumb-2.jpg",
    },
    {
      title: "Creating Your First NFT",
      duration: "6:45",
      views: "7.2K",
      thumbnail: "/video-thumb-3.jpg",
    },
    {
      title: "VR Mining Experience",
      duration: "4:20",
      views: "15.6K",
      thumbnail: "/video-thumb-4.jpg",
    },
  ]

  const quickGuides = [
    {
      title: "5-Minute Quick Start",
      description: "Get up and running in minutes",
      icon: Zap,
      steps: 5,
    },
    {
      title: "Wallet Setup Guide",
      description: "Secure wallet configuration",
      icon: Shield,
      steps: 3,
    },
    {
      title: "First Mining Session",
      description: "Start earning BTN tokens",
      icon: Coins,
      steps: 4,
    },
    {
      title: "NFT Creation Basics",
      description: "Mint your first NFT",
      icon: FileText,
      steps: 6,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Book className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Help Center
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive guides, tutorials, and documentation to help you master BitnunEco
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search help articles, guides, and tutorials..."
              className="pl-12 h-14 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Quick Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Quick Start Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickGuides.map((guide, index) => (
              <Card
                key={index}
                className="glass-effect futuristic-border group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <guide.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{guide.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{guide.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {guide.steps} steps
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="glass-effect futuristic-border group hover:scale-105 transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{category.title}</CardTitle>
                  <CardDescription className="text-slate-300">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <div
                        key={articleIndex}
                        className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white cursor-pointer transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{article}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-slate-600 text-slate-300 hover:text-white bg-transparent"
                  >
                    View All Articles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Video Tutorials</h2>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Videos
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video, index) => (
              <Card
                key={index}
                className="glass-effect futuristic-border group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-lg flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/50 text-white">{video.duration}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-slate-400 text-sm">{video.views} views</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Downloads & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="glass-effect futuristic-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Downloads & Resources</span>
              </CardTitle>
              <CardDescription className="text-slate-300">
                Essential files and documentation for developers and users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">API Documentation</h4>
                  <p className="text-slate-400 text-sm">Complete API reference guide</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">SDK Package</h4>
                  <p className="text-slate-400 text-sm">JavaScript SDK for developers</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  ZIP
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">User Manual</h4>
                  <p className="text-slate-400 text-sm">Comprehensive user guide</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect futuristic-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Video className="w-5 h-5" />
                <span>Learning Paths</span>
              </CardTitle>
              <CardDescription className="text-slate-300">
                Structured learning journeys for different user types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Beginner Path</h4>
                <p className="text-slate-400 text-sm mb-3">Perfect for newcomers to blockchain</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full w-1/3"></div>
                  </div>
                  <span className="text-xs text-slate-400">3/9</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Advanced User</h4>
                <p className="text-slate-400 text-sm mb-3">For experienced crypto users</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-2/3"></div>
                  </div>
                  <span className="text-xs text-slate-400">4/6</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Developer Track</h4>
                <p className="text-slate-400 text-sm mb-3">Build on BitnunEco platform</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-1/2"></div>
                  </div>
                  <span className="text-xs text-slate-400">6/12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
