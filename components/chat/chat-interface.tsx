"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Coins, Zap, Brain } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { User as UserType } from "@/lib/auth"
import { updateTestUserTokens } from "@/lib/auth"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  created_at: string
}

interface ChatInterfaceProps {
  user: UserType
  onTokenUpdate: (tokens: number) => void
}

export function ChatInterface({ user, onTokenUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [aiStatus, setAiStatus] = useState<"connected" | "intelligent" | "unknown">("unknown")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const loadMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setLoadingMessages(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    if (user.tokens <= 0) {
      toast({
        title: "No tokens remaining",
        description: "Please purchase more tokens to continue chatting.",
        variant: "destructive",
      })
      return
    }

    const userMessage = input.trim()
    setInput("")
    setLoading(true)

    // Add user message to UI immediately
    const tempUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      role: "user",
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, tempUserMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Update messages with actual data from server
      setMessages(data.messages)
      if (data.remainingTokens !== undefined) {
        onTokenUpdate(data.remainingTokens)
        // Update test user tokens if in test mode
        updateTestUserTokens(data.remainingTokens)
      }

      // Update AI status
      if (data.aiStatus) {
        setAiStatus(data.aiStatus)
      }

      if (data.remainingTokens <= 5) {
        toast({
          title: "Low tokens",
          description: `You have ${data.remainingTokens} tokens remaining.`,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      // Remove the temporary user message on error
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  if (loadingMessages) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Start a conversation with your ChatGem AI assistant!</p>
              <p className="text-sm mt-2">You have {user.tokens} tokens remaining.</p>
              <div className="mt-4">
                <Badge variant={aiStatus === "connected" ? "default" : "secondary"} className="text-xs">
                  {aiStatus === "connected" ? (
                    <>
                      <Zap className="h-3 w-3 mr-1" />
                      AI Ready
                    </>
                  ) : aiStatus === "intelligent" ? (
                    <>
                      <Brain className="h-3 w-3 mr-1" />
                      AI Active
                    </>
                  ) : (
                    <>
                      <Bot className="h-3 w-3 mr-1" />
                      AI Ready
                    </>
                  )}
                </Badge>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <Card className={`max-w-[80%] ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </CardContent>
                </Card>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-gray-100">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={user.tokens > 0 ? "Type your message..." : "No tokens remaining"}
            disabled={loading || user.tokens <= 0}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim() || user.tokens <= 0} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Coins className="h-4 w-4 mr-1" />
            {user.tokens} tokens remaining
          </span>
          <div className="flex items-center space-x-2">
            <span>1 message = 1 token</span>
            <Badge variant={aiStatus === "connected" ? "default" : "secondary"} className="text-xs">
              {aiStatus === "connected" ? (
                <>
                  <Zap className="h-3 w-3 mr-1" />
                  AI
                </>
              ) : aiStatus === "intelligent" ? (
                <>
                  <Brain className="h-3 w-3 mr-1" />
                  AI
                </>
              ) : (
                <>
                  <Bot className="h-3 w-3 mr-1" />
                  Ready
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
