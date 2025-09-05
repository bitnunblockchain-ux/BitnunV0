"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

interface OrderBookProps {
  selectedPair: string
}

interface Order {
  price: number
  amount: number
  total: number
}

export function OrderBook({ selectedPair }: OrderBookProps) {
  const [buyOrders, setBuyOrders] = useState<Order[]>([])
  const [sellOrders, setSellOrders] = useState<Order[]>([])
  const [spread, setSpread] = useState(0)

  // Generate realistic order book data
  useEffect(() => {
    const generateOrders = (basePrice: number, isBuy: boolean): Order[] => {
      const orders: Order[] = []
      for (let i = 0; i < 10; i++) {
        const priceOffset = Math.random() * 0.001 * (isBuy ? -1 : 1)
        const price = basePrice + priceOffset - (isBuy ? i * 0.0001 : -i * 0.0001)
        const amount = Math.random() * 10000 + 1000
        const total = price * amount
        orders.push({ price, amount, total })
      }
      return orders.sort((a, b) => (isBuy ? b.price - a.price : a.price - b.price))
    }

    const basePrice = 0.0245
    const newBuyOrders = generateOrders(basePrice, true)
    const newSellOrders = generateOrders(basePrice, false)

    setBuyOrders(newBuyOrders)
    setSellOrders(newSellOrders)
    setSpread(newSellOrders[0]?.price - newBuyOrders[0]?.price || 0)

    const interval = setInterval(() => {
      setBuyOrders(generateOrders(basePrice, true))
      setSellOrders(generateOrders(basePrice, false))
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedPair])

  return (
    <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
        <Badge variant="outline" className="text-xs">
          Spread: ${spread.toFixed(6)}
        </Badge>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
        <div>Price</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>

      {/* Sell Orders */}
      <div className="space-y-1 mb-4">
        {sellOrders
          .slice(0, 8)
          .reverse()
          .map((order, index) => (
            <div
              key={`sell-${index}`}
              className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              <div className="text-red-500 font-mono">{order.price.toFixed(6)}</div>
              <div className="text-right text-gray-600 dark:text-gray-300 font-mono">{order.amount.toFixed(0)}</div>
              <div className="text-right text-gray-600 dark:text-gray-300 font-mono">{order.total.toFixed(2)}</div>
            </div>
          ))}
      </div>

      {/* Current Price */}
      <div className="flex items-center justify-center py-2 mb-4 bg-emerald-50 dark:bg-emerald-900/20 rounded">
        <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ${buyOrders[0]?.price.toFixed(6) || "0.024500"}
        </span>
      </div>

      {/* Buy Orders */}
      <div className="space-y-1">
        {buyOrders.slice(0, 8).map((order, index) => (
          <div
            key={`buy-${index}`}
            className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded"
          >
            <div className="text-emerald-500 font-mono">{order.price.toFixed(6)}</div>
            <div className="text-right text-gray-600 dark:text-gray-300 font-mono">{order.amount.toFixed(0)}</div>
            <div className="text-right text-gray-600 dark:text-gray-300 font-mono">{order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
