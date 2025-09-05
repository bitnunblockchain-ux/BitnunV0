"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Eye, Users, DollarSign, Plus, BarChart3 } from "lucide-react"

export function CampaignDashboard() {
  const campaigns = [
    {
      name: "Sustainable Mining Awareness",
      type: "Social Media",
      status: "Active",
      budget: "$50,000",
      spent: "$32,500",
      progress: 65,
      reach: "2.4M",
      engagement: "8.5%",
      conversions: "12,450",
      roi: "340%",
      endDate: "Dec 31, 2024",
    },
    {
      name: "Developer Onboarding Campaign",
      type: "Content Marketing",
      status: "Active",
      budget: "$75,000",
      spent: "$45,200",
      progress: 60,
      reach: "890K",
      engagement: "12.3%",
      conversions: "5,670",
      roi: "280%",
      endDate: "Jan 15, 2025",
    },
    {
      name: "NFT Marketplace Launch",
      type: "Influencer Marketing",
      status: "Completed",
      budget: "$120,000",
      spent: "$118,500",
      progress: 100,
      reach: "5.2M",
      engagement: "15.7%",
      conversions: "28,900",
      roi: "450%",
      endDate: "Nov 30, 2024",
    },
    {
      name: "Carbon Credit Education",
      type: "Educational Content",
      status: "Planning",
      budget: "$40,000",
      spent: "$8,500",
      progress: 21,
      reach: "150K",
      engagement: "6.2%",
      conversions: "1,200",
      roi: "120%",
      endDate: "Feb 28, 2025",
    },
  ]

  const marketingStats = [
    { label: "Total Reach", value: "8.7M", change: "+23.5%", icon: Eye },
    { label: "Active Users", value: "245K", change: "+18.2%", icon: Users },
    { label: "Marketing ROI", value: "325%", change: "+45.8%", icon: TrendingUp },
    { label: "Ad Spend", value: "$204K", change: "+12.1%", icon: DollarSign },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Marketing Campaigns</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track performance and ROI of marketing initiatives</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketingStats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <Badge variant="secondary" className="mt-1 text-xs text-green-600">
                  {stat.change}
                </Badge>
              </div>
              <stat.icon className="h-8 w-8 text-emerald-600" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{campaign.type}</p>
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  campaign.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : campaign.status === "Completed"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {campaign.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Budget Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {campaign.spent} / {campaign.budget}
                  </span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{campaign.progress}% completed</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Reach</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{campaign.reach}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{campaign.engagement}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Conversions</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{campaign.conversions}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">ROI</p>
                  <p className="font-semibold text-emerald-600">{campaign.roi}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">End Date: {campaign.endDate}</span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
