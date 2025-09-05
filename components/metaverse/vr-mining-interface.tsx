"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Headphones, Zap, Coins, Users, Play, Pause, Settings } from "lucide-react"

interface VRMiningInterfaceProps {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

export function VRMiningInterface({ isConnected, setIsConnected }: VRMiningInterfaceProps) {
  const [miningActive, setMiningActive] = useState(false)
  const [vrProgress, setVrProgress] = useState(67)

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-emerald-600" />
            VR Mining Environment
          </CardTitle>
          <CardDescription>
            Immersive 3D mining experience with spatial interaction and gesture controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* VR Connection Status */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"}`} />
              <span className="font-medium">{isConnected ? "VR Headset Connected" : "VR Headset Disconnected"}</span>
            </div>
            <Button onClick={() => setIsConnected(!isConnected)} variant={isConnected ? "outline" : "default"}>
              {isConnected ? "Disconnect" : "Connect VR"}
            </Button>
          </div>

          {/* Mining Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mining Controls</h3>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => setMiningActive(!miningActive)} disabled={!isConnected}>
                  {miningActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause VR Mining
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start VR Mining
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full bg-transparent" disabled={!isConnected}>
                  <Settings className="h-4 w-4 mr-2" />
                  VR Settings
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">VR Mining Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mining Progress</span>
                  <span className="text-sm font-medium">{vrProgress}%</span>
                </div>
                <Progress value={vrProgress} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">VR Rewards</p>
                    <p className="font-semibold text-emerald-600">+2.5x Multiplier</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Immersion Time</p>
                    <p className="font-semibold">47 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VR Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg text-center">
              <Zap className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-medium">Gesture Mining</h4>
              <p className="text-sm text-gray-600">Mine with hand gestures</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg text-center">
              <Coins className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <h4 className="font-medium">3D Visualization</h4>
              <p className="text-sm text-gray-600">See blockchain in 3D</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium">Social Mining</h4>
              <p className="text-sm text-gray-600">Mine with friends</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VR Mining Leaderboard */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle>VR Mining Leaderboard</CardTitle>
          <CardDescription>Top performers in VR mining environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "VRMiner_Pro", score: "15,847 BTN", badge: "🥇" },
              { rank: 2, name: "MetaEcoWarrior", score: "12,394 BTN", badge: "🥈" },
              { rank: 3, name: "VirtualGreen", score: "9,876 BTN", badge: "🥉" },
              { rank: 4, name: "EcoVRExplorer", score: "8,234 BTN", badge: "" },
              { rank: 5, name: "GreenMiner3D", score: "7,891 BTN", badge: "" },
            ].map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{player.badge || `#${player.rank}`}</span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <Badge variant="outline">{player.score}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
