"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Award, Settings } from "lucide-react"

export function IdentityHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-emerald-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Digital Identity</h1>
                <p className="text-gray-600">Decentralized identity and reputation management</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Award className="h-3 w-3 mr-1" />
                Trusted Trader
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Reputation Score</p>
              <p className="text-2xl font-bold text-emerald-600">847</p>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
