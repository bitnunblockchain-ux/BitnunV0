"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Coins, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function WalletBalance() {
  const [showBalance, setShowBalance] = useState(true)
  const balance = 1247.89
  const usdValue = 2495.78
  const change24h = 12.5

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-emerald-600" />
              BTN Balance
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <CardDescription>Your BitnunEco token holdings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-emerald-600">
              {showBalance ? `${balance.toFixed(2)} BTN` : "••••••"}
            </p>
            <p className="text-lg text-gray-600">{showBalance ? `≈ $${usdValue.toFixed(2)} USD` : "≈ $••••••"}</p>
          </div>

          <div className="flex items-center gap-2">
            {change24h > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${change24h > 0 ? "text-green-600" : "text-red-600"}`}>
              {change24h > 0 ? "+" : ""}
              {change24h}% (24h)
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle>Mining Rewards</CardTitle>
          <CardDescription>Earned through eco-actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-teal-600">+47.23 BTN</p>
            <p className="text-sm text-gray-600">Last 24 hours</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Action Mining</span>
              <Badge variant="outline">+32.1 BTN</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>VR Bonus</span>
              <Badge variant="outline">+8.7 BTN</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Eco Challenges</span>
              <Badge variant="outline">+6.43 BTN</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
