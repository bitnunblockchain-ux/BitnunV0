"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Shield, Globe, Search, ExternalLink, FileText, Terminal, Layers, Database, Cpu } from "lucide-react"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const docSections = [
    {
      title: "Getting Started",
      description: "Quick start guides and basic concepts",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      articles: [
        { title: "Platform Overview", type: "guide", readTime: "5 min" },
        { title: "Creating Your First Wallet", type: "tutorial", readTime: "3 min" },
        { title: "Understanding Action Mining", type: "concept", readTime: "8 min" },
        { title: "Platform Navigation", type: "guide", readTime: "4 min" },
      ],
    },
    {
      title: "API Reference",
      description: "Complete API documentation and examples",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      articles: [
        { title: "Authentication", type: "api", readTime: "10 min" },
        { title: "Wallet Operations", type: "api", readTime: "15 min" },
        { title: "Transaction Endpoints", type: "api", readTime: "12 min" },
        { title: "Mining API", type: "api", readTime: "8 min" },
      ],
    },
    {
      title: "Smart Contracts",
      description: "Contract development and deployment",
      icon: Layers,
      color: "from-purple-500 to-pink-500",
      articles: [
        { title: "Contract Architecture", type: "technical", readTime: "20 min" },
        { title: "Deployment Guide", type: "tutorial", readTime: "15 min" },
        { title: "Security Best Practices", type: "guide", readTime: "12 min" },
        { title: "Testing Framework", type: "technical", readTime: "18 min" },
      ],
    },
    {
      title: "Mining Protocol",
      description: "Action Mining technical specifications",
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      articles: [
        { title: "Proof-of-Action Consensus", type: "technical", readTime: "25 min" },
        { title: "Reward Distribution", type: "concept", readTime: "10 min" },
        { title: "Mining Optimization", type: "guide", readTime: "15 min" },
        { title: "VR/AR Integration", type: "technical", readTime: "20 min" },
      ],
    },
    {
      title: "Security",
      description: "Security protocols and best practices",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      articles: [
        { title: "Wallet Security", type: "guide", readTime: "8 min" },
        { title: "Transaction Safety", type: "concept", readTime: "6 min" },
        { title: "Smart Contract Audits", type: "technical", readTime: "15 min" },
        { title: "Incident Response", type: "guide", readTime: "10 min" },
      ],
    },
    {
      title: "Integration",
      description: "Third-party integrations and SDKs",
      icon: Globe,
      color: "from-indigo-500 to-purple-500",
      articles: [
        { title: "JavaScript SDK", type: "sdk", readTime: "12 min" },
        { title: "Python SDK", type: "sdk", readTime: "12 min" },
        { title: "Webhook Integration", type: "integration", readTime: "10 min" },
        { title: "Mobile SDKs", type: "sdk", readTime: "15 min" },
      ],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "api":
        return "bg-blue-600"
      case "tutorial":
        return "bg-green-600"
      case "guide":
        return "bg-purple-600"
      case "technical":
        return "bg-red-600"
      case "concept":
        return "bg-yellow-600"
      case "sdk":
        return "bg-indigo-600"
      case "integration":
        return "bg-pink-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive guides, API references, and technical documentation for BitnunEco platform
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Terminal className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">API Explorer</h3>
              <p className="text-gray-400 text-sm">Interactive API testing</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Code Examples</h3>
              <p className="text-gray-400 text-sm">Ready-to-use snippets</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Schema Reference</h3>
              <p className="text-gray-400 text-sm">Data structures</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Changelog</h3>
              <p className="text-gray-400 text-sm">Latest updates</p>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">{section.title}</CardTitle>
                <CardDescription className="text-gray-400">{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <h4 className="text-white text-sm font-medium">{article.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${getTypeColor(article.type)} text-xs`}>{article.type}</Badge>
                            <span className="text-xs text-gray-400">{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                >
                  View All Articles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Popular Articles</CardTitle>
            <CardDescription className="text-gray-400">Most viewed documentation this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Getting Started with Action Mining", views: "12.4K", type: "tutorial" },
                { title: "API Authentication Guide", views: "8.7K", type: "api" },
                { title: "Smart Contract Deployment", views: "6.2K", type: "technical" },
                { title: "Wallet Integration SDK", views: "5.9K", type: "sdk" },
                { title: "Security Best Practices", views: "4.8K", type: "guide" },
                { title: "VR Mining Implementation", views: "3.6K", type: "technical" },
              ].map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{article.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getTypeColor(article.type)} text-xs`}>{article.type}</Badge>
                        <span className="text-xs text-gray-400">{article.views} views</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
