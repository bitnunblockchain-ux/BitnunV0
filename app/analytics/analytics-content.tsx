"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function AnalyticsContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    activeNodes: 0,
    growthRate: 0,
  })
  const [userGrowthData, setUserGrowthData] = useState<any[]>([])
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [tokenDistribution, setTokenDistribution] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadRealAnalyticsData()
  }, [])

  const loadRealAnalyticsData = async () => {
    try {
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("created_at")
        .order("created_at", { ascending: true })

      const { data: revenueAnalytics } = await supabase
        .from("revenue_analytics")
        .select("date, total_revenue, service_category")
        .eq("period_type", "monthly")
        .order("date", { ascending: true })
        .limit(6)

      const { data: platformStats } = await supabase
        .from("platform_analytics")
        .select("metric_name, metric_value")
        .in("metric_name", ["total_users", "daily_active_users", "total_transactions", "defi_tvl"])

      const { data: nodesData } = await supabase.from("blockchain_nodes").select("status").eq("status", "active")

      const { data: stakingData } = await supabase.from("user_stakes").select("amount, pool_id")

      const { data: tradingData } = await supabase.from("orders").select("amount").eq("status", "filled")

      const { data: miningData } = await supabase.from("mining_sessions").select("rewards_earned")

      // Process user growth data
      if (profilesData) {
        const monthlyGrowth = processMonthlyGrowth(profilesData)
        setUserGrowthData(monthlyGrowth)
      }

      // Process revenue data
      if (revenueAnalytics) {
        const monthlyRevenue = revenueAnalytics.map((item) => ({
          month: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
          revenue: item.total_revenue,
        }))
        setRevenueData(monthlyRevenue)
      }

      // Process token distribution
      const stakingTotal = stakingData?.reduce((sum, stake) => sum + Number.parseFloat(stake.amount), 0) || 0
      const tradingTotal = tradingData?.reduce((sum, order) => sum + Number.parseFloat(order.amount), 0) || 0
      const miningTotal = miningData?.reduce((sum, session) => sum + Number.parseFloat(session.rewards_earned), 0) || 0
      const totalTokens = stakingTotal + tradingTotal + miningTotal

      if (totalTokens > 0) {
        setTokenDistribution([
          { name: "Staking", value: (stakingTotal / totalTokens) * 100, color: "#0ea5e9" },
          { name: "Trading", value: (tradingTotal / totalTokens) * 100, color: "#06b6d4" },
          { name: "Mining", value: (miningTotal / totalTokens) * 100, color: "#0891b2" },
          {
            name: "Other",
            value: Math.max(0, 100 - ((stakingTotal + tradingTotal + miningTotal) / totalTokens) * 100),
            color: "#0e7490",
          },
        ])
      }

      // Set platform statistics
      const statsMap =
        platformStats?.reduce((acc, stat) => {
          acc[stat.metric_name] = stat.metric_value
          return acc
        }, {} as any) || {}

      setStats({
        totalUsers: statsMap.total_users || 0,
        totalRevenue: revenueAnalytics?.reduce((sum, item) => sum + item.total_revenue, 0) || 0,
        activeNodes: nodesData?.length || 0,
        growthRate: calculateGrowthRate(profilesData || []),
      })
    } catch (error) {
      console.error("[v0] Error loading analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const processMonthlyGrowth = (profiles: any[]) => {
    const monthlyData = profiles.reduce((acc, profile) => {
      const month = new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {} as any)

    return Object.entries(monthlyData)
      .map(([month, users]) => ({
        month: month.split(" ")[0],
        users,
      }))
      .slice(-6)
  }

  const calculateGrowthRate = (profiles: any[]) => {
    if (profiles.length < 2) return 0

    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1)

    const lastMonthUsers = profiles.filter((p) => new Date(p.created_at) >= lastMonth).length
    const previousMonthUsers = profiles.filter(
      (p) => new Date(p.created_at) >= twoMonthsAgo && new Date(p.created_at) < lastMonth,
    ).length

    if (previousMonthUsers === 0) return 100
    return ((lastMonthUsers - previousMonthUsers) / previousMonthUsers) * 100
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-cyan-200">Loading real-time analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-cyan-200 text-lg">Real-time insights into platform performance and user engagement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Total Users</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-cyan-300">+{stats.growthRate.toFixed(1)}% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-cyan-300">Real-time revenue tracking</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Active Nodes</CardTitle>
              <Activity className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeNodes}</div>
              <p className="text-xs text-cyan-300">Live blockchain nodes</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.growthRate.toFixed(1)}%</div>
              <p className="text-xs text-cyan-300">Monthly growth rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="users" className="data-[state=active]:bg-cyan-600">
              User Growth
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-cyan-600">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="distribution" className="data-[state=active]:bg-cyan-600">
              Token Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">User Growth Over Time</CardTitle>
                <CardDescription className="text-cyan-200">Real user registrations on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #06b6d4",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Revenue Growth</CardTitle>
                <CardDescription className="text-cyan-200">
                  Actual revenue generated from platform activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #06b6d4",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Token Distribution</CardTitle>
                <CardDescription className="text-cyan-200">
                  Real token usage across different platform activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tokenDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {tokenDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #06b6d4",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
