"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, ExternalLink, Code, Zap, Wallet, ShoppingBag, Trophy, Brain } from "lucide-react"

export function APIDocumentation() {
  const [searchQuery, setSearchQuery] = useState("")

  const apiSections = [
    {
      title: "Mining API",
      description: "Control browser-based mining and action mining",
      icon: Zap,
      endpoints: 8,
      color: "text-yellow-500",
      methods: ["GET /mining/status", "POST /mining/start", "POST /mining/stop", "GET /mining/rewards"],
    },
    {
      title: "Wallet API",
      description: "Manage BTN tokens and transactions",
      icon: Wallet,
      endpoints: 12,
      color: "text-green-500",
      methods: ["GET /wallet/balance", "POST /wallet/transfer", "GET /wallet/history", "POST /wallet/create"],
    },
    {
      title: "NFT Marketplace API",
      description: "Buy, sell, and mint eco-themed NFTs",
      icon: ShoppingBag,
      endpoints: 15,
      color: "text-blue-500",
      methods: ["GET /nft/marketplace", "POST /nft/mint", "POST /nft/buy", "GET /nft/collection"],
    },
    {
      title: "Gamification API",
      description: "Access achievements, leaderboards, and rewards",
      icon: Trophy,
      endpoints: 10,
      color: "text-purple-500",
      methods: ["GET /gamification/achievements", "GET /gamification/leaderboard", "POST /gamification/claim"],
    },
    {
      title: "AI Insights API",
      description: "Leverage AI predictions and fraud detection",
      icon: Brain,
      endpoints: 6,
      color: "text-pink-500",
      methods: ["GET /ai/predictions", "GET /ai/fraud-detection", "POST /ai/optimize"],
    },
  ]

  const filteredSections = apiSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>API Documentation</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="bg-transparent">
            <ExternalLink className="w-4 h-4 mr-2" />
            Full Docs
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search API endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* API Sections */}
        <div className="space-y-4">
          {filteredSections.map((section, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <section.icon className={`w-6 h-6 ${section.color} mt-0.5`} />
                  <div>
                    <h4 className="font-semibold text-foreground">{section.title}</h4>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {section.endpoints} endpoints
                </Badge>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-foreground">Key Endpoints:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {section.methods.map((method, methodIndex) => (
                    <div key={methodIndex} className="flex items-center space-x-2 text-sm">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          method.startsWith("GET") ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {method.split(" ")[0]}
                      </Badge>
                      <code className="text-muted-foreground font-mono text-xs">{method.split(" ")[1]}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-3">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Code className="w-4 h-4 mr-2" />
                  View Docs
                </Button>
                <Button variant="ghost" size="sm">
                  Try API
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Authentication</h4>
          <p className="text-sm text-blue-800 mb-3">
            All API requests require authentication using your API key in the Authorization header.
          </p>
          <div className="bg-blue-900 text-blue-100 p-3 rounded font-mono text-sm">
            Authorization: Bearer your-api-key-here
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Rate Limits</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-yellow-800">Free Tier: 1,000 requests/hour</p>
              <p className="text-yellow-800">Pro Tier: 10,000 requests/hour</p>
            </div>
            <div>
              <p className="text-yellow-800">Enterprise: Unlimited</p>
              <p className="text-yellow-800">WebSocket: Real-time updates</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
