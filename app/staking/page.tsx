"use client"

import { useState } from "react"
import { StakingHeader } from "@/components/staking/staking-header"
import { StakingPools } from "@/components/staking/staking-pools"
import { StakingStats } from "@/components/staking/staking-stats"
import { MyStakes } from "@/components/staking/my-stakes"

export default function StakingPage() {
  const [activeTab, setActiveTab] = useState<"pools" | "mystakes">("pools")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <StakingHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          <StakingStats />

          {activeTab === "pools" && <StakingPools />}
          {activeTab === "mystakes" && <MyStakes />}
        </div>
      </div>
    </div>
  )
}
