"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { CustomPurchaseForm } from "@/components/purchase/custom-purchase-form"
import { CashfreePaymentForm } from "@/components/purchase/cashfree-payment-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = {
  starter: { name: "Starter", price: 50, tokens: 500 },
  popular: { name: "Popular", price: 100, tokens: 1000 },
  premium: { name: "Premium", price: 500, tokens: 5500 },
  enterprise: { name: "Enterprise", price: 1000, tokens: 11000 },
}

function PurchaseContent() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get("plan")

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

  const selectedPlan = planId && plans[planId as keyof typeof plans] ? plans[planId as keyof typeof plans] : null

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Tokens</h1>
              <p className="text-gray-600">Add tokens to your ChatGem account</p>
            </div>

            {selectedPlan ? (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Plan: {selectedPlan.name}</CardTitle>
                  <CardDescription>
                    {selectedPlan.tokens.toLocaleString()} tokens for ₹{selectedPlan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CashfreePaymentForm amount={selectedPlan.price} tokens={selectedPlan.tokens} />
                </CardContent>
              </Card>
            ) : (
              <CustomPurchaseForm />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PurchasePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <PurchaseContent />
    </Suspense>
  )
}
