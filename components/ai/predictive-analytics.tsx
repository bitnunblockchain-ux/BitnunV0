"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Brain } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function PredictiveAnalytics() {
  const miningPredictions = [
    { time: "00:00", actual: 45, predicted: 47, confidence: 92 },
    { time: "04:00", actual: 52, predicted: 51, confidence: 89 },
    { time: "08:00", actual: 68, predicted: 65, confidence: 94 },
    { time: "12:00", actual: 78, predicted: 82, confidence: 87 },
    { time: "16:00", actual: 85, predicted: 88, confidence: 91 },
    { time: "20:00", actual: 72, predicted: 75, confidence: 93 },
    { time: "24:00", actual: null, predicted: 58, confidence: 88 },
  ]

  const rewardOptimization = [
    { action: "NFT Purchase", currentReward: 5, optimizedReward: 7.2, improvement: 44 },
    { action: "Daily Login", currentReward: 1, optimizedReward: 1.8, improvement: 80 },
    { action: "Eco Action", currentReward: 3, optimizedReward: 4.1, improvement: 37 },
    { action: "Referral", currentReward: 10, optimizedReward: 12.5, improvement: 25 },
  ]

  const predictions = {
    nextHourMining: { value: 58, confidence: 88, trend: "up" },
    dailyRewards: { value: 145, confidence: 92, trend: "up" },
    userEngagement: { value: 78, confidence: 85, trend: "down" },
    networkLoad: { value: 34, confidence: 91, trend: "up" },
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-500" />
          <span>Predictive Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Predictions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(predictions).map(([key, prediction]) => (
            <div key={key} className="bg-muted rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                {prediction.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className="text-lg font-bold text-foreground">{prediction.value}</span>
              </div>
              <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {prediction.confidence}% confidence
              </Badge>
            </div>
          ))}
        </div>

        {/* Mining Predictions Chart */}
        <div>
          <h4 className="font-medium text-foreground mb-3">24-Hour Mining Predictions</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miningPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Actual BTN/hour"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted BTN/hour"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reward Optimization */}
        <div>
          <h4 className="font-medium text-foreground mb-3">AI-Optimized Rewards</h4>
          <div className="space-y-3">
            {rewardOptimization.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">
                    Current: {item.currentReward} BTN → Optimized: {item.optimizedReward} BTN
                  </p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  +{item.improvement}%
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">AI Insights</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mining activity expected to peak at 16:00 (85 BTN/hour predicted)</li>
                <li>• Reward optimization could increase user engagement by 32%</li>
                <li>• Network load trending upward - consider scaling resources</li>
                <li>• Daily login rewards show highest improvement potential (+80%)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
