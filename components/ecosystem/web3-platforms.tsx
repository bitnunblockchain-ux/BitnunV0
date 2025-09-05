"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, Circle, ExternalLink, Wallet, Globe, Smartphone } from "lucide-react"

export function Web3Platforms() {
  const platforms = [
    {
      name: "MetaMask",
      category: "Wallet",
      status: "connected",
      users: "30M+",
      icon: Wallet,
      features: ["Browser Extension", "Mobile App", "Hardware Support", "DApp Browser"],
    },
    {
      name: "WalletConnect",
      category: "Protocol",
      status: "connected",
      users: "15M+",
      icon: Smartphone,
      features: ["Mobile Wallets", "QR Code", "Deep Linking", "Multi-Chain"],
    },
    {
      name: "Coinbase Wallet",
      category: "Wallet",
      status: "connected",
      users: "8M+",
      icon: Wallet,
      features: ["Self-Custody", "DApp Browser", "NFT Support", "Staking"],
    },
    {
      name: "Trust Wallet",
      category: "Wallet",
      status: "pending",
      users: "25M+",
      icon: Smartphone,
      features: ["Mobile First", "Multi-Chain", "DeFi Access", "NFT Gallery"],
    },
    {
      name: "Phantom",
      category: "Wallet",
      status: "connected",
      users: "3M+",
      icon: Wallet,
      features: ["Solana Native", "Browser Extension", "Mobile App", "Swap"],
    },
    {
      name: "Rainbow",
      category: "Wallet",
      status: "available",
      users: "1M+",
      icon: Smartphone,
      features: ["iOS/Android", "Beautiful UI", "DeFi Native", "Social Features"],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Web3 Platform Integrations</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Globe className="h-4 w-4 mr-2" />
          Add Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform, index) => (
          <Card
            key={index}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  <platform.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{platform.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {platform.status === "connected" && <CheckCircle className="h-5 w-5 text-green-500" />}
                {platform.status === "pending" && <Circle className="h-5 w-5 text-yellow-500" />}
                {platform.status === "available" && <Circle className="h-5 w-5 text-gray-400" />}
                <Switch checked={platform.status === "connected"} />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Active Users:</span>
                <span className="font-medium text-gray-900 dark:text-white">{platform.users}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {platform.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              disabled={platform.status === "connected"}
            >
              {platform.status === "connected" ? "Connected" : "Connect"}
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
