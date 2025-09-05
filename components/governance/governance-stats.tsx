"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vote, Users, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react"

export function GovernanceStats() {
  const [stats, setStats] = useState({
    totalProposals: 47,
    activeProposals: 8,
    totalVoters: 2340,
    participationRate: 68.5,
    treasuryValue: 12500000,
    avgVotingPower: 1250,
  })

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalVoters: prev.totalVoters + Math.floor(Math.random() * 5),
        participationRate: prev.participationRate + (Math.random() - 0.5) * 0.1,
        treasuryValue: prev.treasuryValue + Math.random() * 10000 - 5000,
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: "Total Proposals",
      value: stats.totalProposals.toString(),
      icon: Vote,
      change: "+3 this week",
      positive: true,
    },
    {
      title: "Active Proposals",
      value: stats.activeProposals.toString(),
      icon: Clock,
      change: "2 ending soon",
      positive: false,
    },
    {
      title: "Total Voters",
      value: stats.totalVoters.toLocaleString(),
      icon: Users,
      change: "+12.5%",
      positive: true,
    },
    {
      title: "Participation Rate",
      value: `${stats.participationRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: "+2.3%",
      positive: true,
    },
    {
      title: "Treasury Value",
      value: `$${(stats.treasuryValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      change: "+5.7%",
      positive: true,
    },
    {
      title: "Avg Voting Power",
      value: `${stats.avgVotingPower.toLocaleString()} BTN`,
      icon: CheckCircle,
      change: "+8.2%",
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
