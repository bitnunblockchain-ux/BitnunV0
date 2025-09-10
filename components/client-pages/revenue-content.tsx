"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Users, Activity, Target } from "lucide-react"

interface RevenueData {
  totalRevenue: number
  monthlyRevenue: number
  subscriptionRevenue: number
  tradingFees: number
  activeUsers: number
  conversionRate: number
  growth: number
}

export default function RevenueContent() {
  const [revenueData, setRevenueData] = useState<RevenueData>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    subscriptionRevenue: 0,
    tradingFees: 0,
    activeUsers: 0,
    conversionRate: 0,
    growth: 0,
  })
  const [loading, setLoading] = useState(true)

  const loadRevenueData = async () => {
    try {
      // This would connect to your hidden payment dashboard API
      // For now, using sample data that matches your payment system structure
      const mockData: RevenueData = {
        totalRevenue: 2847392.5,
        monthlyRevenue: 184729.3,
        subscriptionRevenue: 89432.1,
        tradingFees: 95297.2,
        activeUsers: 12847,
        conversionRate: 3.2,
        growth: 18.5,
      }

      setRevenueData(mockData)
      setLoading(false)
    } catch (error) {
      console.error("Failed to load revenue data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRevenueData()
  }, [])

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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Revenue Dashboard</h1>
          <p className="text-cyan-200 text-lg">BitnunEco Platform Revenue Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${revenueData.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs text-green-400">
                <TrendingUp className="h-3 w-3" />
                <span>+{revenueData.growth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Monthly Revenue</CardTitle>
              <Activity className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${revenueData.monthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-cyan-300">Current month</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Active Users</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{revenueData.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-cyan-300">Paying customers</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{revenueData.conversionRate}%</div>
              <div className="text-xs text-cyan-300">Trial to paid</div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="overview" className="text-cyan-200">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sources" className="text-cyan-200">
              Revenue Sources
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-cyan-200">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-200">Revenue Growth</CardTitle>
                  <CardDescription className="text-slate-400">Monthly revenue progression</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-300">This Month</span>
                      <span className="text-white">${revenueData.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-300">Target</span>
                      <span className="text-white">$200,000</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-200">Top Revenue Streams</CardTitle>
                  <CardDescription className="text-slate-400">Primary income sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300">Trading Fees</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      ${revenueData.tradingFees.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300">Subscriptions</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      ${revenueData.subscriptionRevenue.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300">Premium Features</span>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                      $45,230
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-200">Revenue Sources Breakdown</CardTitle>
                <CardDescription className="text-slate-400">Detailed analysis of income streams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-400">${revenueData.tradingFees.toLocaleString()}</div>
                    <div className="text-sm text-cyan-300">Trading Fees (0.05%)</div>
                    <div className="text-xs text-slate-400">Crypto & BTN transactions</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-400">
                      ${revenueData.subscriptionRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-cyan-300">Subscriptions</div>
                    <div className="text-xs text-slate-400">Premium memberships</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-purple-400">$45,230</div>
                    <div className="text-sm text-cyan-300">Premium Features</div>
                    <div className="text-xs text-slate-400">Advanced analytics & tools</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-200">Performance Analytics</CardTitle>
                <CardDescription className="text-slate-400">Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-cyan-200">User Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Active Users</span>
                        <span className="text-white">{revenueData.activeUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Conversion Rate</span>
                        <span className="text-white">{revenueData.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Churn Rate</span>
                        <span className="text-white">2.1%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-cyan-200">Financial Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-cyan-300">ARPU</span>
                        <span className="text-white">$147.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">LTV</span>
                        <span className="text-white">$2,340</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">CAC</span>
                        <span className="text-white">$89.20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button onClick={loadRevenueData} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Refresh Data
          </Button>
          <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 bg-transparent">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  )
}
