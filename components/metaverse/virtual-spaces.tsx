"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Zap, TreePine, Waves, Sun } from "lucide-react"

export function VirtualSpaces() {
  const virtualSpaces = [
    {
      id: 1,
      name: "Emerald Forest",
      description: "Ancient woodland with mystical mining nodes",
      users: 234,
      type: "Forest",
      bonus: "2.3x",
      icon: TreePine,
      color: "emerald",
    },
    {
      id: 2,
      name: "Crystal Ocean",
      description: "Underwater realm with coral reef mining",
      users: 189,
      type: "Ocean",
      bonus: "2.7x",
      icon: Waves,
      color: "blue",
    },
    {
      id: 3,
      name: "Solar Citadel",
      description: "Futuristic city powered by renewable energy",
      users: 312,
      type: "City",
      bonus: "3.1x",
      icon: Sun,
      color: "yellow",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Virtual Mining Spaces
          </CardTitle>
          <CardDescription>
            Explore immersive 3D environments designed for collaborative mining experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {virtualSpaces.map((space) => {
              const IconComponent = space.icon
              return (
                <Card key={space.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center space-y-3">
                      <div
                        className={`w-16 h-16 mx-auto bg-${space.color}-100 rounded-full flex items-center justify-center`}
                      >
                        <IconComponent className={`h-8 w-8 text-${space.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{space.name}</h3>
                        <p className="text-sm text-gray-600">{space.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">{space.users}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mining Bonus</span>
                        <Badge className={`bg-${space.color}-600`}>{space.bonus}</Badge>
                      </div>
                    </div>

                    <Button className="w-full">Enter {space.name}</Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Space Creation */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle>Create Your Own Space</CardTitle>
          <CardDescription>Design and deploy custom virtual mining environments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Space Builder Tools</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium">3D Environment Editor</h4>
                  <p className="text-sm text-gray-600">Drag-and-drop 3D world creation</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <h4 className="font-medium">Mining Node Placement</h4>
                  <p className="text-sm text-gray-600">Strategic resource distribution</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h4 className="font-medium">Physics & Interactions</h4>
                  <p className="text-sm text-gray-600">Realistic environmental behavior</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Monetization Options</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Entry Fees</span>
                  <Badge variant="outline">5-50 BTN</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Revenue Share</span>
                  <Badge variant="outline">10-30%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">NFT Integration</span>
                  <Badge className="bg-blue-600">Available</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              Launch Space Builder
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              View Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
