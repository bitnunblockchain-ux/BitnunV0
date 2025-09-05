"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, TrendingUp, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ExchangeRate {
  from: string
  to: string
  rate: number
  change24h: number
}

interface LiquidityPool {
  pair: string
  baseReserve: number
  quoteReserve: number
  totalLiquidity: number
  apr: number
}

export default function ExchangePage() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("BTN")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [liquidityPools, setLiquidityPools] = useState<LiquidityPool[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const currencies = [
    { code: "USD", name: "US Dollar", type: "fiat" },
    { code: "EUR", name: "Euro", type: "fiat" },
    { code: "GBP", name: "British Pound", type: "fiat" },
    { code: "BTC", name: "Bitcoin", type: "crypto" },
    { code: "ETH", name: "Ethereum", type: "crypto" },
    { code: "USDC", name: "USD Coin", type: "crypto" },
    { code: "BTN", name: "BitnunEco", type: "native" },
  ]

  useEffect(() => {
    fetchExchangeData()
  }, [])

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      calculateExchange()
    }
  }, [fromAmount, fromCurrency, toCurrency])

  const fetchExchangeData = async () => {
    // Simulate fetching exchange rates and liquidity data
    const mockRates: ExchangeRate[] = [
      { from: "USD", to: "BTN", rate: 0.8032, change24h: 2.3 },
      { from: "EUR", to: "BTN", rate: 0.7421, change24h: -1.2 },
      { from: "BTC", to: "BTN", rate: 35420.5, change24h: 4.7 },
      { from: "ETH", to: "BTN", rate: 1842.3, change24h: 1.8 },
      { from: "BTN", to: "USD", rate: 1.245, change24h: -2.3 },
    ]

    const mockPools: LiquidityPool[] = [
      { pair: "BTN/USD", baseReserve: 1000000, quoteReserve: 1245000, totalLiquidity: 2245000, apr: 12.5 },
      { pair: "BTN/BTC", baseReserve: 500000, quoteReserve: 14.12, totalLiquidity: 1500000, apr: 18.3 },
      { pair: "BTN/ETH", baseReserve: 750000, quoteReserve: 407.2, totalLiquidity: 1850000, apr: 15.7 },
      { pair: "BTN/USDC", baseReserve: 800000, quoteReserve: 996000, totalLiquidity: 1796000, apr: 9.8 },
    ]

    setExchangeRates(mockRates)
    setLiquidityPools(mockPools)
  }

  const calculateExchange = () => {
    const amount = Number.parseFloat(fromAmount)
    if (isNaN(amount)) return

    // Find exchange rate
    const rate = exchangeRates.find((r) => r.from === fromCurrency && r.to === toCurrency)?.rate || 1.245
    const result = amount * rate
    setToAmount(result.toFixed(6))
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleExchange = async () => {
    setLoading(true)

    try {
      // Create exchange order in database
      const { data, error } = await supabase.from("exchange_orders").insert({
        type: currencies.find((c) => c.code === fromCurrency)?.type === "fiat" ? "onramp" : "swap",
        from_currency: fromCurrency,
        to_currency: toCurrency,
        from_amount: Number.parseFloat(fromAmount),
        to_amount: Number.parseFloat(toAmount),
        exchange_rate: Number.parseFloat(toAmount) / Number.parseFloat(fromAmount),
        fee: Number.parseFloat(fromAmount) * 0.003, // 0.3% fee
      })

      if (error) throw error

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Exchange order created successfully!")
    } catch (error) {
      console.error("Exchange error:", error)
      alert("Exchange failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Currency Exchange
          </h1>
          <p className="text-xl text-slate-300">Seamless onramp/offramp with real-time rates</p>
        </div>

        <Tabs defaultValue="exchange" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger
              value="exchange"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Exchange
            </TabsTrigger>
            <TabsTrigger value="rates" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Live Rates
            </TabsTrigger>
            <TabsTrigger
              value="liquidity"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Liquidity Pools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exchange" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <ArrowUpDown className="h-5 w-5 text-cyan-400" />
                    <span>Currency Exchange</span>
                  </CardTitle>
                  <CardDescription>Convert between fiat, crypto, and BTN tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* From Currency */}
                  <div className="space-y-2">
                    <Label className="text-slate-300">From</Label>
                    <div className="flex space-x-2">
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              <div className="flex items-center space-x-2">
                                <span>{currency.code}</span>
                                <Badge variant="outline" className="text-xs">
                                  {currency.type}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSwapCurrencies}
                      className="rounded-full border-cyan-500/30 hover:border-cyan-400/50 bg-transparent"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* To Currency */}
                  <div className="space-y-2">
                    <Label className="text-slate-300">To</Label>
                    <div className="flex space-x-2">
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              <div className="flex items-center space-x-2">
                                <span>{currency.code}</span>
                                <Badge variant="outline" className="text-xs">
                                  {currency.type}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={toAmount}
                        readOnly
                        className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Exchange Info */}
                  {fromAmount && toAmount && (
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Exchange Rate</span>
                        <span className="text-white">
                          1 {fromCurrency} = {(Number.parseFloat(toAmount) / Number.parseFloat(fromAmount)).toFixed(6)}{" "}
                          {toCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Fee (0.3%)</span>
                        <span className="text-white">
                          {(Number.parseFloat(fromAmount) * 0.003).toFixed(6)} {fromCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-300">You'll receive</span>
                        <span className="text-emerald-400">
                          {toAmount} {toCurrency}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleExchange}
                    disabled={!fromAmount || !toAmount || loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Exchange ${fromCurrency} to ${toCurrency}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exchangeRates.map((rate, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">
                        {rate.from}/{rate.to}
                      </CardTitle>
                      <Badge
                        className={
                          rate.change24h >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                        }
                      >
                        {rate.change24h >= 0 ? "+" : ""}
                        {rate.change24h.toFixed(1)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">{rate.rate.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>24h change</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liquidity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liquidityPools.map((pool, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{pool.pair}</CardTitle>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {pool.apr}% APR
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Total Liquidity</div>
                        <div className="text-white font-medium">${pool.totalLiquidity.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Volume 24h</div>
                        <div className="text-white font-medium">${(pool.totalLiquidity * 0.1).toLocaleString()}</div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 hover:border-cyan-400/50">
                      Add Liquidity
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
