"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cable as Cube, Headphones, Smartphone } from "lucide-react"

export function MetaverseHeader() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Cube className="h-16 w-16 text-emerald-200" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">BitnunEco Metaverse</h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto text-balance">
              Experience blockchain mining in immersive AR/VR environments with cross-reality features
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Headphones className="h-4 w-4 mr-2" />
              VR Compatible
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Smartphone className="h-4 w-4 mr-2" />
              AR Ready
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              WebXR Powered
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
              Launch VR Experience
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Try AR Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
