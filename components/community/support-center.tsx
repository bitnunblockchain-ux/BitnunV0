"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, MessageSquare, Book, Plus, Search } from "lucide-react"

export function SupportCenter() {
  const tickets = [
    {
      id: "#12345",
      title: "Wallet connection issues with MetaMask",
      status: "Open",
      priority: "High",
      category: "Technical",
      created: "2 hours ago",
      lastUpdate: "30 minutes ago",
      assignee: "Support Team",
    },
    {
      id: "#12344",
      title: "Mining rewards not showing correctly",
      status: "In Progress",
      priority: "Medium",
      category: "Mining",
      created: "1 day ago",
      lastUpdate: "4 hours ago",
      assignee: "Technical Team",
    },
    {
      id: "#12343",
      title: "NFT minting transaction failed",
      status: "Resolved",
      priority: "Low",
      category: "NFT",
      created: "3 days ago",
      lastUpdate: "1 day ago",
      assignee: "Development Team",
    },
  ]

  const faqCategories = [
    {
      name: "Getting Started",
      icon: HelpCircle,
      articles: 12,
      description: "Basic setup and account creation",
    },
    {
      name: "Mining & Rewards",
      icon: MessageSquare,
      articles: 8,
      description: "Action mining and reward systems",
    },
    {
      name: "Wallet & Transactions",
      icon: Book,
      articles: 15,
      description: "Wallet management and transactions",
    },
    {
      name: "NFT Marketplace",
      icon: HelpCircle,
      articles: 6,
      description: "Buying, selling, and minting NFTs",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Support Center</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Get help with technical issues and find answers to common questions
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Tickets */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Support Tickets</h3>
          {tickets.map((ticket, index) => (
            <Card
              key={index}
              className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{ticket.id}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        ticket.status === "Open"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : ticket.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{ticket.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Created: {ticket.created}</span>
                    <span>Updated: {ticket.lastUpdate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      ticket.priority === "High"
                        ? "border-red-500 text-red-600"
                        : ticket.priority === "Medium"
                          ? "border-yellow-500 text-yellow-600"
                          : "border-blue-500 text-blue-600"
                    }`}
                  >
                    {ticket.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {ticket.category}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to: {ticket.assignee}</span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View Details
                </Button>
              </div>
            </Card>
          ))}

          {/* Create New Ticket Form */}
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Support Ticket</h3>
            <div className="space-y-4">
              <Input placeholder="Subject" />
              <Textarea placeholder="Describe your issue in detail..." rows={4} />
              <div className="flex gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Submit Ticket</Button>
                <Button variant="outline" className="bg-transparent">
                  Save Draft
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ and Knowledge Base */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge Base</h3>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>

          {faqCategories.map((category, index) => (
            <Card
              key={index}
              className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {category.articles} articles
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
