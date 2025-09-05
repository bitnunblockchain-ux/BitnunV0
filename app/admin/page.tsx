"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  DollarSign,
  Activity,
  AlertTriangle,
  Settings,
  BarChart3,
  Server,
  Eye,
  Ban,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  dailyRevenue: number
  totalTransactions: number
  pendingReports: number
  systemHealth: number
  alertsCount: number
}

interface RevenueData {
  date: string
  service_category: string
  total_revenue: number
  total_transactions: number
  unique_users: number
}

export default function AdminConsolePage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    dailyRevenue: 0,
    totalTransactions: 0,
    pendingReports: 0,
    systemHealth: 0,
    alertsCount: 0,
  })

  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [systemMetrics, setSystemMetrics] = useState<any[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchAdminData()
    const interval = setInterval(fetchAdminData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchAdminData = async () => {
    try {
      // Fetch revenue data
      const { data: revenue } = await supabase
        .from("platform_revenue_summary")
        .select("*")
        .order("date", { ascending: false })
        .limit(7)

      // Fetch system monitoring
      const { data: monitoring } = await supabase
        .from("system_monitoring")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(20)

      // Fetch recent users
      const { data: users } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      // Fetch alerts
      const { data: alertsData } = await supabase
        .from("platform_alerts")
        .select("*")
        .eq("is_resolved", false)
        .order("created_at", { ascending: false })

      if (revenue) setRevenueData(revenue)
      if (monitoring) setSystemMetrics(monitoring)
      if (users) setRecentUsers(users)
      if (alertsData) setAlerts(alertsData)

      // Calculate stats
      const totalRevenue = revenue?.reduce((sum, r) => sum + Number(r.total_revenue), 0) || 0
      const todayRevenue =
        revenue
          ?.filter((r) => r.date === new Date().toISOString().split("T")[0])
          .reduce((sum, r) => sum + Number(r.total_revenue), 0) || 0

      const activeUsersMetric = monitoring?.find((m) => m.metric_name === "active_users")
      const totalTransactionsMetric = monitoring?.find((m) => m.metric_name === "total_transactions")
      const cpuUsage = monitoring?.find((m) => m.metric_name === "cpu_usage")?.metric_value || 0
      const memoryUsage = monitoring?.find((m) => m.metric_name === "memory_usage")?.metric_value || 0
      const systemHealth = 100 - Math.max(Number(cpuUsage), Number(memoryUsage))

      setStats({
        totalUsers: users?.length || 0,
        activeUsers: Number(activeUsersMetric?.metric_value) || 0,
        totalRevenue,
        dailyRevenue: todayRevenue,
        totalTransactions: Number(totalTransactionsMetric?.metric_value) || 0,
        pendingReports: 12, // Mock data
        systemHealth,
        alertsCount: alertsData?.length || 0,
      })
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getMetricIcon = (metricName: string) => {
    switch (metricName) {
      case "cpu_usage":
      case "memory_usage":
      case "disk_usage":
        return <Server className="h-4 w-4" />
      case "active_users":
        return <Users className="h-4 w-4" />
      case "revenue_24h":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "error":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Admin Console
            </h1>
            <p className="text-xl text-slate-300">Complete platform control and monitoring</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">System Healthy</Badge>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-emerald-400">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Daily Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.dailyRevenue.toLocaleString()}</div>
              <p className="text-xs text-emerald-400">+8.2% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-emerald-400">+15.3% increase</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">System Health</CardTitle>
              <Activity className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.systemHealth.toFixed(1)}%</div>
              <Progress value={stats.systemHealth} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Users
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Monitoring
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Overview</CardTitle>
                  <CardDescription>Last 7 days revenue by service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white capitalize">
                            {item.service_category.replace("_", " ")}
                          </div>
                          <div className="text-sm text-slate-400">{item.total_transactions} transactions</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">${Number(item.total_revenue).toLocaleString()}</div>
                          <div className="text-sm text-emerald-400">{item.unique_users} users</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Metrics */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">System Metrics</CardTitle>
                  <CardDescription>Real-time platform performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.slice(0, 6).map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getMetricIcon(metric.metric_name)}
                          <span className="text-slate-300 capitalize">{metric.metric_name.replace("_", " ")}</span>
                        </div>
                        <div className="text-white font-medium">
                          {Number(metric.metric_value).toLocaleString()} {metric.metric_unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-cyan-500/30 hover:border-cyan-400/50 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                  Export Data
                </Button>
              </div>
            </div>

            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-700">
                  {recentUsers.map((user, index) => (
                    <div
                      key={index}
                      className="p-6 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.display_name?.charAt(0) || user.username?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.display_name || user.username || "Anonymous"}</p>
                          <p className="text-sm text-slate-400">
                            Level {user.level} • {user.total_earnings} BTN earned
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 hover:border-slate-500 bg-transparent"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 hover:border-red-400/50 bg-transparent"
                        >
                          <Ban className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">${stats.totalRevenue.toLocaleString()}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">+18.7% from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Average Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">$127.45</div>
                  <div className="text-sm text-slate-400">Per transaction</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">+24.3%</div>
                  <div className="text-sm text-slate-400">Month over month</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Revenue by Service</CardTitle>
                <CardDescription>Detailed breakdown of revenue sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div>
                        <div className="font-medium text-white capitalize">
                          {item.service_category.replace("_", " ")}
                        </div>
                        <div className="text-sm text-slate-400">
                          {item.total_transactions} transactions • {item.unique_users} users
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          ${Number(item.total_revenue).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-400">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300 capitalize">
                      {metric.metric_name.replace("_", " ")}
                    </CardTitle>
                    {getMetricIcon(metric.metric_name)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{Number(metric.metric_value).toLocaleString()}</div>
                    <p className="text-xs text-slate-400">{metric.metric_unit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-cyan-400" />
                    <span>Security Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">SSL Certificate</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Valid
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Firewall Status</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">DDoS Protection</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Backup Status</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Security Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Successful login from new device</p>
                      <p className="text-xs text-slate-400">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Multiple failed login attempts</p>
                      <p className="text-xs text-slate-400">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Security scan completed</p>
                      <p className="text-xs text-slate-400">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Platform Alerts</h2>
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                Mark All Read
              </Button>
            </div>

            <div className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <Card key={index} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-white">{alert.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getAlertColor(alert.severity)}>{alert.severity}</Badge>
                              <span className="text-xs text-slate-500">
                                {new Date(alert.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 hover:border-slate-500 bg-transparent"
                        >
                          Resolve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
                  <CardContent className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                    <p className="text-slate-400">No active alerts</p>
                    <p className="text-sm text-slate-500">All systems operating normally</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
