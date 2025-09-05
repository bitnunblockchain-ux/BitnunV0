"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Camera, Scan, Eye, Layers, MapPin } from "lucide-react"

export function ARVisualization() {
  const [arActive, setArActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(false)

  const requestCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraPermission(true)
      setArActive(true)
    } catch (error) {
      console.error("Camera access denied:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-teal-600" />
            AR Blockchain Visualization
          </CardTitle>
          <CardDescription>Overlay blockchain data onto the real world through augmented reality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AR Activation */}
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
              {arActive ? <Eye className="h-16 w-16 text-teal-600" /> : <Camera className="h-16 w-16 text-gray-400" />}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{arActive ? "AR Mode Active" : "Activate AR Mode"}</h3>
              <p className="text-gray-600">
                {arActive
                  ? "Point your camera to see blockchain data overlays"
                  : "Grant camera access to start AR visualization"}
              </p>
            </div>

            <Button
              onClick={arActive ? () => setArActive(false) : requestCameraAccess}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {arActive ? "Stop AR Mode" : "Start AR Mode"}
            </Button>
          </div>

          {/* AR Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AR Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                  <Scan className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-medium">QR Code Mining</p>
                    <p className="text-sm text-gray-600">Scan codes to mine BTN</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Layers className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Data Overlays</p>
                    <p className="text-sm text-gray-600">See blockchain stats in AR</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Location Mining</p>
                    <p className="text-sm text-gray-600">Mine at eco-friendly locations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AR Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">AR Sessions Today</span>
                  <Badge variant="outline">247</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">QR Codes Scanned</span>
                  <Badge variant="outline">1,892</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">AR Mining Bonus</span>
                  <Badge className="bg-teal-600">+1.8x</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AR Mining Locations */}
      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle>AR Mining Locations</CardTitle>
          <CardDescription>Discover nearby locations with AR mining opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Central Park", type: "Nature Reserve", bonus: "2.5x", distance: "0.3 km" },
              { name: "Solar Farm Vista", type: "Renewable Energy", bonus: "3.0x", distance: "1.2 km" },
              { name: "Recycling Center", type: "Waste Management", bonus: "2.2x", distance: "0.8 km" },
              { name: "Green Building Hub", type: "Sustainable Architecture", bonus: "2.8x", distance: "2.1 km" },
            ].map((location, index) => (
              <div key={index} className="p-4 border border-teal-200 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{location.name}</h4>
                    <p className="text-sm text-gray-600">{location.type}</p>
                  </div>
                  <Badge className="bg-teal-600">{location.bonus}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{location.distance} away</span>
                  <Button size="sm" variant="outline">
                    Navigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
