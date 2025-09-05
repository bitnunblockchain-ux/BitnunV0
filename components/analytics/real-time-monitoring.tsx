"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

interface NetworkMetrics {
  totalNodes: number
  activeMiners: number
  networkHashRate: number
  transactionsPerSecond: number
  blockTime: number
  networkLatency: number
}

interface AlertItem {
  id: string
  type: "warning" | "error" | "info"
  message: string
  timestamp: Date
}

export function RealTimeMonitoring() {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    totalNodes: 0,
    activeMiners: 0,
    networkHashRate: 0,
    transactionsPerSecond: 0,
    blockTime: 0,
    networkLatency: 0,
  })
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Simulate real-time data updates
    const updateMetrics = () => {
      setMetrics({
        totalNodes: Math.floor(Math.random() * 1000) + 500,
        activeMiners: Math.floor(Math.random() * 300) + 150,
        networkHashRate: Math.floor(Math.random() * 50) + 25,
        transactionsPerSecond: Math.floor(Math.random() * 100) + 50,
        blockTime: Math.random() * 2 + 1,
        networkLatency: Math.floor(Math.random() * 50) + 10,
      })
      setIsConnected(true)
    }

    // Initial load
    updateMetrics()

    // Update every 3 seconds
    const interval = setInterval(updateMetrics, 3000)

    // Simulate alerts
    const alertInterval = setInterval(() => {
      const alertTypes: ("warning" | "error" | "info")[] = ["warning", "error", "info"]
      const messages = [
        "High network congestion detected",
        "Mining difficulty adjusted",
        "New block mined successfully",
        "Network latency spike detected",
        "Node synchronization completed",
      ]

      const newAlert: AlertItem = {
        id: Date.now().toString(),
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
      }

      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep last 10 alerts
    }, 8000)

    return () => {
      clearInterval(interval)
      clearInterval(alertInterval)
    }
  }, [])

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Network Status */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-400">Network Status</CardTitle>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
              <span className="text-sm text-slate-300">{isConnected ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Total Nodes</span>
                  <span className="text-cyan-400 font-mono">{metrics.totalNodes}</span>
                </div>
                <Progress value={(metrics.totalNodes / 1500) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Active Miners</span>
                  <span className="text-emerald-400 font-mono">{metrics.activeMiners}</span>
                </div>
                <Progress value={(metrics.activeMiners / 450) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Hash Rate</span>
                  <span className="text-cyan-400 font-mono">{metrics.networkHashRate.toFixed(1)} TH/s</span>
                </div>
                <Progress value={(metrics.networkHashRate / 75) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">TPS</span>
                  <span className="text-emerald-400 font-mono">{metrics.transactionsPerSecond}</span>
                </div>
                <Progress value={(metrics.transactionsPerSecond / 150) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Block Time</span>
                  <span className="text-cyan-400 font-mono">{metrics.blockTime.toFixed(2)}s</span>
                </div>
                <Progress value={((3 - metrics.blockTime) / 3) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Latency</span>
                  <span className="text-emerald-400 font-mono">{metrics.networkLatency}ms</span>
                </div>
                <Progress value={((100 - metrics.networkLatency) / 100) * 100} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Alerts */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-cyan-400">Real-time Alerts</CardTitle>
          <CardDescription className="text-slate-300">Live system notifications and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No alerts at this time</p>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)} animate-fade-in`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={getAlertColor(alert.type)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-slate-200">{alert.message}</span>
                    </div>
                    <span className="text-xs text-slate-400">{alert.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
