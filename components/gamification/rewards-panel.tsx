"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Clock, Star, Zap } from "lucide-react"

export function RewardsPanel() {
  const pendingRewards = [
    {
      id: "daily-login",
      title: "Daily Login Bonus",
      description: "7-day streak completed",
      reward: "10 BTN",
      type: "bonus",
      claimable: true,
      expiresIn: "23h 45m",
    },
    {
      id: "achievement-unlock",
      title: "Achievement Unlocked",
      description: "Eco Warrior badge earned",
      reward: "50 BTN + Badge",
      type: "achievement",
      claimable: true,
      expiresIn: "6d 12h",
    },
    {
      id: "mining-milestone",
      title: "Mining Milestone",
      description: "500 BTN mined total",
      reward: "25 BTN",
      type: "milestone",
      claimable: false,
      progress: 487,
      target: 500,
    },
  ]

  const recentClaims = [
    {
      title: "Weekly Challenge",
      reward: "100 BTN",
      claimedAt: "2 hours ago",
    },
    {
      title: "NFT Purchase Bonus",
      reward: "5 BTN",
      claimedAt: "1 day ago",
    },
    {
      title: "Referral Reward",
      reward: "20 BTN",
      claimedAt: "3 days ago",
    },
  ]

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "bonus":
        return <Gift className="w-4 h-4 text-blue-500" />
      case "achievement":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "milestone":
        return <Zap className="w-4 h-4 text-purple-500" />
      default:
        return <Gift className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-purple-500" />
          <span>Rewards</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pending Rewards */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Pending Rewards</h4>
          <div className="space-y-3">
            {pendingRewards.map((reward) => (
              <div key={reward.id} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-start space-x-2">
                  {getRewardIcon(reward.type)}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-foreground text-sm">{reward.title}</h5>
                    <p className="text-xs text-muted-foreground">{reward.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {reward.reward}
                  </Badge>
                </div>

                {reward.claimable ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Expires in {reward.expiresIn}</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Claim
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">
                        {reward.progress} / {reward.target}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${((reward.progress || 0) / (reward.target || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Claims</h4>
          <div className="space-y-2">
            {recentClaims.map((claim, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{claim.title}</p>
                  <p className="text-xs text-muted-foreground">{claim.claimedAt}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {claim.reward}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Claim All Button */}
        <Button className="w-full bg-primary hover:bg-primary/90">
          <Gift className="w-4 h-4 mr-2" />
          Claim All Available
        </Button>
      </CardContent>
    </Card>
  )
}
