"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])

  const categories = [
    { id: "nature", label: "Nature & Wildlife", count: 234 },
    { id: "renewable", label: "Renewable Energy", count: 156 },
    { id: "ocean", label: "Ocean Conservation", count: 189 },
    { id: "forest", label: "Forest Protection", count: 145 },
    { id: "climate", label: "Climate Action", count: 198 },
    { id: "sustainable", label: "Sustainable Living", count: 167 },
  ]

  const rarities = [
    { id: "common", label: "Common", count: 456, color: "bg-gray-500" },
    { id: "uncommon", label: "Uncommon", count: 234, color: "bg-green-500" },
    { id: "rare", label: "Rare", count: 123, color: "bg-blue-500" },
    { id: "epic", label: "Epic", count: 67, color: "bg-purple-500" },
    { id: "legendary", label: "Legendary", count: 23, color: "bg-yellow-500" },
  ]

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleRarity = (rarityId: string) => {
    setSelectedRarities((prev) =>
      prev.includes(rarityId) ? prev.filter((id) => id !== rarityId) : [...prev, rarityId],
    )
  }

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Price Range (BTN)</h4>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{priceRange[0]} BTN</span>
              <span>{priceRange[1]} BTN</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label htmlFor={category.id} className="text-sm text-foreground cursor-pointer">
                    {category.label}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Rarity */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Rarity</h4>
          <div className="space-y-2">
            {rarities.map((rarity) => (
              <div key={rarity.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={rarity.id}
                    checked={selectedRarities.includes(rarity.id)}
                    onCheckedChange={() => toggleRarity(rarity.id)}
                  />
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${rarity.color}`} />
                    <label htmlFor={rarity.id} className="text-sm text-foreground cursor-pointer">
                      {rarity.label}
                    </label>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {rarity.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            setSelectedCategories([])
            setSelectedRarities([])
            setPriceRange([0, 1000])
          }}
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
