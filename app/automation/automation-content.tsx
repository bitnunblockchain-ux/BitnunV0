"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Settings, TrendingUp, DollarSign, Users, Activity } from "lucide-react"

import { useEffect as useEffectHook } from "react"

interface PaymentData {
  id: string
  amount: number
  status: "pending" | "completed" | "failed"
  timestamp: number
}

interface RevenueData {
  id: string
  netRevenue: number
  timestamp: number
}

interface WorkflowData {
  id: string
  name: string
  status: "active" | "paused" | "error"
  executions: number
}

export default function AutomationContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentStats, setPaymentStats] = useState({
    totalPayments: 0,
    successfulPayments: 0,
    totalRevenue: 0,
    averageAmount: 0,
  })
  const [workflows, setWorkflows] = useState<WorkflowData[]>([])
  const [node, setNode] = useState<any>(null)

  useEffectHook(() => {
    const initializeNode = async () => {
      if (typeof window !== "undefined") {
        try {
          const { EnhancedBlockchainNode } = await import("@/lib/blockchain/enhanced-wasm-node")
          const nodeInstance = new EnhancedBlockchainNode()
          setNode(nodeInstance)
        } catch (error) {
          console.error("Failed to initialize blockchain node:", error)
        }
      }
    }

    initializeNode()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      if (!node) return

      try {
        const payments = (await node.getData("payments")) || []
        const revenue = (await node.getData("revenue")) || []

        const successfulPayments = payments.filter((p: PaymentData) => p.status === "completed")
        const totalRevenue = revenue.reduce((sum: number, r: RevenueData) => sum + r.netRevenue, 0)

        setPaymentStats({
          totalPayments: payments.length,
          successfulPayments: successfulPayments.length,
          totalRevenue,
          averageAmount: successfulPayments.length > 0 ? totalRevenue / successfulPayments.length : 0,
        })

        setWorkflows([
          { id: "1", name: "Payment Processing", status: "active", executions: 1247 },
          { id: "2", name: "Revenue Tracking", status: "active", executions: 892 },
          { id: "3", name: "User Notifications", status: "paused", executions: 456 },
        ])
      } catch (error) {
        console.error("Error loading automation data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [node])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-600 font-medium">Loading Automation Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Automation Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage and monitor your automated workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paymentStats.totalPayments}</div>
              <p className="text-xs text-muted-foreground">{paymentStats.successfulPayments} successful</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${paymentStats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Avg: ${paymentStats.averageAmount.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workflows.filter((w) => w.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">{workflows.length} total workflows</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {paymentStats.totalPayments > 0
                  ? ((paymentStats.successfulPayments / paymentStats.totalPayments) * 100).toFixed(1)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">Payment success rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Workflows</CardTitle>
                <CardDescription>Manage your automated processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                          {workflow.status}
                        </Badge>
                        <div>
                          <h3 className="font-medium">{workflow.name}</h3>
                          <p className="text-sm text-muted-foreground">{workflow.executions} executions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          {workflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Analytics</CardTitle>
                <CardDescription>Monitor payment processing performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-medium">
                      {paymentStats.totalPayments > 0
                        ? ((paymentStats.successfulPayments / paymentStats.totalPayments) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      paymentStats.totalPayments > 0
                        ? (paymentStats.successfulPayments / paymentStats.totalPayments) * 100
                        : 0
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <CardDescription>Configure your automation preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
