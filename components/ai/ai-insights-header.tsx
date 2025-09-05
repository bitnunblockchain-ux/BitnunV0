import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Shield, TrendingUp, Zap, Settings } from "lucide-react"

export function AIInsightsHeader() {
  const aiStats = {
    modelsActive: 4,
    predictionsToday: 1247,
    fraudPrevented: 23,
    accuracyRate: 97.8,
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Intelligence Hub</h1>
          <p className="text-muted-foreground">Advanced AI-powered insights and security for BitnunEco</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>AI Systems Online</span>
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure AI
          </Button>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{aiStats.modelsActive}</p>
          <p className="text-sm text-muted-foreground">Active Models</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{aiStats.predictionsToday.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Predictions Today</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{aiStats.fraudPrevented}</p>
          <p className="text-sm text-muted-foreground">Fraud Prevented</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{aiStats.accuracyRate}%</p>
          <p className="text-sm text-muted-foreground">Accuracy Rate</p>
        </div>
      </div>
    </div>
  )
}
