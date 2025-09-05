import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Package, GitBranch, Users, Download } from "lucide-react"

export default function DevToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
              <Code className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                BitnunCloud DevTools
              </h1>
              <p className="text-slate-400 text-lg">Decentralized Developer Platform & Marketplace</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-slate-800/50 border-indigo-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Repos</p>
                    <p className="text-2xl font-bold text-indigo-400">12.4K</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-indigo-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Packages</p>
                    <p className="text-2xl font-bold text-purple-400">8.7K</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Developers</p>
                    <p className="text-2xl font-bold text-green-400">45.2K</p>
                  </div>
                  <Users className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-orange-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Downloads/day</p>
                    <p className="text-2xl font-bold text-orange-400">2.1M</p>
                  </div>
                  <Download className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-indigo-600">
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="repositories" className="data-[state=active]:bg-purple-600">
              Repositories
            </TabsTrigger>
            <TabsTrigger value="cicd" className="data-[state=active]:bg-blue-600">
              CI/CD
            </TabsTrigger>
            <TabsTrigger value="packages" className="data-[state=active]:bg-green-600">
              Packages
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-indigo-400">Featured Extensions</CardTitle>
                  <CardDescription>Popular developer tools and extensions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">BitnunLint</p>
                        <Badge className="bg-green-600">Free</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Smart contract linter</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">847K downloads</span>
                        <span className="text-slate-500">⭐ 4.9</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">WASM Debugger</p>
                        <Badge className="bg-blue-600">Premium</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Advanced WASM debugging</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">$9.99/month</span>
                        <span className="text-slate-500">⭐ 4.8</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Blockchain Explorer</p>
                        <Badge className="bg-purple-600">Popular</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Network visualization tool</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">Free</span>
                        <span className="text-slate-500">⭐ 4.7</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Browse All Extensions
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400">Development Frameworks</CardTitle>
                  <CardDescription>Blockchain development frameworks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">BitnunJS</p>
                        <Badge className="bg-green-600">v2.1.4</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">JavaScript SDK for BitnunEco</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">1.2M weekly downloads</span>
                        <span className="text-slate-500">MIT License</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">BitnunPy</p>
                        <Badge className="bg-blue-600">v1.8.2</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Python library for blockchain</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">456K weekly downloads</span>
                        <span className="text-slate-500">Apache 2.0</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">BitnunRust</p>
                        <Badge className="bg-orange-600">v0.9.1</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Rust crate for WASM contracts</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-orange-400">89K weekly downloads</span>
                        <span className="text-slate-500">MIT License</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Templates & Starters</CardTitle>
                  <CardDescription>Quick start project templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">DeFi dApp Template</p>
                        <Badge className="bg-green-600">New</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Complete DeFi application starter</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">2.3K uses</span>
                        <span className="text-slate-500">React + TypeScript</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">NFT Marketplace</p>
                        <Badge className="bg-purple-600">Popular</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Full-featured NFT platform</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-purple-400">5.7K uses</span>
                        <span className="text-slate-500">Next.js + Solidity</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">DAO Governance</p>
                        <Badge className="bg-blue-600">Updated</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Decentralized governance system</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">1.8K uses</span>
                        <span className="text-slate-500">Vue.js + Rust</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Create from Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="repositories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400">Your Repositories</CardTitle>
                  <CardDescription>Manage your code repositories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">bitnun-defi-protocol</p>
                        <Badge className="bg-green-600">Public</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">DeFi lending protocol implementation</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>TypeScript • 2.3 MB</span>
                        <span>Updated 2 hours ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">nft-marketplace-contracts</p>
                        <Badge className="bg-blue-600">Private</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Smart contracts for NFT trading</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Rust • 1.8 MB</span>
                        <span>Updated 1 day ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">dao-governance-ui</p>
                        <Badge className="bg-purple-600">Fork</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Frontend for DAO voting system</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>React • 4.1 MB</span>
                        <span>Updated 3 days ago</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Create Repository
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Recent Activity</CardTitle>
                  <CardDescription>Latest commits and pull requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="font-medium text-white text-sm">Merged PR #47</p>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">Add staking rewards calculation</p>
                      <p className="text-xs text-slate-500">bitnun-defi-protocol • 2 hours ago</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="font-medium text-white text-sm">Pushed 3 commits</p>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">Update NFT metadata schema</p>
                      <p className="text-xs text-slate-500">nft-marketplace-contracts • 6 hours ago</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="font-medium text-white text-sm">Created branch</p>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">feature/multi-sig-support</p>
                      <p className="text-xs text-slate-500">dao-governance-ui • 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cicd" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Build Pipelines</CardTitle>
                  <CardDescription>Automated CI/CD workflows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">DeFi Protocol Deploy</p>
                        <Badge className="bg-green-600">Success</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Build #247</span>
                        <span className="text-sm text-green-400">2m 34s</span>
                      </div>
                      <Progress value={100} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">Deployed to mainnet • 15 minutes ago</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">NFT Contract Tests</p>
                        <Badge className="bg-blue-600">Running</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Build #156</span>
                        <span className="text-sm text-blue-400">1m 12s</span>
                      </div>
                      <Progress value={67} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">Running integration tests</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Create Pipeline
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Deployment Stats</CardTitle>
                  <CardDescription>Deployment metrics and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">98.7%</p>
                      <p className="text-sm text-slate-400">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">2.3m</p>
                      <p className="text-sm text-slate-400">Avg Build Time</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">847</p>
                      <p className="text-sm text-slate-400">Deployments</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">99.9%</p>
                      <p className="text-sm text-slate-400">Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Package Registry</CardTitle>
                  <CardDescription>Decentralized package distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">@bitnun/core</p>
                        <Badge className="bg-green-600">v2.1.4</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Core blockchain utilities</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">1.2M downloads</span>
                        <span className="text-slate-500">Published 2 days ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">@bitnun/contracts</p>
                        <Badge className="bg-blue-600">v1.8.2</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Smart contract templates</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">456K downloads</span>
                        <span className="text-slate-500">Published 1 week ago</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                    Publish Package
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-400">Distribution Network</CardTitle>
                  <CardDescription>Global package distribution stats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">847</p>
                      <p className="text-sm text-slate-400">CDN Nodes</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">12ms</p>
                      <p className="text-sm text-slate-400">Avg Latency</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">2.1M</p>
                      <p className="text-sm text-slate-400">Daily Downloads</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">99.8%</p>
                      <p className="text-sm text-slate-400">Cache Hit Rate</p>
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
                  <CardTitle className="text-orange-400">Developer Insights</CardTitle>
                  <CardDescription>Usage analytics and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">45.2K</p>
                      <p className="text-sm text-slate-400">Active Developers</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">12.4K</p>
                      <p className="text-sm text-slate-400">Projects Created</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">2.1M</p>
                      <p className="text-sm text-slate-400">API Calls/day</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">847K</p>
                      <p className="text-sm text-slate-400">Deployments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Community Growth</CardTitle>
                  <CardDescription>Platform adoption metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">New Developers (30d)</span>
                        <span className="text-sm text-green-400">+23.4%</span>
                      </div>
                      <Progress value={78} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Package Downloads</span>
                        <span className="text-sm text-blue-400">+45.7%</span>
                      </div>
                      <Progress value={89} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Repository Stars</span>
                        <span className="text-sm text-purple-400">+67.2%</span>
                      </div>
                      <Progress value={92} className="h-2 bg-slate-700" />
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
