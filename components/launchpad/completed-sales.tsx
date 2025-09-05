"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, CheckCircle, ExternalLink, BarChart3 } from "lucide-react"

export function CompletedSales() {
  const completedSales = [
    {
      name: "GreenEnergy Token",
      type: "IDO",
      raised: "$5.2M",
      target: "$5M",
      roi: "+340%",
      participants: "4,567",
      completedDate: "Nov 28, 2024",
      initialPrice: "$0.12",
      currentPrice: "$0.53",
      status: "Success",
    },
    {
      name: "EcoFarm Protocol",
      type: "IEO",
      raised: "$3.8M",
      target: "$4M",
      roi: "+180%",
      participants: "2,890",
      completedDate: "Nov 15, 2024",
      initialPrice: "$0.25",
      currentPrice: "$0.70",
      status: "Success",
    },
    {
      name: "CleanAir DAO",
      type: "ICO",
      raised: "$12.5M",
      target: "$10M",
      roi: "+95%",
      participants: "8,234",
      completedDate: "Oct 30, 2024",
      initialPrice: "$0.08",
      currentPrice: "$0.156",
      status: "Success",
    },
    {
      name: "WaterPurify Token",
      type: "STO",
      raised: "$7.2M",
      target: "$8M",
      roi: "+45%",
      participants: "1,567",
      completedDate: "Oct 12, 2024",
      initialPrice: "$1.50",
      currentPrice: "$2.18",
      status: "Partial",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Completed Sales</h2>
        <Button variant="outline">
          <BarChart3 className="h-4 w-4 mr-2" />
          Performance Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {completedSales.map((sale, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sale.name}</h3>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {sale.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed on {sale.completedDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-5 w-5 ${sale.status === "Success" ? "text-green-500" : "text-yellow-500"}`}
                />
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    sale.status === "Success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {sale.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Amount Raised</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{sale.raised}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Target: {sale.target}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Current ROI</p>
                  <p
                    className={`font-semibold text-lg ${sale.roi.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                  >
                    {sale.roi}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Initial Price</p>
                  <p className="font-medium text-gray-900 dark:text-white">{sale.initialPrice}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Current Price</p>
                  <p className="font-medium text-gray-900 dark:text-white">{sale.currentPrice}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{sale.participants} participants</span>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Performing well</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Performance Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
