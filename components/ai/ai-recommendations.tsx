"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Users, Zap, Target } from "lucide-react"

export function AIRecommendations() {
  const recommendations = [
    {
      id: "rec-1",
      type: "optimization",
      priority: "high",
      title: "Optimize Mining Schedule",
      description: "Mine during 16:00-20:00 for 23% higher rewards",
      impact: "+18 BTN/day",
      confidence: 94,
      icon: Zap,
    },
    {
      id: "rec-2",
      type: "engagement",
      priority: "medium",
      title: "Join Eco Challenges",
      description: "Participate in weekend challenges for bonus rewards",
      impact: "+45 XP",
      confidence: 87,
      icon: Target,
    },
    {
      id: "rec-3",
      type: "social",
      priority: "medium",
      title: "Invite Friends",
      description: "Refer 2 more users to unlock community bonuses",
      impact: "+100 BTN",
      confidence: 91,
      icon: Users,
    },
    {
      id: "rec-4",
      type: "trading",
      priority: "low",
      title: "NFT Investment",
      description: "Ocean Conservation NFTs trending up 15%",
      impact: "Potential profit",
      confidence: 73,
      icon: TrendingUp,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "optimization":
        return "text-blue-600"
      case "engagement":
        return "text-green-600"
      case "social":
        return "text-purple-600"
      case "trading":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>AI Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-border rounded-lg p-3 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                <rec.icon className={`w-4 h-4 mt-0.5 ${getTypeColor(rec.type)}`} />
                <div className="flex-1">
                  <h5 className="font-medium text-foreground text-sm">{rec.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                </div>
              </div>
              <Badge className={getPriorityColor(rec.priority)} variant="outline">
                {rec.priority}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {rec.impact}
                </Badge>
                <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
              </div>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                Apply
              </Button>
            </div>
          </div>
        ))}

        {/* AI Learning Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-blue-900 text-sm">AI Learning Status</h4>
          </div>
          <p className="text-xs text-blue-800">
            AI is continuously learning from your behavior to provide better recommendations. Current accuracy: 89%
            (improving daily)
          </p>
        </div>

        {/* Feedback */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
            👍 Helpful
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
            👎 Not Useful
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
