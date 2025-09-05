"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkIO: number
  activeConnections: number
  uptime: number
  errorRate: number
  responseTime: number
}

export function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkIO: 0,
    activeConnections: 0,
    uptime: 0,
    errorRate: 0,
    responseTime: 0,
  })

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        cpuUsage: Math.random() * 80 + 10,
        memoryUsage: Math.random() * 70 + 20,
        diskUsage: Math.random() * 60 + 30,
        networkIO: Math.random() * 100 + 50,
        activeConnections: Math.floor(Math.random() * 500) + 100,
        uptime: Math.floor(Math.random() * 30) + 1,
        errorRate: Math.random() * 2,
        responseTime: Math.random() * 200 + 50,
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 2000)
    return () => clearInterval(interval)
  }, [])

  const getHealthStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return { status: "good", color: "text-emerald-400" }
    if (value <= thresholds.warning) return { status: "warning", color: "text-yellow-400" }
    return { status: "critical", color: "text-red-400" }
  }

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">CPU Usage</p>
                <p
                  className={`text-2xl font-bold ${getHealthStatus(metrics.cpuUsage, { good: 50, warning: 75 }).color}`}
                >
                  {metrics.cpuUsage.toFixed(1)}%
                </p>
              </div>
              <div className="w-16 h-16">
                <Progress value={metrics.cpuUsage} className="h-2 rotate-90 origin-center" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Memory</p>
                <p
                  className={`text-2xl font-bold ${getHealthStatus(metrics.memoryUsage, { good: 60, warning: 80 }).color}`}
                >
                  {metrics.memoryUsage.toFixed(1)}%
                </p>
              </div>
              <div className="w-16 h-16">
                <Progress value={metrics.memoryUsage} className="h-2 rotate-90 origin-center" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Disk Usage</p>
                <p
                  className={`text-2xl font-bold ${getHealthStatus(metrics.diskUsage, { good: 70, warning: 85 }).color}`}
                >
                  {metrics.diskUsage.toFixed(1)}%
                </p>
              </div>
              <div className="w-16 h-16">
                <Progress value={metrics.diskUsage} className="h-2 rotate-90 origin-center" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Response Time</p>
                <p
                  className={`text-2xl font-bold ${getHealthStatus(metrics.responseTime, { good: 100, warning: 200 }).color}`}
                >
                  {metrics.responseTime.toFixed(0)}ms
                </p>
              </div>
              <div className="w-16 h-16">
                <Progress value={((300 - metrics.responseTime) / 300) * 100} className="h-2 rotate-90 origin-center" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-cyan-400">System Performance</CardTitle>
          <CardDescription className="text-slate-300">Real-time system health monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Network I/O</span>
                  <span className="text-cyan-400 font-mono">{metrics.networkIO.toFixed(1)} MB/s</span>
                </div>
                <Progress value={metrics.networkIO / 2} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Active Connections</span>
                  <span className="text-emerald-400 font-mono">{metrics.activeConnections}</span>
                </div>
                <Progress value={(metrics.activeConnections / 600) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Error Rate</span>
                  <span className={`font-mono ${getHealthStatus(metrics.errorRate, { good: 1, warning: 2 }).color}`}>
                    {metrics.errorRate.toFixed(2)}%
                  </span>
                </div>
                <Progress value={metrics.errorRate * 20} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-3">System Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Uptime</span>
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300">
                      {metrics.uptime} days
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Health Score</span>
                    <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                      98.5%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Last Restart</span>
                    <span className="text-sm text-slate-300">
                      {new Date(Date.now() - metrics.uptime * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
