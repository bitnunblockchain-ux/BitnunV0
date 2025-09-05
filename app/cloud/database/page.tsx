"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, Server, Zap, Shield, BarChart3, Plus, Play, Settings, Users, Activity } from "lucide-react"

export default function DatabaseServicePage() {
  const [databases, setDatabases] = useState([
    {
      id: "db_001",
      name: "ProductionDB",
      type: "PostgreSQL",
      status: "active",
      region: "Global",
      nodes: 12,
      storage: "2.4 TB",
      connections: 847,
      queries: 15420,
      uptime: "99.99%",
    },
    {
      id: "db_002",
      name: "AnalyticsDB",
      type: "MongoDB",
      status: "active",
      region: "Multi-Region",
      nodes: 8,
      storage: "1.8 TB",
      connections: 234,
      queries: 8930,
      uptime: "99.97%",
    },
  ])

  const [metrics, setMetrics] = useState({
    totalDatabases: 24,
    totalNodes: 156,
    totalStorage: "45.2 TB",
    totalQueries: 2.4e6,
    avgLatency: "12ms",
    globalUptime: "99.98%",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
            <Database className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              BitnunCloud Database
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Decentralized database-as-a-service powered by WASM nodes with global distribution and zero downtime
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Databases", value: metrics.totalDatabases, icon: Database, color: "blue" },
            { label: "Active Nodes", value: metrics.totalNodes, icon: Server, color: "green" },
            { label: "Total Storage", value: metrics.totalStorage, icon: BarChart3, color: "purple" },
            { label: "Queries/Day", value: `${(metrics.totalQueries / 1e6).toFixed(1)}M`, icon: Zap, color: "yellow" },
            { label: "Avg Latency", value: metrics.avgLatency, icon: Activity, color: "red" },
            { label: "Uptime", value: metrics.globalUptime, icon: Shield, color: "emerald" },
          ].map((metric, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
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
        <Tabs defaultValue="databases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="databases" className="data-[state=active]:bg-blue-600">
              Databases
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-blue-600">
              Create New
            </TabsTrigger>
            <TabsTrigger value="query" className="data-[state=active]:bg-blue-600">
              Query Editor
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600">
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="databases" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Your Databases</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                New Database
              </Button>
            </div>

            <div className="grid gap-4">
              {databases.map((db) => (
                <Card
                  key={db.id}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Database className="w-5 h-5 text-blue-400" />
                          {db.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {db.type} • {db.region} • {db.nodes} nodes
                        </CardDescription>
                      </div>
                      <Badge
                        variant={db.status === "active" ? "default" : "secondary"}
                        className={db.status === "active" ? "bg-green-600" : ""}
                      >
                        {db.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Storage</p>
                        <p className="text-white font-semibold">{db.storage}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Connections</p>
                        <p className="text-white font-semibold">{db.connections}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Queries/hr</p>
                        <p className="text-white font-semibold">{db.queries.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Uptime</p>
                        <p className="text-green-400 font-semibold">{db.uptime}</p>
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
                        <Users className="w-4 h-4 mr-1" />
                        Access
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Create New Database</CardTitle>
                <CardDescription className="text-slate-400">
                  Deploy a new database instance on the BitnunCloud network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-name" className="text-slate-300">
                      Database Name
                    </Label>
                    <Input
                      id="db-name"
                      placeholder="my-database"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-type" className="text-slate-300">
                      Database Type
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="redis">Redis</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-slate-300">
                      Region
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global (Multi-Region)</SelectItem>
                        <SelectItem value="us-east">US East</SelectItem>
                        <SelectItem value="eu-west">EU West</SelectItem>
                        <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nodes" className="text-slate-300">
                      Node Count
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select nodes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Nodes (Basic)</SelectItem>
                        <SelectItem value="6">6 Nodes (Standard)</SelectItem>
                        <SelectItem value="12">12 Nodes (Premium)</SelectItem>
                        <SelectItem value="24">24 Nodes (Enterprise)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage" className="text-slate-300">
                      Storage
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100gb">100 GB</SelectItem>
                        <SelectItem value="500gb">500 GB</SelectItem>
                        <SelectItem value="1tb">1 TB</SelectItem>
                        <SelectItem value="5tb">5 TB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Database className="w-4 h-4 mr-2" />
                  Deploy Database
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="query" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">SQL Query Editor</CardTitle>
                <CardDescription className="text-slate-400">
                  Execute queries across your distributed database network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="query" className="text-slate-300">
                    SQL Query
                  </Label>
                  <Textarea
                    id="query"
                    placeholder="SELECT * FROM users WHERE active = true;"
                    className="bg-slate-800 border-slate-600 text-white font-mono min-h-[200px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Play className="w-4 h-4 mr-2" />
                    Execute Query
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Save Query
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Query Response Time</span>
                      <span className="text-green-400 font-semibold">12ms avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Throughput</span>
                      <span className="text-blue-400 font-semibold">2.4M queries/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Error Rate</span>
                      <span className="text-red-400 font-semibold">0.01%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Network Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Active Nodes</span>
                      <span className="text-green-400 font-semibold">156/156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Network Latency</span>
                      <span className="text-blue-400 font-semibold">8ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Consensus Time</span>
                      <span className="text-purple-400 font-semibold">2.1s</span>
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
