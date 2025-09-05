"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function APIStats() {
  const apiUsageData = [
    { time: "00:00", requests: 1200 },
    { time: "04:00", requests: 800 },
    { time: "08:00", requests: 2400 },
    { time: "12:00", requests: 3200 },
    { time: "16:00", requests: 2800 },
    { time: "20:00", requests: 1900 },
    { time: "24:00", requests: 1400 },
  ]

  const apiEndpoints = [
    { endpoint: "/api/mining/status", usage: 45.2, status: "healthy" },
    { endpoint: "/api/wallet/balance", usage: 23.8, status: "healthy" },
    { endpoint: "/api/nft/marketplace", usage: 18.5, status: "healthy" },
    { endpoint: "/api/gamification/achievements", usage: 8.9, status: "degraded" },
    { endpoint: "/api/ai/predictions", usage: 3.6, status: "healthy" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-green-500" />
          <span>API Statistics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Real-time Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">2.4M</p>
            <p className="text-sm text-muted-foreground">Requests Today</p>
            <Badge variant="default" className="mt-1 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">145ms</p>
            <p className="text-sm text-muted-foreground">Avg Response</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Optimal
            </Badge>
          </div>
        </div>

        {/* Usage Chart */}
        <div>
          <h4 className="font-medium text-foreground mb-3">24h API Usage</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Endpoints */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Top API Endpoints</h4>
          <div className="space-y-2">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono text-foreground truncate">{endpoint.endpoint}</p>
                  <p className="text-xs text-muted-foreground">{endpoint.usage}% of traffic</p>
                </div>
                <Badge className={getStatusColor(endpoint.status)} variant="outline">
                  {endpoint.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h4 className="font-medium text-green-900">All Systems Operational</h4>
          </div>
          <p className="text-sm text-green-800 mt-1">API services are running smoothly with 99.9% uptime</p>
        </div>
      </CardContent>
    </Card>
  )
}
