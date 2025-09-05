"use client"

import { useState } from "react"
import { LaunchpadHeader } from "@/components/launchpad/launchpad-header"
import { LaunchpadStats } from "@/components/launchpad/launchpad-stats"
import { ActiveSales } from "@/components/launchpad/active-sales"
import { UpcomingProjects } from "@/components/launchpad/upcoming-projects"
import { CompletedSales } from "@/components/launchpad/completed-sales"
import { LaunchpadTypes } from "@/components/launchpad/launchpad-types"

export default function LaunchpadPage() {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "completed" | "types">("active")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <LaunchpadHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          <LaunchpadStats />

          {activeTab === "active" && <ActiveSales />}
          {activeTab === "upcoming" && <UpcomingProjects />}
          {activeTab === "completed" && <CompletedSales />}
          {activeTab === "types" && <LaunchpadTypes />}
        </div>
      </div>
    </div>
  )
}
