"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ExternalLink, Plus } from "lucide-react"
import Image from "next/image"

export function BrandPartnerships() {
  const partnerships = [
    {
      name: "GreenTech Solutions",
      logo: "/placeholder.svg?height=60&width=120",
      industry: "Clean Energy",
      partnership: "Strategic Alliance",
      duration: "2 years",
      value: "$500K",
      status: "Active",
      benefits: ["Joint product development", "Co-marketing campaigns", "Shared research initiatives"],
      metrics: {
        reach: "2.1M",
        engagement: "12.5%",
        leads: "8,450",
      },
    },
    {
      name: "EcoVenture Capital",
      logo: "/placeholder.svg?height=60&width=120",
      industry: "Investment",
      partnership: "Funding Partner",
      duration: "3 years",
      value: "$2M",
      status: "Active",
      benefits: ["Investment funding", "Portfolio company access", "Industry expertise"],
      metrics: {
        reach: "890K",
        engagement: "18.7%",
        leads: "3,200",
      },
    },
    {
      name: "Carbon Offset Alliance",
      logo: "/placeholder.svg?height=60&width=120",
      industry: "Environmental",
      partnership: "Technology Integration",
      duration: "1 year",
      value: "$150K",
      status: "Negotiating",
      benefits: ["API integration", "Data sharing", "Joint certification program"],
      metrics: {
        reach: "450K",
        engagement: "8.9%",
        leads: "1,890",
      },
    },
    {
      name: "Sustainable Brands Network",
      logo: "/placeholder.svg?height=60&width=120",
      industry: "Marketing",
      partnership: "Media Partnership",
      duration: "6 months",
      value: "$75K",
      status: "Completed",
      benefits: ["Content collaboration", "Event partnerships", "Thought leadership"],
      metrics: {
        reach: "1.5M",
        engagement: "15.2%",
        leads: "5,670",
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Brand Partnerships</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Strategic alliances driving mutual growth and sustainability impact
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Propose Partnership
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partnerships.map((partnership, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={partnership.logo || "/placeholder.svg"}
                  alt={partnership.name}
                  width={64}
                  height={32}
                  className="object-contain bg-gray-100 dark:bg-gray-700 rounded p-1"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{partnership.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{partnership.industry}</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  partnership.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : partnership.status === "Negotiating"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}
              >
                {partnership.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{partnership.partnership}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{partnership.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Value</p>
                  <p className="font-semibold text-emerald-600">{partnership.value}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Benefits</p>
                <div className="flex flex-wrap gap-1">
                  {partnership.benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Reach</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{partnership.metrics.reach}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{partnership.metrics.engagement}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Leads</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{partnership.metrics.leads}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Metrics
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Partnership Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
