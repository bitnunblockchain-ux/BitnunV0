"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, Zap, TrendingUp, Wallet, Code } from "lucide-react"

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Array<{ id: string; role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm here to help with your blockchain operations. This is a placeholder response while the AI integration is being configured.",
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const [activeTools, setActiveTools] = useState<string[]>([])

  const quickActions = [
    { icon: Wallet, label: "Check Balance", prompt: "Check my wallet balance" },
    { icon: TrendingUp, label: "Portfolio Analysis", prompt: "Analyze my portfolio performance" },
    { icon: Zap, label: "Execute Trade", prompt: "Help me execute a trade" },
    { icon: Code, label: "Deploy Contract", prompt: "Help me deploy a smart contract" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BitnunEco AI Assistant
              </h1>
              <p className="text-slate-400 text-lg">Your intelligent blockchain companion</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-purple-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
                    onClick={() => setInput(action.prompt)}
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-400">Active Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-green-600">Wallet Manager</Badge>
                  <Badge className="bg-blue-600">Trading Engine</Badge>
                  <Badge className="bg-purple-600">Smart Contracts</Badge>
                  <Badge className="bg-orange-600">Analytics</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-blue-400">AI Chat Interface</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 mb-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center text-slate-400 py-8">
                        <Bot className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                        <p className="text-lg font-medium">Welcome to BitnunEco AI Assistant!</p>
                        <p className="text-sm">
                          Ask me anything about your blockchain operations, trading, or DeFi activities.
                        </p>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full ${message.role === "user" ? "bg-blue-600" : "bg-purple-600"}`}
                          >
                            {message.role === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.role === "user"
                                ? "bg-blue-600/20 border border-blue-500/30"
                                : "bg-slate-700/50 border border-slate-600"
                            }`}
                          >
                            <div className="text-white whitespace-pre-wrap">{message.content}</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="p-2 rounded-full bg-purple-600">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                          <div className="flex items-center gap-2 text-slate-400">
                            <div className="animate-spin h-4 w-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                            Thinking...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything about your blockchain operations..."
                    className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
