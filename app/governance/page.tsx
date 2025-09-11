"use client"

import { useState } from "react"
import { GovernanceHeader } from "@/components/governance/governance-header"
import { GovernanceStats } from "@/components/governance/governance-stats"
import { ProposalsList } from "@/components/governance/proposals-list"
import { TreasuryOverview } from "@/components/governance/treasury-overview"
import { VotingPower } from "@/components/governance/voting-power"
import { CreateProposalModal } from "@/components/governance/create-proposal-modal"

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<"proposals" | "treasury" | "voting">("proposals")
  const [showCreateProposal, setShowCreateProposal] = useState(false)

  const handleTabChange = (tab: string) => {
    if (tab === "proposals" || tab === "treasury" || tab === "voting") {
      setActiveTab(tab)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <GovernanceHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onCreateProposal={() => setShowCreateProposal(true)}
        />

        <div className="mt-6 space-y-6">
          <GovernanceStats />

          {activeTab === "proposals" && <ProposalsList />}
          {activeTab === "treasury" && <TreasuryOverview />}
          {activeTab === "voting" && <VotingPower />}
        </div>

        {showCreateProposal && <CreateProposalModal onClose={() => setShowCreateProposal(false)} />}
      </div>
    </div>
  )
}
