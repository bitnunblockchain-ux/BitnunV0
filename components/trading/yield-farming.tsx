"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sprout, Clock, Gift, TrendingUp } from "lucide-react"

interface Farm {
  id: string
  name: string
  tokens: string[]
  apr: number
  tvl: number
  multiplier: number
  duration: number
  rewards: string[]
  staked: number
  earned: number
  status: "active" | "ended" | "upcoming"
}

export function YieldFarming() {
  const [farms, setFarms] = useState<Farm[]>([])

  useEffect(() => {
    const mockFarms: Farm[] = [
      {
        id: "1",
        name: "BTN-USDT LP Farming",
        tokens: ["BTN", "USDT"],
        apr: 45.2,
        tvl: 2100000,
        multiplier: 2.5,
        duration: 30,
        rewards: ["BTN", "ECO"],
        staked: 5000,
        earned: 125.5,
        status: "active",
      },
      {
        id: "2",
        name: "Single BTN Staking",
        tokens: ["BTN"],
        apr: 28.7,
        tvl: 1800000,
        multiplier: 1.8,
        duration: 60,
        rewards: ["BTN"],
        staked: 10000,
        earned: 287.3,
        status: "active",
      },
      {
        id: "3",
        name: "BTN-ETH LP Farming",
        tokens: ["BTN", "ETH"],
        apr: 52.1,
        tvl: 950000,
        multiplier: 3.0,
        duration: 14,
        rewards: ["BTN", "ECO", "BONUS"],
        staked: 0,
        earned: 0,
        status: "active",
      },
    ]

    setFarms(mockFarms)
  }, [])

  const handleStake = (farmId: string) => {
    console.log("[v0] Staking in farm:", farmId)
  }

  const handleHarvest = (farmId: string) => {
    console.log("[v0] Harvesting rewards from farm:", farmId)
  }

  return (
    <div className="space-y-6">
      {/* Farming Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Staked</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">$4.85M</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Rewards</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">412.80 BTN</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Avg APR</p>
              <p className="text-xl font-bold text-emerald-500">42.0%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Farms List */}
      <div className="space-y-4">
        {farms.map((farm) => (
          <Card
            key={farm.id}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Farm Info */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {farm.tokens.map((token, index) => (
                    <div key={token} className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {token[0]}
                      </div>
                      {index < farm.tokens.length - 1 && <span className="mx-1 text-gray-400">+</span>}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{farm.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{farm.multiplier}x Multiplier</Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {farm.duration} days
                    </Badge>
                    {farm.rewards.map((reward) => (
                      <Badge key={reward} variant="outline" className="text-emerald-600">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Farm Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">APR</p>
                  <p className="text-xl font-bold text-emerald-500">{farm.apr.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">TVL</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${(farm.tvl / 1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Earned</p>
                  <p className="font-semibold text-emerald-500">{farm.earned.toFixed(2)} BTN</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleStake(farm.id)}>
                  {farm.staked > 0 ? "Stake More" : "Stake"}
                </Button>
                {farm.earned > 0 && (
                  <Button
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => handleHarvest(farm.id)}
                  >
                    Harvest
                  </Button>
                )}
              </div>
            </div>

            {/* Staking Progress */}
            {farm.staked > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Staked: {farm.staked.toLocaleString()} {farm.tokens.join("-")}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Lock Period: {farm.duration} days</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
