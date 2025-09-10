"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, Wallet, PieChart, Eye, EyeOff, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Asset {
  symbol: string
  name: string
  balance: number
  value: number
  change24h: number
  allocation: number
}

interface Position {
  id: string
  type: "lending" | "liquidity" | "staking"
  asset: string
  amount: number
  apy: number
  earned: number
  platform: string
}

export default function PortfolioPage() {
  const [hideBalances, setHideBalances] = useState(false)
  const [totalValue, setTotalValue] = useState(0)
  const [totalChange, setTotalChange] = useState(0)
  const [assets, setAssets] = useState<Asset[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadRealPortfolioData()
  }, [])

  const loadRealPortfolioData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        console.log("[v0] No authenticated user found")
        setLoading(false)
        return
      }
      setUserId(user.id)

      const { data: walletData, error: walletError } = await supabase
        .from("user_wallets")
        .select("wallet_address, balance, currency")
        .eq("user_id", user.id)

      if (walletError) {
        console.error("[v0] Error loading wallet data:", walletError)
      }

      const { data: tradingPairs } = await supabase
        .from("trading_pairs")
        .select("base_token, quote_token, price, price_change_24h")

      const { data: stakingPositions } = await supabase
        .from("user_stakes")
        .select(`
          id,
          amount,
          rewards_earned,
          staking_pools (
            token_symbol,
            pool_name,
            apr
          )
        `)
        .eq("user_id", user.id)

      const { data: liquidityPositions } = await supabase
        .from("liquidity_positions")
        .select(`
          id,
          amount_a,
          amount_b,
          rewards_earned,
          liquidity_pools (
            token_a,
            token_b,
            apr
          )
        `)
        .eq("user_id", user.id)

      // Process real assets data
      const processedAssets: Asset[] = []
      let totalPortfolioValue = 0

      if (walletData) {
        for (const wallet of walletData) {
          const balance = Number.parseFloat(wallet.balance)
          const priceData = tradingPairs?.find(
            (pair) => pair.base_token === wallet.currency && pair.quote_token === "USDT",
          )

          const price = priceData?.price || 1
          const value = balance * price
          const change24h = priceData?.price_change_24h || 0

          totalPortfolioValue += value

          processedAssets.push({
            symbol: wallet.currency,
            name: getTokenName(wallet.currency),
            balance,
            value,
            change24h,
            allocation: 0, // Will be calculated after total is known
          })
        }
      }

      // Calculate allocations
      processedAssets.forEach((asset) => {
        asset.allocation = totalPortfolioValue > 0 ? (asset.value / totalPortfolioValue) * 100 : 0
      })

      // Process real positions data
      const processedPositions: Position[] = []

      // Add staking positions
      if (stakingPositions) {
        stakingPositions.forEach((stake) => {
          const stakingPool = Array.isArray(stake.staking_pools) ? stake.staking_pools[0] : stake.staking_pools

          processedPositions.push({
            id: stake.id,
            type: "staking",
            asset: stakingPool?.token_symbol || "Unknown",
            amount: Number.parseFloat(stake.amount),
            apy: stakingPool?.apr || 0,
            earned: Number.parseFloat(stake.rewards_earned || "0"),
            platform: stakingPool?.pool_name || "BitnunEco Staking",
          })
        })
      }

      // Add liquidity positions
      if (liquidityPositions) {
        liquidityPositions.forEach((position) => {
          processedPositions.push({
            id: position.id,
            type: "liquidity",
            asset: `${position.liquidity_pools?.token_a}/${position.liquidity_pools?.token_b}`,
            amount: Number.parseFloat(position.amount_a) + Number.parseFloat(position.amount_b),
            apy: position.liquidity_pools?.apr || 0,
            earned: Number.parseFloat(position.rewards_earned || "0"),
            platform: "BitnunEco DEX",
          })
        })
      }

      // Calculate overall portfolio change
      const weightedChange = processedAssets.reduce((sum, asset) => {
        return sum + asset.change24h * (asset.allocation / 100)
      }, 0)

      setAssets(processedAssets)
      setPositions(processedPositions)
      setTotalValue(totalPortfolioValue)
      setTotalChange(weightedChange)
    } catch (error) {
      console.error("[v0] Error loading portfolio data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTokenName = (symbol: string): string => {
    const tokenNames: { [key: string]: string } = {
      BTN: "BitnunEco Token",
      ETH: "Ethereum",
      BTC: "Bitcoin",
      USDT: "Tether USD",
      USDC: "USD Coin",
      ECO: "EcoToken",
      GREEN: "GreenToken",
    }
    return tokenNames[symbol] || symbol
  }

  const refreshPortfolio = () => {
    setLoading(true)
    loadRealPortfolioData()
  }

  const formatCurrency = (amount: number) => {
    if (hideBalances) return "****"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatNumber = (amount: number) => {
    if (hideBalances) return "****"
    return amount.toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-400">Loading your real portfolio data...</p>
        </div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
          <p className="text-gray-400">Please log in to view your portfolio</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </h1>
            <p className="text-xl text-gray-400">
              Track your real assets, positions, and performance across the BitnunEco ecosystem
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHideBalances(!hideBalances)}
              className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
            >
              {hideBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshPortfolio}
              className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Value</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</div>
              <p className="text-xs text-gray-400 flex items-center">
                {totalChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                )}
                <span className={totalChange >= 0 ? "text-green-400" : "text-red-400"}>
                  {totalChange >= 0 ? "+" : ""}
                  {totalChange.toFixed(2)}%
                </span>
                <span className="text-gray-400 ml-1">24h</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Positions</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{positions.length}</div>
              <p className="text-xs text-gray-400">
                Earning {formatCurrency(positions.reduce((sum, pos) => sum + pos.earned, 0))}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Best Performer</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {assets.length > 0
                  ? assets.reduce((best, asset) => (asset.change24h > best.change24h ? asset : best)).symbol
                  : "N/A"}
              </div>
              <p className="text-xs text-green-400">
                {assets.length > 0
                  ? `+${assets
                      .reduce((best, asset) => (asset.change24h > best.change24h ? asset : best))
                      .change24h.toFixed(1)}% today`
                  : "No data"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Yield</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(positions.reduce((sum, pos) => sum + pos.earned, 0))}
              </div>
              <p className="text-xs text-gray-400">From DeFi positions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="positions">DeFi Positions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Asset Holdings</CardTitle>
                <CardDescription className="text-gray-400">
                  Your real cryptocurrency portfolio breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No assets found. Start by adding funds to your wallet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assets.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
                            {asset.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{asset.symbol}</h3>
                            <p className="text-gray-400 text-sm">{asset.name}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-white font-semibold">
                            {formatNumber(asset.balance)} {asset.symbol}
                          </p>
                          <p className="text-gray-400 text-sm">{formatCurrency(asset.value)}</p>
                        </div>

                        <div className="text-right">
                          <p className={`font-semibold ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {asset.change24h >= 0 ? "+" : ""}
                            {asset.change24h.toFixed(2)}%
                          </p>
                          <p className="text-gray-400 text-sm">{asset.allocation.toFixed(1)}% allocation</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">DeFi Positions</CardTitle>
                <CardDescription className="text-gray-400">
                  Your active lending, staking, and liquidity positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {positions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">
                      No active positions. Start earning by staking or providing liquidity.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {positions.map((position) => (
                      <div
                        key={position.id}
                        className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Badge
                            className={
                              position.type === "lending"
                                ? "bg-blue-600"
                                : position.type === "staking"
                                  ? "bg-green-600"
                                  : "bg-purple-600"
                            }
                          >
                            {position.type}
                          </Badge>
                          <div>
                            <h3 className="text-white font-semibold">{position.asset}</h3>
                            <p className="text-gray-400 text-sm">{position.platform}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-white font-semibold">{formatNumber(position.amount)}</p>
                          <p className="text-gray-400 text-sm">{position.apy.toFixed(1)}% APY</p>
                        </div>

                        <div className="text-right">
                          <p className="text-green-400 font-semibold">{formatCurrency(position.earned)}</p>
                          <p className="text-gray-400 text-sm">Earned</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Portfolio Allocation</CardTitle>
                  <CardDescription className="text-gray-400">Asset distribution by value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assets.map((asset, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{asset.symbol}</span>
                          <span className="text-white">{asset.allocation.toFixed(1)}%</span>
                        </div>
                        <Progress value={asset.allocation} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                  <CardDescription className="text-gray-400">Real portfolio performance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">24h Change</span>
                    <span className={`font-semibold ${totalChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {totalChange >= 0 ? "+" : ""}
                      {totalChange.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Assets</span>
                    <span className="text-white font-semibold">{assets.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Positions</span>
                    <span className="text-white font-semibold">{positions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Earned</span>
                    <span className="text-green-400 font-semibold">
                      {formatCurrency(positions.reduce((sum, pos) => sum + pos.earned, 0))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
