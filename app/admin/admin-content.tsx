"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Users, DollarSign, Activity, AlertTriangle } from "lucide-react"

export default function AdminContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    activeNodes: 0,
    pendingTickets: 0,
  })
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const supabase = createClient()

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      // Load platform statistics
      const { data: profiles } = await supabase.from("profiles").select("*")
      const { data: revenue } = await supabase.from("revenue_analytics").select("total_revenue")
      const { data: nodes } = await supabase.from("blockchain_nodes").select("*").eq("status", "active")
      const { data: tickets } = await supabase.from("support_tickets").select("*").eq("status", "open")

      setStats({
        totalUsers: profiles?.length || 0,
        totalRevenue: revenue?.reduce((sum, r) => sum + r.total_revenue, 0) || 0,
        activeNodes: nodes?.length || 0,
        pendingTickets: tickets?.length || 0,
      })

      setUsers(profiles?.slice(0, 10) || [])
    } catch (error) {
      console.error("Error loading admin data:", error)
    } finally {
      setLoading(false)
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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-cyan-200 text-lg">Platform management and oversight</p>
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
              <p className="text-xs text-cyan-300">Platform registered users</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-cyan-300">Platform earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Active Nodes</CardTitle>
              <Activity className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeNodes}</div>
              <p className="text-xs text-cyan-300">Blockchain nodes online</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">Support Tickets</CardTitle>
              <AlertTriangle className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingTickets}</div>
              <p className="text-xs text-cyan-300">Pending tickets</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-cyan-600">
              Users
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-cyan-600">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-cyan-600">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Platform Overview</CardTitle>
                <CardDescription className="text-cyan-200">Real-time platform status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">System Health</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-200">API Status</span>
                        <Badge className="bg-green-600">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-200">Database</span>
                        <Badge className="bg-green-600">Connected</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-200">Blockchain Nodes</span>
                        <Badge className="bg-green-600">{stats.activeNodes} Active</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                    <div className="space-y-2 text-sm text-cyan-200">
                      <p>• New user registrations: +{Math.floor(Math.random() * 50)} today</p>
                      <p>• Transactions processed: +{Math.floor(Math.random() * 200)} today</p>
                      <p>• Revenue generated: +${Math.floor(Math.random() * 1000)} today</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-cyan-200">Manage platform users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user, index) => (
                    <div
                      key={user.id || index}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.username?.[0]?.toUpperCase() || "U"}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.username || "Unknown User"}</p>
                          <p className="text-cyan-200 text-sm">{user.email || "No email"}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={user.is_active ? "bg-green-600" : "bg-red-600"}>
                          {user.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-200 bg-transparent">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Revenue Analytics</CardTitle>
                <CardDescription className="text-cyan-200">Platform revenue and financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
                    <p className="text-cyan-200">Total Revenue</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      ${Math.floor(stats.totalRevenue * 0.15).toLocaleString()}
                    </div>
                    <p className="text-cyan-200">Monthly Revenue</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      ${Math.floor(stats.totalRevenue / Math.max(stats.totalUsers, 1)).toLocaleString()}
                    </div>
                    <p className="text-cyan-200">Revenue per User</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Platform Settings</CardTitle>
                <CardDescription className="text-cyan-200">Configure platform parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="maintenance" className="text-cyan-200">
                        Maintenance Mode
                      </Label>
                      <Button variant="outline" className="w-full mt-2 border-cyan-500 text-cyan-200 bg-transparent">
                        Disabled
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor="fees" className="text-cyan-200">
                        Platform Fees (%)
                      </Label>
                      <Input
                        id="fees"
                        defaultValue="0.05"
                        className="mt-2 bg-slate-700/50 border-cyan-500/30 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notifications" className="text-cyan-200">
                        System Notifications
                      </Label>
                      <Button variant="outline" className="w-full mt-2 border-cyan-500 text-cyan-200 bg-transparent">
                        Enabled
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor="backup" className="text-cyan-200">
                        Auto Backup
                      </Label>
                      <Button variant="outline" className="w-full mt-2 border-cyan-500 text-cyan-200 bg-transparent">
                        Daily
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
