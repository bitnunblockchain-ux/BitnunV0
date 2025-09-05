"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Zap, ShoppingBag, Brain, Glasses } from "lucide-react"

export function RoadmapTimeline() {
  const roadmapPhases = [
    {
      phase: "Phase 1: MVP Launch",
      timeline: "Q4 2023",
      status: "completed",
      icon: Zap,
      description: "Core blockchain infrastructure and basic mining functionality",
      features: [
        "Browser-native WASM mining nodes",
        "Basic wallet functionality (create, manage, send/receive BTN)",
        "Initial BTN tokenomics implementation",
        "Action Mining system (earn tokens via platform interactions)",
        "Basic security and user authentication",
        "Responsive web interface",
      ],
      deliverables: [
        "✅ Mining infrastructure deployed",
        "✅ Wallet system operational",
        "✅ BTN token launched",
        "✅ Action mining active",
      ],
    },
    {
      phase: "Phase 2: NFT & Gamification",
      timeline: "Q1 2024",
      status: "in-progress",
      icon: ShoppingBag,
      description: "Advanced marketplace and gamification systems",
      features: [
        "Advanced NFT marketplace for eco-themed NFTs",
        "Buy, sell, and mint NFT functionality",
        "Creator monetization tools and royalty systems",
        "Achievement tracking and reward systems",
        "User rankings and leaderboards",
        "Gamified eco-challenges and community events",
      ],
      deliverables: [
        "✅ NFT marketplace launched",
        "✅ Gamification system active",
        "🔄 Creator tools in beta",
        "⏳ Advanced leaderboards",
      ],
    },
    {
      phase: "Phase 3: AI Integration",
      timeline: "Q2 2024",
      status: "in-progress",
      icon: Brain,
      description: "AI-powered features and intelligent automation",
      features: [
        "Proof-of-Action consensus mechanism",
        "AI-powered fraud detection and security",
        "Predictive analytics for mining optimization",
        "Adaptive reward optimization using ML",
        "Smart contract analysis and recommendations",
        "Automated eco-impact assessment",
      ],
      deliverables: [
        "✅ AI fraud detection deployed",
        "✅ Predictive analytics active",
        "🔄 Proof-of-Action consensus testing",
        "⏳ ML reward optimization",
      ],
    },
    {
      phase: "Phase 4: AR/VR Expansion",
      timeline: "Q3 2024",
      status: "planning",
      icon: Glasses,
      description: "Immersive experiences and metaverse integration",
      features: [
        "AR/VR compatibility for immersive experiences",
        "Virtual mining environments and 3D spaces",
        "Metaverse integration with cross-reality features",
        "VR NFT galleries and virtual showrooms",
        "Immersive eco-education experiences",
        "Cross-platform compatibility (VR headsets, AR mobile)",
      ],
      deliverables: [
        "🔄 VR prototype development",
        "⏳ AR mobile app",
        "⏳ Metaverse integration",
        "⏳ 3D mining environments",
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "in-progress":
        return <Clock className="w-6 h-6 text-blue-500" />
      case "planning":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      {roadmapPhases.map((phase, index) => (
        <div key={index} className="relative">
          {/* Timeline Line */}
          {index < roadmapPhases.length - 1 && <div className="absolute left-6 top-16 w-0.5 h-full bg-border -z-10" />}

          <Card className={`bg-card border ${getStatusColor(phase.status).split(" ").slice(2).join(" ")}`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Phase Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {getStatusIcon(phase.status)}
                    <div className="absolute -inset-2 bg-background rounded-full -z-10" />
                  </div>
                </div>

                {/* Phase Content */}
                <div className="flex-1 space-y-4">
                  {/* Phase Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                        <phase.icon className="w-5 h-5" />
                        <span>{phase.phase}</span>
                      </h3>
                      <p className="text-muted-foreground mt-1">{phase.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(phase.status)} variant="outline">
                        {phase.status.replace("-", " ")}
                      </Badge>
                      <Badge variant="secondary">{phase.timeline}</Badge>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {phase.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Deliverables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="text-sm text-muted-foreground">
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
