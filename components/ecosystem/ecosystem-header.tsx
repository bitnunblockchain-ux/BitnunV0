"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Wallet, DollarSign, Globe } from "lucide-react"

interface EcosystemHeaderProps {
  activeTab: "chains" | "platforms" | "defi" | "wallet"
  onTabChange: (tab: "chains" | "platforms" | "defi" | "wallet") => void
}

export function EcosystemHeader({ activeTab, onTabChange }: EcosystemHeaderProps) {
  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Multi-Chain Ecosystem Hub</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Connect to all blockchain networks and Web3 platforms seamlessly
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              50+ Chains Supported
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Universal Compatibility
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "chains" ? "default" : "outline"}
            onClick={() => onTabChange("chains")}
            className="flex items-center gap-2"
          >
            <Network className="h-4 w-4" />
            Blockchain Networks
          </Button>
          <Button
            variant={activeTab === "platforms" ? "default" : "outline"}
            onClick={() => onTabChange("platforms")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Web3 Platforms
          </Button>
          <Button
            variant={activeTab === "defi" ? "default" : "outline"}
            onClick={() => onTabChange("defi")}
            className="flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            DeFi Protocols
          </Button>
          <Button
            variant={activeTab === "wallet" ? "default" : "outline"}
            onClick={() => onTabChange("wallet")}
            className="flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            Universal Wallet
          </Button>
        </div>
      </div>
    </Card>
  )
}
