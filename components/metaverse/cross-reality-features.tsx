"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Smartphone, Monitor, Headphones, Zap, Users, Globe } from "lucide-react"

export function CrossRealityFeatures() {
  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            Cross-Reality Mining
          </CardTitle>
          <CardDescription>
            Seamlessly switch between desktop, mobile AR, and VR while maintaining mining progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Device Sync Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Monitor className="h-6 w-6 text-blue-600" />
                <Badge className="bg-blue-600">Active</Badge>
              </div>
              <h3 className="font-medium">Desktop</h3>
              <p className="text-sm text-gray-600">Primary mining interface</p>
              <Progress value={85} className="mt-2 h-2" />
            </div>

            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Smartphone className="h-6 w-6 text-emerald-600" />
                <Badge variant="outline">Synced</Badge>
              </div>
              <h3 className="font-medium">Mobile AR</h3>
              <p className="text-sm text-gray-600">Location-based mining</p>
              <Progress value={62} className="mt-2 h-2" />
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Headphones className="h-6 w-6 text-purple-600" />
                <Badge variant="secondary">Standby</Badge>
              </div>
              <h3 className="font-medium">VR Headset</h3>
              <p className="text-sm text-gray-600">Immersive experience</p>
              <Progress value={0} className="mt-2 h-2" />
            </div>
          </div>

          {/* Cross-Reality Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Unified Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Continuous Mining</p>
                    <p className="text-sm text-gray-600">Never lose progress when switching devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Social Continuity</p>
                    <p className="text-sm text-gray-600">Maintain connections across platforms</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Multi-Device Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Mining Time</span>
                  <Badge variant="outline">4h 23m</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Cross-Reality Bonus</span>
                  <Badge className="bg-purple-600">+2.1x</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Devices Synced</span>
                  <Badge variant="outline">3/5</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reality Bridge Protocol */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle>Reality Bridge Protocol</CardTitle>
          <CardDescription>Advanced synchronization technology for seamless cross-platform experiences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Protocol Features</h3>
              <div className="space-y-3">
                <div className="p-3 border border-purple-200 rounded-lg">
                  <h4 className="font-medium">Real-time Sync</h4>
                  <p className="text-sm text-gray-600">Instant state synchronization across all devices</p>
                </div>
                <div className="p-3 border border-blue-200 rounded-lg">
                  <h4 className="font-medium">Adaptive UI</h4>
                  <p className="text-sm text-gray-600">Interface automatically adjusts to device capabilities</p>
                </div>
                <div className="p-3 border border-emerald-200 rounded-lg">
                  <h4 className="font-medium">Offline Support</h4>
                  <p className="text-sm text-gray-600">Continue mining offline, sync when reconnected</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Sync Latency</span>
                    <span className="text-sm font-medium">&lt; 50ms</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Data Integrity</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Cross-Platform Compatibility</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Enable Reality Bridge</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              View Technical Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
