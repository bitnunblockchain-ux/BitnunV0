"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Zap, Cpu, TrendingUp, Award, Play, Pause, BarChart3 } from "lucide-react"

export default function MiningPage() {
  const [isMining, setIsMining] = useState(false)
  const [miningStats, setMiningStats] = useState({
    hashRate: 0,
    power: 100,
    earnings: 0,
    efficiency: 85,
  })

  useEffect(() => {
    // Simulate mining stats updates
    const interval = setInterval(() => {
      if (isMining) {
        setMiningStats((prev) => ({
          ...prev,
          hashRate: prev.hashRate + Math.random() * 10,
          earnings: prev.earnings + Math.random() * 0.001,
          efficiency: Math.min(100, prev.efficiency + Math.random() * 2),
        }))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isMining])

  const toggleMining = () => {
    setIsMining(!isMining)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mining Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Mine BTN tokens using our advanced Action Mining and VR Mining technologies
          </p>
        </div>

        {/* Mining Control Panel */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Mining Control
                </CardTitle>
                <CardDescription className="text-gray-400">Start or stop your mining operations</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={isMining ? "default" : "secondary"} className="text-sm">
                  {isMining ? "Active" : "Inactive"}
                </Badge>
                <Button
                  onClick={toggleMining}
                  className={`${isMining ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90"}`}
                >
                  {isMining ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Mining
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Mining
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">Hash Rate</span>
                </div>
                <p className="text-2xl font-bold text-white">{miningStats.hashRate.toFixed(2)} MH/s</p>
                <p className="text-sm text-gray-400">Current speed</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">Mining Power</span>
                </div>
                <p className="text-2xl font-bold text-white">{miningStats.power}</p>
                <p className="text-sm text-gray-400">Available power</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">Earnings</span>
                </div>
                <p className="text-2xl font-bold text-white">{miningStats.earnings.toFixed(4)} BTN</p>
                <p className="text-sm text-gray-400">Today&apos;s earnings</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">Efficiency</span>
                </div>
                <p className="text-2xl font-bold text-white">{miningStats.efficiency.toFixed(1)}%</p>
                <Progress value={miningStats.efficiency} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mining Types */}
        <Tabs defaultValue="action" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="action" className="data-[state=active]:bg-primary">
              Action Mining
            </TabsTrigger>
            <TabsTrigger value="vr" className="data-[state=active]:bg-primary">
              VR Mining
            </TabsTrigger>
            <TabsTrigger value="pool" className="data-[state=active]:bg-primary">
              Pool Mining
            </TabsTrigger>
          </TabsList>

          <TabsContent value="action" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Action Mining</CardTitle>
                <CardDescription className="text-gray-400">
                  Earn BTN tokens by completing platform actions and engaging with the ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { action: "Daily Login", reward: "0.1 BTN", status: "completed" },
                    { action: "Trade Volume > $100", reward: "0.5 BTN", status: "pending" },
                    { action: "Stake Tokens", reward: "1.0 BTN", status: "available" },
                    { action: "Refer Friend", reward: "2.0 BTN", status: "available" },
                    { action: "Vote on Proposal", reward: "0.3 BTN", status: "available" },
                    { action: "Complete Tutorial", reward: "0.2 BTN", status: "completed" },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{item.action}</h4>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-primary font-semibold">{item.reward}</p>
                      {item.status === "available" && (
                        <Button size="sm" className="mt-2 w-full">
                          Start Action
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vr" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">VR Mining Experience</CardTitle>
                <CardDescription className="text-gray-400">
                  Immersive virtual reality mining with enhanced rewards and gamification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">VR Mining Stats</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">VR Sessions Today:</span>
                          <span className="text-white">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total VR Time:</span>
                          <span className="text-white">2h 45m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">VR Bonus Multiplier:</span>
                          <span className="text-primary">2.5x</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Launch VR Mining</Button>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-4">VR Mining Environments</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Cyber City", bonus: "2x", difficulty: "Easy" },
                        { name: "Space Station", bonus: "3x", difficulty: "Medium" },
                        { name: "Digital Ocean", bonus: "4x", difficulty: "Hard" },
                      ].map((env, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-gray-600/30 rounded">
                          <span className="text-white">{env.name}</span>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {env.bonus}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {env.difficulty}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pool" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Mining Pools</CardTitle>
                <CardDescription className="text-gray-400">
                  Join mining pools to increase your earning potential and reduce variance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "BTN Main Pool", hashRate: "1.2 TH/s", miners: 2847, fee: "1%", reward: "Daily" },
                    { name: "High Yield Pool", hashRate: "850 GH/s", miners: 1923, fee: "2%", reward: "Hourly" },
                    { name: "Beginner Pool", hashRate: "450 GH/s", miners: 892, fee: "0.5%", reward: "Weekly" },
                  ].map((pool, i) => (
                    <div key={i} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-white">{pool.name}</h4>
                          <p className="text-sm text-gray-400">{pool.miners} miners active</p>
                        </div>
                        <Button size="sm">Join Pool</Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Hash Rate:</span>
                          <p className="text-white font-medium">{pool.hashRate}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Fee:</span>
                          <p className="text-white font-medium">{pool.fee}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Rewards:</span>
                          <p className="text-white font-medium">{pool.reward}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mining Analytics */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Mining Analytics
            </CardTitle>
            <CardDescription className="text-gray-400">Track your mining performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <h4 className="text-sm text-gray-400 mb-2">Total Mined</h4>
                <p className="text-2xl font-bold text-primary">1,247.83 BTN</p>
                <p className="text-sm text-gray-400">All time</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <h4 className="text-sm text-gray-400 mb-2">This Week</h4>
                <p className="text-2xl font-bold text-primary">89.42 BTN</p>
                <p className="text-sm text-green-400">+12.5% vs last week</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <h4 className="text-sm text-gray-400 mb-2">Avg Daily</h4>
                <p className="text-2xl font-bold text-primary">12.77 BTN</p>
                <p className="text-sm text-gray-400">Last 30 days</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <h4 className="text-sm text-gray-400 mb-2">Efficiency</h4>
                <p className="text-2xl font-bold text-primary">94.2%</p>
                <p className="text-sm text-green-400">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
