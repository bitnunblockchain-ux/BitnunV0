"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react"

export function PortfolioOverview() {
  const portfolioStats = [
    { name: "Total Value", value: "$2,847,392", change: "+12.5%", trend: "up", icon: DollarSign },
    { name: "Total P&L", value: "+$347,892", change: "+14.2%", trend: "up", icon: TrendingUp },
    { name: "Daily Change", value: "+$23,847", change: "+0.85%", trend: "up", icon: Activity },
    { name: "Win Rate", value: "73.4%", change: "+2.1%", trend: "up", icon: Target },
  ]

  const topHoldings = [
    { symbol: "BTN", name: "BitnunEco Token", value: "$1,247,892", allocation: 43.8, change: "+8.5%", trend: "up" },
    { symbol: "ETH", name: "Ethereum", value: "$687,234", allocation: 24.1, change: "+12.3%", trend: "up" },
    { symbol: "BTC", name: "Bitcoin", value: "$456,789", allocation: 16.0, change: "-2.1%", trend: "down" },
    { symbol: "MATIC", name: "Polygon", value: "$234,567", allocation: 8.2, change: "+15.7%", trend: "up" },
    { symbol: "LINK", name: "Chainlink", value: "$156,789", allocation: 5.5, change: "+6.8%", trend: "up" },
    { symbol: "UNI", name: "Uniswap", value: "$64,121", allocation: 2.3, change: "-1.2%", trend: "down" },
  ]

  const recentTransactions = [
    { type: "Buy", asset: "BTN", amount: "5,000", value: "$10,750", time: "2 hours ago", status: "Completed" },
    { type: "Sell", asset: "ETH", amount: "2.5", value: "$6,250", time: "4 hours ago", status: "Completed" },
    { type: "Stake", asset: "BTN", amount: "10,000", value: "$21,500", time: "1 day ago", status: "Active" },
    { type: "Swap", asset: "USDC → BTN", amount: "15,000", value: "$15,000", time: "2 days ago", status: "Completed" },
  ]

  return (
    <div className="space-y-6">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Top Holdings</CardTitle>
            <CardDescription>Your largest portfolio positions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topHoldings.map((holding) => (
              <div key={holding.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-700">{holding.symbol}</span>
                    </div>
                    <div>
                      <p className="font-medium">{holding.name}</p>
                      <p className="text-sm text-gray-600">{holding.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{holding.allocation}%</p>
                    <p className={`text-xs ${holding.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                      {holding.change}
                    </p>
                  </div>
                </div>
                <Progress value={holding.allocation} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest portfolio activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={tx.type === "Buy" ? "default" : tx.type === "Sell" ? "secondary" : "outline"}>
                    {tx.type}
                  </Badge>
                  <div>
                    <p className="font-medium">{tx.asset}</p>
                    <p className="text-sm text-gray-600">
                      {tx.amount} • {tx.value}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{tx.time}</p>
                  <Badge variant={tx.status === "Completed" ? "default" : "secondary"}>{tx.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
