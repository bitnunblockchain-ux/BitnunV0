"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, CheckCircle, Layers } from "lucide-react"

interface LaunchpadHeaderProps {
  activeTab: "active" | "upcoming" | "completed" | "types"
  onTabChange: (tab: "active" | "upcoming" | "completed" | "types") => void
}

export function LaunchpadHeader({ activeTab, onTabChange }: LaunchpadHeaderProps) {
  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">BitnunEco Launchpad</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Comprehensive fundraising platform for innovative blockchain projects
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              IDO • IEO • ICO • STO
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              $2.4B+ Raised
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            onClick={() => onTabChange("active")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Active Sales
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            onClick={() => onTabChange("upcoming")}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Upcoming
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => onTabChange("completed")}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Completed
          </Button>
          <Button
            variant={activeTab === "types" ? "default" : "outline"}
            onClick={() => onTabChange("types")}
            className="flex items-center gap-2"
          >
            <Layers className="h-4 w-4" />
            Launchpad Types
          </Button>
        </div>
      </div>
    </Card>
  )
}
