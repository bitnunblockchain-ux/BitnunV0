"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Lock, Flame, ArrowUpDown } from "lucide-react"
import { btnTokenProcessor } from "@/lib/btn-token/btn-processor"
import { useBlockchain } from "@/lib/hooks/use-blockchain"

export default function BTNTokenPage() {
  const [tokenomics, setTokenomics] = useState<any>(null)
  const [stakingPools, setStakingPools] = useState<any[]>([])
  const [userPositions, setUserPositions] = useState<any[]>([])
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { user, stats } = useBlockchain()

  useEffect(() => {
    fetchTokenData()
  }, [user])

  const fetchTokenData = async () => {
    try {
      const [tokenomicsData, poolsData, proposalsData] = await Promise.all([
        btnTokenProcessor.getTokenomics(),
        btnTokenProcessor.getStakingPools(),
        btnTokenProcessor.getGovernanceProposals(),
      ])

      setTokenomics(tokenomicsData)
      setStakingPools(poolsData)
      setProposals(proposalsData)

      if (user) {
        const positions = await btnTokenProcessor.getUserStakingPositions(user.id)
        setUserPositions(positions)
      }
    } catch (error) {
      console.error("Error fetching token data:", error)
    } finally {
      setLoading(false)
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
            BTN Token Hub
          </h1>
          <p className="text-xl text-slate-300">Native BitnunEco token operations and governance</p>
        </div>

        {/* Tokenomics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Supply</CardTitle>
              <Coins className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tokenomics?.total_supply?.toLocaleString() || "0"} BTN
              </div>
              <p className="text-xs text-slate-400">Maximum 21M BTN</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Circulating</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tokenomics?.circulating_supply?.toLocaleString() || "0"} BTN
              </div>
              <p className="text-xs text-emerald-400">
                {tokenomics ? ((tokenomics.circulating_supply / tokenomics.total_supply) * 100).toFixed(1) : 0}% of
                total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Staked</CardTitle>
              <Lock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tokenomics?.staked_supply?.toLocaleString() || "0"} BTN
              </div>
              <p className="text-xs text-yellow-400">
                {tokenomics ? ((tokenomics.staked_supply / tokenomics.circulating_supply) * 100).toFixed(1) : 0}% staked
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Burned</CardTitle>
              <Flame className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tokenomics?.burned_supply?.toLocaleString() || "0"} BTN
              </div>
              <p className="text-xs text-red-400">Permanently removed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="staking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger
              value="staking"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Staking
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Governance
            </TabsTrigger>
            <TabsTrigger
              value="operations"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Operations
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Staking Pools */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Staking Pools</h2>
                {stakingPools.map((pool) => (
                  <Card key={pool.id} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{pool.pool_name}</CardTitle>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {pool.apr}% APR
                        </Badge>
                      </div>
                      <CardDescription>
                        {pool.pool_type === "flexible" ? "No lock period" : `${pool.lock_period} days lock`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Min Stake</div>
                          <div className="text-white font-medium">{pool.min_stake} BTN</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Total Staked</div>
                          <div className="text-white font-medium">{pool.total_staked.toLocaleString()} BTN</div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                        Stake BTN
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* User Positions */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Your Positions</h2>
                {userPositions.length > 0 ? (
                  userPositions.map((position) => (
                    <Card key={position.id} className="bg-slate-800/50 border-emerald-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white">{position.btn_staking_pools.pool_name}</CardTitle>
                        <CardDescription>
                          Staked on {new Date(position.stake_date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">Staked Amount</div>
                            <div className="text-white font-medium">{position.staked_amount} BTN</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Rewards Earned</div>
                            <div className="text-emerald-400 font-medium">{position.rewards_earned.toFixed(4)} BTN</div>
                          </div>
                        </div>
                        {position.unlock_date && (
                          <div className="text-sm">
                            <div className="text-slate-400">Unlock Date</div>
                            <div className="text-white">{new Date(position.unlock_date).toLocaleDateString()}</div>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          className="w-full border-emerald-500/30 hover:border-emerald-400/50 bg-transparent"
                          disabled={position.unlock_date && new Date(position.unlock_date) > new Date()}
                        >
                          {position.unlock_date && new Date(position.unlock_date) > new Date() ? "Locked" : "Unstake"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
                    <CardContent className="text-center py-8">
                      <Lock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">No active staking positions</p>
                      <p className="text-sm text-slate-500">Start staking to earn rewards</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Governance Proposals</h2>
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                Create Proposal
              </Button>
            </div>

            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{proposal.title}</CardTitle>
                      <Badge
                        className={
                          proposal.status === "active"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : proposal.status === "passed"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-red-500/20 text-red-400"
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                    <CardDescription>{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">For: {proposal.votes_for}</span>
                        <span className="text-slate-400">Against: {proposal.votes_against}</span>
                      </div>
                      <Progress
                        value={
                          (proposal.votes_for /
                            (proposal.votes_for + proposal.votes_against + proposal.votes_abstain)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    {proposal.status === "active" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30"
                        >
                          Vote For
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 hover:border-red-400/50 bg-transparent"
                        >
                          Vote Against
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-500/30 hover:border-slate-400/50 bg-transparent"
                        >
                          Abstain
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Token Operations */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <ArrowUpDown className="h-5 w-5 text-cyan-400" />
                    <span>Token Operations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Transfer BTN</Label>
                    <div className="flex space-x-2">
                      <Input placeholder="Recipient address" className="bg-slate-700/50 border-slate-600 text-white" />
                      <Input
                        placeholder="Amount"
                        type="number"
                        className="w-32 bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600">
                      Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Burn Tokens */}
              <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Flame className="h-5 w-5 text-red-400" />
                    <span>Burn Tokens</span>
                  </CardTitle>
                  <CardDescription>Permanently remove BTN from circulation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Amount to Burn</Label>
                    <Input placeholder="0.00" type="number" className="bg-slate-700/50 border-slate-600 text-white" />
                    <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                      Burn BTN
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Token Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Supply Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Circulating</span>
                      <span className="text-white">
                        {((tokenomics?.circulating_supply / tokenomics?.total_supply) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(tokenomics?.circulating_supply / tokenomics?.total_supply) * 100}
                      className="h-2"
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Staked</span>
                      <span className="text-yellow-400">
                        {((tokenomics?.staked_supply / tokenomics?.total_supply) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(tokenomics?.staked_supply / tokenomics?.total_supply) * 100} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Burned</span>
                      <span className="text-red-400">
                        {((tokenomics?.burned_supply / tokenomics?.total_supply) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(tokenomics?.burned_supply / tokenomics?.total_supply) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Token Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Daily Mint Rate</div>
                      <div className="text-white font-medium">{tokenomics?.daily_mint_rate?.toLocaleString()} BTN</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Inflation Rate</div>
                      <div className="text-white font-medium">{(tokenomics?.inflation_rate * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Treasury Balance</div>
                      <div className="text-white font-medium">{tokenomics?.treasury_balance?.toLocaleString()} BTN</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Market Cap</div>
                      <div className="text-white font-medium">$2.4M</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
