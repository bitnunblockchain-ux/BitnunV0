"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  Share,
  BookOpen,
  Zap,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Cpu,
  Eye,
  Clock,
} from "lucide-react"

export default function WhitepaperPage() {
  const sections = [
    { title: "Executive Summary", page: 3, status: "complete" },
    { title: "Introduction to BitnunEco", page: 5, status: "complete" },
    { title: "Action Mining Protocol", page: 12, status: "complete" },
    { title: "Proof-of-Action Consensus", page: 18, status: "complete" },
    { title: "Token Economics", page: 25, status: "complete" },
    { title: "VR/AR Integration", page: 32, status: "complete" },
    { title: "Governance Model", page: 38, status: "complete" },
    { title: "Technical Architecture", page: 45, status: "complete" },
    { title: "Security Framework", page: 52, status: "complete" },
    { title: "Roadmap & Future Vision", page: 58, status: "complete" },
  ]

  const keyMetrics = [
    { label: "Total Pages", value: "64", icon: FileText },
    { label: "Last Updated", value: "Dec 2024", icon: Clock },
    { label: "Downloads", value: "15.2K", icon: Download },
    { label: "Views", value: "47.8K", icon: Eye },
  ]

  const highlights = [
    {
      title: "Revolutionary Mining",
      description: "Browser-based Action Mining eliminates hardware requirements",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Eco-Friendly Approach",
      description: "99.9% less energy consumption than traditional mining",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Cross-Reality Platform",
      description: "Seamless integration across desktop, mobile, AR, and VR",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Community Governance",
      description: "Decentralized decision-making through DAO mechanisms",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BitnunEco Whitepaper
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            A comprehensive technical and business overview of the BitnunEco blockchain platform, Action Mining
            protocol, and ecosystem vision
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Online
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <metric.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{highlight.title}</h3>
                <p className="text-gray-400">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Table of Contents</CardTitle>
                <CardDescription className="text-gray-400">Navigate through the whitepaper sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{section.title}</h4>
                          <p className="text-gray-400 text-sm">Page {section.page}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-600">{section.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Abstract & Quick Facts */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Abstract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  BitnunEco introduces a revolutionary blockchain platform that eliminates traditional mining hardware
                  requirements through innovative Action Mining technology. Users earn BTN tokens through platform
                  interactions, creating a sustainable and accessible ecosystem.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our Proof-of-Action consensus mechanism, combined with cross-reality integration and community
                  governance, establishes a new paradigm for blockchain participation and environmental sustainability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Symbol:</span>
                  <span className="text-white font-medium">BTN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Consensus:</span>
                  <span className="text-white font-medium">Proof-of-Action</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Block Time:</span>
                  <span className="text-white font-medium">~3 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy Usage:</span>
                  <span className="text-green-400 font-medium">99.9% less</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform Support:</span>
                  <span className="text-white font-medium">Web, Mobile, VR, AR</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Reading Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completion</span>
                    <span className="text-white">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-gray-400">Start reading to track your progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Resources */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Related Resources</CardTitle>
            <CardDescription className="text-gray-400">Additional documentation and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                <FileText className="h-6 w-6 text-primary mb-2" />
                <h4 className="text-white font-medium mb-1">Technical Documentation</h4>
                <p className="text-gray-400 text-sm">Detailed technical specifications</p>
              </div>

              <div className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                <TrendingUp className="h-6 w-6 text-primary mb-2" />
                <h4 className="text-white font-medium mb-1">Tokenomics Report</h4>
                <p className="text-gray-400 text-sm">Economic model analysis</p>
              </div>

              <div className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <h4 className="text-white font-medium mb-1">Security Audit</h4>
                <p className="text-gray-400 text-sm">Third-party security assessment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
