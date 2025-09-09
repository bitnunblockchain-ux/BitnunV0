"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Vote, Users, Lock, ArrowRight } from "lucide-react"

interface Delegation {
  delegate: string
  votingPower: number
  proposals: number
  successRate: number
}

export function VotingPower() {
  const [userVotingPower, setUserVotingPower] = useState(12500)
  const [stakedAmount, setStakedAmount] = useState(10000)
  const [delegatedPower, setDelegatedPower] = useState(2500)
  const [delegateAddress, setDelegateAddress] = useState("")
  const [topDelegates, setTopDelegates] = useState<Delegation[]>([])

  useEffect(() => {
    const mockDelegates: Delegation[] = [
      {
        delegate: "0x1234...5678",
        votingPower: 2500000,
        proposals: 15,
        successRate: 87.5,
      },
      {
        delegate: "0x9876...4321",
        votingPower: 1800000,
        proposals: 22,
        successRate: 92.3,
      },
      {
        delegate: "0x5555...7777",
        votingPower: 1200000,
        proposals: 8,
        successRate: 75.0,
      },
    ]

    setTopDelegates(mockDelegates)
  }, [])

  const handleDelegate = () => {
    // TODO: Implement actual delegation API call
    // await delegateVotingPower(delegateAddress)

    // Update local state to reflect delegation
    setDelegatedPower((prev) => prev + userVotingPower)
  }

  const handleStake = () => {
    // TODO: Implement actual staking API call
    // await stakeBTN(amount)

    // Update local state to reflect staking
    setStakedAmount((prev) => prev + 1000) // Example increment
    setUserVotingPower((prev) => prev + 1250) // 1.25x multiplier
  }

  return (
    <div className="space-y-6">
      {/* Voting Power Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <Vote className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Your Voting Power</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{userVotingPower.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Staked BTN</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stakedAmount.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Delegated Power</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{delegatedPower.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stake for Voting Power */}
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stake BTN for Voting Power</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="stake-amount">Amount to Stake</Label>
              <Input id="stake-amount" type="number" placeholder="Enter BTN amount" className="mt-1" />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Available: 5,000 BTN</p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Voting Power Multiplier</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                  1.25x
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Staked BTN provides 1.25x voting power compared to liquid BTN
              </p>
            </div>

            <Button onClick={handleStake} className="w-full bg-emerald-500 hover:bg-emerald-600">
              <Lock className="w-4 h-4 mr-2" />
              Stake BTN
            </Button>
          </div>
        </Card>

        {/* Delegate Voting Power */}
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delegate Voting Power</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="delegate-address">Delegate Address</Label>
              <Input
                id="delegate-address"
                type="text"
                placeholder="0x..."
                value={delegateAddress}
                onChange={(e) => setDelegateAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Delegating allows trusted community members to vote on your behalf while you retain ownership of your
                tokens.
              </p>
            </div>

            <Button
              onClick={handleDelegate}
              disabled={!delegateAddress}
              className="w-full bg-transparent"
              variant="outline"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Delegate Power
            </Button>
          </div>
        </Card>
      </div>

      {/* Top Delegates */}
      <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Delegates</h3>

        <div className="space-y-4">
          {topDelegates.map((delegate, index) => (
            <div
              key={delegate.delegate}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{delegate.delegate}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>{(delegate.votingPower / 1000000).toFixed(1)}M voting power</span>
                    <span>•</span>
                    <span>{delegate.proposals} proposals</span>
                    <span>•</span>
                    <span className="text-emerald-500">{delegate.successRate}% success rate</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={() => setDelegateAddress(delegate.delegate)}>
                Select
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
