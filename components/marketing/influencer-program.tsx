"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Plus, ExternalLink } from "lucide-react"

export function InfluencerProgram() {
  const influencers = [
    {
      name: "Sarah Green",
      handle: "@sarahgreen_eco",
      platform: "Twitter",
      followers: "245K",
      engagement: "8.5%",
      niche: "Sustainability",
      tier: "Macro",
      campaigns: "12",
      totalReach: "2.1M",
      avgCPM: "$2.50",
      roi: "340%",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "EcoTech Mike",
      handle: "@ecotechmike",
      platform: "YouTube",
      followers: "89K",
      engagement: "12.3%",
      niche: "Green Technology",
      tier: "Mid",
      campaigns: "8",
      totalReach: "890K",
      avgCPM: "$3.20",
      roi: "280%",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Climate Action Now",
      handle: "@climateactionnow",
      platform: "Instagram",
      followers: "156K",
      engagement: "15.7%",
      niche: "Climate Change",
      tier: "Macro",
      campaigns: "15",
      totalReach: "1.8M",
      avgCPM: "$2.80",
      roi: "420%",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Blockchain Betty",
      handle: "@blockchainbetty",
      platform: "TikTok",
      followers: "67K",
      engagement: "18.9%",
      niche: "Crypto Education",
      tier: "Mid",
      campaigns: "6",
      totalReach: "450K",
      avgCPM: "$1.90",
      roi: "380%",
      status: "Negotiating",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const programTiers = [
    {
      name: "Micro Influencer",
      followers: "1K - 10K",
      rate: "$50 - $200",
      benefits: ["Product access", "Community features", "Basic analytics"],
    },
    {
      name: "Mid-Tier Influencer",
      followers: "10K - 100K",
      rate: "$200 - $1,000",
      benefits: ["Paid campaigns", "Exclusive content", "Performance bonuses"],
    },
    {
      name: "Macro Influencer",
      followers: "100K - 1M",
      rate: "$1,000 - $10,000",
      benefits: ["Premium partnerships", "Custom campaigns", "Revenue sharing"],
    },
    {
      name: "Celebrity/Mega",
      followers: "1M+",
      rate: "$10,000+",
      benefits: ["Brand ambassadorship", "Equity participation", "Co-creation opportunities"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Influencer Program</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Partner with content creators to amplify our sustainability message
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Recruit Influencer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {programTiers.map((tier, index) => (
          <Card
            key={index}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tier.followers}</p>
            <p className="text-lg font-bold text-emerald-600 mb-3">{tier.rate}</p>
            <ul className="space-y-1">
              {tier.benefits.map((benefit, idx) => (
                <li key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                  • {benefit}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {influencers.map((influencer, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={influencer.avatar || "/placeholder.svg"}
                  alt={influencer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{influencer.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{influencer.handle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {influencer.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {influencer.niche}
                    </Badge>
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  influencer.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {influencer.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Followers</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{influencer.followers}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{influencer.engagement}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Campaigns</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{influencer.campaigns}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Total Reach</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{influencer.totalReach}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Avg CPM</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{influencer.avgCPM}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">ROI</p>
                  <p className="font-semibold text-emerald-600">{influencer.roi}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
