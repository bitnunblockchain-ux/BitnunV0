"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Zap } from "lucide-react"

export function CreateNFTForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    rarity: "",
    price: "",
    royalty: "5",
    supply: "1",
  })

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const categories = [
    "Nature & Wildlife",
    "Renewable Energy",
    "Ocean Conservation",
    "Forest Protection",
    "Climate Action",
    "Sustainable Living",
  ]

  const rarities = [
    { value: "common", label: "Common", color: "bg-gray-500" },
    { value: "uncommon", label: "Uncommon", color: "bg-green-500" },
    { value: "rare", label: "Rare", color: "bg-blue-500" },
    { value: "epic", label: "Epic", color: "bg-purple-500" },
    { value: "legendary", label: "Legendary", color: "bg-yellow-500" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle NFT creation logic here
    console.log("Creating NFT:", formData, uploadedFile)
  }

  const estimatedGas = 0.05
  const creationFee = 2.5

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Upload Artwork</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!previewUrl ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Upload your artwork</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (typeof document !== "undefined") {
                            const fileInput = document.getElementById("file-upload")
                            if (fileInput) {
                              fileInput.click()
                            }
                          }
                        }}
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setPreviewUrl("")
                        setUploadedFile(null)
                      }}
                    >
                      Change
                    </Button>
                  </div>
                )}
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </CardContent>
          </Card>

          {/* NFT Details */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">NFT Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter NFT name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your NFT and its eco-friendly message"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rarity">Rarity *</Label>
                  <Select
                    value={formData.rarity}
                    onValueChange={(value) => setFormData({ ...formData, rarity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {rarities.map((rarity) => (
                        <SelectItem key={rarity.value} value={rarity.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${rarity.color}`} />
                            <span>{rarity.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (BTN) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="royalty">Royalty (%)</Label>
                  <Input
                    id="royalty"
                    type="number"
                    min="0"
                    max="20"
                    value={formData.royalty}
                    onChange={(e) => setFormData({ ...formData, royalty: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="supply">Supply</Label>
                  <Input
                    id="supply"
                    type="number"
                    min="1"
                    value={formData.supply}
                    onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">{formData.name || "Untitled NFT"}</h3>
                  <p className="text-sm text-muted-foreground">{formData.description || "No description"}</p>
                </div>

                {formData.category && <Badge variant="outline">{formData.category}</Badge>}

                {formData.price && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-lg font-bold text-foreground">{formData.price} BTN</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gas Fee</span>
                <span className="text-foreground">{estimatedGas} BTN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="text-foreground">{creationFee} BTN</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total Cost</span>
                  <span className="text-foreground">{(estimatedGas + creationFee).toFixed(2)} BTN</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!formData.name || !formData.category || !formData.rarity || !formData.price || !uploadedFile}
          >
            <Zap className="w-4 h-4 mr-2" />
            Create NFT
          </Button>
        </div>
      </div>
    </form>
  )
}
