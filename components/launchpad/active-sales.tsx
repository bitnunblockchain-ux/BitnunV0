"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Target } from "lucide-react"

export function ActiveSales() {
  const activeSales = [
    {
      name: "EcoChain Protocol",
      type: "IDO",
      description: "Carbon-neutral blockchain infrastructure for sustainable DeFi",
      raised: "$2.4M",
      target: "$5M",
      progress: 48,
      participants: "2,847",
      timeLeft: "2d 14h 32m",
      price: "$0.15",
      allocation: "Max $2,500",
      status: "live",
      tier: "Platinum",
    },
    {
      name: "GreenNFT Marketplace",
      type: "IEO",
      description: "Eco-friendly NFT platform with carbon offset integration",
      raised: "$890K",
      target: "$2M",
      progress: 44.5,
      participants: "1,234",
      timeLeft: "5d 8h 15m",
      price: "$0.08",
      allocation: "Max $1,000",
      status: "live",
      tier: "Gold",
    },
    {
      name: "SolarDAO Token",
      type: "ICO",
      description: "Decentralized solar energy investment platform",
      raised: "$1.8M",
      target: "$3.5M",
      progress: 51.4,
      participants: "3,456",
      timeLeft: "1d 22h 45m",
      price: "$0.25",
      allocation: "Max $5,000",
      status: "live",
      tier: "Diamond",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Token Sales</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">View All Sales</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeSales.map((sale, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sale.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sale.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                >
                  {sale.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    sale.tier === "Diamond"
                      ? "border-purple-500 text-purple-600"
                      : sale.tier === "Platinum"
                        ? "border-gray-500 text-gray-600"
                        : "border-yellow-500 text-yellow-600"
                  }`}
                >
                  {sale.tier}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {sale.raised} / {sale.target}
                  </span>
                </div>
                <Progress value={sale.progress} className="h-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sale.progress}% completed</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{sale.participants} investors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{sale.timeLeft}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Token Price</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{sale.price}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Max Allocation</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{sale.allocation}</p>
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Target className="h-4 w-4 mr-2" />
                Participate Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
