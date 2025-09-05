import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Map, Calendar, Target, TrendingUp } from "lucide-react"

export function RoadmapHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Development Roadmap</h1>
          <p className="text-muted-foreground">Track our journey towards a sustainable blockchain future</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>On Track</span>
          </Badge>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            Subscribe to Updates
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">Phase 2</p>
          <p className="text-sm text-muted-foreground">Current Phase</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">75%</p>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">Q2 2024</p>
          <p className="text-sm text-muted-foreground">Next Milestone</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Map className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">4</p>
          <p className="text-sm text-muted-foreground">Total Phases</p>
        </div>
      </div>
    </div>
  )
}
