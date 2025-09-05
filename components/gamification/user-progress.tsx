"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Target } from "lucide-react"

export function UserProgress() {
  const currentLevel = 12
  const currentXP = 2847
  const nextLevelXP = 3000
  const progressPercentage = (currentXP / nextLevelXP) * 100

  const levelBenefits = [
    "Increased mining rewards (+15%)",
    "Exclusive NFT access",
    "Priority support",
    "Special badge: Eco Champion",
  ]

  const weeklyGoals = [
    { title: "Mine 50 BTN", current: 34, target: 50, reward: "5 BTN" },
    { title: "Complete 3 Eco Actions", current: 2, target: 3, reward: "Achievement Badge" },
    { title: "Trade 2 NFTs", current: 1, target: 2, reward: "10 BTN" },
  ]

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">Level {currentLevel}</p>
              <p className="text-sm text-muted-foreground">Eco Warrior</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {currentXP} / {nextLevelXP} XP
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
              <span className="text-foreground">{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Next Level Benefits</h4>
            <ul className="space-y-1">
              {levelBenefits.map((benefit, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span>Weekly Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{goal.title}</span>
                <Badge variant="outline" className="text-xs">
                  {goal.reward}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {goal.current} / {goal.target}
                </span>
                <span className="text-foreground">{((goal.current / goal.target) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
