"use client"

import { useEffect, useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        router.push("/dashboard")
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error checking user:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <AuthForm />
}
