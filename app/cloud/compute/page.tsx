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
import { Server, Zap, Code, Activity, Plus, Play, Settings, BarChart3, Clock, Globe } from "lucide-react"

export default function ComputePlatformPage() {
  const [functions, setFunctions] = useState([
    {
      id: "func_001",
      name: "user-auth-handler",
      runtime: "Node.js 18",
      status: "active",
      invocations: 45230,
      avgDuration: "120ms",
      memory: "256MB",
      lastDeployed: "2 hours ago",
      region: "Global Edge",
    },
    {
      id: "func_002",
      name: "image-processor",
      runtime: "Python 3.11",
      status: "active",
      invocations: 12450,
      avgDuration: "850ms",
      memory: "1GB",
      lastDeployed: "1 day ago",
      region: "Multi-Region",
    },
  ])

  const [containers, setContainers] = useState([
    {
      id: "cont_001",
      name: "api-gateway",
      image: "bitnun/api-gateway:latest",
      status: "running",
      instances: 8,
      cpu: "2 vCPU",
      memory: "4GB",
      uptime: "99.99%",
      requests: 2.4e6,
    },
    {
      id: "cont_002",
      name: "ml-inference",
      image: "bitnun/ml-inference:v2.1",
      status: "running",
      instances: 4,
      cpu: "4 vCPU",
      memory: "8GB",
      uptime: "99.97%",
      requests: 156000,
    },
  ])

  const [metrics, setMetrics] = useState({
    totalFunctions: 156,
    totalContainers: 89,
    totalInvocations: 12.4e6,
    avgLatency: "85ms",
    activeNodes: 2340,
    globalUptime: "99.98%",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Server className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              BitnunCloud Compute
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Serverless functions and container orchestration on decentralized WASM nodes with global edge deployment
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Functions", value: metrics.totalFunctions, icon: Code, color: "purple" },
            { label: "Containers", value: metrics.totalContainers, icon: Server, color: "blue" },
            {
              label: "Invocations",
              value: `${(metrics.totalInvocations / 1e6).toFixed(1)}M`,
              icon: Zap,
              color: "yellow",
            },
            { label: "Avg Latency", value: metrics.avgLatency, icon: Clock, color: "green" },
            { label: "Active Nodes", value: metrics.activeNodes, icon: Globe, color: "cyan" },
            { label: "Uptime", value: metrics.globalUptime, icon: Activity, color: "emerald" },
          ].map((metric, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
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
        <Tabs defaultValue="functions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="functions" className="data-[state=active]:bg-purple-600">
              Functions
            </TabsTrigger>
            <TabsTrigger value="containers" className="data-[state=active]:bg-purple-600">
              Containers
            </TabsTrigger>
            <TabsTrigger value="deploy" className="data-[state=active]:bg-purple-600">
              Deploy
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-purple-600">
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="functions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Serverless Functions</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Function
              </Button>
            </div>

            <div className="grid gap-4">
              {functions.map((func) => (
                <Card
                  key={func.id}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Code className="w-5 h-5 text-purple-400" />
                          {func.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {func.runtime} • {func.region} • {func.memory}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={func.status === "active" ? "default" : "secondary"}
                        className={func.status === "active" ? "bg-green-600" : ""}
                      >
                        {func.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Invocations</p>
                        <p className="text-white font-semibold">{func.invocations.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Avg Duration</p>
                        <p className="text-white font-semibold">{func.avgDuration}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Memory</p>
                        <p className="text-white font-semibold">{func.memory}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Last Deploy</p>
                        <p className="text-slate-300 font-semibold">{func.lastDeployed}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Invoke
                      </Button>
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
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="containers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Container Services</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Deploy Container
              </Button>
            </div>

            <div className="grid gap-4">
              {containers.map((container) => (
                <Card
                  key={container.id}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Server className="w-5 h-5 text-blue-400" />
                          {container.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {container.image} • {container.instances} instances
                        </CardDescription>
                      </div>
                      <Badge
                        variant={container.status === "running" ? "default" : "secondary"}
                        className={container.status === "running" ? "bg-green-600" : ""}
                      >
                        {container.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">CPU</p>
                        <p className="text-white font-semibold">{container.cpu}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Memory</p>
                        <p className="text-white font-semibold">{container.memory}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Requests</p>
                        <p className="text-white font-semibold">{container.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Uptime</p>
                        <p className="text-green-400 font-semibold">{container.uptime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Scale
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Activity className="w-4 h-4 mr-1" />
                        Logs
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Deploy Serverless Function</CardTitle>
                  <CardDescription className="text-slate-400">
                    Deploy code that runs on-demand across the global edge network
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="func-name" className="text-slate-300">
                      Function Name
                    </Label>
                    <Input
                      id="func-name"
                      placeholder="my-function"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="runtime" className="text-slate-300">
                      Runtime
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select runtime" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nodejs18">Node.js 18</SelectItem>
                        <SelectItem value="python311">Python 3.11</SelectItem>
                        <SelectItem value="go119">Go 1.19</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-slate-300">
                      Function Code
                    </Label>
                    <Textarea
                      id="code"
                      placeholder="export default function handler(req, res) { ... }"
                      className="bg-slate-800 border-slate-600 text-white font-mono min-h-[150px]"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Deploy Function
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Deploy Container</CardTitle>
                  <CardDescription className="text-slate-400">
                    Deploy containerized applications with auto-scaling
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="container-name" className="text-slate-300">
                      Service Name
                    </Label>
                    <Input
                      id="container-name"
                      placeholder="my-service"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-slate-300">
                      Container Image
                    </Label>
                    <Input id="image" placeholder="nginx:latest" className="bg-slate-800 border-slate-600 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpu" className="text-slate-300">
                        CPU
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                          <SelectValue placeholder="CPU" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5 vCPU</SelectItem>
                          <SelectItem value="1">1 vCPU</SelectItem>
                          <SelectItem value="2">2 vCPU</SelectItem>
                          <SelectItem value="4">4 vCPU</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memory" className="text-slate-300">
                        Memory
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                          <SelectValue placeholder="Memory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="512mb">512 MB</SelectItem>
                          <SelectItem value="1gb">1 GB</SelectItem>
                          <SelectItem value="2gb">2 GB</SelectItem>
                          <SelectItem value="4gb">4 GB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Server className="w-4 h-4 mr-2" />
                    Deploy Container
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Compute Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Function Invocations</span>
                      <span className="text-purple-400 font-semibold">12.4M/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Container Requests</span>
                      <span className="text-blue-400 font-semibold">2.6M/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Average Latency</span>
                      <span className="text-green-400 font-semibold">85ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Error Rate</span>
                      <span className="text-red-400 font-semibold">0.02%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">CPU Usage</span>
                      <span className="text-yellow-400 font-semibold">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Memory Usage</span>
                      <span className="text-orange-400 font-semibold">72%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Network I/O</span>
                      <span className="text-cyan-400 font-semibold">1.2 GB/s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Active Nodes</span>
                      <span className="text-green-400 font-semibold">2,340</span>
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
