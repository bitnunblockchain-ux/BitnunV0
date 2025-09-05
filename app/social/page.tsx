"use client"

import { useState } from "react"
import { SocialHeader } from "@/components/social/social-header"
import { SocialFeed } from "@/components/social/social-feed"
import { TopTraders } from "@/components/social/top-traders"
import { CreatorSpotlight } from "@/components/social/creator-spotlight"
import { TradingSignals } from "@/components/social/trading-signals"

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "traders" | "creators" | "signals">("feed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <SocialHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === "feed" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SocialFeed />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <TopTraders />
                <CreatorSpotlight />
              </div>
            </div>
          )}

          {activeTab === "traders" && <TopTraders />}
          {activeTab === "creators" && <CreatorSpotlight />}
          {activeTab === "signals" && <TradingSignals />}
        </div>
      </div>
    </div>
  )
}
