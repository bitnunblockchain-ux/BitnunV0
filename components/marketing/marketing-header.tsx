"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Star, Calendar } from "lucide-react"

interface MarketingHeaderProps {
  activeTab: "campaigns" | "sponsorship" | "partnerships" | "influencers" | "events"
  onTabChange: (tab: "campaigns" | "sponsorship" | "partnerships" | "influencers" | "events") => void
}

export function MarketingHeader({ activeTab, onTabChange }: MarketingHeaderProps) {
  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Marketing & Sponsorship Hub</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Grow the BitnunEco ecosystem through strategic partnerships and campaigns
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              25+ Active Campaigns
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              $2.4M Marketing Budget
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "campaigns" ? "default" : "outline"}
            onClick={() => onTabChange("campaigns")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Campaigns
          </Button>
          <Button
            variant={activeTab === "sponsorship" ? "default" : "outline"}
            onClick={() => onTabChange("sponsorship")}
            className="flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            Sponsorship
          </Button>
          <Button
            variant={activeTab === "partnerships" ? "default" : "outline"}
            onClick={() => onTabChange("partnerships")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Partnerships
          </Button>
          <Button
            variant={activeTab === "influencers" ? "default" : "outline"}
            onClick={() => onTabChange("influencers")}
            className="flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            Influencers
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => onTabChange("events")}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Events
          </Button>
        </div>
      </div>
    </Card>
  )
}
