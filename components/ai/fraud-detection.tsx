"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Eye, Clock } from "lucide-react"

export function FraudDetection() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  const fraudStats = {
    "24h": {
      totalTransactions: 15420,
      flaggedTransactions: 23,
      confirmedFraud: 8,
      falsePositives: 2,
      riskScore: 2.3,
    },
    "7d": {
      totalTransactions: 98340,
      flaggedTransactions: 156,
      confirmedFraud: 45,
      falsePositives: 12,
      riskScore: 3.1,
    },
    "30d": {
      totalTransactions: 423180,
      flaggedTransactions: 678,
      confirmedFraud: 234,
      falsePositives: 67,
      riskScore: 4.2,
    },
  }

  const recentAlerts = [
    {
      id: "alert-1",
      type: "high",
      title: "Suspicious Mining Pattern",
      description: "Unusual hash rate spike detected from user 0x1234...5678",
      timestamp: "2 minutes ago",
      status: "investigating",
      riskScore: 8.7,
    },
    {
      id: "alert-2",
      type: "medium",
      title: "Multiple Account Creation",
      description: "5 accounts created from same IP in 10 minutes",
      timestamp: "15 minutes ago",
      status: "resolved",
      riskScore: 6.2,
    },
    {
      id: "alert-3",
      type: "low",
      title: "Unusual Transaction Volume",
      description: "User exceeded normal transaction pattern by 300%",
      timestamp: "1 hour ago",
      status: "monitoring",
      riskScore: 4.1,
    },
  ]

  const currentStats = fraudStats[selectedTimeframe as keyof typeof fraudStats]
  const detectionRate = ((currentStats.confirmedFraud / currentStats.flaggedTransactions) * 100).toFixed(1)
  const accuracy = (
    ((currentStats.flaggedTransactions - currentStats.falsePositives) / currentStats.flaggedTransactions) *
    100
  ).toFixed(1)

  const getAlertColor = (type: string) => {
    switch (type) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "investigating":
        return <Eye className="w-4 h-4 text-orange-500" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "monitoring":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span>AI Fraud Detection</span>
          </CardTitle>
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {["24h", "7d", "30d"].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className="text-xs"
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{currentStats.totalTransactions.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{currentStats.flaggedTransactions}</p>
            <p className="text-sm text-muted-foreground">Flagged</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{currentStats.confirmedFraud}</p>
            <p className="text-sm text-muted-foreground">Confirmed Fraud</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Current Risk Level</h4>
            <Badge
              variant={
                currentStats.riskScore > 5 ? "destructive" : currentStats.riskScore > 3 ? "secondary" : "default"
              }
            >
              {currentStats.riskScore > 5 ? "High" : currentStats.riskScore > 3 ? "Medium" : "Low"}
            </Badge>
          </div>
          <Progress value={currentStats.riskScore * 10} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            Risk Score: {currentStats.riskScore}/10 - Detection Rate: {detectionRate}%
          </p>
        </div>

        {/* Recent Alerts */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Security Alerts</h4>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-foreground text-sm">{alert.title}</h5>
                      <Badge variant="outline" className="text-xs">
                        Risk: {alert.riskScore}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {getStatusIcon(alert.status)}
                      <span>{alert.status}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Model Performance */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">AI Model Performance</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">97.8%</p>
              <p className="text-xs text-muted-foreground">Precision</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">94.2%</p>
              <p className="text-xs text-muted-foreground">Recall</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">96.1%</p>
              <p className="text-xs text-muted-foreground">F1-Score</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
