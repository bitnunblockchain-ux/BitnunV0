"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Activity } from "lucide-react"

export function RiskManagement() {
  const riskMetrics = [
    { name: "Portfolio Risk", value: 15, threshold: 25, status: "low" },
    { name: "Liquidity Risk", value: 8, threshold: 20, status: "low" },
    { name: "Counterparty Risk", value: 22, threshold: 30, status: "medium" },
    { name: "Market Risk", value: 35, threshold: 40, status: "high" },
  ]

  const riskEvents = [
    { type: "Market Volatility", impact: "Medium", probability: "High", mitigation: "Diversification Strategy" },
    { type: "Liquidity Crunch", impact: "High", probability: "Low", mitigation: "Emergency Reserves" },
    { type: "Regulatory Change", impact: "Medium", probability: "Medium", mitigation: "Compliance Monitoring" },
    { type: "Cyber Attack", impact: "High", probability: "Low", mitigation: "Security Protocols" },
  ]

  const portfolioExposure = [
    { asset: "BTN Token", allocation: 45, risk: "Medium", value: "$1.08B" },
    { asset: "Staked Assets", allocation: 25, risk: "Low", value: "$600M" },
    { asset: "Liquidity Pools", allocation: 20, risk: "High", value: "$480M" },
    { asset: "Cross-Chain Assets", allocation: 10, risk: "Medium", value: "$240M" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}%</span>
                  <Badge
                    variant={
                      metric.status === "low" ? "default" : metric.status === "medium" ? "secondary" : "destructive"
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <Progress value={(metric.value / metric.threshold) * 100} className="h-2" />
                <p className="text-xs text-gray-500">Threshold: {metric.threshold}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Risk Events Matrix
            </CardTitle>
            <CardDescription>Potential risk events and mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskEvents.map((event, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{event.type}</p>
                  <div className="flex space-x-2">
                    <Badge variant={event.impact === "High" ? "destructive" : "secondary"}>{event.impact} Impact</Badge>
                    <Badge
                      variant={
                        event.probability === "High"
                          ? "destructive"
                          : event.probability === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {event.probability} Probability
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Mitigation:</strong> {event.mitigation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-emerald-600" />
              Portfolio Exposure
            </CardTitle>
            <CardDescription>Asset allocation and risk distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolioExposure.map((asset, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{asset.asset}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{asset.value}</span>
                    <Badge
                      variant={asset.risk === "Low" ? "default" : asset.risk === "Medium" ? "secondary" : "destructive"}
                    >
                      {asset.risk}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={asset.allocation} className="flex-1 h-2" />
                  <span className="text-sm text-gray-500 w-12">{asset.allocation}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
