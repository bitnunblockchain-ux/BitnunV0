"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Zap, Shield } from "lucide-react"

export function EcosystemStats() {
  const stats = [
    {
      label: "Connected Chains",
      value: "52",
      change: "+8 this month",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      label: "Active Integrations",
      value: "247",
      change: "+23 this week",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Cross-Chain Volume",
      value: "$2.4B",
      change: "+15.2% today",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      label: "Security Score",
      value: "99.8%",
      change: "Excellent",
      icon: Shield,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {stat.change}
              </Badge>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  )
}
