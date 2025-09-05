"use client"

import { useState } from "react"
import { MarketingHeader } from "@/components/marketing/marketing-header"
import { CampaignDashboard } from "@/components/marketing/campaign-dashboard"
import { SponsorshipPackages } from "@/components/marketing/sponsorship-packages"
import { BrandPartnerships } from "@/components/marketing/brand-partnerships"
import { InfluencerProgram } from "@/components/marketing/influencer-program"
import { EventSponsorship } from "@/components/marketing/event-sponsorship"

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "sponsorship" | "partnerships" | "influencers" | "events">(
    "campaigns",
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <MarketingHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          {activeTab === "campaigns" && <CampaignDashboard />}
          {activeTab === "sponsorship" && <SponsorshipPackages />}
          {activeTab === "partnerships" && <BrandPartnerships />}
          {activeTab === "influencers" && <InfluencerProgram />}
          {activeTab === "events" && <EventSponsorship />}
        </div>
      </div>
    </div>
  )
}
