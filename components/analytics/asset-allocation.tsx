"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function AssetAllocation() {
  const allocationData = [
    { name: "BTN Token", value: 43.8, amount: "$1,247,892", color: "#059669" },
    { name: "Ethereum", value: 24.1, amount: "$687,234", color: "#10b981" },
    { name: "Bitcoin", value: 16.0, amount: "$456,789", color: "#34d399" },
    { name: "Polygon", value: 8.2, amount: "$234,567", color: "#6ee7b7" },
    { name: "Others", value: 7.9, amount: "$220,910", color: "#a7f3d0" },
  ]

  const sectorAllocation = [
    { sector: "DeFi Protocols", allocation: 35.2, target: 40.0 },
    { sector: "Layer 1 Blockchains", allocation: 28.7, target: 25.0 },
    { sector: "NFT & Gaming", allocation: 15.3, target: 15.0 },
    { sector: "Infrastructure", allocation: 12.4, target: 10.0 },
    { sector: "Stablecoins", allocation: 8.4, target: 10.0 },
  ]

  const riskAllocation = [
    { risk: "Conservative", allocation: 25.0, description: "Stablecoins, Blue-chip tokens" },
    { risk: "Moderate", allocation: 45.0, description: "Established DeFi, Layer 1s" },
    { risk: "Aggressive", allocation: 30.0, description: "New protocols, High-growth tokens" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current portfolio distribution by asset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.value}%</p>
                      <p className="text-xs text-gray-500">{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Current vs target allocation by sector</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectorAllocation.map((sector) => (
              <div key={sector.sector} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{sector.sector}</span>
                  <span>
                    {sector.allocation}% / {sector.target}%
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={sector.allocation} className="h-2" />
                  <Progress value={sector.target} className="h-1 opacity-50" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Profile Allocation</CardTitle>
          <CardDescription>Portfolio distribution by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskAllocation.map((risk) => (
              <div key={risk.risk} className="text-center space-y-3">
                <div className="w-24 h-24 mx-auto relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#059669"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(risk.allocation / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{risk.allocation}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{risk.risk}</h3>
                  <p className="text-sm text-gray-600">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
