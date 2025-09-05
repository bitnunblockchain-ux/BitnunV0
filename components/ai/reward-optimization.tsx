"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, TrendingUp, Settings, RefreshCw } from "lucide-react"

export function RewardOptimization() {
  const optimizationMetrics = {
    currentEfficiency: 73,
    optimizedEfficiency: 91,
    potentialIncrease: 25,
    lastOptimized: "2 hours ago",
  }

  const optimizationSuggestions = [
    {
      action: "Increase Mining Rewards",
      impact: "High",
      confidence: 94,
      description: "Boost mining rewards during peak hours (16:00-20:00)",
      estimatedIncrease: "+18% engagement",
      status: "pending",
    },
    {
      action: "Dynamic NFT Bonuses",
      impact: "Medium",
      confidence: 87,
      description: "Adjust NFT purchase bonuses based on rarity and demand",
      estimatedIncrease: "+12% sales",
      status: "active",
    },
    {
      action: "Eco Action Multipliers",
      impact: "Medium",
      confidence: 91,
      description: "Apply 2x multipliers for weekend eco-challenges",
      estimatedIncrease: "+15% participation",
      status: "testing",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "testing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Reward Optimization</span>
          </CardTitle>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Performance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Efficiency</span>
            <span className="font-semibold text-foreground">{optimizationMetrics.currentEfficiency}%</span>
          </div>
          <Progress value={optimizationMetrics.currentEfficiency} className="h-2" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Optimized Potential</span>
            <span className="font-semibold text-green-600">{optimizationMetrics.optimizedEfficiency}%</span>
          </div>
          <Progress value={optimizationMetrics.optimizedEfficiency} className="h-2" />
        </div>

        {/* Improvement Potential */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-green-800">+{optimizationMetrics.potentialIncrease}%</p>
          <p className="text-sm text-green-700">Potential Improvement</p>
        </div>

        {/* Optimization Suggestions */}
        <div>
          <h4 className="font-medium text-foreground mb-3">AI Suggestions</h4>
          <div className="space-y-3">
            {optimizationSuggestions.map((suggestion, index) => (
              <div key={index} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <h5 className="font-medium text-foreground text-sm">{suggestion.action}</h5>
                  <div className="flex space-x-1">
                    <Badge className={getImpactColor(suggestion.impact)} variant="outline">
                      {suggestion.impact}
                    </Badge>
                    <Badge className={getStatusColor(suggestion.status)} variant="outline">
                      {suggestion.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">{suggestion.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">{suggestion.estimatedIncrease}</span>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.confidence}% confidence
                  </Badge>
                </div>

                {suggestion.status === "pending" && (
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Apply Optimization
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Last Update */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Last optimized: {optimizationMetrics.lastOptimized}</p>
          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Configure AI Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
