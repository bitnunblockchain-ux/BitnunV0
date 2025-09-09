"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Send, Users, Settings } from "lucide-react"

interface ChatMessage {
  id: number
  user: string
  message: string
  timestamp: string
  role: string
}

interface OnlineUser {
  name: string
  status: string
  role: string
}

export function LiveChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [channels, setChannels] = useState([
    { name: "General", members: 1247, active: true },
    { name: "Development", members: 456, active: false },
    { name: "Trading", members: 789, active: false },
    { name: "Support", members: 234, active: false },
    { name: "Announcements", members: 2156, active: false },
  ])

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const supabase = createClient()

        // Fetch recent chat messages
        const { data: chatData } = await supabase
          .from("chat_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20)

        if (chatData) {
          const formattedMessages = chatData.map((msg, index) => ({
            id: index + 1,
            user: msg.username || `User${msg.user_id?.slice(-4)}`,
            message: msg.message,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            role: msg.role || "Member",
          }))
          setMessages(formattedMessages)
        }

        // Fetch online users
        const { data: usersData } = await supabase
          .from("profiles")
          .select("username, status, role")
          .eq("status", "online")
          .limit(10)

        if (usersData) {
          const formattedUsers = usersData.map((user) => ({
            name: user.username || `User${Math.random().toString(36).substr(2, 4)}`,
            status: user.status || "online",
            role: user.role || "Member",
          }))
          setOnlineUsers(formattedUsers)
        }
      } catch (error) {
        // Fallback to sample data if database queries fail
        setMessages([
          {
            id: 1,
            user: "EcoWarrior",
            message: "Just hit 1000 BTN from action mining! 🎉",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            role: "Member",
          },
          {
            id: 2,
            user: "DevMaster",
            message: "Nice! The new optimization really helps with mining efficiency",
            timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            role: "Moderator",
          },
        ])

        setOnlineUsers([
          { name: "EcoWarrior", status: "online", role: "Member" },
          { name: "DevMaster", status: "online", role: "Moderator" },
        ])
      }
    }

    fetchChatData()
  }, [])

  const generateAvatar = (username: string) => {
    const colors = [
      "from-emerald-500 to-teal-500",
      "from-cyan-500 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
    ]
    const colorIndex = username.charCodeAt(0) % colors.length
    return colors[colorIndex]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Channels Sidebar */}
      <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Channels</h3>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {channels.map((channel, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                channel.active
                  ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-sm font-medium"># {channel.name}</span>
              <Badge variant="secondary" className="text-xs">
                {channel.members}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Chat Area */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white"># General</h3>
              <Badge variant="secondary" className="text-xs">
                {channels[0].members.toLocaleString()} members
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>{onlineUsers.length} online</span>
            </div>
          </div>

          <div className="h-96 overflow-y-auto space-y-3 mb-4 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${generateAvatar(msg.user)} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {msg.user.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{msg.user}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        msg.role === "Moderator"
                          ? "border-emerald-500 text-emerald-600"
                          : msg.role === "VIP"
                            ? "border-purple-500 text-purple-600"
                            : msg.role === "Bot"
                              ? "border-blue-500 text-blue-600"
                              : "border-gray-500 text-gray-600"
                      }`}
                    >
                      {msg.role}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setMessage("")
                }
              }}
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Online Users Sidebar */}
      <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Online Users</h3>
        <div className="space-y-3">
          {onlineUsers.map((user, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${generateAvatar(user.name)} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                >
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
