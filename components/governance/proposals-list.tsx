"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, Clock, CheckCircle, XCircle, Users, MessageSquare } from "lucide-react"

// import { createClient } from "@/lib/supabase/client"

interface Proposal {
  id: string
  title: string
  description: string
  proposer: string
  status: "active" | "passed" | "rejected" | "pending"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  endTime: string
  category: string
  requiredMajority: number
}

export function ProposalsList() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "passed" | "rejected">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Mock data for development
        const mockProposals: Proposal[] = [
          {
            id: "1",
            title: "Increase Mining Rewards for Green Energy Users",
            description:
              "Proposal to increase BTN mining rewards by 25% for users who can verify they use renewable energy sources for mining operations.",
            proposer: "0x1234...5678",
            status: "active",
            votesFor: 2500000,
            votesAgainst: 800000,
            totalVotes: 3500000,
            quorum: 5000000,
            endTime: "2024-01-20T23:59:59Z",
            category: "tokenomics",
            requiredMajority: 60,
          },
          {
            id: "2",
            title: "Treasury Allocation for Carbon Offset Program",
            description:
              "Allocate 2M BTN from treasury to fund carbon offset initiatives and environmental partnerships.",
            proposer: "0x9876...4321",
            status: "passed",
            votesFor: 4200000,
            votesAgainst: 1100000,
            totalVotes: 5500000,
            quorum: 5000000,
            endTime: "2024-01-15T23:59:59Z",
            category: "treasury",
            requiredMajority: 60,
          },
        ]

        setProposals(mockProposals)
      } catch (error) {
        console.error("Error fetching proposals:", error)
        setProposals([])
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  const filteredProposals = proposals.filter((proposal) => filter === "all" || proposal.status === filter)

  const handleVote = async (proposalId: string, support: boolean) => {
    try {
      const choice = support ? "for" : "against"
      // This would integrate with the BTN token processor for actual voting
      // await btnTokenProcessor.vote(proposalId, choice)

      // Update local state optimistically
      setProposals((prev) =>
        prev.map((proposal) => {
          if (proposal.id === proposalId) {
            return {
              ...proposal,
              votesFor: support ? proposal.votesFor + 1000 : proposal.votesFor,
              votesAgainst: !support ? proposal.votesAgainst + 1000 : proposal.votesAgainst,
              totalVotes: proposal.totalVotes + 1000,
            }
          }
          return proposal
        }),
      )
    } catch (error) {
      console.error("Voting error:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "passed":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Vote className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "passed":
        return "bg-emerald-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "active", "passed", "rejected"] as const).map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? "default" : "outline"}
            onClick={() => setFilter(filterOption)}
            className={filter === filterOption ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </Button>
        ))}
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <Card
            key={proposal.id}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              {/* Proposal Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{proposal.title}</h3>
                  <Badge variant="secondary" className={`${getStatusColor(proposal.status)} text-white`}>
                    {getStatusIcon(proposal.status)}
                    <span className="ml-1">{proposal.status.toUpperCase()}</span>
                  </Badge>
                  <Badge variant="outline">{proposal.category}</Badge>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-balance">{proposal.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span>Proposed by: {proposal.proposer}</span>
                  <span>•</span>
                  <span>Ends: {new Date(proposal.endTime).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Required: {proposal.requiredMajority}% majority</span>
                </div>
              </div>

              {/* Voting Section */}
              <div className="lg:w-80">
                {proposal.status === "active" && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleVote(proposal.id, true)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button onClick={() => handleVote(proposal.id, false)} variant="outline" className="flex-1">
                        <XCircle className="w-4 h-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  </div>
                )}

                {/* Voting Results */}
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Voting Progress</span>
                    <span className="text-sm font-medium">
                      {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% For
                    </span>
                  </div>

                  <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>For: {(proposal.votesFor / 1000000).toFixed(1)}M BTN</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-red-600">
                        <XCircle className="w-3 h-3" />
                        <span>Against: {(proposal.votesAgainst / 1000000).toFixed(1)}M BTN</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Quorum: {((proposal.totalVotes / proposal.quorum) * 100).toFixed(0)}%</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Discuss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
