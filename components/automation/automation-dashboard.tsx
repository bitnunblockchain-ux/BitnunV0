"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Settings, TrendingUp, Clock, CheckCircle, XCircle, Zap, Activity, DollarSign } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function AutomationDashboard() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    activeWorkflows: 0,
    totalExecutions: 0,
    successRate: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadRealWorkflows()
    loadRealStats()
  }, [])

  const loadRealWorkflows = async () => {
    try {
      const { data: botConfigs, error } = await supabase
        .from("bot_configs")
        .select(`
          *,
          bot_logs (
            id,
            status,
            executed_at,
            execution_time_ms
          )
        `)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error loading workflows:", error)
        return
      }

      const processedWorkflows =
        botConfigs?.map((bot) => {
          const logs = bot.bot_logs || []
          const successCount = logs.filter((log: any) => log.status === "success").length
          const failureCount = logs.filter((log: any) => log.status === "error").length
          const lastLog = logs[0]

          return {
            id: bot.id,
            name: bot.name,
            type: bot.bot_type,
            status: bot.is_active ? "active" : "paused",
            conditions: bot.conditions || [],
            actions: bot.actions || [],
            schedule: bot.schedule,
            successCount,
            failureCount,
            lastRun: lastLog ? new Date(lastLog.executed_at) : null,
            nextRun: bot.next_run ? new Date(bot.next_run) : null,
          }
        }) || []

      setWorkflows(processedWorkflows)
    } catch (error) {
      console.error("[v0] Error loading workflows:", error)
    }
  }

  const loadRealStats = async () => {
    try {
      const { data: totalBots } = await supabase.from("bot_configs").select("id, is_active")

      const { data: botLogs } = await supabase.from("bot_logs").select("status, revenue_generated")

      const { data: revenueData } = await supabase
        .from("revenue_transactions")
        .select("net_amount")
        .eq("service_category", "automation")

      const totalWorkflows = totalBots?.length || 0
      const activeWorkflows = totalBots?.filter((bot) => bot.is_active).length || 0
      const totalExecutions = botLogs?.length || 0
      const successfulExecutions = botLogs?.filter((log) => log.status === "success").length || 0
      const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0
      const totalRevenue =
        revenueData?.reduce((sum, transaction) => sum + Number.parseFloat(transaction.net_amount), 0) || 0

      setStats({
        totalWorkflows,
        activeWorkflows,
        totalExecutions,
        successRate: Number.parseFloat(successRate.toFixed(1)),
        totalRevenue: Number.parseFloat(totalRevenue.toFixed(2)),
      })
    } catch (error) {
      console.error("[v0] Error loading stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWorkflow = async (workflowId: string) => {
    try {
      const workflow = workflows.find((w) => w.id === workflowId)
      const newStatus = workflow?.status === "active" ? false : true

      const { error } = await supabase.from("bot_configs").update({ is_active: newStatus }).eq("id", workflowId)

      if (error) {
        console.error("[v0] Error updating workflow:", error)
        return
      }

      setWorkflows((prev) =>
        prev.map((workflow) =>
          workflow.id === workflowId ? { ...workflow, status: newStatus ? "active" : "paused" } : workflow,
        ),
      )
    } catch (error) {
      console.error("[v0] Error toggling workflow:", error)
    }
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-cyan-200 mt-2">Loading real automation data...</p>
        </div>
      </div>
    )
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
