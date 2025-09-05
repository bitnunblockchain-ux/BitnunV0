"use client"

import { useState } from "react"
import { OpenSourceHeader } from "@/components/opensource/opensource-header"
import { ProjectsOverview } from "@/components/opensource/projects-overview"
import { ContributorDashboard } from "@/components/opensource/contributor-dashboard"
import { BountyPrograms } from "@/components/opensource/bounty-programs"
import { CommunityGovernance } from "@/components/opensource/community-governance"
import { DeveloperIncentives } from "@/components/opensource/developer-incentives"

export default function OpenSourcePage() {
  const [activeTab, setActiveTab] = useState<"projects" | "contributors" | "bounties" | "governance" | "incentives">(
    "projects",
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <OpenSourceHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          {activeTab === "projects" && <ProjectsOverview />}
          {activeTab === "contributors" && <ContributorDashboard />}
          {activeTab === "bounties" && <BountyPrograms />}
          {activeTab === "governance" && <CommunityGovernance />}
          {activeTab === "incentives" && <DeveloperIncentives />}
        </div>
      </div>
    </div>
  )
}
