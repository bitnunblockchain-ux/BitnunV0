"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Bell, Star, ExternalLink } from "lucide-react"

export function UpcomingProjects() {
  const upcomingProjects = [
    {
      name: "OceanClean DAO",
      type: "IDO",
      description: "Blockchain-powered ocean cleanup initiative with tokenized impact tracking",
      launchDate: "Dec 15, 2024",
      target: "$8M",
      price: "TBA",
      category: "Environmental",
      rating: 4.8,
      followers: "12.4K",
      status: "KYC Pending",
    },
    {
      name: "RenewableGrid Protocol",
      type: "STO",
      description: "Decentralized renewable energy grid with peer-to-peer energy trading",
      launchDate: "Dec 22, 2024",
      target: "$15M",
      price: "TBA",
      category: "Energy",
      rating: 4.9,
      followers: "8.7K",
      status: "Whitelist Open",
    },
    {
      name: "CarbonCredit Exchange",
      type: "IEO",
      description: "Global carbon credit marketplace with verified offset tracking",
      launchDate: "Jan 5, 2025",
      target: "$12M",
      price: "TBA",
      category: "Carbon Markets",
      rating: 4.7,
      followers: "15.2K",
      status: "Coming Soon",
    },
    {
      name: "EcoVerse Metaverse",
      type: "ICO",
      description: "Virtual world focused on environmental education and sustainability",
      launchDate: "Jan 18, 2025",
      target: "$25M",
      price: "TBA",
      category: "Metaverse",
      rating: 4.6,
      followers: "22.1K",
      status: "Development",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Projects</h2>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingProjects.map((project, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {project.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Launch Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.launchDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Target Raise</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.target}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900 dark:text-white">{project.rating}</span>
                  <span className="text-gray-600 dark:text-gray-400">• {project.followers} followers</span>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    project.status === "Whitelist Open"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : project.status === "KYC Pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                  }`}
                >
                  {project.status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Bell className="h-4 w-4 mr-2" />
                  Get Notified
                </Button>
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
