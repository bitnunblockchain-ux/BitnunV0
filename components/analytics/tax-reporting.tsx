"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download } from "lucide-react"

export function TaxReporting() {
  const taxSummary = [
    { name: "Realized Gains", value: "$347,892", tax: "$69,578", rate: "20%" },
    { name: "Realized Losses", value: "-$23,456", tax: "$0", rate: "0%" },
    { name: "Net Capital Gains", value: "$324,436", tax: "$64,887", rate: "20%" },
    { name: "Staking Rewards", value: "$45,678", tax: "$18,271", rate: "40%" },
  ]

  const taxReports = [
    { year: "2024", status: "In Progress", transactions: 1247, gains: "$324,436", tax: "$83,158" },
    { year: "2023", status: "Complete", transactions: 892, gains: "$156,789", tax: "$47,037" },
    { year: "2022", status: "Complete", transactions: 634, gains: "$89,234", tax: "$26,770" },
  ]

  const recentTransactions = [
    { date: "2024-01-29", type: "Sale", asset: "ETH", amount: "2.5", proceeds: "$6,250", cost: "$5,800", gain: "$450" },
    {
      date: "2024-01-28",
      type: "Staking Reward",
      asset: "BTN",
      amount: "125",
      proceeds: "$268.75",
      cost: "$0",
      gain: "$268.75",
    },
    {
      date: "2024-01-27",
      type: "Sale",
      asset: "BTC",
      amount: "0.1",
      proceeds: "$4,200",
      cost: "$4,350",
      gain: "-$150",
    },
    {
      date: "2024-01-26",
      type: "DeFi Yield",
      asset: "USDC",
      amount: "500",
      proceeds: "$500",
      cost: "$0",
      gain: "$500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {taxSummary.map((item) => (
          <Card key={item.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tax Owed:</span>
                  <span className="font-medium">{item.tax}</span>
                </div>
                <Badge variant="outline">{item.rate} rate</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-emerald-600" />
              Tax Reports
            </CardTitle>
            <CardDescription>Annual tax reports and summaries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {taxReports.map((report) => (
              <div key={report.year} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">Tax Year {report.year}</h3>
                    <Badge variant={report.status === "Complete" ? "default" : "secondary"}>{report.status}</Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Transactions</p>
                    <p className="font-medium">{report.transactions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Net Gains</p>
                    <p className="font-medium">{report.gains}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tax Owed</p>
                    <p className="font-medium">{report.tax}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Taxable Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Taxable Events</CardTitle>
            <CardDescription>Latest transactions with tax implications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={tx.type === "Sale" ? "default" : "secondary"}>{tx.type}</Badge>
                    <span className="font-medium">{tx.asset}</span>
                  </div>
                  <span className="text-sm text-gray-600">{tx.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Amount: {tx.amount}</p>
                    <p className="text-gray-600">Proceeds: {tx.proceeds}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cost Basis: {tx.cost}</p>
                    <p className={`font-medium ${tx.gain.startsWith("-") ? "text-red-600" : "text-emerald-600"}`}>
                      Gain/Loss: {tx.gain}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tax Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Optimization Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions to minimize your tax burden</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Tax Loss Harvesting</h4>
            <p className="text-sm text-blue-700">
              You have $23,456 in unrealized losses. Consider harvesting these losses to offset your $347,892 in
              realized gains.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Long-term vs Short-term</h4>
            <p className="text-sm text-yellow-700">
              Hold positions for over 1 year to qualify for long-term capital gains rates (15-20% vs up to 37% for
              short-term).
            </p>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">Staking Considerations</h4>
            <p className="text-sm text-emerald-700">
              Staking rewards are taxed as ordinary income. Consider the tax implications when choosing staking vs
              trading strategies.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
