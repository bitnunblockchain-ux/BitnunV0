"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Settings, TrendingUp, Clock, CheckCircle, XCircle, Zap, Activity, DollarSign } from "lucide-react"
import type { PaymentWorkflow } from "@/lib/automation/payment-automation"

export function AutomationDashboard() {
  const [workflows, setWorkflows] = useState<PaymentWorkflow[]>([])
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    activeWorkflows: 0,
    totalExecutions: 0,
    successRate: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    loadWorkflows()
    loadStats()
  }, [])

  const loadWorkflows = async () => {
    // Mock data - in production, load from database
    const mockWorkflows: PaymentWorkflow[] = [
      {
        id: "1",
        name: "Daily Mining Rewards",
        type: "scheduled",
        status: "active",
        conditions: [{ type: "time", operator: "equals", value: "00:00" }],
        actions: [{ type: "mint_tokens", parameters: { amount: 100 } }],
        schedule: "daily",
        successCount: 847,
        failureCount: 3,
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
      },
      {
        id: "2",
        name: "High-Value Transaction Alert",
        type: "conditional",
        status: "active",
        conditions: [{ type: "amount", operator: "greater_than", value: 10000 }],
        actions: [{ type: "send_notification", parameters: { type: "alert" } }],
        successCount: 234,
        failureCount: 1,
        lastRun: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: "3",
        name: "Weekly Staking Rewards",
        type: "scheduled",
        status: "active",
        conditions: [],
        actions: [{ type: "execute_contract", parameters: { contractId: "staking-rewards" } }],
        schedule: "weekly",
        successCount: 52,
        failureCount: 0,
        lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: "4",
        name: "Failed Payment Retry",
        type: "trigger-based",
        status: "paused",
        conditions: [{ type: "user_type", operator: "equals", value: "premium" }],
        actions: [{ type: "send_payment", parameters: { retry: true } }],
        successCount: 156,
        failureCount: 12,
      },
    ]
    setWorkflows(mockWorkflows)
  }

  const loadStats = () => {
    setStats({
      totalWorkflows: 24,
      activeWorkflows: 18,
      totalExecutions: 15847,
      successRate: 99.2,
      totalRevenue: 2847293,
    })
  }

  const toggleWorkflow = async (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, status: workflow.status === "active" ? "paused" : "active" }
          : workflow,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "stopped":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "conditional":
        return <Zap className="h-4 w-4" />
      case "trigger-based":
        return <Activity className="h-4 w-4" />
      case "recurring":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/20 border-cyan-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400 text-sm font-medium">Total Workflows</p>
                <p className="text-2xl font-bold text-white">{stats.totalWorkflows}</p>
              </div>
              <Settings className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border-emerald-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-400 text-sm font-medium">Active Workflows</p>
                <p className="text-2xl font-bold text-white">{stats.activeWorkflows}</p>
              </div>
              <Play className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Executions</p>
                <p className="text-2xl font-bold text-white">{stats.totalExecutions.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Revenue Generated</p>
                <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Active Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(workflow.type)}
                    <div>
                      <h3 className="font-semibold text-white">{workflow.name}</h3>
                      <p className="text-sm text-slate-400 capitalize">{workflow.type} workflow</p>
                    </div>
                  </div>

                  <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">{workflow.successCount}</span>
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-400">{workflow.failureCount}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Success Rate:{" "}
                      {((workflow.successCount / (workflow.successCount + workflow.failureCount)) * 100).toFixed(1)}%
                    </div>
                  </div>

                  {workflow.nextRun && (
                    <div className="text-right text-sm">
                      <p className="text-slate-300">Next Run</p>
                      <p className="text-slate-400">{workflow.nextRun.toLocaleTimeString()}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => toggleWorkflow(workflow.id)}
                      size="sm"
                      variant="outline"
                      className={
                        workflow.status === "active"
                          ? "bg-yellow-600/20 hover:bg-yellow-600/30 border-yellow-500/50 text-yellow-400"
                          : "bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-500/50 text-emerald-400"
                      }
                    >
                      {workflow.status === "active" ? (
                        <>
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-slate-600/20 hover:bg-slate-600/30 border-slate-500/50 text-slate-400"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
