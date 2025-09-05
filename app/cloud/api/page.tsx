import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Zap, Shield, TrendingUp } from "lucide-react"

export default function APIManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
              <Code className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                BitnunCloud API Gateway
              </h1>
              <p className="text-slate-400 text-lg">Decentralized API Management & Routing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">API Endpoints</p>
                    <p className="text-2xl font-bold text-cyan-400">2,847</p>
                  </div>
                  <Code className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Requests/sec</p>
                    <p className="text-2xl font-bold text-blue-400">45.2K</p>
                  </div>
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Avg Latency</p>
                    <p className="text-2xl font-bold text-green-400">23ms</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-400">99.8%</p>
                  </div>
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="endpoints" className="data-[state=active]:bg-cyan-600">
              Endpoints
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
              Security
            </TabsTrigger>
            <TabsTrigger value="keys" className="data-[state=active]:bg-green-600">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="data-[state=active]:bg-orange-600">
              Webhooks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Active Endpoints</CardTitle>
                  <CardDescription>Manage your API endpoints and routing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">/api/v1/users</p>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">User management endpoints</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>45.2K req/day</span>
                        <span>23ms avg latency</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">/api/v1/blockchain</p>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Blockchain operations</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>28.7K req/day</span>
                        <span>18ms avg latency</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">/api/v1/nft</p>
                        <Badge className="bg-blue-600">Throttled</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">NFT marketplace API</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>12.4K req/day</span>
                        <span>31ms avg latency</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                    Create Endpoint
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Load Balancing</CardTitle>
                  <CardDescription>Distribute traffic across nodes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Node 1 (US-East)</span>
                        <span className="text-sm text-blue-400">34%</span>
                      </div>
                      <Progress value={34} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Node 2 (EU-West)</span>
                        <span className="text-sm text-green-400">28%</span>
                      </div>
                      <Progress value={28} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Node 3 (Asia-Pacific)</span>
                        <span className="text-sm text-purple-400">23%</span>
                      </div>
                      <Progress value={23} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Node 4 (Global CDN)</span>
                        <span className="text-sm text-orange-400">15%</span>
                      </div>
                      <Progress value={15} className="h-2 bg-slate-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Request Analytics</CardTitle>
                  <CardDescription>Real-time API usage metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">2.1M</p>
                      <p className="text-sm text-slate-400">Requests Today</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">23ms</p>
                      <p className="text-sm text-slate-400">Avg Response</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">99.8%</p>
                      <p className="text-sm text-slate-400">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">847</p>
                      <p className="text-sm text-slate-400">Active Keys</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Performance Metrics</CardTitle>
                  <CardDescription>API performance over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">P50 Latency</span>
                        <span className="text-sm text-green-400">18ms</span>
                      </div>
                      <Progress value={18} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">P95 Latency</span>
                        <span className="text-sm text-blue-400">45ms</span>
                      </div>
                      <Progress value={45} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">P99 Latency</span>
                        <span className="text-sm text-purple-400">89ms</span>
                      </div>
                      <Progress value={89} className="h-2 bg-slate-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400">Rate Limiting</CardTitle>
                  <CardDescription>Configure API rate limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Free Tier</p>
                        <Badge className="bg-green-600">1K/hour</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Basic rate limiting for free users</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Current: 847/1000</span>
                        <span>Reset: 23 min</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Pro Tier</p>
                        <Badge className="bg-blue-600">10K/hour</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Enhanced limits for pro users</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Current: 2.3K/10K</span>
                        <span>Reset: 23 min</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-400">Security Events</CardTitle>
                  <CardDescription>Recent security alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Rate Limit Exceeded</p>
                        <Badge className="bg-green-600">Blocked</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">IP: 192.168.1.100</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Suspicious Pattern</p>
                        <Badge className="bg-yellow-600">Monitoring</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">Multiple failed auth attempts</p>
                      <p className="text-xs text-slate-500">15 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keys" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">API Keys</CardTitle>
                  <CardDescription>Manage your API authentication keys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Production Key</p>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">btn_live_sk_1234...5678</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Created: Dec 1, 2024</span>
                        <span>Last used: 2 min ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Development Key</p>
                        <Badge className="bg-blue-600">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">btn_test_sk_9876...4321</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Created: Nov 15, 2024</span>
                        <span>Last used: 1 hour ago</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Generate New Key
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Key Usage Stats</CardTitle>
                  <CardDescription>API key usage analytics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">1.8M</p>
                      <p className="text-sm text-slate-400">Requests (30d)</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">99.7%</p>
                      <p className="text-sm text-slate-400">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">21ms</p>
                      <p className="text-sm text-slate-400">Avg Latency</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">847</p>
                      <p className="text-sm text-slate-400">Unique IPs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-400">Webhook Endpoints</CardTitle>
                  <CardDescription>Configure webhook notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Payment Events</p>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">https://api.myapp.com/webhooks/payments</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Last delivery: 2 min ago</span>
                        <span>Success rate: 99.8%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">User Events</p>
                        <Badge className="bg-blue-600">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">https://api.myapp.com/webhooks/users</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Last delivery: 15 min ago</span>
                        <span>Success rate: 97.2%</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Add Webhook
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Delivery Logs</CardTitle>
                  <CardDescription>Recent webhook deliveries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">payment.completed</p>
                        <Badge className="bg-green-600">200</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">Delivered in 145ms</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">user.created</p>
                        <Badge className="bg-green-600">200</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">Delivered in 89ms</p>
                      <p className="text-xs text-slate-500">15 minutes ago</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">nft.minted</p>
                        <Badge className="bg-red-600">500</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">Failed - Timeout</p>
                      <p className="text-xs text-slate-500">1 hour ago</p>
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
