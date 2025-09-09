"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Award, Edit, Save, X } from "lucide-react"

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
  website: string
  location: string
  reputation_score: number
  level: number
  total_earnings: number
  mining_power: number
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editForm, setEditForm] = useState({
    display_name: "",
    bio: "",
    website: "",
    location: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error) throw error
      setProfile(data)
      setEditForm({
        display_name: data.display_name || "",
        bio: data.bio || "",
        website: data.website || "",
        location: data.location || "",
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    const supabase = createClient()
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: editForm.display_name,
          bio: editForm.bio,
          website: editForm.website,
          location: editForm.location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (error) throw error

      setProfile({ ...profile, ...editForm })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const getLevelBadge = (level: number) => {
    if (level >= 10) return { label: "Elite", color: "bg-purple-500" }
    if (level >= 5) return { label: "Advanced", color: "bg-blue-500" }
    if (level >= 2) return { label: "Intermediate", color: "bg-green-500" }
    return { label: "Beginner", color: "bg-gray-500" }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <p className="text-white">Profile not found</p>
      </div>
    )
  }

  const levelBadge = getLevelBadge(profile.level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {profile.display_name?.[0] || profile.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">{profile.display_name || profile.username}</h1>
                    <p className="text-gray-400">@{profile.username}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={levelBadge.color}>{levelBadge.label}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="border-gray-600"
                    >
                      {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profile.level}</p>
                    <p className="text-sm text-gray-400">Level</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profile.reputation_score.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Reputation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">${Number(profile.total_earnings).toFixed(2)}</p>
                    <p className="text-sm text-gray-400">Earnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{profile.mining_power}</p>
                    <p className="text-sm text-gray-400">Mining Power</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="display_name" className="text-gray-300">
                        Display Name
                      </Label>
                      <Input
                        id="display_name"
                        value={editForm.display_name}
                        onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-gray-300">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        className="bg-gray-700/50 border-gray-600 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-gray-300">
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        className="bg-gray-700/50 border-gray-600 text-white"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-gray-300">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="bg-gray-700/50 border-gray-600 text-white"
                        placeholder="City, Country"
                      />
                    </div>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Bio</h4>
                      <p className="text-white">{profile.bio || "No bio provided"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Website</h4>
                      <p className="text-white">{profile.website || "No website provided"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Location</h4>
                      <p className="text-white">{profile.location || "No location provided"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Member Since</h4>
                      <p className="text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Activity feed coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "First Steps", description: "Complete your first action", earned: true },
                    { name: "Miner", description: "Mine 100 BTN tokens", earned: true },
                    { name: "Trader", description: "Complete 10 trades", earned: false },
                    { name: "Staker", description: "Stake tokens for 30 days", earned: false },
                    { name: "Voter", description: "Vote on 5 proposals", earned: false },
                    { name: "Community Leader", description: "Reach level 10", earned: false },
                  ].map((achievement, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border ${
                        achievement.earned ? "bg-primary/20 border-primary/50" : "bg-gray-700/30 border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Award className={`h-5 w-5 ${achievement.earned ? "text-primary" : "text-gray-400"}`} />
                        <h4 className={`font-medium ${achievement.earned ? "text-primary" : "text-gray-300"}`}>
                          {achievement.name}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
