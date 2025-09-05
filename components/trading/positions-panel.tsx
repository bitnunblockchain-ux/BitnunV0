"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, X } from "lucide-react"

interface Position {
  id: string
  pair: string
  side: "long" | "short"
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  margin: number
}

export function PositionsPanel() {
  const [positions, setPositions] = useState<Position[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    // Generate realistic positions data
    const mockPositions: Position[] = [
      {
        id: "1",
        pair: "BTN/USDT",
        side: "long",
        size: 5000,
        entryPrice: 0.024,
        currentPrice: 0.0245,
        pnl: 25.0,
        pnlPercent: 2.08,
        margin: 120.0,
      },
      {
        id: "2",
        pair: "BTN/ETH",
        side: "short",
        size: 2500,
        entryPrice: 0.000016,
        currentPrice: 0.000015,
        pnl: 15.5,
        pnlPercent: 6.25,
        margin: 80.0,
      },
    ]

    const mockOrders = [
      {
        id: "1",
        pair: "BTN/USDT",
        type: "limit",
        side: "buy",
        amount: 1000,
        price: 0.0235,
        filled: 0,
        status: "open",
      },
      {
        id: "2",
        pair: "BTN/BTC",
        type: "stop",
        side: "sell",
        amount: 500,
        price: 0.00000055,
        filled: 0,
        status: "pending",
      },
    ]

    const mockHistory = [
      {
        id: "1",
        pair: "BTN/USDT",
        side: "buy",
        amount: 2000,
        price: 0.0238,
        total: 47.6,
        time: "2024-01-15 14:30:25",
        status: "completed",
      },
      {
        id: "2",
        pair: "BTN/ETH",
        side: "sell",
        amount: 1500,
        price: 0.000017,
        total: 25.5,
        time: "2024-01-15 13:45:12",
        status: "completed",
      },
    ]

    setPositions(mockPositions)
    setOrders(mockOrders)
    setHistory(mockHistory)
  }, [])

  const closePosition = (positionId: string) => {
    setPositions(positions.filter((p) => p.id !== positionId))
  }

  const cancelOrder = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId))
  }

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positions">Positions ({positions.length})</TabsTrigger>
          <TabsTrigger value="orders">Open Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="mt-4">
          {positions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No open positions</div>
          ) : (
            <div className="space-y-3">
              {positions.map((position) => (
                <div
                  key={position.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{position.pair}</span>
                        <Badge
                          variant={position.side === "long" ? "default" : "destructive"}
                          className={position.side === "long" ? "bg-emerald-500" : ""}
                        >
                          {position.side === "long" ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {position.side.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Size: {position.size.toLocaleString()} | Entry: ${position.entryPrice.toFixed(6)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-semibold ${position.pnl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}
                    </div>
                    <div className={`text-sm ${position.pnlPercent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {position.pnlPercent >= 0 ? "+" : ""}
                      {position.pnlPercent.toFixed(2)}%
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => closePosition(position.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No open orders</div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.pair}</span>
                      <Badge variant="outline">{order.type.toUpperCase()}</Badge>
                      <Badge variant={order.side === "buy" ? "default" : "destructive"}>
                        {order.side.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {order.amount.toLocaleString()} @ ${order.price.toFixed(6)}
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant="secondary">{order.status}</Badge>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Filled: {order.filled}/{order.amount}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => cancelOrder(order.id)}>
                    Cancel
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="space-y-3">
            {history.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{trade.pair}</span>
                    <Badge variant={trade.side === "buy" ? "default" : "destructive"}>{trade.side.toUpperCase()}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {trade.amount.toLocaleString()} @ ${trade.price.toFixed(6)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">${trade.total.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{trade.time}</div>
                </div>

                <Badge variant="secondary">{trade.status}</Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
