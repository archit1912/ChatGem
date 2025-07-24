"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { ChatInterface } from "@/components/chat/chat-interface"
import { getCurrentUser, type User } from "@/lib/auth"
import { redirect } from "next/navigation"

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      redirect("/auth")
    } else {
      setUser(currentUser)
      setLoading(false)
    }
  }, [])

  const handleTokenUpdate = (newTokens: number) => {
    if (user) {
      setUser({ ...user, tokens: newTokens })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header user={user} />
      <div className="flex-1 flex flex-col">
        <ChatInterface user={user} onTokenUpdate={handleTokenUpdate} />
      </div>
    </div>
  )
}
