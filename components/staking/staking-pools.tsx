"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, Clock, TrendingUp, Zap } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStakingPools = async () => {
      try {
        const { data, error } = await supabase
          .from("btn_staking_pools")
          .select("*")
          .eq("is_active", true)
          .order("apr", { ascending: false })

        if (error) throw error

        const transformedPools: StakingPool[] =
          data?.map((pool) => ({
            id: pool.id,
            name: pool.pool_name,
            token: "BTN",
            apr: pool.apr,
            lockPeriod: pool.lock_period || 0,
            minStake: pool.min_stake,
            maxStake: pool.max_stake || 1000000,
            totalStaked: pool.total_staked,
            poolCap: pool.max_stake || 5000000,
            rewards: pool.pool_type === "flexible" ? ["BTN"] : ["BTN", "ECO"],
            status: pool.total_staked >= (pool.max_stake || 5000000) ? "full" : "active",
            multiplier: pool.lock_period ? pool.lock_period / 30 : 1.0,
          })) || []

        setPools(transformedPools)
      } catch (error) {
        console.error("Error fetching staking pools:", error)
        setPools([])
      } finally {
        setLoading(false)
      }
    }

    fetchStakingPools()
  }, [supabase])

  const handleStake = async (poolId: string) => {
    try {
      // Placeholder for actual staking logic
    } catch (error) {
      console.error("Staking error:", error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse bg-white/80 dark:bg-gray-800/80">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pools.map((pool) => (
        <Card
          key={pool.id}
          className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
