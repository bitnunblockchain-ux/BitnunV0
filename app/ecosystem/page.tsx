"use client"

import { useState } from "react"
import { EcosystemHeader } from "@/components/ecosystem/ecosystem-header"
import { ChainIntegrations } from "@/components/ecosystem/chain-integrations"
import { Web3Platforms } from "@/components/ecosystem/web3-platforms"
import { DeFiProtocols } from "@/components/ecosystem/defi-protocols"
import { UniversalWallet } from "@/components/ecosystem/universal-wallet"
import { EcosystemStats } from "@/components/ecosystem/ecosystem-stats"

export default function EcosystemPage() {
  const [activeTab, setActiveTab] = useState<"chains" | "platforms" | "defi" | "wallet">("chains")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <EcosystemHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          <EcosystemStats />

          {activeTab === "chains" && <ChainIntegrations />}
          {activeTab === "platforms" && <Web3Platforms />}
          {activeTab === "defi" && <DeFiProtocols />}
          {activeTab === "wallet" && <UniversalWallet />}
        </div>
      </div>
    </div>
  )
}
