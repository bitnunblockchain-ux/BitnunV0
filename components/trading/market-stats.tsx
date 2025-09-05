"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Zap } from "lucide-react"

interface MarketStatsProps {
  selectedPair: string
}

export function MarketStats({ selectedPair }: MarketStatsProps) {
  const [stats, setStats] = useState({
    volume24h: 2450000,
    trades24h: 15420,
    activeTraders: 3240,
    totalLiquidity: 8900000,
    avgSpread: 0.0001,
    priceChange: 12.5,
  })

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        volume24h: prev.volume24h + Math.random() * 10000 - 5000,
        trades24h: prev.trades24h + Math.floor(Math.random() * 10),
        activeTraders: prev.activeTraders + Math.floor(Math.random() * 20) - 10,
        totalLiquidity: prev.totalLiquidity + Math.random() * 50000 - 25000,
        avgSpread: prev.avgSpread + (Math.random() - 0.5) * 0.00001,
        priceChange: prev.priceChange + (Math.random() - 0.5) * 0.5,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedPair])

  const statCards = [
    {
      title: "24h Volume",
      value: `$${(stats.volume24h / 1000000).toFixed(2)}M`,
      icon: DollarSign,
      change: "+8.2%",
      positive: true,
    },
    {
      title: "24h Trades",
      value: stats.trades24h.toLocaleString(),
      icon: Activity,
      change: "+15.7%",
      positive: true,
    },
    {
      title: "Active Traders",
      value: stats.activeTraders.toLocaleString(),
      icon: Users,
      change: "+5.3%",
      positive: true,
    },
    {
      title: "Total Liquidity",
      value: `$${(stats.totalLiquidity / 1000000).toFixed(1)}M`,
      icon: Zap,
      change: "-2.1%",
      positive: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
            <div className="flex flex-col items-end">
              <stat.icon className="w-6 h-6 text-emerald-500 mb-2" />
              <Badge
                variant={stat.positive ? "default" : "destructive"}
                className={stat.positive ? "bg-emerald-500" : ""}
              >
                {stat.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {stat.change}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
