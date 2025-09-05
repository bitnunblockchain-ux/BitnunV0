"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Clock, CheckCircle, XCircle } from "lucide-react"

interface SwapTransaction {
  id: string
  timestamp: Date
  tokenIn: string
  tokenOut: string
  amountIn: number
  amountOut: number
  rate: number
  fee: number
  status: "completed" | "pending" | "failed"
  txHash: string
  slippage: number
}

export function SwapHistory() {
  const [transactions, setTransactions] = useState<SwapTransaction[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  useEffect(() => {
    const mockTransactions: SwapTransaction[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 300000),
        tokenIn: "BTN",
        tokenOut: "USDT",
        amountIn: 1000,
        amountOut: 5350,
        rate: 5.35,
        fee: 0.53,
        status: "completed",
        txHash: "0x1234...5678",
        slippage: 0.12,
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 900000),
        tokenIn: "USDT",
        tokenOut: "ETH",
        amountIn: 2650,
        amountOut: 1.0,
        rate: 2650,
        fee: 2.65,
        status: "completed",
        txHash: "0x2345...6789",
        slippage: 0.08,
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 60000),
        tokenIn: "ETH",
        tokenOut: "BTN",
        amountIn: 0.5,
        amountOut: 247.66,
        rate: 495.32,
        fee: 1.32,
        status: "pending",
        txHash: "0x3456...7890",
        slippage: 0.15,
      },
    ]
    setTransactions(mockTransactions)
  }, [])

  const filteredTransactions = filter === "all" ? transactions : transactions.filter((tx) => tx.status === filter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Swap History
        </h2>
        <div className="flex gap-2">
          {(["all", "completed", "pending", "failed"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? "bg-emerald-600 hover:bg-emerald-700" : "border-gray-700"}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Transactions</h3>
              <p className="text-gray-400">Your swap history will appear here</p>
            </CardContent>
          </Card>
        ) : (
          filteredTransactions.map((tx) => (
            <Card
              key={tx.id}
              className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(tx.status)}
                      <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="font-semibold text-white">{tx.amountIn.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">{tx.tokenIn}</p>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-400" />

                      <div className="text-center">
                        <p className="font-semibold text-white">{tx.amountOut.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">{tx.tokenOut}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">{formatTime(tx.timestamp)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-400 hover:text-emerald-400">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-800">
                  <div>
                    <p className="text-sm text-gray-400">Rate</p>
                    <p className="font-semibold text-white">
                      1 {tx.tokenIn} = {tx.rate.toLocaleString()} {tx.tokenOut}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Fee</p>
                    <p className="font-semibold text-white">${tx.fee.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Slippage</p>
                    <p className="font-semibold text-white">{tx.slippage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Tx Hash</p>
                    <p className="font-mono text-sm text-emerald-400">{tx.txHash}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
