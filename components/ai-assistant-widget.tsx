"use client"

import { useState } from "react"
import { useChat } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, X, Send, User } from "lucide-react"

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg z-50"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-50">
          <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-sm h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-sm text-purple-400">BitnunEco AI</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-3">
              <ScrollArea className="flex-1 mb-3 p-2 bg-slate-900/50 rounded">
                <div className="space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-slate-400 py-4">
                      <Bot className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                      <p className="text-xs">Hi! I'm your AI assistant. How can I help?</p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-2 max-w-[85%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`p-1 rounded-full ${message.role === "user" ? "bg-blue-600" : "bg-purple-600"}`}
                        >
                          {message.role === "user" ? (
                            <User className="h-3 w-3 text-white" />
                          ) : (
                            <Bot className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-2 rounded-lg text-xs ${
                            message.role === "user"
                              ? "bg-blue-600/20 border border-blue-500/30 text-white"
                              : "bg-slate-700/50 border border-slate-600 text-slate-200"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="p-1 rounded-full bg-purple-600">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <div className="p-2 rounded-lg bg-slate-700/50 border border-slate-600">
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <div className="animate-spin h-3 w-3 border border-purple-400 border-t-transparent rounded-full"></div>
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
                  placeholder="Ask me anything..."
                  className="flex-1 h-8 text-xs bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className="h-8 w-8 p-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
