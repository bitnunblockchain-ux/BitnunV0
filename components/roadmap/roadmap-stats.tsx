import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react"

export function RoadmapStats() {
  const phaseStats = [
    {
      phase: "Phase 1: MVP Launch",
      progress: 100,
      status: "completed",
      features: 12,
      completedFeatures: 12,
      timeline: "Q4 2023",
    },
    {
      phase: "Phase 2: NFT & Gamification",
      progress: 85,
      status: "in-progress",
      features: 15,
      completedFeatures: 13,
      timeline: "Q1 2024",
    },
    {
      phase: "Phase 3: AI Integration",
      progress: 60,
      status: "in-progress",
      features: 10,
      completedFeatures: 6,
      timeline: "Q2 2024",
    },
    {
      phase: "Phase 4: AR/VR Expansion",
      progress: 15,
      status: "planning",
      features: 8,
      completedFeatures: 1,
      timeline: "Q3 2024",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "planning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-card border-border mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>Phase Progress Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {phaseStats.map((phase, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(phase.status)}
                  <h4 className="font-medium text-foreground">{phase.phase}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(phase.status)} variant="outline">
                    {phase.status}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {phase.timeline}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Features: {phase.completedFeatures}/{phase.features}
                  </span>
                  <span className="text-foreground">{phase.progress}%</span>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
