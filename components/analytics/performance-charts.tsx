"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function PerformanceCharts() {
  const portfolioData = [
    { date: "2024-01-01", value: 2500000, benchmark: 2480000 },
    { date: "2024-01-08", value: 2620000, benchmark: 2510000 },
    { date: "2024-01-15", value: 2580000, benchmark: 2495000 },
    { date: "2024-01-22", value: 2750000, benchmark: 2540000 },
    { date: "2024-01-29", value: 2847392, benchmark: 2580000 },
  ]

  const monthlyReturns = [
    { month: "Aug", returns: 8.5, benchmark: 6.2 },
    { month: "Sep", returns: -2.1, benchmark: -1.8 },
    { month: "Oct", returns: 12.3, benchmark: 8.9 },
    { month: "Nov", returns: 15.7, benchmark: 11.2 },
    { month: "Dec", returns: 9.4, benchmark: 7.1 },
    { month: "Jan", returns: 13.9, benchmark: 9.8 },
  ]

  const assetPerformance = [
    { asset: "BTN", return1d: 2.3, return7d: 8.5, return30d: 24.7, return1y: 156.8 },
    { asset: "ETH", return1d: 1.8, return7d: 12.3, return30d: 18.9, return1y: 89.4 },
    { asset: "BTC", return1d: -0.5, return7d: -2.1, return30d: 8.7, return1y: 67.2 },
    { asset: "MATIC", return1d: 3.2, return7d: 15.7, return30d: 32.1, return1y: 78.9 },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">1D Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+0.85%</div>
            <p className="text-xs text-gray-500">vs benchmark +0.62%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">30D Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+13.9%</div>
            <p className="text-xs text-gray-500">vs benchmark +9.8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">1Y Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+89.7%</div>
            <p className="text-xs text-gray-500">vs benchmark +67.3%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Value Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Portfolio Performance
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  1M
                </Button>
                <Button variant="outline" size="sm">
                  3M
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  1Y
                </Button>
              </div>
            </CardTitle>
            <CardDescription>Portfolio value vs benchmark over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, ""]} />
                <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} name="Portfolio" />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Benchmark"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Returns */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Returns</CardTitle>
            <CardDescription>Monthly performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Bar dataKey="returns" fill="#059669" name="Portfolio" />
                <Bar dataKey="benchmark" fill="#6b7280" name="Benchmark" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Asset Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Performance Breakdown</CardTitle>
          <CardDescription>Individual asset returns across different timeframes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Asset</th>
                  <th className="text-right py-2">1D</th>
                  <th className="text-right py-2">7D</th>
                  <th className="text-right py-2">30D</th>
                  <th className="text-right py-2">1Y</th>
                </tr>
              </thead>
              <tbody>
                {assetPerformance.map((asset) => (
                  <tr key={asset.asset} className="border-b">
                    <td className="py-3 font-medium">{asset.asset}</td>
                    <td className={`text-right py-3 ${asset.return1d >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {asset.return1d >= 0 ? "+" : ""}
                      {asset.return1d}%
                    </td>
                    <td className={`text-right py-3 ${asset.return7d >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {asset.return7d >= 0 ? "+" : ""}
                      {asset.return7d}%
                    </td>
                    <td className={`text-right py-3 ${asset.return30d >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {asset.return30d >= 0 ? "+" : ""}
                      {asset.return30d}%
                    </td>
                    <td className={`text-right py-3 ${asset.return1y >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {asset.return1y >= 0 ? "+" : ""}
                      {asset.return1y}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
