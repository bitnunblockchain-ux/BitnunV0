"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Users, DollarSign, Vote, Gift } from "lucide-react"

interface OpenSourceHeaderProps {
  activeTab: "projects" | "contributors" | "bounties" | "governance" | "incentives"
  onTabChange: (tab: "projects" | "contributors" | "bounties" | "governance" | "incentives") => void
}

export function OpenSourceHeader({ activeTab, onTabChange }: OpenSourceHeaderProps) {
  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Open Source Contribution Hub</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Build the future of sustainable blockchain technology together
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              45+ Active Projects
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Community Driven
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "projects" ? "default" : "outline"}
            onClick={() => onTabChange("projects")}
            className="flex items-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Projects
          </Button>
          <Button
            variant={activeTab === "contributors" ? "default" : "outline"}
            onClick={() => onTabChange("contributors")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Contributors
          </Button>
          <Button
            variant={activeTab === "bounties" ? "default" : "outline"}
            onClick={() => onTabChange("bounties")}
            className="flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            Bounties
          </Button>
          <Button
            variant={activeTab === "governance" ? "default" : "outline"}
            onClick={() => onTabChange("governance")}
            className="flex items-center gap-2"
          >
            <Vote className="h-4 w-4" />
            Governance
          </Button>
          <Button
            variant={activeTab === "incentives" ? "default" : "outline"}
            onClick={() => onTabChange("incentives")}
            className="flex items-center gap-2"
          >
            <Gift className="h-4 w-4" />
            Incentives
          </Button>
        </div>
      </div>
    </Card>
  )
}
