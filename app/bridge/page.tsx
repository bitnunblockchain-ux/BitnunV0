"use client"

import { useState } from "react"
import { BridgeHeader } from "@/components/bridge/bridge-header"
import { BridgeInterface } from "@/components/bridge/bridge-interface"
import { BridgeHistory } from "@/components/bridge/bridge-history"
import { NetworkStatus } from "@/components/bridge/network-status"
import { CrossChainStats } from "@/components/bridge/cross-chain-stats"

export default function BridgePage() {
  const [activeTab, setActiveTab] = useState<"bridge" | "history" | "networks">("bridge")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <BridgeHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          <CrossChainStats />

          {activeTab === "bridge" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BridgeInterface />
              </div>
              <div className="lg:col-span-1">
                <NetworkStatus />
              </div>
            </div>
          )}

          {activeTab === "history" && <BridgeHistory />}
          {activeTab === "networks" && <NetworkStatus />}
        </div>
      </div>
    </div>
  )
}
