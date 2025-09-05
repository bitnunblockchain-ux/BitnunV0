"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Users, Star, Copy } from "lucide-react"

interface Trader {
  id: string
  name: string
  username: string
  avatar: string
  verified: boolean
  followers: number
  winRate: number
  totalPnL: number
  monthlyReturn: number
  copiers: number
  specialties: string[]
}

export function TopTraders() {
  const [traders, setTraders] = useState<Trader[]>([])
  const [followedTraders, setFollowedTraders] = useState<Set<string>>(new Set())

  useEffect(() => {
    const mockTraders: Trader[] = [
      {
        id: "1",
        name: "Alex Chen",
        username: "@alextrader",
        avatar: "/trader-1.jpg",
        verified: true,
        followers: 15200,
        winRate: 87.5,
        totalPnL: 125000,
        monthlyReturn: 24.8,
        copiers: 1250,
        specialties: ["DeFi", "Eco Tokens", "Cross-Chain"],
      },
      {
        id: "2",
        name: "Sarah Kim",
        username: "@cryptosarah",
        avatar: "/trader-2.jpg",
        verified: true,
        followers: 28500,
        winRate: 92.3,
        totalPnL: 89000,
        monthlyReturn: 31.2,
        copiers: 2100,
        specialties: ["NFTs", "Sustainability", "Yield Farming"],
      },
      {
        id: "3",
        name: "Mike Rodriguez",
        username: "@mikedefi",
        avatar: "/trader-3.jpg",
        verified: false,
        followers: 8900,
        winRate: 78.9,
        totalPnL: 45000,
        monthlyReturn: 18.5,
        copiers: 650,
        specialties: ["Staking", "Governance", "Bridge Arbitrage"],
      },
    ]

    setTraders(mockTraders)
  }, [])

  const handleFollow = (traderId: string) => {
    setFollowedTraders((prev) => {
      const newFollowed = new Set(prev)
      if (newFollowed.has(traderId)) {
        newFollowed.delete(traderId)
      } else {
        newFollowed.add(traderId)
      }
      return newFollowed
    })
  }

  const handleCopyTrader = (traderId: string) => {
    console.log("[v0] Starting to copy trader:", traderId)
  }

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Traders</h3>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
          <TrendingUp className="w-3 h-3 mr-1" />
          Live Rankings
        </Badge>
      </div>

      <div className="space-y-4">
        {traders.map((trader, index) => (
          <div
            key={trader.id}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                    <AvatarFallback>{trader.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{trader.name}</span>
                    {trader.verified && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{trader.username}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-300">Win Rate</p>
                <p className="font-semibold text-emerald-500">{trader.winRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Monthly Return</p>
                <p className="font-semibold text-emerald-500">+{trader.monthlyReturn.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Total P&L</p>
                <p className="font-semibold text-gray-900 dark:text-white">${trader.totalPnL.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Copiers</p>
                <p className="font-semibold text-gray-900 dark:text-white">{trader.copiers.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {trader.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFollow(trader.id)}
                className={followedTraders.has(trader.id) ? "bg-emerald-50 text-emerald-600" : "bg-transparent"}
              >
                <Users className="w-3 h-3 mr-1" />
                {followedTraders.has(trader.id) ? "Following" : "Follow"}
              </Button>
              <Button
                size="sm"
                onClick={() => handleCopyTrader(trader.id)}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 bg-transparent">
        View All Traders
      </Button>
    </Card>
  )
}
