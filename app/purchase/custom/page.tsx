"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { CustomPurchaseForm } from "@/components/purchase/custom-purchase-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CustomPurchasePage() {
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
        router.push("/auth")
      }
    } catch (error) {
      console.error("Error checking user:", error)
      router.push("/auth")
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
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link href="/pricing">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Pricing
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Token Purchase</h1>
              <p className="text-gray-600">Choose exactly how many tokens you need</p>
            </div>

            <CustomPurchaseForm />
          </div>
        </div>
      </main>
    </div>
  )
}
