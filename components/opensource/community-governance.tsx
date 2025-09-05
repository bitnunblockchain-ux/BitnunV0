"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, Users, MessageSquare, CheckCircle } from "lucide-react"

export function CommunityGovernance() {
  const proposals = [
    {
      id: 1,
      title: "Implement New Consensus Algorithm",
      description: "Proposal to upgrade the blockchain consensus mechanism for better efficiency",
      status: "Active",
      votes: { for: 1250, against: 340, total: 1590 },
      timeLeft: "5 days",
      author: "core-dev-team",
    },
    {
      id: 2,
      title: "Community Fund Allocation",
      description: "Allocate 500,000 BTN tokens for developer grants and ecosystem growth",
      status: "Passed",
      votes: { for: 2100, against: 450, total: 2550 },
      timeLeft: "Completed",
      author: "community-council",
    },
    {
      id: 3,
      title: "New Feature: Cross-Chain Bridge",
      description: "Add support for Ethereum and Polygon cross-chain transactions",
      status: "Draft",
      votes: { for: 0, against: 0, total: 0 },
      timeLeft: "Not started",
      author: "bridge-team",
    },
  ]

  const governanceStats = [
    { label: "Active Proposals", value: "12", icon: Vote },
    { label: "Community Members", value: "45.2K", icon: Users },
    { label: "Total Votes Cast", value: "128.5K", icon: CheckCircle },
    { label: "Discussions", value: "2.1K", icon: MessageSquare },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Community Governance
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Participate in shaping the future of BitnunEco through decentralized governance and community proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {governanceStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Active Proposals</h3>
          <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
            Create Proposal
          </Button>
        </div>

        {proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <CardDescription>{proposal.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        proposal.status === "Active"
                          ? "default"
                          : proposal.status === "Passed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {proposal.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">by {proposal.author}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{proposal.timeLeft}</p>
                  <p className="text-xs text-muted-foreground">{proposal.votes.total} votes</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.votes.total > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>For: {proposal.votes.for}</span>
                    <span>Against: {proposal.votes.against}</span>
                  </div>
                  <Progress value={(proposal.votes.for / proposal.votes.total) * 100} className="h-2" />
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Vote className="h-4 w-4 mr-2" />
                  Vote For
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Vote className="h-4 w-4 mr-2" />
                  Vote Against
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
