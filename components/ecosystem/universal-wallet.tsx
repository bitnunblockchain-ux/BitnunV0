"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Send, Receipt as Receive, Repeat, Plus, ExternalLink } from "lucide-react"

export function UniversalWallet() {
  const walletBalances = [
    { chain: "Ethereum", symbol: "ETH", balance: "2.45", usdValue: "$4,890.00", change: "+2.3%" },
    { chain: "Bitcoin", symbol: "BTC", balance: "0.15", usdValue: "$6,450.00", change: "+1.8%" },
    { chain: "Solana", symbol: "SOL", balance: "125.8", usdValue: "$2,516.00", change: "+5.2%" },
    { chain: "Polygon", symbol: "MATIC", balance: "1,250", usdValue: "$1,125.00", change: "-0.5%" },
    { chain: "BitnunEco", symbol: "BTN", balance: "50,000", usdValue: "$15,000.00", change: "+12.7%" },
  ]

  const recentTransactions = [
    { type: "send", chain: "Ethereum", amount: "0.5 ETH", to: "0x742d...4e2f", status: "confirmed" },
    { type: "receive", chain: "Solana", amount: "25 SOL", from: "9WzD...Kx7m", status: "confirmed" },
    { type: "swap", chain: "Polygon", amount: "100 MATIC → 95 USDC", status: "pending" },
    { type: "bridge", chain: "Multi", amount: "1000 BTN", status: "confirmed" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Universal Wallet Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Wallet
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>

      <Tabs defaultValue="balances" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="balances">Portfolio</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="balances" className="space-y-4">
          <Card className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-emerald-100">Total Portfolio Value</p>
                <p className="text-3xl font-bold">$29,981.00</p>
                <p className="text-emerald-200 text-sm">+$2,456.78 (+8.9%) today</p>
              </div>
              <Wallet className="h-12 w-12 text-emerald-200" />
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Receive className="h-4 w-4 mr-2" />
                Receive
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Repeat className="h-4 w-4 mr-2" />
                Swap
              </Button>
            </div>
          </Card>

          <div className="grid gap-4">
            {walletBalances.map((balance, index) => (
              <Card
                key={index}
                className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      {balance.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{balance.chain}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {balance.balance} {balance.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{balance.usdValue}</p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${balance.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {balance.change}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4">
            {recentTransactions.map((tx, index) => (
              <Card
                key={index}
                className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        tx.type === "send"
                          ? "bg-red-500"
                          : tx.type === "receive"
                            ? "bg-green-500"
                            : tx.type === "swap"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                      }`}
                    >
                      {tx.type === "send" && <Send className="h-4 w-4" />}
                      {tx.type === "receive" && <Receive className="h-4 w-4" />}
                      {tx.type === "swap" && <Repeat className="h-4 w-4" />}
                      {tx.type === "bridge" && <ExternalLink className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{tx.type}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tx.chain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{tx.amount}</p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${tx.status === "confirmed" ? "text-green-600" : "text-yellow-600"}`}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wallet Settings</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Wallet className="h-4 w-4 mr-2" />
                Manage Connected Wallets
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Export Private Keys
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Network
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
