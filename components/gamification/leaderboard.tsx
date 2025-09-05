"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users } from "lucide-react"

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState("weekly")

  const leaderboardData = {
    weekly: [
      {
        rank: 1,
        username: "EcoChampion",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 2847,
        change: "+12",
        badge: "Eco Warrior",
      },
      {
        rank: 2,
        username: "GreenMiner",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 2634,
        change: "+8",
        badge: "Mining Master",
      },
      {
        rank: 3,
        username: "NatureLover",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 2456,
        change: "+15",
        badge: "NFT Collector",
      },
      {
        rank: 4,
        username: "ClimateHero",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 2234,
        change: "-2",
        badge: "Carbon Neutral",
      },
      {
        rank: 5,
        username: "SolarPunk",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 2156,
        change: "+5",
        badge: "Renewable Energy",
      },
    ],
    monthly: [
      {
        rank: 1,
        username: "EcoChampion",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 12847,
        change: "+45",
        badge: "Eco Warrior",
      },
      {
        rank: 2,
        username: "GreenMiner",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 11634,
        change: "+23",
        badge: "Mining Master",
      },
      {
        rank: 3,
        username: "NatureLover",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 10456,
        change: "+67",
        badge: "NFT Collector",
      },
    ],
    allTime: [
      {
        rank: 1,
        username: "EcoChampion",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 45847,
        change: "+156",
        badge: "Eco Warrior",
      },
      {
        rank: 2,
        username: "GreenMiner",
        avatar: "/placeholder.svg?height=32&width=32",
        score: 43634,
        change: "+89",
        badge: "Mining Master",
      },
    ],
  }

  const currentUser = {
    rank: 156,
    username: "You",
    score: 2847,
    change: "+12",
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500" />
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-500" />
          <span>Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timeframe Selector */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {["weekly", "monthly", "allTime"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className="flex-1 text-xs"
            >
              {period === "allTime" ? "All Time" : period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>

        {/* Current User Position */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
              <span className="text-xs font-bold text-primary-foreground">#{currentUser.rank}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentUser.username}</p>
              <p className="text-sm text-muted-foreground">{currentUser.score.toLocaleString()} points</p>
            </div>
            <Badge variant={currentUser.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
              {currentUser.change}
            </Badge>
          </div>
        </div>

        {/* Top Users */}
        <div className="space-y-3">
          {leaderboardData[timeframe as keyof typeof leaderboardData].map((user) => (
            <div key={user.rank} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>

              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.badge}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.score.toLocaleString()}</p>
                <Badge variant={user.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                  {user.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Leaderboard */}
        <Button variant="outline" className="w-full bg-transparent">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  )
}
