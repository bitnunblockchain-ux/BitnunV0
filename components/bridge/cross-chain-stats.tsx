"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Activity, Clock, Network, Zap } from "lucide-react"

export function CrossChainStats() {
  const [stats, setStats] = useState({
    totalVolume: 45200000,
    dailyTransactions: 2340,
    activeNetworks: 8,
    avgBridgeTime: 4.2,
    totalFees: 125000,
    successRate: 99.7,
  })

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.random() * 50000,
        dailyTransactions: prev.dailyTransactions + Math.floor(Math.random() * 10),
        avgBridgeTime: prev.avgBridgeTime + (Math.random() - 0.5) * 0.1,
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: "Total Bridge Volume",
      value: `$${(stats.totalVolume / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      change: "+12.5%",
      positive: true,
    },
    {
      title: "Daily Transactions",
      value: stats.dailyTransactions.toLocaleString(),
      icon: Activity,
      change: "+8.3%",
      positive: true,
    },
    {
      title: "Active Networks",
      value: stats.activeNetworks.toString(),
      icon: Network,
      change: "All Online",
      positive: true,
    },
    {
      title: "Avg Bridge Time",
      value: `${stats.avgBridgeTime.toFixed(1)}min`,
      icon: Clock,
      change: "-15%",
      positive: true,
    },
    {
      title: "Total Fees Saved",
      value: `$${(stats.totalFees / 1000).toFixed(0)}K`,
      icon: Zap,
      change: "+22%",
      positive: true,
    },
    {
      title: "Success Rate",
      value: `${stats.successRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: "+0.2%",
      positive: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                variant={stat.positive ? "default" : "secondary"}
                className={stat.positive ? "bg-emerald-500" : ""}
              >
                {stat.change}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
