"use client"

import { useEffect, useState } from "react"
import { PurchaseForm } from "@/components/purchase/purchase-form"
import { Header } from "@/components/layout/header"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Script from "next/script"

export default function PurchasePage() {
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
        setUser(currentUser)
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Error checking user:", error)
      router.push("/")
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

  if (!user) {
    return null
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex flex-col min-h-screen">
        <Header user={user} />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Tokens</h1>
              <p className="text-gray-600">Get more tokens to continue your AI conversations</p>
            </div>
            <PurchaseForm />
          </div>
        </main>
      </div>
    </>
  )
}
