"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, Circle, ExternalLink, DollarSign, TrendingUp, Repeat } from "lucide-react"

export function DeFiProtocols() {
  const protocols = [
    {
      name: "Uniswap V3",
      category: "DEX",
      status: "connected",
      tvl: "$4.2B",
      apy: "12.5%",
      icon: Repeat,
      features: ["AMM", "Concentrated Liquidity", "Multi-Chain", "Governance"],
    },
    {
      name: "Aave",
      category: "Lending",
      status: "connected",
      tvl: "$6.8B",
      apy: "8.3%",
      icon: DollarSign,
      features: ["Lending", "Borrowing", "Flash Loans", "Governance"],
    },
    {
      name: "Compound",
      category: "Lending",
      status: "connected",
      tvl: "$2.1B",
      apy: "6.7%",
      icon: TrendingUp,
      features: ["Algorithmic Rates", "Governance", "cTokens", "Liquidation"],
    },
    {
      name: "Curve Finance",
      category: "DEX",
      status: "pending",
      tvl: "$3.9B",
      apy: "15.2%",
      icon: Repeat,
      features: ["Stablecoin Swaps", "Low Slippage", "Yield Farming", "veTokens"],
    },
    {
      name: "MakerDAO",
      category: "CDP",
      status: "connected",
      tvl: "$5.4B",
      apy: "4.5%",
      icon: DollarSign,
      features: ["DAI Stablecoin", "Collateral", "Governance", "Savings Rate"],
    },
    {
      name: "Balancer",
      category: "DEX",
      status: "available",
      tvl: "$1.8B",
      apy: "9.8%",
      icon: TrendingUp,
      features: ["Weighted Pools", "Liquidity Mining", "Governance", "Custom AMM"],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">DeFi Protocol Integrations</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Add Protocol
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocols.map((protocol, index) => (
          <Card
            key={index}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <protocol.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{protocol.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{protocol.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {protocol.status === "connected" && <CheckCircle className="h-5 w-5 text-green-500" />}
                {protocol.status === "pending" && <Circle className="h-5 w-5 text-yellow-500" />}
                {protocol.status === "available" && <Circle className="h-5 w-5 text-gray-400" />}
                <Switch checked={protocol.status === "connected"} />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">TVL:</span>
                <span className="font-medium text-gray-900 dark:text-white">{protocol.tvl}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Best APY:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{protocol.apy}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {protocol.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              disabled={protocol.status === "connected"}
            >
              {protocol.status === "connected" ? "Connected" : "Connect"}
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
