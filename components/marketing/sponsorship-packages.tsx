"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Zap, ExternalLink } from "lucide-react"

export function SponsorshipPackages() {
  const packages = [
    {
      name: "Eco Supporter",
      tier: "Bronze",
      price: "$5,000",
      duration: "3 months",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      features: [
        "Logo on website footer",
        "Social media mentions (2/month)",
        "Newsletter inclusion",
        "Community forum badge",
        "Basic analytics report",
      ],
      benefits: "Perfect for startups and small businesses looking to support sustainability",
      available: true,
    },
    {
      name: "Green Partner",
      tier: "Silver",
      price: "$15,000",
      duration: "6 months",
      icon: Star,
      color: "from-gray-400 to-gray-600",
      features: [
        "Logo on homepage",
        "Dedicated blog post",
        "Social media campaign",
        "Event co-branding",
        "Monthly analytics reports",
        "Direct community access",
      ],
      benefits: "Ideal for growing companies wanting to showcase their environmental commitment",
      available: true,
    },
    {
      name: "Sustainability Champion",
      tier: "Gold",
      price: "$35,000",
      duration: "12 months",
      icon: Crown,
      color: "from-yellow-400 to-yellow-600",
      features: [
        "Premium homepage placement",
        "Quarterly thought leadership content",
        "Webinar co-hosting opportunities",
        "Custom NFT collection",
        "Priority customer support",
        "Detailed ROI analytics",
        "Conference speaking slots",
      ],
      benefits: "For established brands leading the sustainability movement",
      available: true,
      popular: true,
    },
    {
      name: "Ecosystem Leader",
      tier: "Platinum",
      price: "$75,000",
      duration: "12 months",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        "Exclusive partnership status",
        "Custom integration opportunities",
        "Joint product development",
        "Executive advisory board access",
        "White-label solutions",
        "Global event partnerships",
        "Dedicated account manager",
        "Custom analytics dashboard",
      ],
      benefits: "Enterprise-level partnership for industry leaders and major corporations",
      available: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sponsorship Packages</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Partner with BitnunEco to promote sustainable blockchain technology
          </p>
        </div>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Custom Package Inquiry
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {packages.map((pkg, index) => (
          <Card
            key={index}
            className={`p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 relative overflow-hidden ${
              pkg.popular ? "ring-2 ring-emerald-500" : ""
            }`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-xs font-semibold">
                Most Popular
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${pkg.color} flex items-center justify-center text-white`}
              >
                <pkg.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pkg.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {pkg.tier}
                </Badge>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{pkg.price}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">/{pkg.duration}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{pkg.benefits}</p>
            </div>

            <div className="space-y-3 mb-6">
              {pkg.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full ${
                pkg.available ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!pkg.available}
            >
              {pkg.available ? "Get Started" : "Coming Soon"}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Custom Enterprise Solutions</h3>
            <p className="text-emerald-100">
              Need a tailored sponsorship package? We work with enterprise clients to create custom partnerships that
              align with your brand values and marketing objectives.
            </p>
          </div>
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            Contact Sales
          </Button>
        </div>
      </Card>
    </div>
  )
}
