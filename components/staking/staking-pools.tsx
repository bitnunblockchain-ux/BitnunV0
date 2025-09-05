"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, Clock, TrendingUp, Zap } from "lucide-react"

interface StakingPool {
  id: string
  name: string
  token: string
  apr: number
  lockPeriod: number
  minStake: number
  maxStake: number
  totalStaked: number
  poolCap: number
  rewards: string[]
  status: "active" | "full" | "ended"
  multiplier: number
}

export function StakingPools() {
  const [pools, setPools] = useState<StakingPool[]>([])

  useEffect(() => {
    const mockPools: StakingPool[] = [
      {
        id: "1",
        name: "Flexible BTN Staking",
        token: "BTN",
        apr: 12.5,
        lockPeriod: 0,
        minStake: 100,
        maxStake: 100000,
        totalStaked: 2500000,
        poolCap: 5000000,
        rewards: ["BTN"],
        status: "active",
        multiplier: 1.0,
      },
      {
        id: "2",
        name: "30-Day BTN Lock",
        token: "BTN",
        apr: 25.8,
        lockPeriod: 30,
        minStake: 500,
        maxStake: 500000,
        totalStaked: 1800000,
        poolCap: 3000000,
        rewards: ["BTN", "ECO"],
        status: "active",
        multiplier: 1.5,
      },
      {
        id: "3",
        name: "90-Day BTN Lock",
        token: "BTN",
        apr: 45.2,
        lockPeriod: 90,
        minStake: 1000,
        maxStake: 1000000,
        totalStaked: 950000,
        poolCap: 2000000,
        rewards: ["BTN", "ECO", "BONUS"],
        status: "active",
        multiplier: 2.5,
      },
      {
        id: "4",
        name: "365-Day BTN Lock",
        token: "BTN",
        apr: 85.7,
        lockPeriod: 365,
        minStake: 5000,
        maxStake: 2000000,
        totalStaked: 1200000,
        poolCap: 1500000,
        rewards: ["BTN", "ECO", "BONUS", "NFT"],
        status: "active",
        multiplier: 5.0,
      },
    ]

    setPools(mockPools)
  }, [])

  const handleStake = (poolId: string) => {
    console.log("[v0] Staking in pool:", poolId)
  }

  return (
    <div className="space-y-4">
      {pools.map((pool) => (
        <Card
          key={pool.id}
          className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Pool Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pool.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{pool.multiplier}x Multiplier</Badge>
                  {pool.lockPeriod > 0 ? (
                    <Badge variant="outline">
                      <Lock className="w-3 h-3 mr-1" />
                      {pool.lockPeriod} days
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-emerald-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Flexible
                    </Badge>
                  )}
                  {pool.rewards.map((reward) => (
                    <Badge key={reward} variant="outline" className="text-emerald-600">
                      {reward}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Pool Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">APR</p>
                <div className="flex items-center gap-1">
                  <p className="text-xl font-bold text-emerald-500">{pool.apr.toFixed(1)}%</p>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Min Stake</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {pool.minStake.toLocaleString()} {pool.token}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Staked</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {(pool.totalStaked / 1000000).toFixed(2)}M {pool.token}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Pool Utilization</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {((pool.totalStaked / pool.poolCap) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleStake(pool.id)}
                disabled={pool.status === "full" || pool.status === "ended"}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                {pool.status === "full" ? "Pool Full" : pool.status === "ended" ? "Ended" : "Stake Now"}
              </Button>
            </div>
          </div>

          {/* Pool Progress */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Pool Capacity</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {pool.totalStaked.toLocaleString()} / {pool.poolCap.toLocaleString()} {pool.token}
              </span>
            </div>
            <Progress value={(pool.totalStaked / pool.poolCap) * 100} className="h-2" />
          </div>
        </Card>
      ))}
    </div>
  )
}
