"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, DollarSign, Play, Heart } from "lucide-react"

interface Creator {
  id: string
  name: string
  username: string
  avatar: string
  verified: boolean
  subscribers: number
  monthlyEarnings: number
  contentCount: number
  category: string
  tier: "bronze" | "silver" | "gold" | "diamond"
  latestContent: {
    title: string
    type: "video" | "article" | "course" | "nft"
    likes: number
    premium: boolean
  }
}

export function CreatorSpotlight() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [subscribedCreators, setSubscribedCreators] = useState<Set<string>>(new Set())

  useEffect(() => {
    const mockCreators: Creator[] = [
      {
        id: "1",
        name: "Emma Wilson",
        username: "@emmacrypto",
        avatar: "/creator-1.jpg",
        verified: true,
        subscribers: 45200,
        monthlyEarnings: 12500,
        contentCount: 127,
        category: "DeFi Education",
        tier: "diamond",
        latestContent: {
          title: "Understanding Action Mining: The Future of Sustainable Blockchain",
          type: "video",
          likes: 1250,
          premium: false,
        },
      },
      {
        id: "2",
        name: "David Park",
        username: "@davidnft",
        avatar: "/creator-2.jpg",
        verified: true,
        subscribers: 28900,
        monthlyEarnings: 8900,
        contentCount: 89,
        category: "NFT Art",
        tier: "gold",
        latestContent: {
          title: "Eco-Themed NFT Collection: Nature's Digital Renaissance",
          type: "nft",
          likes: 890,
          premium: true,
        },
      },
      {
        id: "3",
        name: "Lisa Chen",
        username: "@lisatech",
        avatar: "/creator-3.jpg",
        verified: false,
        subscribers: 15600,
        monthlyEarnings: 3200,
        contentCount: 45,
        category: "Tech Analysis",
        tier: "silver",
        latestContent: {
          title: "Cross-Chain Bridge Security: What You Need to Know",
          type: "article",
          likes: 456,
          premium: false,
        },
      },
    ]

    setCreators(mockCreators)
  }, [])

  const handleSubscribe = (creatorId: string) => {
    setSubscribedCreators((prev) => {
      const newSubscribed = new Set(prev)
      if (newSubscribed.has(creatorId)) {
        newSubscribed.delete(creatorId)
      } else {
        newSubscribed.add(creatorId)
      }
      return newSubscribed
    })
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "diamond":
        return "bg-blue-500"
      case "gold":
        return "bg-yellow-500"
      case "silver":
        return "bg-gray-400"
      case "bronze":
        return "bg-orange-600"
      default:
        return "bg-gray-500"
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-3 h-3" />
      case "nft":
        return <Star className="w-3 h-3" />
      default:
        return <Star className="w-3 h-3" />
    }
  }

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Creator Spotlight</h3>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
          <Star className="w-3 h-3 mr-1" />
          Featured
        </Badge>
      </div>

      <div className="space-y-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getTierColor(creator.tier)} rounded-full`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{creator.name}</span>
                    {creator.verified && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{creator.username}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {creator.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-300">Subscribers</p>
                <p className="font-semibold text-gray-900 dark:text-white">{creator.subscribers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Monthly</p>
                <p className="font-semibold text-emerald-500">${creator.monthlyEarnings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Content</p>
                <p className="font-semibold text-gray-900 dark:text-white">{creator.contentCount}</p>
              </div>
            </div>

            <div className="mb-3 p-3 bg-white dark:bg-gray-800 rounded border">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {getContentTypeIcon(creator.latestContent.type)}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Latest Content</span>
                  {creator.latestContent.premium && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <Heart className="w-3 h-3" />
                  {creator.latestContent.likes}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-balance">{creator.latestContent.title}</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubscribe(creator.id)}
                className={subscribedCreators.has(creator.id) ? "bg-emerald-50 text-emerald-600" : "bg-transparent"}
              >
                <Users className="w-3 h-3 mr-1" />
                {subscribedCreators.has(creator.id) ? "Subscribed" : "Subscribe"}
              </Button>
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                <DollarSign className="w-3 h-3 mr-1" />
                Tip
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 bg-transparent">
        Become a Creator
      </Button>
    </Card>
  )
}
