"use client"

import { useState } from "react"
import { CommunityHeader } from "@/components/community/community-header"
import { CommunityForum } from "@/components/community/community-forum"
import { LiveChat } from "@/components/community/live-chat"
import { NewsAnnouncements } from "@/components/community/news-announcements"
import { CommunityEvents } from "@/components/community/community-events"
import { SupportCenter } from "@/components/community/support-center"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"forum" | "chat" | "news" | "events" | "support">("forum")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <CommunityHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          {activeTab === "forum" && <CommunityForum />}
          {activeTab === "chat" && <LiveChat />}
          {activeTab === "news" && <NewsAnnouncements />}
          {activeTab === "events" && <CommunityEvents />}
          {activeTab === "support" && <SupportCenter />}
        </div>
      </div>
    </div>
  )
}
