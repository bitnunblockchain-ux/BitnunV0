"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Shield,
  Users,
  Key,
  Smartphone,
  Globe,
  Settings,
  Plus,
  Eye,
  UserCheck,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function AuthPlatformPage() {
  const [applications, setApplications] = useState([
    {
      id: "app_001",
      name: "Production Web App",
      type: "Web Application",
      users: 45230,
      sessions: 12450,
      mfa: true,
      sso: true,
      status: "active",
      created: "2023-01-15",
    },
    {
      id: "app_002",
      name: "Mobile App",
      type: "Native Mobile",
      users: 23450,
      sessions: 8930,
      mfa: true,
      sso: false,
      status: "active",
      created: "2023-02-20",
    },
  ])

  const [users, setUsers] = useState([
    {
      id: "user_001",
      email: "john.doe@example.com",
      name: "John Doe",
      status: "active",
      mfa: true,
      lastLogin: "2 hours ago",
      loginCount: 156,
      role: "admin",
    },
    {
      id: "user_002",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      status: "active",
      mfa: false,
      lastLogin: "1 day ago",
      loginCount: 89,
      role: "user",
    },
  ])

  const [metrics, setMetrics] = useState({
    totalUsers: 68680,
    activeSessions: 12450,
    mfaEnabled: "78.5%",
    loginSuccess: "99.2%",
    securityEvents: 23,
    apiCalls: 2.4e6,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full border border-indigo-500/30 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              BitnunCloud Auth
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Decentralized authentication and identity management with blockchain-native security and global SSO
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Users", value: metrics.totalUsers.toLocaleString(), icon: Users, color: "indigo" },
            {
              label: "Active Sessions",
              value: metrics.activeSessions.toLocaleString(),
              icon: Activity,
              color: "green",
            },
            { label: "MFA Enabled", value: metrics.mfaEnabled, icon: Smartphone, color: "blue" },
            { label: "Login Success", value: metrics.loginSuccess, icon: CheckCircle, color: "emerald" },
            { label: "Security Events", value: metrics.securityEvents, icon: AlertTriangle, color: "yellow" },
            {
              label: "API Calls",
              value: `${(metrics.apiCalls / 1e6).toFixed(1)}M`,
              icon: Key,
              color: "purple",
            },
          ].map((metric, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r from-${metric.color}-600/20 to-${metric.color}-500/20`}
                  >
                    <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{metric.label}</p>
                    <p className="text-lg font-bold text-white">{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="applications" className="data-[state=active]:bg-indigo-600">
              Applications
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-indigo-600">
              Users
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-indigo-600">
              Security
            </TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-indigo-600">
              Providers
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-600">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Applications</h2>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>

            <div className="grid gap-4">
              {applications.map((app) => (
                <Card
                  key={app.id}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Globe className="w-5 h-5 text-indigo-400" />
                          {app.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {app.type} • Created {app.created}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={app.status === "active" ? "default" : "secondary"}
                        className={app.status === "active" ? "bg-green-600" : ""}
                      >
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Users</p>
                        <p className="text-white font-semibold">{app.users.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Active Sessions</p>
                        <p className="text-white font-semibold">{app.sessions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">MFA</p>
                        <p className={`font-semibold ${app.mfa ? "text-green-400" : "text-red-400"}`}>
                          {app.mfa ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">SSO</p>
                        <p className={`font-semibold ${app.sso ? "text-green-400" : "text-red-400"}`}>
                          {app.sso ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Key className="w-4 h-4 mr-1" />
                        API Keys
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Import Users
                </Button>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 border-slate-700/30 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-indigo-400" />
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-sm text-slate-400">
                            {user.email} • {user.role} • Last login {user.lastLogin}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={user.status === "active" ? "bg-green-600" : ""}
                        >
                          {user.status}
                        </Badge>
                        {user.mfa && (
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                            MFA
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Security Settings</CardTitle>
                  <CardDescription className="text-slate-400">
                    Configure authentication security policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Require MFA</Label>
                      <p className="text-sm text-slate-500">Force multi-factor authentication for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Password Complexity</Label>
                      <p className="text-sm text-slate-500">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Session Timeout</Label>
                      <p className="text-sm text-slate-500">Auto-logout inactive sessions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Session Duration</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="8h">8 Hours</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="7d">7 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Security Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Failed Login Attempts</span>
                      <span className="text-red-400 font-semibold">23 today</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Suspicious Activities</span>
                      <span className="text-yellow-400 font-semibold">5 today</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Blocked IPs</span>
                      <span className="text-orange-400 font-semibold">12 active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">MFA Challenges</span>
                      <span className="text-green-400 font-semibold">1,240 today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Social Login Providers</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure third-party authentication providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Google", enabled: true, users: 23450 },
                    { name: "GitHub", enabled: true, users: 12340 },
                    { name: "Microsoft", enabled: false, users: 0 },
                    { name: "Apple", enabled: true, users: 8930 },
                  ].map((provider) => (
                    <div
                      key={provider.name}
                      className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                    >
                      <div>
                        <p className="text-white font-medium">{provider.name}</p>
                        <p className="text-sm text-slate-400">{provider.users.toLocaleString()} users</p>
                      </div>
                      <Switch defaultChecked={provider.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">JWT Secret</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value="••••••••••••••••"
                        className="bg-slate-800 border-slate-600 text-white"
                        readOnly
                      />
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        Rotate
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Token Expiry</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select expiry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 Minutes</SelectItem>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="7d">7 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Webhooks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Webhook URL</Label>
                    <Input
                      placeholder="https://your-app.com/webhooks/auth"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Events</Label>
                    <div className="space-y-2">
                      {["user.created", "user.login", "user.logout", "security.alert"].map((event) => (
                        <label key={event} className="flex items-center space-x-2 text-slate-300">
                          <input type="checkbox" className="rounded" />
                          <span>{event}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
