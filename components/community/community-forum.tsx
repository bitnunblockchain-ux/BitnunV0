"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Pin, Plus, TrendingUp } from "lucide-react"

export function CommunityForum() {
  const categories = [
    {
      name: "General Discussion",
      description: "General topics about BitnunEco and sustainability",
      topics: 1247,
      posts: 8934,
      lastPost: "2 minutes ago",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    {
      name: "Technical Support",
      description: "Get help with technical issues and troubleshooting",
      topics: 892,
      posts: 5621,
      lastPost: "5 minutes ago",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    {
      name: "Development",
      description: "Discuss development, APIs, and technical implementation",
      topics: 567,
      posts: 3456,
      lastPost: "12 minutes ago",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    {
      name: "Trading & DeFi",
      description: "Share trading strategies and DeFi discussions",
      topics: 734,
      posts: 4789,
      lastPost: "8 minutes ago",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
  ]

  const recentTopics = [
    {
      title: "New WASM mining optimization techniques",
      author: "DevMaster",
      category: "Development",
      replies: 23,
      views: 456,
      lastReply: "3 minutes ago",
      isPinned: true,
      isHot: true,
    },
    {
      title: "How to maximize Action Mining rewards?",
      author: "EcoWarrior",
      category: "General Discussion",
      replies: 67,
      views: 1234,
      lastReply: "7 minutes ago",
      isPinned: false,
      isHot: true,
    },
    {
      title: "NFT marketplace gas optimization discussion",
      author: "SmartContractDev",
      category: "Development",
      replies: 15,
      views: 289,
      lastReply: "15 minutes ago",
      isPinned: false,
      isHot: false,
    },
    {
      title: "Best practices for sustainable mining",
      author: "GreenMiner",
      category: "General Discussion",
      replies: 89,
      views: 2156,
      lastReply: "22 minutes ago",
      isPinned: true,
      isHot: false,
    },
    {
      title: "API rate limiting issues - need help",
      author: "NewDeveloper",
      category: "Technical Support",
      replies: 8,
      views: 134,
      lastReply: "28 minutes ago",
      isPinned: false,
      isHot: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Community Forum</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Join discussions and share knowledge with the community
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Topic
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
          {categories.map((category, index) => (
            <Card
              key={index}
              className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                    <Badge variant="secondary" className={category.color}>
                      {category.topics}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{category.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{category.topics} topics</span>
                    <span>{category.posts} posts</span>
                    <span>Last: {category.lastPost}</span>
                  </div>
                </div>
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Topics</h3>
          {recentTopics.map((topic, index) => (
            <Card
              key={index}
              className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {topic.isPinned && <Pin className="h-4 w-4 text-emerald-500" />}
                    {topic.isHot && <TrendingUp className="h-4 w-4 text-red-500" />}
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{topic.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">by {topic.author}</span>
                    <Badge variant="outline" className="text-xs">
                      {topic.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{topic.replies}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{topic.views}</span>
                    </div>
                    <span>Last: {topic.lastReply}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
