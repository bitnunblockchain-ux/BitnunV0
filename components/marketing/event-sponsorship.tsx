"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Star } from "lucide-react"

export function EventSponsorship() {
  const sponsorshipTiers = [
    {
      name: "Platinum",
      price: "$50,000",
      benefits: ["Logo on main stage", "Speaking slot", "Premium booth", "VIP networking"],
      color: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
    {
      name: "Gold",
      price: "$25,000",
      benefits: ["Logo placement", "Exhibition booth", "Networking access", "Brand mentions"],
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
    {
      name: "Silver",
      price: "$10,000",
      benefits: ["Logo in materials", "Standard booth", "Event access", "Digital promotion"],
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Event Sponsorship Opportunities
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Partner with BitnunEco to reach thousands of blockchain developers and enthusiasts at our global events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sponsorshipTiers.map((tier) => (
          <Card
            key={tier.name}
            className="relative overflow-hidden border-2 hover:border-emerald-500/50 transition-colors"
          >
            <div className={`h-2 ${tier.color}`} />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                {tier.name}
              </CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">{tier.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-emerald-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                Become a Sponsor
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">BitnunEco Developer Conference 2024</h4>
              <p className="text-sm text-muted-foreground">San Francisco • March 15-17</p>
              <Badge variant="secondary">
                <Users className="h-3 w-3 mr-1" />
                5,000+ Attendees
              </Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Blockchain Innovation Summit</h4>
              <p className="text-sm text-muted-foreground">London • June 8-10</p>
              <Badge variant="secondary">
                <Users className="h-3 w-3 mr-1" />
                3,000+ Attendees
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
