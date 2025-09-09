"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, MessageSquare, Clock, TrendingUp, Zap, Search, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Ticket {
  id: string
  ticket_number: string
  subject: string
  description: string
  category: string
  priority: string
  status: string
  ai_sentiment_score: number
  ai_category_confidence: number
  created_at: string
  ticket_messages: Array<{
    id: string
    message: string
    is_ai_generated: boolean
    created_at: string
  }>
}

export function AISupportDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  })

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from("support_tickets")
        .select(`
          *,
          ticket_messages (
            id,
            message,
            is_ai_generated,
            created_at
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      setTickets(data || [])
    } catch (error) {
      console.error("Error fetching tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const createTicket = async () => {
    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      })

      if (response.ok) {
        setNewTicket({ subject: "", description: "", category: "general", priority: "medium" })
        fetchTickets()
      }
    } catch (error) {
      console.error("Error creating ticket:", error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "in_progress":
        return "bg-purple-500"
      case "waiting_response":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Support Center
          </h1>
          <p className="text-slate-400 mt-2">Intelligent support powered by advanced AI</p>
        </div>
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-purple-400" />
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">AI Online</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Tickets</p>
                <p className="text-2xl font-bold text-cyan-400">{tickets.filter((t) => t.status === "open").length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">AI Resolved</p>
                <p className="text-2xl font-bold text-purple-400">
                  {tickets.filter((t) => t.ticket_messages?.some((m) => m.is_ai_generated)).length}
                </p>
              </div>
              <Bot className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-green-400">2.3min</p>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Satisfaction</p>
                <p className="text-2xl font-bold text-orange-400">4.8/5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
            Support Tickets
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            Create Ticket
          </TabsTrigger>
          <TabsTrigger
            value="knowledge"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Knowledge Base
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search tickets..." className="pl-10 bg-slate-800/50 border-slate-700 text-white" />
            </div>
            <Select>
              <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{ticket.ticket_number}</h3>
                        <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>{ticket.priority}</Badge>
                        <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                          {ticket.status.replace("_", " ")}
                        </Badge>
                        {ticket.ai_category_confidence > 0.8 && (
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Analyzed
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-lg text-white mb-2">{ticket.subject}</h4>
                      <p className="text-slate-300 text-sm mb-3">{ticket.description.slice(0, 150)}...</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                        <span>Category: {ticket.category}</span>
                        {ticket.ai_sentiment_score !== null && (
                          <span>
                            Sentiment:{" "}
                            {ticket.ai_sentiment_score > 0 ? "😊" : ticket.ai_sentiment_score < 0 ? "😞" : "😐"}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </div>

                  {ticket.ticket_messages && ticket.ticket_messages.length > 0 && (
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{ticket.ticket_messages.length} response(s)</span>
                        {ticket.ticket_messages.some((m) => m.is_ai_generated) && (
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Responded
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-300">
                        Latest: {ticket.ticket_messages[0]?.message.slice(0, 100)}...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Support Ticket
              </CardTitle>
              <p className="text-slate-400">Our AI will analyze your ticket and provide instant assistance</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="mining">Mining</SelectItem>
                      <SelectItem value="nft">NFT</SelectItem>
                      <SelectItem value="trading">Trading</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Priority</label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Subject</label>
                <Input
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <Textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Please provide detailed information about your issue..."
                  className="bg-slate-700/50 border-slate-600 text-white min-h-32"
                />
              </div>

              <Button
                onClick={createTicket}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                disabled={!newTicket.subject || !newTicket.description}
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Ticket with AI Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <div className="text-center py-8">
            <Bot className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Knowledge Base</h3>
            <p className="text-slate-400">Search our comprehensive knowledge base with intelligent AI assistance</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
