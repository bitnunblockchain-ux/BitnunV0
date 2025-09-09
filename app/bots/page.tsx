"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Plus,
  Play,
  Pause,
  Settings,
  TrendingUp,
  DollarSign,
  Zap,
  Shield,
  Search,
  Star,
  Download,
  Eye,
  BarChart3,
} from "lucide-react"

interface BotData {
  id: string
  name: string
  type: "trading" | "mining" | "arbitrage" | "portfolio" | "defi"
  status: "active" | "paused" | "stopped"
  performance: number
  profit: number
  trades: number
  winRate: number
  creator: string
  rating: number
  downloads: number
  price: number
}

export default function BotsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [myBots, setMyBots] = useState<BotData[]>([])
  const [marketplaceBots, setMarketplaceBots] = useState<BotData[]>([])

  useEffect(() => {
    // Initialize with sample data
    setMyBots([
      {
        id: "1",
        name: "BTN Scalper Pro",
        type: "trading",
        status: "active",
        performance: 15.2,
        profit: 1247.5,
        trades: 342,
        winRate: 68.5,
        creator: "You",
        rating: 4.8,
        downloads: 0,
        price: 0,
      },
      {
        id: "2",
        name: "Mining Optimizer",
        type: "mining",
        status: "active",
        performance: 23.1,
        profit: 892.3,
        trades: 0,
        winRate: 0,
        creator: "You",
        rating: 4.6,
        downloads: 0,
        price: 0,
      },
      {
        id: "3",
        name: "DeFi Yield Hunter",
        type: "defi",
        status: "paused",
        performance: 8.7,
        profit: 456.8,
        trades: 89,
        winRate: 72.1,
        creator: "You",
        rating: 4.2,
        downloads: 0,
        price: 0,
      },
    ])

    setMarketplaceBots([
      {
        id: "m1",
        name: "Arbitrage Master",
        type: "arbitrage",
        status: "stopped",
        performance: 28.5,
        profit: 0,
        trades: 0,
        winRate: 84.2,
        creator: "CryptoBot Labs",
        rating: 4.9,
        downloads: 15420,
        price: 49.99,
      },
      {
        id: "m2",
        name: "Grid Trading Bot",
        type: "trading",
        status: "stopped",
        performance: 19.3,
        profit: 0,
        trades: 0,
        winRate: 76.8,
        creator: "TradingAI",
        rating: 4.7,
        downloads: 8930,
        price: 29.99,
      },
      {
        id: "m3",
        name: "Portfolio Rebalancer",
        type: "portfolio",
        status: "stopped",
        performance: 12.4,
        profit: 0,
        trades: 0,
        winRate: 0,
        creator: "DeFi Solutions",
        rating: 4.5,
        downloads: 5670,
        price: 19.99,
      },
    ])
  }, [])

  const getBotTypeColor = (type: string) => {
    switch (type) {
      case "trading":
        return "bg-blue-600"
      case "mining":
        return "bg-green-600"
      case "arbitrage":
        return "bg-purple-600"
      case "portfolio":
        return "bg-orange-600"
      case "defi":
        return "bg-pink-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "paused":
        return "bg-yellow-600"
      case "stopped":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bot System
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Create, deploy, and manage automated trading bots, mining optimizers, and DeFi strategies
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Bots</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {myBots.filter((bot) => bot.status === "active").length}
              </div>
              <p className="text-xs text-gray-400">{myBots.length} total bots</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${myBots.reduce((sum, bot) => sum + bot.profit, 0).toFixed(2)}
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+12.5%</span> this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {myBots.length > 0
                  ? (myBots.reduce((sum, bot) => sum + bot.performance, 0) / myBots.length).toFixed(1)
                  : 0}
                %
              </div>
              <p className="text-xs text-gray-400">Monthly return</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Win Rate</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {myBots.filter((bot) => bot.winRate > 0).length > 0
                  ? (
                      myBots.filter((bot) => bot.winRate > 0).reduce((sum, bot) => sum + bot.winRate, 0) /
                      myBots.filter((bot) => bot.winRate > 0).length
                    ).toFixed(1)
                  : 0}
                %
              </div>
              <p className="text-xs text-gray-400">Average success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="my-bots" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="my-bots">My Bots</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="create">Create Bot</TabsTrigger>
          </TabsList>

          <TabsContent value="my-bots" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">My Bots</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New Bot
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBots.map((bot) => (
                <Card key={bot.id} className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{bot.name}</CardTitle>
                      <Badge className={getStatusColor(bot.status)}>{bot.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getBotTypeColor(bot.type)}>{bot.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-400">{bot.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Performance:</span>
                        <p className="text-white font-medium">{bot.performance}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Profit:</span>
                        <p className="text-green-400 font-medium">${bot.profit}</p>
                      </div>
                      {bot.trades > 0 && (
                        <>
                          <div>
                            <span className="text-gray-400">Trades:</span>
                            <p className="text-white font-medium">{bot.trades}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Win Rate:</span>
                            <p className="text-white font-medium">{bot.winRate}%</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                      >
                        {bot.status === "active" ? (
                          <Pause className="h-3 w-3 mr-1" />
                        ) : (
                          <Play className="h-3 w-3 mr-1" />
                        )}
                        {bot.status === "active" ? "Pause" : "Start"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                      >
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Bot Marketplace</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search bots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="trading">Trading</option>
                  <option value="mining">Mining</option>
                  <option value="arbitrage">Arbitrage</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="defi">DeFi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceBots.map((bot) => (
                <Card key={bot.id} className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{bot.name}</CardTitle>
                      <Badge className="bg-primary">${bot.price}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getBotTypeColor(bot.type)}>{bot.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-400">{bot.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">by {bot.creator}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Performance:</span>
                        <p className="text-white font-medium">{bot.performance}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Downloads:</span>
                        <p className="text-white font-medium">{bot.downloads.toLocaleString()}</p>
                      </div>
                      {bot.winRate > 0 && (
                        <div className="col-span-2">
                          <span className="text-gray-400">Win Rate:</span>
                          <p className="text-white font-medium">{bot.winRate}%</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <Download className="h-3 w-3 mr-1" />
                        Purchase
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Create New Bot</CardTitle>
                <CardDescription className="text-gray-400">
                  Build custom trading bots, mining optimizers, and automation strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Trading Bot",
                      description: "Automated trading strategies with technical indicators",
                      icon: TrendingUp,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "Mining Optimizer",
                      description: "Optimize Action Mining rewards and efficiency",
                      icon: Zap,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Arbitrage Bot",
                      description: "Cross-exchange arbitrage opportunities",
                      icon: DollarSign,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      title: "Portfolio Manager",
                      description: "Automated portfolio rebalancing and management",
                      icon: BarChart3,
                      color: "from-orange-500 to-red-500",
                    },
                    {
                      title: "DeFi Strategy",
                      description: "Yield farming and liquidity optimization",
                      icon: Shield,
                      color: "from-indigo-500 to-purple-500",
                    },
                    {
                      title: "Custom Bot",
                      description: "Build from scratch with advanced scripting",
                      icon: Bot,
                      color: "from-gray-500 to-gray-600",
                    },
                  ].map((template, index) => (
                    <Card
                      key={index}
                      className="bg-gray-700/30 border-gray-600 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                        >
                          <template.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">{template.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Create
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
