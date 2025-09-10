"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Zap, Cpu, Activity, Settings, Sparkles } from "lucide-react"
import { useBlockchain } from "@/lib/hooks/use-blockchain"
import { useRealTimeMiningStats } from "@/lib/hooks/use-real-time-data"

export function MiningPanel() {
  const { stats, isConnected, recordAction, startMining, stopMining } = useBlockchain()
  const { stats: realTimeStats, loading: statsLoading } = useRealTimeMiningStats()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!stats.miningActive) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 3
        if (newProgress >= 100) {
          recordAction("block_completion", {
            blockNumber: stats.blocksInChain + 1,
            timestamp: Date.now(),
          })
          return 0
        }
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [stats.miningActive, stats.blocksInChain, recordAction])

  const toggleMining = () => {
    if (stats.miningActive) {
      stopMining()
      recordAction("mining_stopped", { duration: Date.now() })
    } else {
      startMining()
      recordAction("mining_started", { nodeId: stats.nodeId })
    }
  }

  const hashRate = stats.miningActive ? realTimeStats.hashRate : 0

  return (
    <Card className="glass-effect futuristic-border group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stats.miningActive ? "from-green-400/20 to-emerald-600/20" : "from-gray-400/10 to-gray-600/10"} rounded-full blur-2xl transition-all duration-1000`}
      />

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg bg-gradient-to-br from-primary to-accent ${stats.miningActive ? "animate-pulse-glow" : ""} transition-all duration-300`}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Browser Mining
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={stats.miningActive ? "default" : "secondary"}
              className={`${stats.miningActive ? "gradient-primary glow-primary animate-pulse" : "bg-muted"} font-semibold`}
            >
              {stats.miningActive ? "⚡ Active" : "⏸ Inactive"}
            </Badge>
            <Badge variant="outline" className="text-xs glass-effect border-primary/30">
              Node: {stats.nodeId.slice(-6)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 hover:glow-primary transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        <div className="flex items-center justify-between p-4 rounded-xl glass-effect border border-primary/20">
          <Button
            onClick={toggleMining}
            disabled={!isConnected}
            className={`
              relative overflow-hidden group/btn px-8 py-3 font-semibold text-lg
              ${
                stats.miningActive
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 glow-accent"
                  : "gradient-primary glow-primary hover:scale-105"
              }
              transition-all duration-300 shadow-xl
            `}
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            {stats.miningActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Stop Mining
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Mining
              </>
            )}
          </Button>

          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Action Rewards</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {statsLoading ? "..." : realTimeStats.totalRewards.toFixed(2)} BTN
            </p>
            <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg glass-effect border border-accent/20">
          <span className="text-sm font-medium text-muted-foreground">Network Status:</span>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
              {isConnected && <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />}
            </div>
            <span className="font-semibold text-foreground">{isConnected ? "Connected" : "Disconnected"}</span>
            <Badge variant="outline" className="text-xs">
              {statsLoading ? "..." : realTimeStats.activePeers.toLocaleString()} peers
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-muted-foreground">Block Progress</span>
            <span className="font-bold text-foreground">{progress.toFixed(1)}%</span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-muted border border-primary/20" />
            <div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-shimmer bg-[length:200%_100%] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              label: "Hash Rate",
              value: statsLoading ? "..." : `${hashRate.toFixed(2)} MH/s`,
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: Cpu,
              label: "Blocks Found",
              value: statsLoading ? "..." : realTimeStats.blocksFound.toString(),
              color: "from-blue-400 to-cyan-500",
            },
            {
              icon: Activity,
              label: "Network Difficulty",
              value: statsLoading ? "..." : (realTimeStats.networkDifficulty / 1000000).toFixed(1) + "M",
              color: "from-green-400 to-emerald-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl glass-effect border border-primary/10 hover:border-primary/30 transition-all duration-300 group/stat"
            >
              <div className="flex items-center justify-center mb-2">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${item.color} group-hover/stat:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              {statsLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-slate-700 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <p className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-xl p-6 border border-accent/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl" />
          <h4 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Action Mining
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Earn BTN tokens by interacting with the platform - rewards are calculated in real-time
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { action: "NFT Purchase", reward: "+10 BTN", color: "from-purple-400 to-pink-500" },
              { action: "Page Visit", reward: "+0.5 BTN", color: "from-blue-400 to-cyan-500" },
              { action: "Form Submit", reward: "+2 BTN", color: "from-green-400 to-emerald-500" },
              { action: "Social Share", reward: "+5 BTN", color: "from-yellow-400 to-orange-500" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded-lg glass-effect border border-primary/10 hover:border-primary/30 transition-all duration-300 group/reward"
              >
                <span className="text-muted-foreground group-hover/reward:text-foreground transition-colors">
                  {item.action}:
                </span>
                <span
                  className={`font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover/reward:scale-110 transition-transform duration-300`}
                >
                  {item.reward}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MiningPanel
