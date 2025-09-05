"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, Circle, ExternalLink, Zap } from "lucide-react"

export function ChainIntegrations() {
  const chains = [
    {
      name: "Ethereum",
      symbol: "ETH",
      status: "connected",
      tvl: "$45.2B",
      gasPrice: "12 gwei",
      blockTime: "12s",
      features: ["Smart Contracts", "DeFi", "NFTs", "Layer 2"],
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      status: "connected",
      tvl: "$892.1B",
      gasPrice: "5 sat/vB",
      blockTime: "10m",
      features: ["Store of Value", "Lightning Network", "Ordinals"],
    },
    {
      name: "Solana",
      symbol: "SOL",
      status: "connected",
      tvl: "$8.7B",
      gasPrice: "0.00025 SOL",
      blockTime: "400ms",
      features: ["High Speed", "Low Fees", "DeFi", "NFTs"],
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      status: "connected",
      tvl: "$1.2B",
      gasPrice: "30 gwei",
      blockTime: "2s",
      features: ["Ethereum L2", "Low Fees", "Fast Transactions"],
    },
    {
      name: "Cardano",
      symbol: "ADA",
      status: "pending",
      tvl: "$890M",
      gasPrice: "0.17 ADA",
      blockTime: "20s",
      features: ["Proof of Stake", "Smart Contracts", "Sustainability"],
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      status: "available",
      tvl: "$1.8B",
      gasPrice: "Variable",
      blockTime: "6s",
      features: ["Interoperability", "Parachains", "Cross-Chain"],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blockchain Network Integrations</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Zap className="h-4 w-4 mr-2" />
          Connect New Chain
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chains.map((chain, index) => (
          <Card
            key={index}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  {chain.symbol.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{chain.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{chain.symbol}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {chain.status === "connected" && <CheckCircle className="h-5 w-5 text-green-500" />}
                {chain.status === "pending" && <Circle className="h-5 w-5 text-yellow-500" />}
                {chain.status === "available" && <Circle className="h-5 w-5 text-gray-400" />}
                <Switch checked={chain.status === "connected"} />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">TVL:</span>
                <span className="font-medium text-gray-900 dark:text-white">{chain.tvl}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Gas Price:</span>
                <span className="font-medium text-gray-900 dark:text-white">{chain.gasPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Block Time:</span>
                <span className="font-medium text-gray-900 dark:text-white">{chain.blockTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {chain.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              disabled={chain.status === "connected"}
            >
              {chain.status === "connected" ? "Connected" : "Connect"}
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
