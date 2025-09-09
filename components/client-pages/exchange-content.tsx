"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, DollarSign, Activity, ArrowUpDown } from "lucide-react"

export default function ExchangeContent() {
  const [tradingPairs, setTradingPairs] = useState<any[]>([])
  const [selectedPair, setSelectedPair] = useState("BTN/USDT")
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadExchangeData()
  }, [])

  const loadExchangeData = async () => {
    try {
      // Load trading pairs
      const { data: pairs } = await supabase.from("trading_pairs").select("*").eq("is_active", true)

      // Load recent orders
      const { data: recentOrders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      setTradingPairs(
        pairs || [
          { symbol: "BTN/USDT", price: 1.25, change: 5.2, volume: 125000 },
          { symbol: "BTN/ETH", price: 0.0008, change: -2.1, volume: 85000 },
          { symbol: "BTN/BTC", price: 0.000025, change: 3.8, volume: 45000 },
        ],
      )

      setOrders(recentOrders || [])
    } catch (error) {
      console.error("Error loading exchange data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!amount || !price) return

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) return

      const orderData = {
        user_id: user.user.id,
        trading_pair: selectedPair,
        order_type: orderType,
        amount: Number.parseFloat(amount),
        price: Number.parseFloat(price),
        status: "pending",
      }

      const { error } = await supabase.from("orders").insert([orderData])

      if (!error) {
        setAmount("")
        setPrice("")
        loadExchangeData() // Refresh orders
      }
    } catch (error) {
      console.error("Error placing order:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">BitnunEco Exchange</h1>
          <p className="text-blue-200 text-lg">Professional cryptocurrency trading platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Trading Pairs */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tradingPairs.map((pair, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPair === pair.symbol
                          ? "bg-blue-600/30 border border-blue-500/50"
                          : "bg-slate-700/30 hover:bg-slate-700/50"
                      }`}
                      onClick={() => setSelectedPair(pair.symbol)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{pair.symbol}</span>
                        <div className="text-right">
                          <div className="text-white">${pair.price}</div>
                          <div className={`text-sm ${pair.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {pair.change >= 0 ? "+" : ""}
                            {pair.change}%
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Vol: {pair.volume.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Trade {selectedPair}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
                  <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-green-600">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-red-600">
                      Sell
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="buy" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-blue-200 text-sm">Price (USDT)</label>
                        <Input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00"
                          className="bg-slate-700/50 border-blue-500/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-blue-200 text-sm">Amount (BTN)</label>
                        <Input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="bg-slate-700/50 border-blue-500/30 text-white"
                        />
                      </div>
                      <div className="text-sm text-slate-400">
                        Total: ${(Number.parseFloat(price || "0") * Number.parseFloat(amount || "0")).toFixed(2)}
                      </div>
                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!amount || !price}
                      >
                        Place Buy Order
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="sell" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-blue-200 text-sm">Price (USDT)</label>
                        <Input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00"
                          className="bg-slate-700/50 border-blue-500/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-blue-200 text-sm">Amount (BTN)</label>
                        <Input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="bg-slate-700/50 border-blue-500/30 text-white"
                        />
                      </div>
                      <div className="text-sm text-slate-400">
                        Total: ${(Number.parseFloat(price || "0") * Number.parseFloat(amount || "0")).toFixed(2)}
                      </div>
                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full bg-red-600 hover:bg-red-700"
                        disabled={!amount || !price}
                      >
                        Place Sell Order
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Book & Recent Orders */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                        <div>
                          <div
                            className={`text-sm font-medium ${order.order_type === "buy" ? "text-green-400" : "text-red-400"}`}
                          >
                            {order.order_type.toUpperCase()}
                          </div>
                          <div className="text-xs text-slate-400">{order.amount} BTN</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm">${order.price}</div>
                          <Badge
                            className={
                              order.status === "filled"
                                ? "bg-green-600"
                                : order.status === "pending"
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-400 py-8">
                      <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No recent orders</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">$1.25</div>
              <p className="text-blue-200">BTN Price</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">+5.2%</div>
              <p className="text-blue-200">24h Change</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">125K</div>
              <p className="text-blue-200">24h Volume</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <ArrowUpDown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">0.05%</div>
              <p className="text-blue-200">Trading Fee</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
