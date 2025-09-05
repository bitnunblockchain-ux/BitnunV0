"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Building2, Coins, Shield, Plus, ExternalLink } from "lucide-react"

export function LaunchpadTypes() {
  const launchpadTypes = [
    {
      name: "Initial DEX Offering (IDO)",
      icon: Rocket,
      description: "Decentralized token launches with immediate liquidity on DEX platforms",
      features: ["Immediate Trading", "Lower Fees", "Community Driven", "No Geographic Restrictions"],
      minRaise: "$50K",
      avgRaise: "$2.5M",
      duration: "3-7 days",
      fees: "2-5%",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Initial Exchange Offering (IEO)",
      icon: Building2,
      description: "Token sales conducted directly on centralized exchange platforms",
      features: ["Exchange Backing", "KYC/AML Compliance", "Higher Security", "Marketing Support"],
      minRaise: "$100K",
      avgRaise: "$5M",
      duration: "1-3 days",
      fees: "5-10%",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Initial Coin Offering (ICO)",
      icon: Coins,
      description: "Traditional crowdfunding method for blockchain projects",
      features: ["Direct Funding", "Flexible Terms", "Global Access", "Token Utility"],
      minRaise: "$25K",
      avgRaise: "$8M",
      duration: "2-4 weeks",
      fees: "3-7%",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Security Token Offering (STO)",
      icon: Shield,
      description: "Regulated token sales backed by real-world assets",
      features: ["Regulatory Compliance", "Asset Backing", "Investor Protection", "Legal Framework"],
      minRaise: "$500K",
      avgRaise: "$15M",
      duration: "4-12 weeks",
      fees: "8-15%",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Launchpad Types & Features</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Choose the right fundraising mechanism for your project
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Submit Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {launchpadTypes.map((type, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 overflow-hidden"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center text-white`}
              >
                <type.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-1">
                  {type.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Min Raise</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{type.minRaise}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Avg Raise</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{type.avgRaise}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{type.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Platform Fees</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{type.fees}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Learn More & Apply
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to Launch Your Project?</h3>
            <p className="text-emerald-100">
              Get expert guidance on choosing the right launchpad type and preparing your token sale
            </p>
          </div>
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Rocket className="h-4 w-4 mr-2" />
            Start Application
          </Button>
        </div>
      </Card>
    </div>
  )
}
