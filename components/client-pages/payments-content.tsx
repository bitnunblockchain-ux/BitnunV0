"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Wallet, Bitcoin, DollarSign } from "lucide-react"

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

export default function PaymentsContent() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchPaymentData()
    }
  }, [])

  const fetchPaymentData = async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()

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

          {/* Additional Stats Cards can be added here */}
        </div>

        {/* Tabs */}
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

          {/* Tabs Content */}
          <TabsContent value="methods">{/* Payment Methods Content */}</TabsContent>
          <TabsContent value="transactions">{/* Transactions Content */}</TabsContent>
          <TabsContent value="exchange">{/* Exchange Content */}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
