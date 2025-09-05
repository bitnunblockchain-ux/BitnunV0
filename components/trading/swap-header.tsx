"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Zap, Users } from "lucide-react"

export function SwapHeader() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          BitnunSwap
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Trade tokens instantly with the lowest fees and best rates on BitnunEco
        </p>
        <div className="flex justify-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">0.1% Fee</Badge>
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Instant Settlement</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">MEV Protected</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-400 font-medium">24h Volume</p>
                <p className="text-2xl font-bold text-white">$2.4M</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <p className="text-xs text-emerald-400">+12.5%</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-full">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-400 font-medium">Total Liquidity</p>
                <p className="text-2xl font-bold text-white">$18.7M</p>
                <p className="text-xs text-gray-400">Across 45 pools</p>
              </div>
              <div className="p-3 bg-cyan-500/20 rounded-full">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 font-medium">Active Traders</p>
                <p className="text-2xl font-bold text-white">8,942</p>
                <p className="text-xs text-gray-400">+156 today</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 font-medium">Avg. Slippage</p>
                <p className="text-2xl font-bold text-white">0.12%</p>
                <p className="text-xs text-gray-400">Best in class</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-full">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Lightning Fast Swaps</h3>
            <p className="text-gray-400">
              Experience instant token swaps with our advanced routing algorithm and deep liquidity pools.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
