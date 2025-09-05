"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, MessageCircle, Megaphone, Calendar, HelpCircle } from "lucide-react"

interface CommunityHeaderProps {
  activeTab: "forum" | "chat" | "news" | "events" | "support"
  onTabChange: (tab: "forum" | "chat" | "news" | "events" | "support") => void
}

export function CommunityHeader({ activeTab, onTabChange }: CommunityHeaderProps) {
  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community Hub</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Connect, collaborate, and grow with the BitnunEco community
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              45K+ Members
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              24/7 Active
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "forum" ? "default" : "outline"}
            onClick={() => onTabChange("forum")}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Forum
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "outline"}
            onClick={() => onTabChange("chat")}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Live Chat
          </Button>
          <Button
            variant={activeTab === "news" ? "default" : "outline"}
            onClick={() => onTabChange("news")}
            className="flex items-center gap-2"
          >
            <Megaphone className="h-4 w-4" />
            News
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => onTabChange("events")}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Events
          </Button>
          <Button
            variant={activeTab === "support" ? "default" : "outline"}
            onClick={() => onTabChange("support")}
            className="flex items-center gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Support
          </Button>
        </div>
      </div>
    </Card>
  )
}
