"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock, Users, Target, Plus, ExternalLink } from "lucide-react"

export function BountyPrograms() {
  const bounties = [
    {
      title: "Implement Zero-Knowledge Proof Verification",
      project: "BitnunEco Core",
      description: "Add ZK-proof verification to enhance privacy and scalability of transactions",
      reward: "5,000 BTN",
      difficulty: "Expert",
      timeEstimate: "2-3 weeks",
      applicants: "8",
      deadline: "Dec 31, 2024",
      tags: ["Cryptography", "Privacy", "Rust"],
      status: "Open",
    },
    {
      title: "Mobile Wallet Biometric Authentication",
      project: "Mobile Wallet",
      description: "Integrate fingerprint and face recognition for secure wallet access",
      reward: "2,500 BTN",
      difficulty: "Intermediate",
      timeEstimate: "1-2 weeks",
      applicants: "12",
      deadline: "Dec 20, 2024",
      tags: ["React Native", "Security", "Mobile"],
      status: "Open",
    },
    {
      title: "Smart Contract Gas Optimization",
      project: "NFT Marketplace",
      description: "Optimize smart contracts to reduce gas costs by at least 30%",
      reward: "3,200 BTN",
      difficulty: "Advanced",
      timeEstimate: "1 week",
      applicants: "15",
      deadline: "Dec 15, 2024",
      tags: ["Solidity", "Optimization", "Gas"],
      status: "In Progress",
    },
    {
      title: "WASM Performance Benchmarking",
      project: "WASM Mining Node",
      description: "Create comprehensive performance benchmarks for different browser environments",
      reward: "1,800 BTN",
      difficulty: "Intermediate",
      timeEstimate: "1 week",
      applicants: "6",
      deadline: "Dec 25, 2024",
      tags: ["WASM", "Performance", "Testing"],
      status: "Open",
    },
    {
      title: "API Rate Limiting Implementation",
      project: "JavaScript SDK",
      description: "Implement intelligent rate limiting with exponential backoff",
      reward: "1,500 BTN",
      difficulty: "Beginner",
      timeEstimate: "3-5 days",
      applicants: "20",
      deadline: "Dec 18, 2024",
      tags: ["TypeScript", "API", "Rate Limiting"],
      status: "Open",
    },
    {
      title: "Carbon Credit Oracle Integration",
      project: "Carbon Credit Oracle",
      description: "Integrate with major carbon credit registries for real-time data",
      reward: "4,000 BTN",
      difficulty: "Expert",
      timeEstimate: "2-4 weeks",
      applicants: "4",
      deadline: "Jan 15, 2025",
      tags: ["Go", "Oracle", "Integration"],
      status: "Open",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bounty Programs</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Earn BTN tokens by completing development tasks and bug fixes
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Bounty
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bounties.map((bounty, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bounty.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{bounty.project}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    bounty.status === "Open"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {bounty.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    bounty.difficulty === "Expert"
                      ? "border-red-500 text-red-600"
                      : bounty.difficulty === "Advanced"
                        ? "border-orange-500 text-orange-600"
                        : bounty.difficulty === "Intermediate"
                          ? "border-yellow-500 text-yellow-600"
                          : "border-green-500 text-green-600"
                  }`}
                >
                  {bounty.difficulty}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{bounty.description}</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <span className="font-semibold text-emerald-600 text-lg">{bounty.reward}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{bounty.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{bounty.applicants} applicants</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Deadline: {bounty.deadline}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {bounty.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  disabled={bounty.status === "In Progress"}
                >
                  <Target className="h-4 w-4 mr-2" />
                  {bounty.status === "In Progress" ? "In Progress" : "Apply Now"}
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
