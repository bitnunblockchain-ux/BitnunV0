"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

interface ActivityEvent {
  id: string
  user_id: string
  action: string
  details: string
  timestamp: Date
  ip_address?: string
  user_agent?: string
}

interface ActivityStats {
  totalUsers: number
  activeUsers: number
  newRegistrations: number
  totalTransactions: number
  miningActions: number
  nftTrades: number
}

export function UserActivityTracker() {
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [stats, setStats] = useState<ActivityStats>({
    totalUsers: 0,
    activeUsers: 0,
    newRegistrations: 0,
    totalTransactions: 0,
    miningActions: 0,
    nftTrades: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    // Simulate real-time activity data
    const updateStats = () => {
      setStats({
        totalUsers: Math.floor(Math.random() * 10000) + 5000,
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        newRegistrations: Math.floor(Math.random() * 50) + 10,
        totalTransactions: Math.floor(Math.random() * 5000) + 2000,
        miningActions: Math.floor(Math.random() * 2000) + 1000,
        nftTrades: Math.floor(Math.random() * 100) + 50,
      })
    }

    // Simulate activity events
    const addActivity = () => {
      const actions = [
        "User Login",
        "Mining Started",
        "NFT Purchase",
        "Token Transfer",
        "Staking Reward",
        "DAO Vote",
        "Profile Update",
        "Wallet Connect",
      ]

      const newActivity: ActivityEvent = {
        id: Date.now().toString(),
        user_id: `user_${Math.floor(Math.random() * 1000)}`,
        action: actions[Math.floor(Math.random() * actions.length)],
        details: `Action performed successfully`,
        timestamp: new Date(),
        ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        user_agent: "BitnunEco/1.0",
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 19)]) // Keep last 20 activities
    }

    updateStats()
    const statsInterval = setInterval(updateStats, 5000)
    const activityInterval = setInterval(addActivity, 3000)

    return () => {
      clearInterval(statsInterval)
      clearInterval(activityInterval)
    }
  }, [])

  const getActionColor = (action: string) => {
    switch (action) {
      case "User Login":
        return "bg-blue-500/20 text-blue-400"
      case "Mining Started":
        return "bg-emerald-500/20 text-emerald-400"
      case "NFT Purchase":
        return "bg-purple-500/20 text-purple-400"
      case "Token Transfer":
        return "bg-cyan-500/20 text-cyan-400"
      case "Staking Reward":
        return "bg-yellow-500/20 text-yellow-400"
      case "DAO Vote":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-300">Total Users</p>
            <p className="text-2xl font-bold text-cyan-400">{stats.totalUsers.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-emerald-500/20 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-300">Active Now</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.activeUsers.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-300">New Today</p>
            <p className="text-2xl font-bold text-blue-400">{stats.newRegistrations}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-300">Transactions</p>
            <p className="text-2xl font-bold text-purple-400">{stats.totalTransactions.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-300">Mining Actions</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.miningActions.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-500/20 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-300">NFT Trades</p>
            <p className="text-2xl font-bold text-orange-400">{stats.nftTrades}</p>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-cyan-400">Live Activity Feed</CardTitle>
          <CardDescription className="text-slate-300">Real-time user actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Loading activity feed...</p>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 animate-fade-in"
                >
                  <div className="flex items-center gap-3">
                    <Badge className={getActionColor(activity.action)}>{activity.action}</Badge>
                    <div>
                      <p className="text-sm text-slate-200">{activity.details}</p>
                      <p className="text-xs text-slate-400">User: {activity.user_id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{activity.timestamp.toLocaleTimeString()}</p>
                    {activity.ip_address && <p className="text-xs text-slate-500">{activity.ip_address}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
