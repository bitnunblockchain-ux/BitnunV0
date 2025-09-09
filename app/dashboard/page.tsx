import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, Zap, Users, ArrowUpRight } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch user wallets
  const { data: wallets } = await supabase.from("wallets").select("*").eq("user_id", data.user.id)

  // Fetch recent transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {profile?.display_name || profile?.username || "User"}
            </h1>
            <p className="text-gray-400 mt-1">Manage your blockchain ecosystem</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {wallets?.reduce((sum, wallet) => sum + Number(wallet.balance), 0).toFixed(4) || "0.0000"} BTN
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+2.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Mining Power</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{profile?.mining_power || 100} MH/s</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+12%</span> efficiency boost
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${Number(profile?.total_earnings || 0).toFixed(2)}</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+8.2%</span> this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Reputation</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Level {profile?.level || 1}</div>
              <p className="text-xs text-gray-400">{profile?.reputation_score || 0} reputation points</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-400">Your latest blockchain activity</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions && transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
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
                          <ArrowUpRight
                            className={`h-4 w-4 ${
                              tx.transaction_type === "deposit"
                                ? "text-green-400"
                                : tx.transaction_type === "withdrawal"
                                  ? "text-red-400"
                                  : "text-blue-400"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium capitalize">{tx.transaction_type}</p>
                          <p className="text-sm text-gray-400">{tx.currency}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{Number(tx.amount).toFixed(4)}</p>
                        <p
                          className={`text-sm ${
                            tx.status === "confirmed"
                              ? "text-green-400"
                              : tx.status === "pending"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No transactions yet</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Manage your blockchain activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-primary/20 hover:bg-primary/30 text-primary border-primary/30">
                <Zap className="h-4 w-4 mr-2" />
                Start Mining
              </Button>
              <Button className="w-full justify-start bg-gray-700/50 hover:bg-gray-700 text-white">
                <Wallet className="h-4 w-4 mr-2" />
                Add Wallet
              </Button>
              <Button className="w-full justify-start bg-gray-700/50 hover:bg-gray-700 text-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
