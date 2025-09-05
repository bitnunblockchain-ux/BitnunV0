"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Maximize2 } from "lucide-react"

interface TradingChartProps {
  selectedPair: string
}

export function TradingChart({ selectedPair }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState("1H")
  const [price, setPrice] = useState(0.0245)
  const [change, setChange] = useState(12.5)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = price + (Math.random() - 0.5) * 0.001
      const newChange = ((newPrice - 0.0245) / 0.0245) * 100
      setPrice(newPrice)
      setChange(newChange)
    }, 2000)

    return () => clearInterval(interval)
  }, [price])

  const timeframes = ["1M", "5M", "15M", "1H", "4H", "1D", "1W"]

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedPair} Chart</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${price.toFixed(6)}</span>
            <Badge variant={change >= 0 ? "default" : "destructive"} className={change >= 0 ? "bg-emerald-500" : ""}>
              {change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="h-8 px-3"
              >
                {tf}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative h-96 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Real-time {selectedPair} trading chart</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Advanced charting with technical indicators</p>
          </div>
        </div>

        {/* Simulated chart elements */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 50 300 Q 150 250 250 200 T 450 180 T 650 160"
            stroke="rgb(16, 185, 129)"
            strokeWidth="2"
            fill="none"
          />
          <path d="M 50 300 Q 150 250 250 200 T 450 180 T 650 160 L 650 384 L 50 384 Z" fill="url(#priceGradient)" />
        </svg>
      </div>
    </Card>
  )
}
