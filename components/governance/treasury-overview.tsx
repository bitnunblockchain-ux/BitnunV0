"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TreasuryAsset {
  symbol: string
  amount: number
  value: number
  percentage: number
  change24h: number
}

interface TreasuryTransaction {
  id: string
  type: "income" | "expense"
  description: string
  amount: number
  asset: string
  timestamp: string
  proposalId?: string
}

export function TreasuryOverview() {
  const [assets, setAssets] = useState<TreasuryAsset[]>([])
  const [transactions, setTransactions] = useState<TreasuryTransaction[]>([])
  const [totalValue, setTotalValue] = useState(12500000)

  useEffect(() => {
    const mockAssets: TreasuryAsset[] = [
      { symbol: "BTN", amount: 8500000, value: 8500000, percentage: 68, change24h: 2.5 },
      { symbol: "USDT", amount: 2000000, value: 2000000, percentage: 16, change24h: 0.1 },
      { symbol: "ETH", amount: 800, value: 1600000, percentage: 12.8, change24h: -1.2 },
      { symbol: "BTC", amount: 15, value: 400000, percentage: 3.2, change24h: 1.8 },
    ]

    const mockTransactions: TreasuryTransaction[] = [
      {
        id: "1",
        type: "income",
        description: "Mining rewards distribution",
        amount: 50000,
        asset: "BTN",
        timestamp: "2024-01-15T14:30:00Z",
      },
      {
        id: "2",
        type: "expense",
        description: "Green energy partnership funding",
        amount: 2000000,
        asset: "BTN",
        timestamp: "2024-01-15T10:00:00Z",
        proposalId: "3",
      },
      {
        id: "3",
        type: "income",
        description: "NFT marketplace fees",
        amount: 25000,
        asset: "USDT",
        timestamp: "2024-01-14T16:45:00Z",
      },
    ]

    setAssets(mockAssets)
    setTransactions(mockTransactions)
  }, [])

  return (
    <div className="space-y-6">
      {/* Treasury Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Treasury Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${(totalValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">24h Change</p>
              <p className="text-2xl font-bold text-emerald-500">+2.3%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <PieChart className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Diversification</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4 Assets</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Allocation</h3>
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.symbol} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{asset.symbol}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {asset.amount.toLocaleString()} {asset.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">${(asset.value / 1000000).toFixed(2)}M</p>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant={asset.change24h >= 0 ? "default" : "destructive"}
                      className={asset.change24h >= 0 ? "bg-emerald-500" : ""}
                    >
                      {asset.change24h >= 0 ? "+" : ""}
                      {asset.change24h.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
              <Progress value={asset.percentage} className="h-2" />
              <div className="text-right text-sm text-gray-600 dark:text-gray-300">{asset.percentage}% of treasury</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type === "income" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{tx.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(tx.timestamp).toLocaleDateString()}
                    {tx.proposalId && ` • Proposal #${tx.proposalId}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                  {tx.type === "income" ? "+" : "-"}
                  {tx.amount.toLocaleString()} {tx.asset}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
