"use client"

import { useState, useEffect } from "react"
import { PublicHeader } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { PricingSection } from "@/components/pricing/pricing-section"
import { FAQSection } from "@/components/pricing/faq-section"
import { getCurrentUser, type User } from "@/lib/auth"
import { Header } from "@/components/layout/header"

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error checking user:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {user ? <Header user={user} /> : <PublicHeader />}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your ChatGem Plan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get more tokens to unlock unlimited conversations with your AI assistant
            </p>
          </div>
          <PricingSection />
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
