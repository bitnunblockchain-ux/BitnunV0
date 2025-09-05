"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, DollarSign, Users, Droplets } from "lucide-react"

interface PoolData {
  id: string
  name: string
  token0: string
  token1: string
  tvl: number
  volume24h: number
  fees24h: number
  apy: number
  liquidity: number
  providers: number
  priceChange24h: number
}

interface ChartData {
  time: string
  tvl: number
  volume: number
  price: number
}

export function PoolAnalytics() {
  const [pools, setPools] = useState<PoolData[]>([])
  const [selectedPool, setSelectedPool] = useState<string>("1")
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const mockPools: PoolData[] = [
      {
        id: "1",
        name: "BTN/USDT",
        token0: "BTN",
        token1: "USDT",
        tvl: 2450000,
        volume24h: 850000,
        fees24h: 2550,
        apy: 24.5,
        liquidity: 1200000,
        providers: 342,
        priceChange24h: 5.2,
      },
      {
        id: "2",
        name: "BTN/ETH",
        token0: "BTN",
        token1: "ETH",
        tvl: 1850000,
        volume24h: 620000,
        fees24h: 1860,
        apy: 18.7,
        liquidity: 950000,
        providers: 287,
        priceChange24h: -2.1,
      },
      {
        id: "3",
        name: "BTN/BTC",
        token0: "BTN",
        token1: "BTC",
        tvl: 3200000,
        volume24h: 1200000,
        fees24h: 3600,
        apy: 32.1,
        liquidity: 1800000,
        providers: 456,
        priceChange24h: 8.9,
      },
    ]

    const mockChartData: ChartData[] = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      tvl: 2450000 + Math.random() * 100000 - 50000,
      volume: 35000 + Math.random() * 20000,
      price: 5.35 + Math.random() * 0.5 - 0.25,
    }))

    setPools(mockPools)
    setChartData(mockChartData)
  }, [])

  const selectedPoolData = pools.find((p) => p.id === selectedPool)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Pool Analytics
        </h2>
        <div className="flex gap-2">
          {pools.map((pool) => (
            <Badge
              key={pool.id}
              variant={selectedPool === pool.id ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedPool === pool.id
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-gray-700 hover:border-emerald-500"
              }`}
              onClick={() => setSelectedPool(pool.id)}
            >
              {pool.name}
            </Badge>
          ))}
        </div>
      </div>

      {selectedPoolData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-400 font-medium">TVL</p>
                    <p className="text-xl font-bold text-white">${(selectedPoolData.tvl / 1000000).toFixed(2)}M</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-400 font-medium">24h Volume</p>
                    <p className="text-xl font-bold text-white">${(selectedPoolData.volume24h / 1000).toFixed(0)}K</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-400 font-medium">24h Fees</p>
                    <p className="text-xl font-bold text-white">${selectedPoolData.fees24h.toLocaleString()}</p>
                  </div>
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-400 font-medium">APY</p>
                    <p className="text-xl font-bold text-white">{selectedPoolData.apy}%</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-400 font-medium">Providers</p>
                    <p className="text-xl font-bold text-white">{selectedPoolData.providers}</p>
                  </div>
                  <Users className="w-5 h-5 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">TVL History (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Area type="monotone" dataKey="tvl" stroke="#10B981" fill="url(#tvlGradient)" strokeWidth={2} />
                    <defs>
                      <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Volume & Price (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="volume" stroke="#06B6D4" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="price" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Pool Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-emerald-400">Pool Composition</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{selectedPoolData.token0}</span>
                      <span className="text-white">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{selectedPoolData.token1}</span>
                      <span className="text-white">50%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-cyan-400">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Change</span>
                      <span className={`${selectedPoolData.priceChange24h > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {selectedPoolData.priceChange24h > 0 ? "+" : ""}
                        {selectedPoolData.priceChange24h}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fee Tier</span>
                      <span className="text-white">0.3%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-400">Liquidity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Available</span>
                      <span className="text-white">${(selectedPoolData.liquidity / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Utilization</span>
                      <span className="text-white">78.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
