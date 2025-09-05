"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Star, Copy, ExternalLink } from "lucide-react"

interface TradingSignal {
  id: string
  trader: string
  traderAvatar: string
  traderRating: number
  followers: number
  signal: "BUY" | "SELL" | "HOLD"
  asset: string
  price: number
  targetPrice: number
  stopLoss: number
  confidence: number
  timeframe: string
  description: string
  timestamp: Date
  performance: number
}

export function TradingSignals() {
  const [signals, setSignals] = useState<TradingSignal[]>([])
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL" | "HOLD">("ALL")

  useEffect(() => {
    // Simulate real-time trading signals
    const mockSignals: TradingSignal[] = [
      {
        id: "1",
        trader: "CryptoMaster",
        traderAvatar: "/placeholder.svg?height=40&width=40",
        traderRating: 4.8,
        followers: 12500,
        signal: "BUY",
        asset: "BTC/USDT",
        price: 43250,
        targetPrice: 45000,
        stopLoss: 42000,
        confidence: 85,
        timeframe: "4H",
        description: "Strong bullish momentum with RSI oversold recovery",
        timestamp: new Date(),
        performance: 12.5,
      },
      {
        id: "2",
        trader: "DeFiWhale",
        traderAvatar: "/placeholder.svg?height=40&width=40",
        traderRating: 4.6,
        followers: 8900,
        signal: "SELL",
        asset: "ETH/USDT",
        price: 2650,
        targetPrice: 2500,
        stopLoss: 2700,
        confidence: 78,
        timeframe: "1D",
        description: "Resistance at key level, expecting pullback",
        timestamp: new Date(Date.now() - 300000),
        performance: -3.2,
      },
    ]
    setSignals(mockSignals)
  }, [])

  const filteredSignals = filter === "ALL" ? signals : signals.filter((s) => s.signal === filter)

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "SELL":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "HOLD":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Trading Signals
          </h2>
          <p className="text-gray-400">Follow top traders and copy their strategies</p>
        </div>
        <div className="flex gap-2">
          {(["ALL", "BUY", "SELL", "HOLD"] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSignals.map((signal) => (
          <Card
            key={signal.id}
            className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={signal.traderAvatar || "/placeholder.svg"}
                    alt={signal.trader}
                    className="w-10 h-10 rounded-full border-2 border-emerald-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{signal.trader}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-400">{signal.traderRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{signal.followers.toLocaleString()} followers</span>
                      <span className={`ml-2 ${signal.performance > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {signal.performance > 0 ? "+" : ""}
                        {signal.performance}%
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getSignalColor(signal.signal)}>{signal.signal}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Asset</p>
                  <p className="font-semibold text-white">{signal.asset}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Entry Price</p>
                  <p className="font-semibold text-white">${signal.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Target</p>
                  <p className="font-semibold text-emerald-400">${signal.targetPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Stop Loss</p>
                  <p className="font-semibold text-red-400">${signal.stopLoss.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Confidence:</span>
                    <span className="font-semibold text-emerald-400">{signal.confidence}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Timeframe:</span>
                    <span className="font-semibold text-white">{signal.timeframe}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 hover:border-emerald-500 bg-transparent"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Trade
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 hover:border-emerald-500 bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded-lg">{signal.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
