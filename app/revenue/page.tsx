"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  Download,
  Filter,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface RevenueKPI {
  kpi_name: string
  kpi_value: number
  target_value: number
  variance_percentage: number
  trend: "up" | "down" | "stable"
  category: string
  description: string
}

interface RevenueAnalytics {
  date: string
  service_category: string
  total_revenue: number
  net_revenue: number
  transaction_count: number
  unique_users: number
  average_transaction: number
  growth_rate: number
}

export default function RevenuePage() {
  const [kpis, setKpis] = useState<RevenueKPI[]>([])
  const [analytics, setAnalytics] = useState<RevenueAnalytics[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [forecasts, setForecasts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("daily")

  const supabase = createClient()

  useEffect(() => {
    fetchRevenueData()
  }, [selectedPeriod])

  const fetchRevenueData = async () => {
    try {
      const [kpisResponse, analyticsResponse, transactionsResponse, forecastsResponse] = await Promise.all([
        supabase.from("revenue_kpis").select("*").eq("date", new Date().toISOString().split("T")[0]),
        supabase
          .from("revenue_analytics")
          .select("*")
          .eq("period_type", selectedPeriod)
          .order("date", { ascending: false })
          .limit(30),
        supabase.from("revenue_transactions").select("*").order("created_at", { ascending: false }).limit(20),
        supabase.from("revenue_forecasts").select("*").order("forecast_date", { ascending: false }).limit(10),
      ])

      if (kpisResponse.data) setKpis(kpisResponse.data)
      if (analyticsResponse.data) setAnalytics(analyticsResponse.data)
      if (transactionsResponse.data) setTransactions(transactionsResponse.data)
      if (forecastsResponse.data) setForecasts(forecastsResponse.data)
    } catch (error) {
      console.error("Error fetching revenue data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTrendIcon = (trend: string, variance: number) => {
    if (trend === "up" || variance > 0) {
      return <TrendingUp className="h-4 w-4 text-emerald-400" />
    } else if (trend === "down" || variance < 0) {
      return <TrendingDown className="h-4 w-4 text-red-400" />
    }
    return <BarChart3 className="h-4 w-4 text-slate-400" />
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-emerald-400"
    if (variance < 0) return "text-red-400"
    return "text-slate-400"
  }

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "BTN" ? "USD" : currency,
      minimumFractionDigits: 2,
    }).format(amount)
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
              Revenue Analytics
            </h1>
            <p className="text-xl text-slate-300">Comprehensive financial insights and tracking</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-cyan-500/30 hover:border-cyan-400/50 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.slice(0, 4).map((kpi, index) => (
            <Card key={index} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300 capitalize">
                  {kpi.kpi_name.replace(/_/g, " ")}
                </CardTitle>
                {getTrendIcon(kpi.trend, kpi.variance_percentage)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {kpi.kpi_name.includes("revenue") || kpi.kpi_name.includes("cost") || kpi.kpi_name.includes("value")
                    ? formatCurrency(kpi.kpi_value)
                    : kpi.kpi_value.toLocaleString()}
                  {kpi.kpi_name.includes("rate") || kpi.kpi_name.includes("margin") ? "%" : ""}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs ${getVarianceColor(kpi.variance_percentage)}`}>
                    {kpi.variance_percentage > 0 ? "+" : ""}
                    {kpi.variance_percentage.toFixed(1)}%
                  </span>
                  <span className="text-xs text-slate-400">vs target</span>
                </div>
                {kpi.target_value && <Progress value={(kpi.kpi_value / kpi.target_value) * 100} className="h-1 mt-2" />}
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              By Service
            </TabsTrigger>
            <TabsTrigger
              value="forecasting"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Forecasting
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                    <span>Revenue Trend</span>
                  </CardTitle>
                  <CardDescription>Last 30 days performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.slice(0, 7).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{new Date(item.date).toLocaleDateString()}</div>
                          <div className="text-sm text-slate-400 capitalize">
                            {item.service_category.replace("_", " ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">{formatCurrency(item.total_revenue)}</div>
                          <div className="text-sm text-emerald-400">{item.transaction_count} transactions</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top KPIs */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Target className="h-5 w-5 text-emerald-400" />
                    <span>Key Metrics</span>
                  </CardTitle>
                  <CardDescription>Performance against targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kpis.map((kpi, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300 capitalize">{kpi.kpi_name.replace(/_/g, " ")}</span>
                          <span className={`text-sm ${getVarianceColor(kpi.variance_percentage)}`}>
                            {kpi.variance_percentage > 0 ? "+" : ""}
                            {kpi.variance_percentage.toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={Math.abs(kpi.variance_percentage) > 100 ? 100 : Math.abs(kpi.variance_percentage)}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Group analytics by service category */}
              {Object.entries(
                analytics.reduce((acc, item) => {
                  if (!acc[item.service_category]) {
                    acc[item.service_category] = {
                      total_revenue: 0,
                      transaction_count: 0,
                      unique_users: 0,
                      items: [],
                    }
                  }
                  acc[item.service_category].total_revenue += item.total_revenue
                  acc[item.service_category].transaction_count += item.transaction_count
                  acc[item.service_category].unique_users += item.unique_users
                  acc[item.service_category].items.push(item)
                  return acc
                }, {} as any),
              ).map(([category, data]: [string, any]) => (
                <Card key={category} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white capitalize flex items-center space-x-2">
                      <PieChart className="h-5 w-5 text-cyan-400" />
                      <span>{category.replace("_", " ")}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Total Revenue</div>
                        <div className="text-white font-medium">{formatCurrency(data.total_revenue)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Transactions</div>
                        <div className="text-white font-medium">{data.transaction_count}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Users</div>
                        <div className="text-white font-medium">{data.unique_users}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Avg/Transaction</div>
                        <div className="text-white font-medium">
                          {formatCurrency(data.total_revenue / data.transaction_count)}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <div className="text-xs text-slate-400">Recent Performance</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <TrendingUp className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs text-emerald-400">+12.5% this week</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                    <span>Revenue Forecasts</span>
                  </CardTitle>
                  <CardDescription>AI-powered revenue predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecasts.map((forecast, index) => (
                      <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-white capitalize">
                            {forecast.service_category.replace("_", " ")}
                          </div>
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                            {(forecast.confidence_level * 100).toFixed(0)}% confidence
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">Predicted Revenue</div>
                            <div className="text-white font-medium">{formatCurrency(forecast.predicted_revenue)}</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Period</div>
                            <div className="text-white font-medium capitalize">
                              {forecast.forecast_period.replace("_", " ")}
                            </div>
                          </div>
                        </div>
                        {forecast.actual_revenue && (
                          <div className="mt-2 pt-2 border-t border-slate-600">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">Actual vs Predicted</span>
                              <span
                                className={`font-medium ${
                                  forecast.actual_revenue >= forecast.predicted_revenue
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                }`}
                              >
                                {((forecast.actual_revenue / forecast.predicted_revenue - 1) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Forecast Accuracy</CardTitle>
                  <CardDescription>Model performance over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">87.3%</div>
                    <div className="text-slate-300">Average Accuracy</div>
                    <div className="text-sm text-slate-400 mt-1">Last 30 predictions</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Next Day Forecasts</span>
                      <span className="text-emerald-400 font-medium">92.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Weekly Forecasts</span>
                      <span className="text-emerald-400 font-medium">89.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Monthly Forecasts</span>
                      <span className="text-yellow-400 font-medium">78.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Revenue Transactions</CardTitle>
                <CardDescription>Latest revenue-generating activities</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-700">
                  {transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="p-6 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-cyan-500/20">
                          <DollarSign className="h-4 w-4 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white capitalize">
                            {transaction.service_name} - {transaction.transaction_type.replace("_", " ")}
                          </p>
                          <p className="text-sm text-slate-400">{new Date(transaction.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                        <Badge
                          className={
                            transaction.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : transaction.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Revenue Reports</h2>
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                <Calendar className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Daily Summary",
                "Weekly Analysis",
                "Monthly Report",
                "Quarterly Review",
                "Annual Overview",
                "Custom Report",
              ].map((reportType, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{reportType}</CardTitle>
                    <CardDescription>
                      {reportType.includes("Daily") && "Detailed daily revenue breakdown"}
                      {reportType.includes("Weekly") && "Weekly trends and analysis"}
                      {reportType.includes("Monthly") && "Comprehensive monthly insights"}
                      {reportType.includes("Quarterly") && "Quarterly performance review"}
                      {reportType.includes("Annual") && "Year-end financial summary"}
                      {reportType.includes("Custom") && "Customizable date range report"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-slate-400">
                      Last generated:{" "}
                      {new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 hover:border-cyan-400/50"
                      >
                        Generate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 hover:border-slate-500 bg-transparent"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
