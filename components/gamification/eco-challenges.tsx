"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Clock, Users, Target, Gift } from "lucide-react"

export function EcoChallenges() {
  const challenges = [
    {
      id: "tree-planting",
      title: "Global Tree Planting",
      description: "Help plant 10,000 virtual trees by completing eco-actions",
      type: "community",
      progress: 7234,
      target: 10000,
      timeLeft: "5 days",
      reward: "500 BTN + Tree NFT",
      participants: 1247,
      difficulty: "Easy",
      icon: Leaf,
      color: "bg-green-500",
    },
    {
      id: "carbon-offset",
      title: "Carbon Offset Challenge",
      description: "Collectively offset 1 ton of CO2 through platform activities",
      type: "community",
      progress: 650,
      target: 1000,
      timeLeft: "12 days",
      reward: "1000 BTN + Certificate",
      participants: 892,
      difficulty: "Medium",
      icon: Target,
      color: "bg-blue-500",
    },
    {
      id: "renewable-energy",
      title: "Renewable Energy Week",
      description: "Trade renewable energy themed NFTs to support clean energy",
      type: "individual",
      progress: 2,
      target: 5,
      timeLeft: "3 days",
      reward: "200 BTN + Badge",
      participants: 456,
      difficulty: "Hard",
      icon: Gift,
      color: "bg-yellow-500",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-500" />
          <span>Eco Challenges</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="border border-border rounded-lg p-4 space-y-4">
            {/* Challenge Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${challenge.color} rounded-full flex items-center justify-center`}>
                  <challenge.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
              </div>
              <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">
                  {challenge.progress.toLocaleString()} / {challenge.target.toLocaleString()}
                </span>
              </div>
              <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
            </div>

            {/* Challenge Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{challenge.timeLeft} left</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{challenge.participants.toLocaleString()} participants</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {challenge.reward}
              </Badge>
            </div>

            {/* Action Button */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              {challenge.type === "community" ? "Contribute" : "Join Challenge"}
            </Button>
          </div>
        ))}

        {/* View All Challenges */}
        <Button variant="outline" className="w-full bg-transparent">
          View All Challenges
        </Button>
      </CardContent>
    </Card>
  )
}
