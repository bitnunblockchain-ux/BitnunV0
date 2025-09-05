"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { PortfolioOverview } from "@/components/analytics/portfolio-overview"
import { PerformanceCharts } from "@/components/analytics/performance-charts"
import { AssetAllocation } from "@/components/analytics/asset-allocation"
import { RiskAnalysis } from "@/components/analytics/risk-analysis"
import { TaxReporting } from "@/components/analytics/tax-reporting"
import { RealTimeMonitoring } from "@/components/analytics/real-time-monitoring"
import { SystemHealth } from "@/components/analytics/system-health"
import { UserActivityTracker } from "@/components/analytics/user-activity-tracker"

export default function AnalyticsClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />

      <AnalyticsHeader />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 bg-slate-800/50 border-cyan-500/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="allocation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              Allocation
            </TabsTrigger>
            <TabsTrigger
              value="risk"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              Live Monitor
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              System Health
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              User Activity
            </TabsTrigger>
            <TabsTrigger
              value="tax"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-emerald-500"
            >
              Tax Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PortfolioOverview />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceCharts />
          </TabsContent>

          <TabsContent value="allocation">
            <AssetAllocation />
          </TabsContent>

          <TabsContent value="risk">
            <RiskAnalysis />
          </TabsContent>

          <TabsContent value="monitoring">
            <RealTimeMonitoring />
          </TabsContent>

          <TabsContent value="system">
            <SystemHealth />
          </TabsContent>

          <TabsContent value="activity">
            <UserActivityTracker />
          </TabsContent>

          <TabsContent value="tax">
            <TaxReporting />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
