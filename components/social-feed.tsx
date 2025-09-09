"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, TrendingUp, Award, Zap, Users } from "lucide-react"
import { SocialShare } from "./social-share"
import Image from "next/image"

interface SocialPost {
  id: string
  user: {
    name: string
    avatar: string
    verified: boolean
  }
  content: string
  type: "achievement" | "trade" | "mining" | "nft"
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
}

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading social feed data
    const mockPosts: SocialPost[] = [
      {
        id: "1",
        user: { name: "Alex Chen", avatar: "/trader-1.jpg", verified: true },
        content: 'Just earned the "Eco Warrior" achievement for mining 1000 BTN tokens sustainably! 🌱',
        type: "achievement",
        timestamp: "2 hours ago",
        likes: 42,
        comments: 8,
        shares: 12,
        liked: false,
      },
      {
        id: "2",
        user: { name: "Sarah Kim", avatar: "/trader-2.jpg", verified: false },
        content: "Successful DeFi trade on BitnunEco! Made 15% profit on my BTN/USDC position 📈",
        type: "trade",
        timestamp: "4 hours ago",
        likes: 28,
        comments: 5,
        shares: 7,
        liked: true,
      },
      {
        id: "3",
        user: { name: "Mike Rodriguez", avatar: "/trader-avatar.jpg", verified: true },
        content: "My new eco-themed NFT just sold for 500 BTN! The sustainable art movement is growing 🎨",
        type: "nft",
        timestamp: "6 hours ago",
        likes: 67,
        comments: 15,
        shares: 23,
        liked: false,
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="w-4 h-4 text-yellow-400" />
      case "trade":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "mining":
        return <Zap className="w-4 h-4 text-cyan-400" />
      case "nft":
        return <Users className="w-4 h-4 text-purple-400" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-effect rounded-xl p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-slate-700 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-slate-700 rounded w-24 mb-2" />
                <div className="h-3 bg-slate-700 rounded w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 rounded w-full" />
              <div className="h-4 bg-slate-700 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Community Feed
        </h2>
        <p className="text-muted-foreground">See what the BitnunEco community is up to</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="glass-effect rounded-xl p-6 hover:bg-primary/5 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Image
                  src={post.user.avatar || "/placeholder.svg"}
                  alt={post.user.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                {post.user.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                  {getTypeIcon(post.type)}
                  <Badge variant="secondary" className="text-xs">
                    {post.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`hover:bg-red-500/10 transition-all duration-300 ${
                        post.liked ? "text-red-500" : "text-muted-foreground"
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${post.liked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>

                    <SocialShare
                      title={`${post.user.name} on BitnunEco: ${post.content}`}
                      hashtags={["BitnunEco", "Web3", post.type]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" className="glass-effect border-primary/20 bg-transparent">
          Load More Posts
        </Button>
      </div>
    </div>
  )
}
