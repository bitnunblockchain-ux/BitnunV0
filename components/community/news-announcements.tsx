"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar, ExternalLink, Plus } from "lucide-react"

export function NewsAnnouncements() {
  const announcements = [
    {
      title: "BitnunEco V2.1 Release - Enhanced Mining Performance",
      content:
        "We're excited to announce the release of BitnunEco V2.1, featuring significant improvements to our WASM mining nodes and Action Mining algorithms. This update delivers up to 40% better performance and reduced energy consumption.",
      author: "BitnunEco Team",
      date: "Dec 8, 2024",
      category: "Product Update",
      priority: "High",
      views: 2456,
      comments: 89,
    },
    {
      title: "New Partnership with GreenTech Alliance",
      content:
        "BitnunEco has partnered with the GreenTech Alliance to accelerate sustainable blockchain adoption. This partnership will bring new carbon offset integrations and environmental impact tracking features to our platform.",
      author: "Marketing Team",
      date: "Dec 6, 2024",
      category: "Partnership",
      priority: "Medium",
      views: 1834,
      comments: 45,
    },
    {
      title: "December Community Challenge: Sustainable Mining",
      content:
        "Join our December community challenge! Participate in sustainable mining activities and compete for a prize pool of 50,000 BTN tokens. Challenge runs from Dec 1-31, 2024.",
      author: "Community Team",
      date: "Dec 1, 2024",
      category: "Community",
      priority: "Medium",
      views: 3421,
      comments: 156,
    },
    {
      title: "Scheduled Maintenance: Dec 15, 2024",
      content:
        "We will be performing scheduled maintenance on our infrastructure on December 15, 2024, from 2:00 AM to 6:00 AM UTC. During this time, some services may be temporarily unavailable.",
      author: "Technical Team",
      date: "Dec 10, 2024",
      category: "Maintenance",
      priority: "High",
      views: 987,
      comments: 23,
    },
    {
      title: "NFT Marketplace Gas Fee Optimization",
      content:
        "We've successfully reduced gas fees on our NFT marketplace by 60% through smart contract optimizations. All NFT transactions now cost significantly less while maintaining security and functionality.",
      author: "Development Team",
      date: "Nov 28, 2024",
      category: "Technical",
      priority: "Low",
      views: 1567,
      comments: 67,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">News & Announcements</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with the latest BitnunEco developments and community news
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                    announcement.priority === "High"
                      ? "bg-red-500"
                      : announcement.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                >
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{announcement.date}</span>
                    </div>
                    <span>by {announcement.author}</span>
                    <span>{announcement.views} views</span>
                    <span>{announcement.comments} comments</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    announcement.category === "Product Update"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      : announcement.category === "Partnership"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : announcement.category === "Community"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : announcement.category === "Maintenance"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                  }`}
                >
                  {announcement.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    announcement.priority === "High"
                      ? "border-red-500 text-red-600"
                      : announcement.priority === "Medium"
                        ? "border-yellow-500 text-yellow-600"
                        : "border-blue-500 text-blue-600"
                  }`}
                >
                  {announcement.priority}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read More
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Share
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
