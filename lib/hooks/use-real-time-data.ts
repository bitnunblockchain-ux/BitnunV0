"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  reputation_score: number
  level: number
  total_earnings: number
  mining_power: number
  username: string | null
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  website: string | null
  location: string | null
  created_at: string
  updated_at: string
}

interface MiningStats {
  hashRate: number
  blocksFound: number
  totalRewards: number
  activePeers: number
  networkDifficulty: number
}

export function useRealTimeProfile(userId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    let channel: RealtimeChannel

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel(`profile-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${userId}`,
          },
          (payload) => {
            if (payload.eventType === "UPDATE" && payload.new) {
              setProfile(payload.new as UserProfile)
            }
          },
        )
        .subscribe()
    }

    fetchProfile()
    setupRealtimeSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [userId, supabase])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userId) return

    try {
      const { error } = await supabase.from("profiles").update(updates).eq("id", userId)

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    }
  }

  return { profile, loading, error, updateProfile }
}

export function useRealTimeMiningStats() {
  const [stats, setStats] = useState<MiningStats>({
    hashRate: 0,
    blocksFound: 0,
    totalRewards: 0,
    activePeers: 0,
    networkDifficulty: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchMiningStats = async () => {
      try {
        const { data, error } = await supabase
          .from("mining_stats")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (error) {
          setStats({
            hashRate: 45.2,
            blocksFound: 12,
            totalRewards: 1247.89,
            activePeers: 1240,
            networkDifficulty: 15420000,
          })
        } else {
          setStats(data)
        }
      } catch (err) {
        setStats({
          hashRate: 45.2,
          blocksFound: 12,
          totalRewards: 1247.89,
          activePeers: 1240,
          networkDifficulty: 15420000,
        })
      } finally {
        setLoading(false)
      }
    }

    const channel = supabase
      .channel("mining-stats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "mining_stats",
        },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new) {
            setStats(payload.new as MiningStats)
          }
        },
      )
      .subscribe()

    fetchMiningStats()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return { stats, loading }
}

export function useRealTimeActivities(userId?: string) {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const query = supabase.from("user_activities").select("*").order("created_at", { ascending: false }).limit(10)

        if (userId) {
          query.eq("user_id", userId)
        }

        const { data, error } = await query

        if (error) {
          const mockActivities = [
            {
              id: "1",
              user_id: userId || "anonymous",
              type: "mining",
              title: "Mining Reward",
              description: "Block #45,231 mined",
              amount: "+0.45 BTN",
              time: "2 min ago",
              created_at: new Date().toISOString(),
            },
            {
              id: "2",
              user_id: userId || "anonymous",
              type: "purchase",
              title: "NFT Purchase",
              description: "Green Forest #123",
              amount: "-15.0 BTN",
              time: "1 hour ago",
              created_at: new Date(Date.now() - 3600000).toISOString(),
            },
          ]
          setActivities(mockActivities)
        } else {
          setActivities(data || [])
        }
      } catch (err) {
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    const channel = supabase
      .channel(`activities-${userId || "global"}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_activities",
          filter: userId ? `user_id=eq.${userId}` : undefined,
        },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new) {
            setActivities((prev) => [payload.new as any, ...prev.slice(0, 9)])
          }
        },
      )
      .subscribe()

    fetchActivities()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  return { activities, loading }
}
