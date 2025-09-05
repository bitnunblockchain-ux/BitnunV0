"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, Zap } from "lucide-react"

interface StakingPool {
  id: string
  name: string
  apy: number
  lockPeriod: string
  totalStaked: number
  capacity: number
  minStake: number
  status: "active" | "full" | "coming-soon"
  rewards: string[]
}

export function StakingStats() {
  const [pools, setPools] = useState<StakingPool[]>([])

  useEffect(() => {
    const mockPools: StakingPool[] = [
      {
        id: "1",
        name: "Flexible Pool",
        apy: 12.5,
        lockPeriod: "No lock",
        totalStaked: 850000,
        capacity: 1000000,
        minStake: 100,
        status: "active",
        rewards: ["BTN Tokens", "Mining Boost"],
      },
      {
        id: "2",
        name: "30-Day Pool",
        apy: 15.8,
        lockPeriod: "30 days",
        totalStaked: 650000,
        capacity: 800000,
        minStake: 500,
        status: "active",
        rewards: ["BTN Tokens", "NFT Rewards", "Priority Access"],
      },
      {
        id: "3",
        name: "90-Day Pool",
        apy: 18.2,
        lockPeriod: "90 days",
        totalStaked: 420000,
        capacity: 500000,
        minStake: 1000,
        status: "active",
        rewards: ["BTN Tokens", "Governance Rights", "Exclusive Events"],
      },
      {
        id: "4",
        name: "365-Day Pool",
        apy: 22.5,
        lockPeriod: "1 year",
        totalStaked: 180000,
        capacity: 300000,
        minStake: 5000,
        status: "active",
        rewards: ["BTN Tokens", "Premium Features", "Revenue Share"],
      },
    ]
    setPools(mockPools)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "full":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "coming-soon":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getAPYTrend = (apy: number) => {
    return apy > 15 ? (
      <div className="flex items-center gap-1 text-emerald-400">
        <TrendingUp className="w-3 h-3" />
        <span className="text-xs">High Yield</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 text-yellow-400">
        <TrendingDown className="w-3 h-3" />
        <span className="text-xs">Stable</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {pools.map((pool) => {
          const utilization = (pool.totalStaked / pool.capacity) * 100

          return (
            <Card
              key={pool.id}
              className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{pool.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{pool.lockPeriod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">{pool.apy}%</div>
                    {getAPYTrend(pool.apy)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Staked</p>
                    <p className="font-semibold text-white">{(pool.totalStaked / 1000).toFixed(0)}K BTN</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Capacity</p>
                    <p className="font-semibold text-white">{(pool.capacity / 1000).toFixed(0)}K BTN</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Min Stake</p>
                    <p className="font-semibold text-white">{pool.minStake} BTN</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <Badge className={getStatusColor(pool.status)}>{pool.status.replace("-", " ")}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Pool Utilization</span>
                    <span className="text-white">{utilization.toFixed(1)}%</span>
                  </div>
                  <Progress value={utilization} className="h-2 bg-gray-800" />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Rewards</p>
                  <div className="flex flex-wrap gap-2">
                    {pool.rewards.map((reward, index) => (
                      <Badge key={index} variant="outline" className="border-emerald-500/30 text-emerald-400">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
