"use client"

import { useState } from "react"
import { SDKHeader } from "@/components/sdk/sdk-header"
import { SDKDownloads } from "@/components/sdk/sdk-downloads"
import { APIManagement } from "@/components/sdk/api-management"
import { CodeExamples } from "@/components/sdk/code-examples"
import { IntegrationGuides } from "@/components/sdk/integration-guides"
import { DeveloperTools } from "@/components/sdk/developer-tools"

export default function SDKPage() {
  const [activeTab, setActiveTab] = useState<"downloads" | "api" | "examples" | "guides" | "tools">("downloads")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <SDKHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-6">
          {activeTab === "downloads" && <SDKDownloads />}
          {activeTab === "api" && <APIManagement />}
          {activeTab === "examples" && <CodeExamples />}
          {activeTab === "guides" && <IntegrationGuides />}
          {activeTab === "tools" && <DeveloperTools />}
        </div>
      </div>
    </div>
  )
}
