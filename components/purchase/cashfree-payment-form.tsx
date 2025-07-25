"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Smartphone, Building2, Wallet, Gift } from "lucide-react"
import { config } from "@/lib/config"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/supabase"

interface CashfreePaymentFormProps {
  plan: {
    name: string
    price: number
    tokens: number
    popular?: boolean
  }
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function CashfreePaymentForm({ plan, onSuccess, onError }: CashfreePaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [sdkReady, setSdkReady] = useState(false)

  // Calculate bonus tokens
  const bonusTokens =
    plan.price >= config.pricing.bonusThreshold ? Math.floor(plan.tokens * (config.pricing.bonusPercentage / 100)) : 0
  const totalTokens = plan.tokens + bonusTokens

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        console.log("Current user in payment form:", currentUser)
        setUser(currentUser)
        if (!currentUser) {
          setError("Please sign in to continue with payment")
        }
      } catch (err) {
        console.error("Auth check error:", err)
        setError("Authentication error. Please try signing in again.")
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Load Cashfree SDK
    const loadCashfreeSDK = () => {
      if (typeof window === "undefined") return

      // Check if SDK is already loaded
      if (window.Cashfree) {
        setSdkReady(true)
        return
      }

      const script = document.createElement("script")
      script.src =
        config.cashfree.environment === "PRODUCTION"
          ? "https://sdk.cashfree.com/js/v3/cashfree.js"
          : "https://sdk.cashfree.com/js/v3/cashfree.sandbox.js"

      script.onload = () => {
        console.log("Cashfree SDK loaded successfully")
        setSdkReady(true)
      }

      script.onerror = () => {
        console.error("Failed to load Cashfree SDK")
        setError("Failed to load payment gateway. Please refresh and try again.")
      }

      document.head.appendChild(script)
    }

    loadCashfreeSDK()
  }, [])

  const handlePayment = async () => {
    if (!user) {
      setError("Please sign in to continue")
      return
    }

    if (!sdkReady && !config.testMode) {
      setError("Payment gateway is not ready. Please wait and try again.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Starting payment process for:", { plan, user: user.email })

      // Create order
      const orderResponse = await fetch("/api/payment/cashfree/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.price,
          tokens: totalTokens,
          plan: plan.name.toLowerCase(),
        }),
      })

      const orderData = await orderResponse.json()
      console.log("Order creation response:", orderData)

      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Failed to create payment order")
      }

      // In test mode, simulate payment success
      if (config.testMode) {
        console.log("🧪 Test mode - simulating payment success")

        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Redirect to success page with order details
        const successUrl = `/payment/success?order_id=${orderData.order_id}&status=SUCCESS&amount=${plan.price}&tokens=${totalTokens}`
        window.location.href = successUrl
        return
      }

      // Production payment with Cashfree SDK
      if (!window.Cashfree) {
        throw new Error("Cashfree SDK not loaded")
      }

      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        returnUrl: `${config.app.url}/payment/success?order_id=${orderData.order_id}`,
        theme: {
          backgroundColor: "#ffffff",
          primaryColor: "#3b82f6",
          primaryTextColor: "#ffffff",
        },
        onSuccess: (data: any) => {
          console.log("Payment successful:", data)
          onSuccess?.()
          window.location.href = `/payment/success?order_id=${data.order_id}&status=SUCCESS`
        },
        onFailure: (data: any) => {
          console.log("Payment failed:", data)
          setError(data.error?.message || "Payment failed. Please try again.")
          onError?.(data.error?.message || "Payment failed")
        },
      }

      console.log("Opening Cashfree checkout with options:", checkoutOptions)
      window.Cashfree.checkout(checkoutOptions)
    } catch (err) {
      console.error("Payment error:", err)
      const errorMessage = err instanceof Error ? err.message : "Payment failed. Please try again."
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Authentication Required</CardTitle>
          <CardDescription className="text-center">Please sign in to continue with your purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => (window.location.href = "/auth")}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{plan.name} Plan</CardTitle>
          {plan.popular && <Badge variant="secondary">Popular</Badge>}
        </div>
        <CardDescription>Complete your purchase to get {totalTokens.toLocaleString()} tokens</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Signed in as:</p>
          <p className="font-medium">{user.email}</p>
          <p className="text-sm text-gray-600">Current tokens: {user.tokens}</p>
        </div>

        {/* Order Summary */}
        <div className="space-y-3">
          <h3 className="font-semibold">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base tokens:</span>
              <span>{plan.tokens.toLocaleString()}</span>
            </div>

            {bonusTokens > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  Bonus tokens ({config.pricing.bonusPercentage}%):
                </span>
                <span>+{bonusTokens.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total tokens:</span>
              <span>{totalTokens.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Amount:</span>
              <span>₹{plan.price}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="font-semibold">Payment Methods</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <CreditCard className="h-4 w-4" />
              <span>Cards</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Smartphone className="h-4 w-4" />
              <span>UPI</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Building2 className="h-4 w-4" />
              <span>Net Banking</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Wallet className="h-4 w-4" />
              <span>Wallets</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Test Mode Banner */}
        {config.testMode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">🧪 Test Mode: This is a simulated payment for development</p>
          </div>
        )}

        {/* Pay Button */}
        <Button onClick={handlePayment} disabled={loading || !!error} className="w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {config.testMode ? "Processing..." : "Opening Payment Gateway..."}
            </>
          ) : (
            `Pay ₹${plan.price}`
          )}
        </Button>

        {/* Security Note */}
        <p className="text-xs text-gray-500 text-center">🔒 Secure payment powered by Cashfree</p>
      </CardContent>
    </Card>
  )
}

// Extend Window interface for Cashfree SDK
declare global {
  interface Window {
    Cashfree: {
      checkout: (options: any) => void
    }
  }
}
