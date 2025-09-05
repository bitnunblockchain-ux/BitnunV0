"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp } from "lucide-react"

export function MarketplaceHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">Discover and trade eco-themed NFTs</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create NFT</span>
          </Button>
        </div>
      </div>

      {/* Search and Quick Stats */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search NFTs, creators, collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Total Volume:</span>
            <Badge variant="secondary">45,231 BTN</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Active NFTs:</span>
            <Badge variant="secondary">1,247</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
