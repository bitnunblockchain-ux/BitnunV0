"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Star, GitFork, ExternalLink, Plus, Users } from "lucide-react"

export function ProjectsOverview() {
  const projects = [
    {
      name: "BitnunEco Core",
      description: "Main blockchain protocol and consensus mechanism",
      language: "Rust",
      stars: "2.4K",
      forks: "456",
      contributors: "89",
      issues: "23",
      prs: "12",
      license: "MIT",
      status: "Active",
      bountyPool: "15,000 BTN",
    },
    {
      name: "WASM Mining Node",
      description: "Browser-based lightweight mining implementation",
      language: "Rust/WASM",
      stars: "1.8K",
      forks: "234",
      contributors: "45",
      issues: "8",
      prs: "5",
      license: "Apache 2.0",
      status: "Active",
      bountyPool: "8,500 BTN",
    },
    {
      name: "JavaScript SDK",
      description: "Official JavaScript/TypeScript SDK for developers",
      language: "TypeScript",
      stars: "3.1K",
      forks: "567",
      contributors: "123",
      issues: "15",
      prs: "18",
      license: "MIT",
      status: "Active",
      bountyPool: "12,000 BTN",
    },
    {
      name: "NFT Marketplace",
      description: "Decentralized marketplace for eco-themed NFTs",
      language: "Solidity",
      stars: "892",
      forks: "178",
      contributors: "34",
      issues: "6",
      prs: "3",
      license: "GPL-3.0",
      status: "Beta",
      bountyPool: "5,500 BTN",
    },
    {
      name: "Carbon Credit Oracle",
      description: "Oracle network for verified carbon credit data",
      language: "Go",
      stars: "654",
      forks: "89",
      contributors: "28",
      issues: "11",
      prs: "7",
      license: "MIT",
      status: "Development",
      bountyPool: "7,200 BTN",
    },
    {
      name: "Mobile Wallet",
      description: "Cross-platform mobile wallet application",
      language: "React Native",
      stars: "1.2K",
      forks: "298",
      contributors: "67",
      issues: "19",
      prs: "9",
      license: "MIT",
      status: "Active",
      bountyPool: "9,800 BTN",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Open Source Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Contribute to the BitnunEco ecosystem and earn rewards
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Propose Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : project.status === "Beta"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  }`}
                >
                  {project.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {project.language}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{project.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{project.forks}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{project.contributors}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Open Issues</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.issues}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Pull Requests</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.prs}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">License</p>
                  <p className="font-medium text-gray-900 dark:text-white">{project.license}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400">Bounty Pool</p>
                  <p className="font-semibold text-emerald-600">{project.bountyPool}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Contribute
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
