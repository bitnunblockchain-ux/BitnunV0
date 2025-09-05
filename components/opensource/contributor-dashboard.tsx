"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitCommit, GitPullRequest, Bug, Star, Award } from "lucide-react"

export function ContributorDashboard() {
  const topContributors = [
    {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      contributions: "234",
      projects: "8",
      bounties: "45,000 BTN",
      rank: 1,
      badges: ["Core Contributor", "Bug Hunter", "Documentation Master"],
    },
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      contributions: "189",
      projects: "6",
      bounties: "38,500 BTN",
      rank: 2,
      badges: ["Security Expert", "Code Reviewer", "Mentor"],
    },
    {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      contributions: "156",
      projects: "5",
      bounties: "32,100 BTN",
      rank: 3,
      badges: ["WASM Specialist", "Performance Optimizer"],
    },
    {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      contributions: "142",
      projects: "7",
      bounties: "29,800 BTN",
      rank: 4,
      badges: ["UI/UX Expert", "Accessibility Champion"],
    },
  ]

  const recentContributions = [
    {
      type: "commit",
      project: "BitnunEco Core",
      description: "Optimize consensus algorithm performance",
      contributor: "Alex Chen",
      reward: "500 BTN",
      time: "2 hours ago",
    },
    {
      type: "pr",
      project: "JavaScript SDK",
      description: "Add TypeScript definitions for new API endpoints",
      contributor: "Sarah Johnson",
      reward: "300 BTN",
      time: "4 hours ago",
    },
    {
      type: "issue",
      project: "WASM Mining Node",
      description: "Fix memory leak in mining worker",
      contributor: "David Kim",
      reward: "800 BTN",
      time: "6 hours ago",
    },
    {
      type: "review",
      project: "NFT Marketplace",
      description: "Code review for smart contract security",
      contributor: "Maria Garcia",
      reward: "200 BTN",
      time: "8 hours ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contributor Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track contributions, earnings, and community recognition
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Award className="h-4 w-4 mr-2" />
          Become Contributor
        </Button>
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-4">
          <div className="grid gap-4">
            {topContributors.map((contributor, index) => (
              <Card
                key={index}
                className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          contributor.rank === 1
                            ? "bg-yellow-500"
                            : contributor.rank === 2
                              ? "bg-gray-400"
                              : contributor.rank === 3
                                ? "bg-orange-500"
                                : "bg-emerald-500"
                        }`}
                      >
                        {contributor.rank}
                      </div>
                      <img
                        src={contributor.avatar || "/placeholder.svg"}
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{contributor.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {contributor.badges.slice(0, 2).map((badge, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-sm text-center">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Contributions</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{contributor.contributions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Projects</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{contributor.projects}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Earned</p>
                      <p className="font-semibold text-emerald-600">{contributor.bounties}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4">
            {recentContributions.map((contribution, index) => (
              <Card
                key={index}
                className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        contribution.type === "commit"
                          ? "bg-green-500"
                          : contribution.type === "pr"
                            ? "bg-blue-500"
                            : contribution.type === "issue"
                              ? "bg-red-500"
                              : "bg-purple-500"
                      }`}
                    >
                      {contribution.type === "commit" && <GitCommit className="h-4 w-4" />}
                      {contribution.type === "pr" && <GitPullRequest className="h-4 w-4" />}
                      {contribution.type === "issue" && <Bug className="h-4 w-4" />}
                      {contribution.type === "review" && <Star className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{contribution.description}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contribution.project} • by {contribution.contributor}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">{contribution.reward}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contribution.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
