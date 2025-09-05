"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Edit, Globe, Twitter, Github } from "lucide-react"

export function IdentityProfile() {
  const profileStats = [
    { name: "Profile Views", value: "2,847", change: "+12%" },
    { name: "Connections", value: "156", change: "+8%" },
    { name: "Endorsements", value: "43", change: "+15%" },
    { name: "Trust Score", value: "94.7%", change: "+2.1%" },
  ]

  const achievements = [
    { title: "Early Adopter", description: "Joined BitnunEco in the first month", date: "2024-01-01", rarity: "Rare" },
    { title: "Top Trader", description: "Achieved top 1% trading performance", date: "2024-01-15", rarity: "Epic" },
    {
      title: "Community Builder",
      description: "Helped 100+ users get started",
      date: "2024-01-20",
      rarity: "Legendary",
    },
    { title: "Eco Warrior", description: "Offset 10 tons of CO2 through platform", date: "2024-01-25", rarity: "Rare" },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profileStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-emerald-600">{stat.change} this month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Profile Information
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardTitle>
            <CardDescription>Your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Alex Thompson</h3>
                <p className="text-gray-600">@alexthompson</p>
                <div className="flex space-x-2 mt-2">
                  <Badge variant="outline">DeFi Trader</Badge>
                  <Badge variant="outline">NFT Collector</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value="Passionate about decentralized finance and sustainable blockchain technology. Building the future of Web3."
                  readOnly
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value="San Francisco, CA" readOnly className="mt-1" />
              </div>

              <div>
                <Label>Social Links</Label>
                <div className="flex space-x-2 mt-1">
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements & Badges</CardTitle>
            <CardDescription>Your earned achievements and recognition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <Badge
                    variant={
                      achievement.rarity === "Legendary"
                        ? "default"
                        : achievement.rarity === "Epic"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {achievement.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                <p className="text-xs text-gray-500">Earned on {achievement.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
