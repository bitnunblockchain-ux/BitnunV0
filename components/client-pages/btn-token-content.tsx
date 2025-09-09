"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Coins, Send, ArrowDownLeft, TrendingUp, Wallet, Activity, Users, DollarSign } from "lucide-react"

export default function BtnTokenContent() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [tokenStats, setTokenStats] = useState({
    totalSupply: 0,
    circulatingSupply: 0,
    holders: 0,
    price: 0,
  })
  const [transferAmount, setTransferAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadTokenData()
  }, [])

  const loadTokenData = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) return

      // Load user wallet balance
      const { data: wallet } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", user.user.id)
        .eq("currency", "BTN")
        .single()

      // Load recent transactions
      const { data: txs } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.user.id)
        .eq("currency", "BTN")
        .order("created_at", { ascending: false })
        .limit(10)

      // Load token statistics
      const { data: stats } = await supabase.from("token_analytics").select("*").eq("token_symbol", "BTN").single()

      setBalance(wallet?.balance || 0)
      setTransactions(txs || [])
      setTokenStats({
        totalSupply: stats?.total_supply || 1000000000,
        circulatingSupply: stats?.circulating_supply || 250000000,
        holders: stats?.holder_count || 15420,
        price: stats?.current_price || 1.25,
      })
    } catch (error) {
      console.error("Error loading token data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTransfer = async () => {
    if (!transferAmount || !recipientAddress) return

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) return

      const amount = Number.parseFloat(transferAmount)
      if (amount > balance) {
        alert("Insufficient balance")
        return
      }

      // Create transaction record
      const transactionData = {
        user_id: user.user.id,
        transaction_type: "transfer",
        amount: amount,
        currency: "BTN",
        recipient_address: recipientAddress,
        status: "pending",
      }

      const { error } = await supabase.from("transactions").insert([transactionData])

      if (!error) {
        setTransferAmount("")
        setRecipientAddress("")
        loadTokenData() // Refresh data
        alert("Transfer initiated successfully!")
      }
    } catch (error) {
      console.error("Error processing transfer:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <Coins className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">BTN Token</h1>
          </div>
          <p className="text-purple-200 text-lg">BitnunEco Native Token Management</p>
        </div>

        {/* Token Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Current Price</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${tokenStats.price}</div>
              <p className="text-xs text-purple-300">+5.2% (24h)</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Total Supply</CardTitle>
              <Coins className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{(tokenStats.totalSupply / 1000000).toFixed(0)}M</div>
              <p className="text-xs text-purple-300">BTN tokens</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Holders</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{tokenStats.holders.toLocaleString()}</div>
              <p className="text-xs text-purple-300">Unique addresses</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Your Balance</CardTitle>
              <Wallet className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{balance.toFixed(4)}</div>
              <p className="text-xs text-purple-300">BTN tokens</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transfer Interface */}
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Send BTN Tokens</CardTitle>
              <CardDescription className="text-purple-200">Transfer tokens to another address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-purple-200 text-sm">Recipient Address</label>
                <Input
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="bg-slate-700/50 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <label className="text-purple-200 text-sm">Amount (BTN)</label>
                <Input
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-slate-700/50 border-purple-500/30 text-white"
                />
                <div className="text-xs text-slate-400 mt-1">Available: {balance.toFixed(4)} BTN</div>
              </div>
              <div className="text-sm text-slate-400">Estimated fee: 0.001 BTN</div>
              <Button
                onClick={handleTransfer}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!transferAmount || !recipientAddress}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Tokens
              </Button>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-purple-200">Your BTN token transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            tx.transaction_type === "deposit"
                              ? "bg-green-500/20"
                              : tx.transaction_type === "withdrawal"
                                ? "bg-red-500/20"
                                : "bg-blue-500/20"
                          }`}
                        >
                          {tx.transaction_type === "deposit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-400" />
                          ) : tx.transaction_type === "withdrawal" ? (
                            <Send className="h-4 w-4 text-red-400" />
                          ) : (
                            <Activity className="h-4 w-4 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium capitalize">{tx.transaction_type}</p>
                          <p className="text-sm text-slate-400">{new Date(tx.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{tx.amount.toFixed(4)} BTN</p>
                        <Badge
                          className={
                            tx.status === "confirmed"
                              ? "bg-green-600"
                              : tx.status === "pending"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-400 py-8">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No transactions yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Utilities */}
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">BTN Token Utilities</CardTitle>
            <CardDescription className="text-purple-200">Ways to use your BTN tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Staking Rewards</h3>
                <p className="text-slate-400 text-sm">Stake BTN tokens to earn rewards and participate in governance</p>
                <Button variant="outline" className="mt-4 border-purple-500 text-purple-200 bg-transparent">
                  Stake Now
                </Button>
              </div>
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <DollarSign className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Trading Fees</h3>
                <p className="text-slate-400 text-sm">Use BTN to pay trading fees and get discounts</p>
                <Button variant="outline" className="mt-4 border-purple-500 text-purple-200 bg-transparent">
                  Trade
                </Button>
              </div>
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Governance</h3>
                <p className="text-slate-400 text-sm">Vote on platform proposals and shape the future</p>
                <Button variant="outline" className="mt-4 border-purple-500 text-purple-200 bg-transparent">
                  Vote
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
