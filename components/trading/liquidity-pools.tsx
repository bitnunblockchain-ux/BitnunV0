"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TrendingUp, Droplets, Plus, Minus } from "lucide-react"

interface Pool {
  id: string
  tokenA: string
  tokenB: string
  tvl: number
  apr: number
  volume24h: number
  fees24h: number
  myLiquidity: number
  myShare: number
}

export function LiquidityPools() {
  const [pools, setPools] = useState<Pool[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const mockPools: Pool[] = [
      {
        id: "1",
        tokenA: "BTN",
        tokenB: "USDT",
        tvl: 1250000,
        apr: 24.5,
        volume24h: 450000,
        fees24h: 1350,
        myLiquidity: 5000,
        myShare: 0.4,
      },
      {
        id: "2",
        tokenA: "BTN",
        tokenB: "ETH",
        tvl: 890000,
        apr: 18.7,
        volume24h: 320000,
        fees24h: 960,
        myLiquidity: 2500,
        myShare: 0.28,
      },
      {
        id: "3",
        tokenA: "BTN",
        tokenB: "BTC",
        tvl: 2100000,
        apr: 31.2,
        volume24h: 680000,
        fees24h: 2040,
        myLiquidity: 0,
        myShare: 0,
      },
    ]

    setPools(mockPools)
  }, [])

  const filteredPools = pools.filter((pool) =>
    `${pool.tokenA}/${pool.tokenB}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search pools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All Pools
          </Button>
          <Button variant="outline" size="sm">
            My Pools
          </Button>
          <Button variant="outline" size="sm">
            High APR
          </Button>
        </div>
      </div>

      {/* Pools Grid */}
      <div className="grid gap-4">
        {filteredPools.map((pool) => (
          <Card
            key={pool.id}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Pool Info */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {pool.tokenA[0]}
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {pool.tokenB[0]}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pool.tokenA}/{pool.tokenB}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Liquidity Pool</p>
                </div>
              </div>

              {/* Pool Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">TVL</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${(pool.tvl / 1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">APR</p>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-emerald-500">{pool.apr.toFixed(1)}%</p>
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">24h Volume</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${(pool.volume24h / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">24h Fees</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${pool.fees24h.toFixed(0)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {pool.myLiquidity > 0 && (
                  <Badge variant="secondary" className="mr-2">
                    <Droplets className="w-3 h-3 mr-1" />${pool.myLiquidity.toLocaleString()}
                  </Badge>
                )}
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                {pool.myLiquidity > 0 && (
                  <Button variant="outline" size="sm">
                    <Minus className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </div>

            {/* My Position (if any) */}
            {pool.myLiquidity > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-300">My Position:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${pool.myLiquidity.toLocaleString()} ({pool.myShare}% of pool)
                  </span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
