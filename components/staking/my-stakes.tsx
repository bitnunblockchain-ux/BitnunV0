"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, Gift, AlertCircle } from "lucide-react"

interface UserStake {
  id: string
  poolName: string
  amount: number
  apy: number
  startDate: Date
  endDate: Date | null
  lockPeriod: string
  status: "active" | "unlocking" | "completed"
  earnedRewards: number
  pendingRewards: number
  canUnstake: boolean
}

export function MyStakes() {
  const [stakes, setStakes] = useState<UserStake[]>([])
  const [totalStaked, setTotalStaked] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)

  useEffect(() => {
    const mockStakes: UserStake[] = [
      {
        id: "1",
        poolName: "Flexible Pool",
        amount: 5000,
        apy: 12.5,
        startDate: new Date("2024-01-15"),
        endDate: null,
        lockPeriod: "No lock",
        status: "active",
        earnedRewards: 156.25,
        pendingRewards: 12.34,
        canUnstake: true,
      },
      {
        id: "2",
        poolName: "90-Day Pool",
        amount: 10000,
        apy: 18.2,
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-05-01"),
        lockPeriod: "90 days",
        status: "active",
        earnedRewards: 425.5,
        pendingRewards: 45.67,
        canUnstake: false,
      },
    ]

    setStakes(mockStakes)
    setTotalStaked(mockStakes.reduce((sum, stake) => sum + stake.amount, 0))
    setTotalEarned(mockStakes.reduce((sum, stake) => sum + stake.earnedRewards + stake.pendingRewards, 0))
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "unlocking":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getDaysRemaining = (endDate: Date | null) => {
    if (!endDate) return null
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const getLockProgress = (startDate: Date, endDate: Date | null) => {
    if (!endDate) return 100
    const now = new Date()
    const total = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-400 font-medium">Total Staked</p>
                <p className="text-2xl font-bold text-white">{totalStaked.toLocaleString()} BTN</p>
                <p className="text-xs text-gray-400">${(totalStaked * 5.35).toLocaleString()} USD</p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-full">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-400 font-medium">Total Earned</p>
                <p className="text-2xl font-bold text-white">{totalEarned.toFixed(2)} BTN</p>
                <p className="text-xs text-gray-400">${(totalEarned * 5.35).toFixed(2)} USD</p>
              </div>
              <div className="p-3 bg-cyan-500/20 rounded-full">
                <Gift className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 font-medium">Active Stakes</p>
                <p className="text-2xl font-bold text-white">{stakes.filter((s) => s.status === "active").length}</p>
                <p className="text-xs text-gray-400">Earning rewards</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">My Active Stakes</h3>

        {stakes.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Active Stakes</h3>
              <p className="text-gray-400 mb-4">Start staking your BTN tokens to earn rewards</p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Start Staking</Button>
            </CardContent>
          </Card>
        ) : (
          stakes.map((stake) => {
            const daysRemaining = getDaysRemaining(stake.endDate)
            const lockProgress = getLockProgress(stake.startDate, stake.endDate)

            return (
              <Card
                key={stake.id}
                className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{stake.poolName}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>APY: {stake.apy}%</span>
                        <span>Lock: {stake.lockPeriod}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(stake.status)}>{stake.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Staked Amount</p>
                      <p className="font-semibold text-white">{stake.amount.toLocaleString()} BTN</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Earned Rewards</p>
                      <p className="font-semibold text-emerald-400">{stake.earnedRewards.toFixed(2)} BTN</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Pending Rewards</p>
                      <p className="font-semibold text-cyan-400">{stake.pendingRewards.toFixed(2)} BTN</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Days Remaining</p>
                      <p className="font-semibold text-white">
                        {daysRemaining !== null ? `${daysRemaining} days` : "Flexible"}
                      </p>
                    </div>
                  </div>

                  {stake.endDate && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Lock Progress</span>
                        <span className="text-white">{lockProgress.toFixed(1)}%</span>
                      </div>
                      <Progress value={lockProgress} className="h-2 bg-gray-800" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                    >
                      Claim Rewards
                    </Button>
                    {stake.canUnstake && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:border-red-500/30 hover:text-red-400 bg-transparent"
                      >
                        Unstake
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
