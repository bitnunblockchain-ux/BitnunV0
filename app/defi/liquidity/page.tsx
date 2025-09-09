"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Droplets, Plus, Minus, TrendingUp, Zap, DollarSign } from "lucide-react"

interface LiquidityPool {
  id: string
  name: string
  token_a: string
  token_b: string
  reserve_a: number
  reserve_b: number
  total_liquidity: number
  apy: number
  fee_rate: number
  is_active: boolean
}

export default function LiquidityPage() {
  const [pools, setPools] = useState<LiquidityPool[]>([])
  const [selectedPool, setSelectedPool] = useState<LiquidityPool | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add")
  const [amounts, setAmounts] = useState({ tokenA: "", tokenB: "" })

  useEffect(() => {
    fetchLiquidityPools()
  }, [])

  const fetchLiquidityPools = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from("liquidity_pools")
        .select("*")
        .eq("is_active", true)
        .order("total_liquidity", { ascending: false })

      if (error) throw error
      setPools(data || [])
      if (data && data.length > 0) {
        setSelectedPool(data[0])
      }
    } catch (error) {
      console.error("Error fetching liquidity pools:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateLPTokens = (tokenAAmount: number, tokenBAmount: number, pool: LiquidityPool) => {
    if (!pool || pool.total_liquidity === 0) return tokenAAmount + tokenBAmount
    const shareA = tokenAAmount / pool.reserve_a
    const shareB = tokenBAmount / pool.reserve_b
    return Math.min(shareA, shareB) * pool.total_liquidity
  }

  const handleAddLiquidity = async () => {
    if (!selectedPool || !amounts.tokenA || !amounts.tokenB) return

    const supabase = createClient()
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const lpTokens = calculateLPTokens(Number(amounts.tokenA), Number(amounts.tokenB), selectedPool)

      const { error } = await supabase.from("liquidity_positions").insert({
        user_id: user.id,
        pool_id: selectedPool.id,
        token_a_amount: Number(amounts.tokenA),
        token_b_amount: Number(amounts.tokenB),
        lp_tokens: lpTokens,
      })

      if (error) throw error

      // Update pool reserves
      await supabase
        .from("liquidity_pools")
        .update({
          reserve_a: selectedPool.reserve_a + Number(amounts.tokenA),
          reserve_b: selectedPool.reserve_b + Number(amounts.tokenB),
          total_liquidity: selectedPool.total_liquidity + lpTokens,
        })
        .eq("id", selectedPool.id)

      setAmounts({ tokenA: "", tokenB: "" })
      fetchLiquidityPools()
    } catch (error) {
      console.error("Error adding liquidity:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Liquidity Pools
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Provide liquidity to earn fees and rewards. Help power the decentralized exchange ecosystem.
          </p>
        </div>

        {/* Pool Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Value Locked</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${pools.reduce((sum, pool) => sum + pool.total_liquidity, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+12.5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Pools</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{pools.length}</div>
              <p className="text-xs text-gray-400">Earning rewards</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Average APY</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {pools.length > 0 ? (pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-400">Across all pools</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">24h Volume</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+8.2%</span> vs yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pool List */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Available Pools</CardTitle>
                <CardDescription className="text-gray-400">Select a pool to provide liquidity</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pools.map((pool) => (
                      <div
                        key={pool.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedPool?.id === pool.id
                            ? "border-primary bg-primary/10"
                            : "border-gray-600 bg-gray-700/30 hover:bg-gray-700/50"
                        }`}
                        onClick={() => setSelectedPool(pool)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                                {pool.token_a.substring(0, 2)}
                              </div>
                              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold -ml-2">
                                {pool.token_b.substring(0, 2)}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{pool.name}</h3>
                              <p className="text-sm text-gray-400">
                                {pool.token_a}/{pool.token_b}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-600">{pool.apy.toFixed(1)}% APY</Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">TVL:</span>
                            <p className="text-white font-medium">${pool.total_liquidity.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Fee:</span>
                            <p className="text-white font-medium">{(pool.fee_rate * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Volume 24h:</span>
                            <p className="text-white font-medium">$124K</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Liquidity Management */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Manage Liquidity</CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedPool ? `${selectedPool.token_a}/${selectedPool.token_b}` : "Select a pool"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPool ? (
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "add" | "remove")}>
                    <TabsList className="grid w-full grid-cols-2 bg-gray-700/50">
                      <TabsTrigger value="add">Add Liquidity</TabsTrigger>
                      <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
                    </TabsList>

                    <TabsContent value="add" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="tokenA" className="text-gray-300">
                            {selectedPool.token_a} Amount
                          </Label>
                          <Input
                            id="tokenA"
                            type="number"
                            value={amounts.tokenA}
                            onChange={(e) => setAmounts({ ...amounts, tokenA: e.target.value })}
                            className="bg-gray-700/50 border-gray-600 text-white"
                            placeholder="0.0"
                          />
                          <p className="text-xs text-gray-400 mt-1">Balance: 1,250.00 {selectedPool.token_a}</p>
                        </div>

                        <div className="flex justify-center">
                          <Plus className="h-4 w-4 text-gray-400" />
                        </div>

                        <div>
                          <Label htmlFor="tokenB" className="text-gray-300">
                            {selectedPool.token_b} Amount
                          </Label>
                          <Input
                            id="tokenB"
                            type="number"
                            value={amounts.tokenB}
                            onChange={(e) => setAmounts({ ...amounts, tokenB: e.target.value })}
                            className="bg-gray-700/50 border-gray-600 text-white"
                            placeholder="0.0"
                          />
                          <p className="text-xs text-gray-400 mt-1">Balance: 850.00 {selectedPool.token_b}</p>
                        </div>

                        {amounts.tokenA && amounts.tokenB && (
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-white mb-2">You will receive</h4>
                            <p className="text-lg font-bold text-primary">
                              {calculateLPTokens(Number(amounts.tokenA), Number(amounts.tokenB), selectedPool).toFixed(
                                4,
                              )}{" "}
                              LP Tokens
                            </p>
                            <p className="text-xs text-gray-400">
                              Share of pool: {((Number(amounts.tokenA) / selectedPool.reserve_a) * 100).toFixed(2)}%
                            </p>
                          </div>
                        )}

                        <Button onClick={handleAddLiquidity} className="w-full bg-primary hover:bg-primary/90">
                          Add Liquidity
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="remove" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-300">Amount to Remove</Label>
                          <div className="space-y-2">
                            <Progress value={25} className="h-2" />
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>25%</span>
                              <span>50%</span>
                              <span>75%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-white mb-2">You will receive</h4>
                          <div className="space-y-1">
                            <p className="text-white">125.50 {selectedPool.token_a}</p>
                            <p className="text-white">89.25 {selectedPool.token_b}</p>
                          </div>
                        </div>

                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          <Minus className="h-4 w-4 mr-2" />
                          Remove Liquidity
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-8">
                    <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Select a pool to manage liquidity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
