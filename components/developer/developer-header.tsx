import { Button } from "@/components/ui/button"
import { Code, ExternalLink, Github, BookOpen } from "lucide-react"

export function DeveloperHeader() {
  const platformStats = {
    activeDevs: 1247,
    apiCalls: 2.4,
    uptime: 99.9,
    sdkDownloads: 15420,
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Developer Portal</h1>
          <p className="text-muted-foreground">Build the future of sustainable blockchain with BitnunEco APIs</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </Button>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Code className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{platformStats.activeDevs.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Active Developers</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <p className="text-2xl font-bold text-foreground">{platformStats.apiCalls}M</p>
          <p className="text-sm text-muted-foreground">API Calls/Month</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">
            ✓
          </div>
          <p className="text-2xl font-bold text-foreground">{platformStats.uptime}%</p>
          <p className="text-sm text-muted-foreground">API Uptime</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-6 h-6 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-foreground">{platformStats.sdkDownloads.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">SDK Downloads</p>
        </div>
      </div>
    </div>
  )
}
