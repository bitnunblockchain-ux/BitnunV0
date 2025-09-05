"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface TradingHeaderProps {
  selectedPair: string
  onPairChange: (pair: string) => void
}

export function TradingHeader({ selectedPair, onPairChange }: TradingHeaderProps) {
  const [pairs] = useState([
    { symbol: "BTN/USDT", price: 0.0245, change: 12.5, volume: "2.4M" },
    { symbol: "BTN/ETH", price: 0.000015, change: -3.2, volume: "890K" },
    { symbol: "BTN/BTC", price: 0.00000058, change: 8.7, volume: "1.2M" },
  ])

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DeFi Trading Hub</h1>
            <p className="text-gray-600 dark:text-gray-300">Advanced trading with real-time execution</p>
          </div>

          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
          >
            <Activity className="w-3 h-3 mr-1" />
            Live Trading
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {pairs.map((pair) => (
            <Button
              key={pair.symbol}
              variant={selectedPair === pair.symbol ? "default" : "outline"}
              onClick={() => onPairChange(pair.symbol)}
              className="flex flex-col items-start p-3 h-auto"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">{pair.symbol}</span>
                {pair.change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
              <div className="text-xs opacity-75">
                ${pair.price} ({pair.change > 0 ? "+" : ""}
                {pair.change}%)
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
