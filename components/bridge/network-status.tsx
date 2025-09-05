"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, Zap } from "lucide-react"

interface NetworkStatus {
  id: string
  name: string
  symbol: string
  color: string
  status: "online" | "congested" | "maintenance"
  blockTime: number
  gasPrice: number
  tvl: number
  transactions24h: number
}

export function NetworkStatus() {
  const [networks, setNetworks] = useState<NetworkStatus[]>([])

  useEffect(() => {
    const mockNetworks: NetworkStatus[] = [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        color: "bg-blue-500",
        status: "online",
        blockTime: 12,
        gasPrice: 25.5,
        tvl: 12500000,
        transactions24h: 1250,
      },
      {
        id: "polygon",
        name: "Polygon",
        symbol: "MATIC",
        color: "bg-purple-500",
        status: "online",
        blockTime: 2,
        gasPrice: 0.1,
        tvl: 8900000,
        transactions24h: 3400,
      },
      {
        id: "bsc",
        name: "BSC",
        symbol: "BNB",
        color: "bg-yellow-500",
        status: "congested",
        blockTime: 3,
        gasPrice: 0.5,
        tvl: 6700000,
        transactions24h: 2100,
      },
      {
        id: "arbitrum",
        name: "Arbitrum",
        symbol: "ARB",
        color: "bg-blue-600",
        status: "online",
        blockTime: 1,
        gasPrice: 2.1,
        tvl: 4200000,
        transactions24h: 890,
      },
      {
        id: "optimism",
        name: "Optimism",
        symbol: "OP",
        color: "bg-red-500",
        status: "online",
        blockTime: 2,
        gasPrice: 1.8,
        tvl: 3100000,
        transactions24h: 650,
      },
      {
        id: "avalanche",
        name: "Avalanche",
        symbol: "AVAX",
        color: "bg-red-600",
        status: "maintenance",
        blockTime: 2,
        gasPrice: 0.8,
        tvl: 2800000,
        transactions24h: 420,
      },
    ]

    setNetworks(mockNetworks)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNetworks((prev) =>
        prev.map((network) => ({
          ...network,
          gasPrice: network.gasPrice + (Math.random() - 0.5) * 0.1,
          transactions24h: network.transactions24h + Math.floor(Math.random() * 10),
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "congested":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "maintenance":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500"
      case "congested":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Network Status</h3>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
          <Zap className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>

      <div className="space-y-4">
        {networks.map((network) => (
          <div
            key={network.id}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${network.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{network.symbol[0]}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{network.name}</h4>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(network.status)}
                    <Badge variant="secondary" className={`${getStatusColor(network.status)} text-white`}>
                      {network.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-300">Block Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">{network.blockTime}s</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Gas Price</p>
                <p className="font-semibold text-gray-900 dark:text-white">${network.gasPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">TVL</p>
                <p className="font-semibold text-gray-900 dark:text-white">${(network.tvl / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">24h Txns</p>
                <p className="font-semibold text-gray-900 dark:text-white">{network.transactions24h}</p>
              </div>
            </div>

            {network.status === "maintenance" && (
              <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-600 dark:text-red-400">
                Network is under maintenance. Bridging temporarily unavailable.
              </div>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 bg-transparent">
        Add Custom Network
      </Button>
    </Card>
  )
}
