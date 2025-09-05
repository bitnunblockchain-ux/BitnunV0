"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Settings, Code, BookOpen, Wrench } from "lucide-react"

interface SDKHeaderProps {
  activeTab: "downloads" | "api" | "examples" | "guides" | "tools"
  onTabChange: (tab: "downloads" | "api" | "examples" | "guides" | "tools") => void
}

export function SDKHeader({ activeTab, onTabChange }: SDKHeaderProps) {
  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">BitnunEco SDK & API Management</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Build powerful applications with our comprehensive development toolkit
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              v2.1.0 Latest
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Multi-Language Support
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "downloads" ? "default" : "outline"}
            onClick={() => onTabChange("downloads")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            SDK Downloads
          </Button>
          <Button
            variant={activeTab === "api" ? "default" : "outline"}
            onClick={() => onTabChange("api")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            API Management
          </Button>
          <Button
            variant={activeTab === "examples" ? "default" : "outline"}
            onClick={() => onTabChange("examples")}
            className="flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            Code Examples
          </Button>
          <Button
            variant={activeTab === "guides" ? "default" : "outline"}
            onClick={() => onTabChange("guides")}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Integration Guides
          </Button>
          <Button
            variant={activeTab === "tools" ? "default" : "outline"}
            onClick={() => onTabChange("tools")}
            className="flex items-center gap-2"
          >
            <Wrench className="h-4 w-4" />
            Developer Tools
          </Button>
        </div>
      </div>
    </Card>
  )
}
