"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, TrendingDown, BarChart3, Target, DollarSign } from "lucide-react"

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = useState("BTN/USDT")
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [leverage, setLeverage] = useState([1])

  const tradingPairs = [
    { symbol: "BTN/USDT", price: 2.45, change: 12.5, volume: "2.4M" },
    { symbol: "BTC/USDT", price: 43250, change: -2.1, volume: "1.8B" },
    { symbol: "ETH/USDT", price: 2680, change: 5.8, volume: "890M" },
    { symbol: "SOL/USDT", price: 98.5, change: 8.2, volume: "245M" },
  ]

  const orderBook = {
    asks: [
      { price: 2.458, amount: 1250, total: 3062.5 },
      { price: 2.457, amount: 890, total: 2187.73 },
      { price: 2.456, amount: 1450, total: 3561.2 },
      { price: 2.455, amount: 2100, total: 5155.5 },
      { price: 2.454, amount: 750, total: 1840.5 },
    ],
    bids: [
      { price: 2.453, amount: 1100, total: 2698.3 },
      { price: 2.452, amount: 1850, total: 4536.2 },
      { price: 2.451, amount: 920, total: 2254.92 },
      { price: 2.45, amount: 1600, total: 3920 },
      { price: 2.449, amount: 2200, total: 5387.8 },
    ],
  }

  const recentTrades = [
    { price: 2.454, amount: 125, time: "14:32:15", side: "buy" },
    { price: 2.453, amount: 89, time: "14:32:12", side: "sell" },
    { price: 2.455, amount: 245, time: "14:32:08", side: "buy" },
    { price: 2.452, amount: 156, time: "14:32:05", side: "sell" },
    { price: 2.456, amount: 78, time: "14:32:01", side: "buy" },
  ]

  const calculateTotal = () => {
    const amountNum = Number(amount) || 0
    const priceNum = orderType === "market" ? 2.454 : Number(price) || 0
    return (amountNum * priceNum).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Advanced Trading</h1>
            <p className="text-gray-400 mt-1">Professional trading with advanced order types and leverage</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPair} onValueChange={setSelectedPair}>
              <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {tradingPairs.map((pair) => (
                  <SelectItem key={pair.symbol} value={pair.symbol}>
                    {pair.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tradingPairs
            .filter((pair) => pair.symbol === selectedPair)
            .map((pair) => (
              <div key={pair.symbol} className="contents">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Price</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">${pair.price.toLocaleString()}</div>
                    <p className={`text-xs ${pair.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {pair.change >= 0 ? "+" : ""}
                      {pair.change.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">24h Volume</CardTitle>
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{pair.volume}</div>
                    <p className="text-xs text-gray-400">USDT</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">24h High</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">${(pair.price * 1.15).toFixed(2)}</div>
                    <p className="text-xs text-gray-400">Today&apos;s peak</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">24h Low</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">${(pair.price * 0.92).toFixed(2)}</div>
                    <p className="text-xs text-gray-400">Today&apos;s low</p>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">TradingView Chart Integration</p>
                    <p className="text-sm text-gray-500 mt-2">Real-time price data and technical analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Book */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Order Book</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {/* Asks */}
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
                      <span>Price</span>
                      <span className="text-right">Amount</span>
                      <span className="text-right">Total</span>
                    </div>
                    {orderBook.asks.reverse().map((ask, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-gray-700/30">
                        <span className="text-red-400">{ask.price.toFixed(3)}</span>
                        <span className="text-right text-white">{ask.amount}</span>
                        <span className="text-right text-gray-400">{ask.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spread */}
                  <div className="px-4 py-2 bg-gray-700/30">
                    <div className="text-center text-sm">
                      <span className="text-gray-400">Spread: </span>
                      <span className="text-white">0.005 (0.20%)</span>
                    </div>
                  </div>

                  {/* Bids */}
                  <div className="px-4 py-2">
                    {orderBook.bids.map((bid, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-gray-700/30">
                        <span className="text-green-400">{bid.price.toFixed(3)}</span>
                        <span className="text-right text-white">{bid.amount}</span>
                        <span className="text-right text-gray-400">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Form */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Place Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Type */}
                <Tabs value={orderType} onValueChange={(value) => setOrderType(value as any)}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700/50">
                    <TabsTrigger value="market">Market</TabsTrigger>
                    <TabsTrigger value="limit">Limit</TabsTrigger>
                    <TabsTrigger value="stop">Stop</TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={side === "buy" ? "default" : "outline"}
                    onClick={() => setSide("buy")}
                    className={side === "buy" ? "bg-green-600 hover:bg-green-700" : "border-gray-600"}
                  >
                    Buy
                  </Button>
                  <Button
                    variant={side === "sell" ? "default" : "outline"}
                    onClick={() => setSide("sell")}
                    className={side === "sell" ? "bg-red-600 hover:bg-red-700" : "border-gray-600"}
                  >
                    Sell
                  </Button>
                </div>

                {/* Leverage */}
                <div>
                  <Label className="text-gray-300">Leverage: {leverage[0]}x</Label>
                  <Slider value={leverage} onValueChange={setLeverage} max={100} min={1} step={1} className="mt-2" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1x</span>
                    <span>50x</span>
                    <span>100x</span>
                  </div>
                </div>

                {/* Price (for limit orders) */}
                {orderType !== "market" && (
                  <div>
                    <Label htmlFor="price" className="text-gray-300">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                      placeholder="0.00"
                    />
                  </div>
                )}

                {/* Amount */}
                <div>
                  <Label htmlFor="amount" className="text-gray-300">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-gray-400 mt-1">Available: 1,250.00 USDT</p>
                </div>

                {/* Order Summary */}
                {amount && (
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total:</span>
                        <span className="text-white">{calculateTotal()} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fee:</span>
                        <span className="text-white">{(Number(calculateTotal()) * 0.001).toFixed(2)} USDT</span>
                      </div>
                      {leverage[0] > 1 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Position Size:</span>
                          <span className="text-primary">
                            {(Number(calculateTotal()) * leverage[0]).toFixed(2)} USDT
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  className={`w-full ${
                    side === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  <Target className="h-4 w-4 mr-2" />
                  {side === "buy" ? "Buy" : "Sell"} {selectedPair.split("/")[0]}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Trades */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 pb-2 border-b border-gray-700">
                <span>Price</span>
                <span>Amount</span>
                <span>Time</span>
                <span>Side</span>
              </div>
              {recentTrades.map((trade, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 text-sm py-1 hover:bg-gray-700/30">
                  <span className={trade.side === "buy" ? "text-green-400" : "text-red-400"}>
                    {trade.price.toFixed(3)}
                  </span>
                  <span className="text-white">{trade.amount}</span>
                  <span className="text-gray-400">{trade.time}</span>
                  <span className={trade.side === "buy" ? "text-green-400" : "text-red-400"}>
                    {trade.side.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
