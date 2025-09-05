import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Database, Cpu, HardDrive, Shield, Brain, Code, CreditCard, Users } from "lucide-react"

export default function CloudOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            BitnunCloud Platform
          </h1>
          <p className="text-xl text-slate-400 mb-6">
            Decentralized Cloud Services Powered by WASM Blockchain Technology
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-emerald-600 text-lg px-4 py-2">78% Cost Savings</Badge>
            <Badge className="bg-blue-600 text-lg px-4 py-2">Zero Vendor Lock-in</Badge>
            <Badge className="bg-purple-600 text-lg px-4 py-2">Blockchain Native</Badge>
          </div>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/cloud/database">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-blue-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg group-hover:scale-110 transition-transform">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-blue-400">Database</CardTitle>
                <CardDescription>Decentralized database services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• PostgreSQL, MongoDB, Redis</p>
                  <p>• Real-time synchronization</p>
                  <p>• Global distribution</p>
                  <p>• Sub-10ms latency</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/compute">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-purple-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-purple-400">Compute</CardTitle>
                <CardDescription>Serverless & container platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• Serverless functions</p>
                  <p>• Container orchestration</p>
                  <p>• Auto-scaling</p>
                  <p>• Edge deployment</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/storage">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-green-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg group-hover:scale-110 transition-transform">
                  <HardDrive className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-green-400">Storage</CardTitle>
                <CardDescription>Object storage & CDN</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• Object storage</p>
                  <p>• Global CDN</p>
                  <p>• Image processing</p>
                  <p>• 28ms avg latency</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/auth">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-orange-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-orange-400">Authentication</CardTitle>
                <CardDescription>Identity & access management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• Multi-factor auth</p>
                  <p>• Social login</p>
                  <p>• Role-based access</p>
                  <p>• Blockchain identity</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/ai">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-pink-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-pink-400">AI/ML</CardTitle>
                <CardDescription>Machine learning platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• Model training</p>
                  <p>• Inference endpoints</p>
                  <p>• AutoML pipelines</p>
                  <p>• GPU clusters</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/api">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-cyan-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg group-hover:scale-110 transition-transform">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-cyan-400">API Gateway</CardTitle>
                <CardDescription>API management & routing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• API routing</p>
                  <p>• Rate limiting</p>
                  <p>• Analytics</p>
                  <p>• Webhook management</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/devtools">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-indigo-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-indigo-400">DevTools</CardTitle>
                <CardDescription>Developer platform & marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• Code repositories</p>
                  <p>• CI/CD pipelines</p>
                  <p>• Package registry</p>
                  <p>• Extensions marketplace</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cloud/billing">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-emerald-500/50 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg group-hover:scale-110 transition-transform">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-emerald-400">Billing</CardTitle>
                <CardDescription>Resource & cost management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• BTN token billing</p>
                  <p>• Cost optimization</p>
                  <p>• Usage analytics</p>
                  <p>• Auto-scaling</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-400 mb-2">1,240</p>
              <p className="text-slate-400">Active Nodes</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-400 mb-2">85</p>
              <p className="text-slate-400">Global Regions</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-purple-400 mb-2">99.9%</p>
              <p className="text-slate-400">Uptime SLA</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-orange-400 mb-2">78%</p>
              <p className="text-slate-400">Cost Savings</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Build on BitnunCloud?</h2>
              <p className="text-slate-300 mb-6 text-lg">
                Join thousands of developers building the future with decentralized cloud infrastructure
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-500 text-slate-300 hover:bg-slate-800 text-lg px-8 py-3 bg-transparent"
                >
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
