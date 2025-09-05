"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, TrendingUp, TrendingDown, Copy, MoreHorizontal } from "lucide-react"

interface SocialPost {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
    followers: number
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  type: "trade" | "analysis" | "tip" | "signal"
  tradeData?: {
    pair: string
    action: "buy" | "sell"
    price: number
    pnl: number
    pnlPercent: number
  }
  tags: string[]
}

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    const mockPosts: SocialPost[] = [
      {
        id: "1",
        author: {
          name: "Alex Chen",
          username: "@alextrader",
          avatar: "/trader-avatar.jpg",
          verified: true,
          followers: 15200,
        },
        content:
          "Just closed my BTN/USDT position with a solid 15% gain! The eco-mining narrative is getting stronger. Next target: $0.035 🎯",
        timestamp: "2024-01-15T14:30:00Z",
        likes: 234,
        comments: 45,
        shares: 12,
        type: "trade",
        tradeData: {
          pair: "BTN/USDT",
          action: "sell",
          price: 0.0285,
          pnl: 450.5,
          pnlPercent: 15.2,
        },
        tags: ["BTN", "DeFi", "EcoMining"],
      },
      {
        id: "2",
        author: {
          name: "Sarah Kim",
          username: "@cryptosarah",
          avatar: "/female-trader-avatar.jpg",
          verified: true,
          followers: 28500,
        },
        content:
          "Market analysis: The sustainability sector is showing incredible momentum. BitnunEco's action mining is revolutionary - rewarding users for eco-friendly behavior while securing the network. This is the future of blockchain! 🌱",
        timestamp: "2024-01-15T13:45:00Z",
        likes: 567,
        comments: 89,
        shares: 34,
        type: "analysis",
        tags: ["MarketAnalysis", "Sustainability", "ActionMining"],
      },
      {
        id: "3",
        author: {
          name: "Mike Rodriguez",
          username: "@mikedefi",
          avatar: "/male-trader-avatar.jpg",
          verified: false,
          followers: 8900,
        },
        content:
          "Pro tip: Always check the cross-chain bridge fees before transferring. Just saved $25 by using Polygon instead of Ethereum for my BTN transfer. Small optimizations add up! 💡",
        timestamp: "2024-01-15T12:20:00Z",
        likes: 123,
        comments: 28,
        shares: 15,
        type: "tip",
        tags: ["ProTip", "CrossChain", "GasOptimization"],
      },
    ]

    setPosts(mockPosts)
  }, [])

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleCopyTrade = (postId: string) => {
    console.log("[v0] Copying trade from post:", postId)
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="w-4 h-4 text-emerald-500" />
      case "analysis":
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      case "tip":
        return <TrendingUp className="w-4 h-4 text-yellow-500" />
      case "signal":
        return <TrendingUp className="w-4 h-4 text-purple-500" />
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{post.author.name}</span>
                  {post.author.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      ✓
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">{post.author.username}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.author.followers.toLocaleString()} followers</span>
                  <span>•</span>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getPostTypeIcon(post.type)}
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-gray-900 dark:text-white text-balance">{post.content}</p>

            {/* Trade Data */}
            {post.tradeData && (
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{post.tradeData.pair}</p>
                      <Badge
                        variant={post.tradeData.action === "buy" ? "default" : "destructive"}
                        className={post.tradeData.action === "buy" ? "bg-emerald-500" : ""}
                      >
                        {post.tradeData.action === "buy" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {post.tradeData.action.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Price: ${post.tradeData.price.toFixed(4)}
                      </p>
                      <p
                        className={`text-sm font-semibold ${post.tradeData.pnl >= 0 ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {post.tradeData.pnl >= 0 ? "+" : ""}${post.tradeData.pnl.toFixed(2)} (
                        {post.tradeData.pnlPercent >= 0 ? "+" : ""}
                        {post.tradeData.pnlPercent.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleCopyTrade(post.id)}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Trade
                  </Button>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-emerald-600">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={likedPosts.has(post.id) ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4 mr-1" />
                {post.shares}
              </Button>
            </div>

            <Button variant="outline" size="sm">
              Follow
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
