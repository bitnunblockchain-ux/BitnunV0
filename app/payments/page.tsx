"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Wallet, Bitcoin, DollarSign, Plus, ArrowUpDown, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface PaymentMethod {
  id: string
  type: string
  provider: string
  details: any
  is_default: boolean
  is_verified: boolean
}

interface Transaction {
  id: string
  type: string
  status: string
  amount: number
  currency: string
  fee: number
  created_at: string
}

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPaymentData()
  }, [])

  const fetchPaymentData = async () => {
    try {
      const [methodsResponse, transactionsResponse] = await Promise.all([
        supabase.from("payment_methods").select("*").order("created_at", { ascending: false }),
        supabase.from("transactions").select("*").order("created_at", { ascending: false }).limit(10),
      ])

      if (methodsResponse.data) setPaymentMethods(methodsResponse.data)
      if (transactionsResponse.data) setTransactions(transactionsResponse.data)
    } catch (error) {
      console.error("Error fetching payment data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "crypto":
        return <Bitcoin className="h-5 w-5" />
      case "wallet":
        return <Wallet className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Payment Gateway
          </h1>
          <p className="text-xl text-slate-300">Comprehensive payment processing with multi-currency support</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$24,580.50</div>
              <p className="text-xs text-emerald-400">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">BTN Balance</CardTitle>
              <Bitcoin className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">15,420 BTN</div>
              <p className="text-xs text-emerald-400">+8.2% from mining</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Monthly Volume</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$125,340</div>
              <p className="text-xs text-emerald-400">+18.7% increase</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Methods</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{paymentMethods.length}</div>
              <p className="text-xs text-slate-400">Payment methods</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger
              value="methods"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="exchange"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Exchange
            </TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Method
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fiat Payment Methods */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-cyan-400" />
                      <div>
                        <CardTitle className="text-white">Visa •••• 4242</CardTitle>
                        <CardDescription>Expires 12/25</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Default</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white">Credit Card</span>
                  </div>
                </CardContent>
              </Card>

              {/* Crypto Wallets */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bitcoin className="h-6 w-6 text-orange-400" />
                      <div>
                        <CardTitle className="text-white">MetaMask</CardTitle>
                        <CardDescription>0x742d...35Cc</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Verified</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Balance</span>
                    <span className="text-white">2.45 ETH</span>
                  </div>
                </CardContent>
              </Card>

              {/* BTN Native Wallet */}
              <Card className="bg-slate-800/50 border-emerald-500/30 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-6 w-6 text-emerald-400" />
                      <div>
                        <CardTitle className="text-white">BTN Wallet</CardTitle>
                        <CardDescription>Native BitnunEco</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Native</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Balance</span>
                    <span className="text-white">15,420 BTN</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>

            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-700">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-6 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-cyan-500/20">
                          <ArrowUpDown className="h-4 w-4 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white capitalize">{tx.type.replace("_", " ")}</p>
                          <p className="text-sm text-slate-400">{new Date(tx.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          {tx.amount} {tx.currency}
                        </p>
                        <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exchange" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Currency Exchange</h2>

            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Exchange Rates</CardTitle>
                <CardDescription>Real-time currency conversion rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-700/50 border border-cyan-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">BTN/USD</span>
                      <span className="text-white font-mono">$1.2450</span>
                    </div>
                    <div className="text-sm text-emerald-400">+2.3%</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-700/50 border border-cyan-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">BTN/ETH</span>
                      <span className="text-white font-mono">0.000542</span>
                    </div>
                    <div className="text-sm text-emerald-400">+1.8%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
