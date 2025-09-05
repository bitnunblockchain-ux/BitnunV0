"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Rocket } from "lucide-react"

export function LaunchpadStats() {
  const stats = [
    {
      label: "Total Raised",
      value: "$2.4B",
      change: "+$45M this month",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      label: "Active Projects",
      value: "12",
      change: "3 launching today",
      icon: Rocket,
      color: "text-blue-600",
    },
    {
      label: "Total Investors",
      value: "847K",
      change: "+12.3K this week",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Success Rate",
      value: "94.2%",
      change: "Industry leading",
      icon: TrendingUp,
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
