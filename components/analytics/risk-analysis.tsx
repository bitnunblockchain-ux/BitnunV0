"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Shield, Activity } from "lucide-react"

export function RiskAnalysis() {
  const riskMetrics = [
    { name: "Value at Risk (95%)", value: "$142,369", percentage: 5.0, status: "medium" },
    { name: "Maximum Drawdown", value: "18.7%", percentage: 18.7, status: "low" },
    { name: "Volatility (30D)", value: "24.3%", percentage: 24.3, status: "medium" },
    { name: "Sharpe Ratio", value: "1.87", percentage: 75.0, status: "high" },
  ]

  const correlationMatrix = [
    { asset1: "BTN", asset2: "ETH", correlation: 0.73 },
    { asset1: "BTN", asset2: "BTC", correlation: 0.45 },
    { asset1: "BTN", asset2: "MATIC", correlation: 0.68 },
    { asset1: "ETH", asset2: "BTC", correlation: 0.82 },
    { asset1: "ETH", asset2: "MATIC", correlation: 0.91 },
    { asset1: "BTC", asset2: "MATIC", correlation: 0.67 },
  ]

  const stressTests = [
    { scenario: "Market Crash (-50%)", impact: "-$1,423,696", percentage: -50.0 },
    { scenario: "Crypto Winter (-70%)", impact: "-$1,993,174", percentage: -70.0 },
    { scenario: "DeFi Collapse (-40%)", impact: "-$1,138,957", percentage: -40.0 },
    { scenario: "Regulatory Crackdown (-30%)", impact: "-$854,218", percentage: -30.0 },
  ]

  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Progress value={metric.percentage} className="h-2" />
                <Badge
                  variant={
                    metric.status === "low" ? "default" : metric.status === "medium" ? "secondary" : "destructive"
                  }
                >
                  {metric.status} risk
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlation Matrix */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-emerald-600" />
              Asset Correlation Matrix
            </CardTitle>
            <CardDescription>Correlation coefficients between major holdings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {correlationMatrix.map((corr, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {corr.asset1} - {corr.asset2}
                </span>
                <div className="flex items-center space-x-2">
                  <Progress value={Math.abs(corr.correlation) * 100} className="w-20 h-2" />
                  <span
                    className={`text-sm font-medium ${corr.correlation > 0.7 ? "text-red-600" : corr.correlation > 0.4 ? "text-yellow-600" : "text-emerald-600"}`}
                  >
                    {corr.correlation.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stress Testing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Stress Test Scenarios
            </CardTitle>
            <CardDescription>Portfolio impact under adverse market conditions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stressTests.map((test, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{test.scenario}</span>
                  <Badge variant="destructive">{test.percentage}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Portfolio Impact</span>
                  <span className="text-sm font-medium text-red-600">{test.impact}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-emerald-600" />
            Risk Management Recommendations
          </CardTitle>
          <CardDescription>AI-powered suggestions to optimize your risk profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">High Correlation Alert</h4>
            <p className="text-sm text-yellow-700">
              ETH and MATIC show high correlation (0.91). Consider diversifying into uncorrelated assets to reduce
              portfolio risk.
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Volatility Management</h4>
            <p className="text-sm text-blue-700">
              Current 30-day volatility is 24.3%. Consider adding stablecoin positions to reduce overall portfolio
              volatility.
            </p>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">Strong Performance</h4>
            <p className="text-sm text-emerald-700">
              Sharpe ratio of 1.87 indicates excellent risk-adjusted returns. Current allocation strategy is performing
              well.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
