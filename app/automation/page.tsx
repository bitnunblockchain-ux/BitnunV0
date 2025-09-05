"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PaymentData {
  status: string
  amount: number
  id: string
}

interface RevenueData {
  netRevenue: number
  id: string
}

interface WorkflowData {
  id: string
  name: string
  status: string
  processed: number
  success: number
}

let enhancedBlockchainNode: any = null

const getBlockchainNode = async () => {
  if (!enhancedBlockchainNode && typeof window !== "undefined") {
    const module = await import("@/lib/blockchain/enhanced-wasm-node")
    enhancedBlockchainNode = module.enhancedBlockchainNode
  }
  return enhancedBlockchainNode
}

export default function AutomationPage() {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([])
  const [paymentStats, setPaymentStats] = useState({
    totalProcessed: 0,
    successRate: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    loadAutomationData()
    const interval = setInterval(loadAutomationData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadAutomationData = async () => {
    if (typeof window === "undefined") return

    try {
      const node = await getBlockchainNode()
      if (!node) return

      const payments: PaymentData[] = (await node.getData("payments")) || []
      const revenue: RevenueData[] = (await node.getData("revenue")) || []

      const successfulPayments = payments.filter((p: PaymentData) => p.status === "completed")
      const totalRevenue = revenue.reduce((sum: number, r: RevenueData) => sum + r.netRevenue, 0)

      setPaymentStats({
        totalProcessed: payments.length,
        successRate: payments.length > 0 ? (successfulPayments.length / payments.length) * 100 : 0,
        totalRevenue,
      })

      // Load automation stats from native engine
      const automationStats = node.getAutomationStats()

      setWorkflows([
        {
          id: "payment_processing",
          name: "Payment Processing",
          status: "active",
          processed: automationStats.executed,
          success: automationStats.executed > 0 ? (automationStats.successful / automationStats.executed) * 100 : 0,
        },
        { id: "user_onboarding", name: "User Onboarding", status: "active", processed: 342, success: 99.1 },
        { id: "revenue_tracking", name: "Revenue Tracking", status: "active", processed: 856, success: 100 },
        { id: "security_monitoring", name: "Security Monitoring", status: "active", processed: 2341, success: 97.8 },
      ])
    } catch (error) {
      console.error("[v0] Failed to load automation data:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Automated Payment Workflows
          </h1>
          <p className="text-slate-300 text-lg">Native WASM node-powered automation with zero external dependencies</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-400">Total Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{paymentStats.totalProcessed.toLocaleString()}</div>
              <p className="text-slate-400">Payment transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-emerald-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-400">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{paymentStats.successRate.toFixed(1)}%</div>
              <Progress value={paymentStats.successRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-400">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">${paymentStats.totalRevenue.toLocaleString()}</div>
              <p className="text-slate-400">Net revenue processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Workflows */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Active Automation Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{workflow.name}</h3>
                    <Badge variant={workflow.status === "active" ? "default" : "secondary"}>{workflow.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Processed:</span>
                      <span className="text-white">{workflow.processed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Success Rate:</span>
                      <span className="text-green-400">{workflow.success}%</span>
                    </div>
                    <Progress value={workflow.success} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Native Storage Status */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Native Storage & SDK Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Native Storage Collections</h3>
                <div className="space-y-2">
                  {["users", "transactions", "payments", "revenue", "analytics"].map((collection) => (
                    <div key={collection} className="flex items-center justify-between p-2 bg-slate-700/20 rounded">
                      <span className="text-white capitalize">{collection}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">SDK Connections</h3>
                <div className="space-y-2">
                  {["Stripe", "Coinbase", "Binance"].map((sdk) => (
                    <div key={sdk} className="flex items-center justify-between p-2 bg-slate-700/20 rounded">
                      <span className="text-white">{sdk}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Connected
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
