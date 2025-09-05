"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, ShoppingCart, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export function NFTGrid() {
  const [likedNFTs, setLikedNFTs] = useState<Set<string>>(new Set())

  const nfts = [
    {
      id: "1",
      title: "Ancient Forest Guardian",
      creator: "EcoArtist",
      price: "45.5",
      rarity: "Epic",
      rarityColor: "bg-purple-500",
      likes: 234,
      views: 1205,
      image: "/mystical-ancient-forest-guardian-digital-art.jpg",
      category: "Nature & Wildlife",
    },
    {
      id: "2",
      title: "Solar Panel Symphony",
      creator: "GreenTech",
      price: "28.9",
      rarity: "Rare",
      rarityColor: "bg-blue-500",
      likes: 156,
      views: 892,
      image: "/futuristic-solar-panel-array-digital-art.jpg",
      category: "Renewable Energy",
    },
    {
      id: "3",
      title: "Ocean Cleanup Hero",
      creator: "BlueWave",
      price: "67.2",
      rarity: "Legendary",
      rarityColor: "bg-yellow-500",
      likes: 445,
      views: 2103,
      image: "/ocean-cleanup-robot-underwater-digital-art.jpg",
      category: "Ocean Conservation",
    },
    {
      id: "4",
      title: "Wind Farm Horizon",
      creator: "AirPower",
      price: "33.1",
      rarity: "Uncommon",
      rarityColor: "bg-green-500",
      likes: 189,
      views: 756,
      image: "/wind-turbines-on-rolling-hills-sunset-digital-art.jpg",
      category: "Renewable Energy",
    },
    {
      id: "5",
      title: "Coral Reef Revival",
      creator: "ReefSaver",
      price: "52.8",
      rarity: "Epic",
      rarityColor: "bg-purple-500",
      likes: 312,
      views: 1456,
      image: "/vibrant-coral-reef-underwater-ecosystem-digital-ar.jpg",
      category: "Ocean Conservation",
    },
    {
      id: "6",
      title: "Carbon Capture Tree",
      creator: "ForestKeeper",
      price: "41.7",
      rarity: "Rare",
      rarityColor: "bg-blue-500",
      likes: 267,
      views: 1089,
      image: "/giant-tree-with-carbon-capture-technology-digital-.jpg",
      category: "Climate Action",
    },
    {
      id: "7",
      title: "Sustainable City",
      creator: "UrbanGreen",
      price: "89.3",
      rarity: "Legendary",
      rarityColor: "bg-yellow-500",
      likes: 578,
      views: 3201,
      image: "/futuristic-green-sustainable-city-digital-art.jpg",
      category: "Sustainable Living",
    },
    {
      id: "8",
      title: "Polar Bear Sanctuary",
      creator: "ArcticGuard",
      price: "36.4",
      rarity: "Rare",
      rarityColor: "bg-blue-500",
      likes: 223,
      views: 934,
      image: "/polar-bear-in-protected-arctic-sanctuary-digital-a.jpg",
      category: "Nature & Wildlife",
    },
  ]

  const toggleLike = (nftId: string) => {
    setLikedNFTs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nftId)) {
        newSet.delete(nftId)
      } else {
        newSet.add(nftId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {nfts.length} of 1,247 NFTs</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button variant="ghost" size="sm">
            Price: Low to High
          </Button>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <Image
                src={nft.image || "/placeholder.svg"}
                alt={nft.title}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Buy
                </Button>
              </div>

              {/* Rarity Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={`${nft.rarityColor} text-white`}>{nft.rarity}</Badge>
              </div>

              {/* Like Button */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/30"
                onClick={() => toggleLike(nft.id)}
              >
                <Heart className={`w-4 h-4 ${likedNFTs.has(nft.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Title and Creator */}
                <div>
                  <h3 className="font-semibold text-foreground text-lg truncate">{nft.title}</h3>
                  <p className="text-sm text-muted-foreground">by {nft.creator}</p>
                </div>

                {/* Category */}
                <Badge variant="outline" className="text-xs">
                  {nft.category}
                </Badge>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{nft.views}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Price and Buy Button */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Price</p>
                    <p className="text-lg font-bold text-foreground">{nft.price} BTN</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Buy Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg">
          Load More NFTs
        </Button>
      </div>
    </div>
  )
}
