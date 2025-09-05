"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Zap, Trophy } from "lucide-react"

export function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      type: "mining",
      amount: "+12.45",
      description: "Action Mining Reward",
      timestamp: "2 minutes ago",
      icon: Zap,
      status: "completed",
    },
    {
      id: 2,
      type: "send",
      amount: "-25.00",
      description: "Sent to EcoFriend_2024",
      timestamp: "1 hour ago",
      icon: ArrowUpRight,
      status: "completed",
    },
    {
      id: 3,
      type: "receive",
      amount: "+50.00",
      description: "Received from GreenMiner",
      timestamp: "3 hours ago",
      icon: ArrowDownLeft,
      status: "completed",
    },
    {
      id: 4,
      type: "reward",
      amount: "+15.75",
      description: "Gamification Achievement",
      timestamp: "5 hours ago",
      icon: Trophy,
      status: "completed",
    },
    {
      id: 5,
      type: "mining",
      amount: "+8.92",
      description: "VR Mining Session",
      timestamp: "1 day ago",
      icon: Zap,
      status: "completed",
    },
  ]

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent BTN token transactions and mining rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => {
            const IconComponent = tx.icon
            return (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      tx.type === "mining" || tx.type === "reward"
                        ? "bg-emerald-100"
                        : tx.type === "receive"
                          ? "bg-blue-100"
                          : "bg-orange-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${
                        tx.type === "mining" || tx.type === "reward"
                          ? "text-emerald-600"
                          : tx.type === "receive"
                            ? "text-blue-600"
                            : "text-orange-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-gray-600">{tx.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.amount.startsWith("+") ? "text-emerald-600" : "text-orange-600"}`}>
                    {tx.amount} BTN
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
