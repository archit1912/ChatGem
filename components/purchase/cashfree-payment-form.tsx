"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Smartphone, Building2, Wallet, Gift, Loader2, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { config } from "@/lib/config"

interface CashfreePaymentFormProps {
  amount: number
  tokens: number
  planName?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

// Declare Cashfree global object
declare global {
  interface Window {
    Cashfree: {
      checkout: (options: any) => void
    }
  }
}

export function CashfreePaymentForm({ amount, tokens, planName, onSuccess, onError }: CashfreePaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false)

  // Safe calculations with fallbacks
  const safeAmount = Math.max(0, amount || 0)
  const safeTokens = Math.max(0, tokens || 0)
  const bonusTokens = safeAmount >= 500 ? Math.floor(safeTokens * 0.1) : 0
  const totalTokens = safeTokens + bonusTokens

  // Load Cashfree SDK
  useEffect(() => {
    const loadCashfreeSDK = () => {
      if (window.Cashfree) {
        setCashfreeLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src =
        config.cashfree.environment === "PRODUCTION"
          ? "https://sdk.cashfree.com/js/v3/cashfree.js"
          : "https://sdk.cashfree.com/js/v3/cashfree.sandbox.js"

      script.onload = () => {
        setCashfreeLoaded(true)
        console.log("Cashfree SDK loaded successfully")
      }

      script.onerror = () => {
        setError("Failed to load payment gateway")
        console.error("Failed to load Cashfree SDK")
      }

      document.head.appendChild(script)
    }

    loadCashfreeSDK()
  }, [])

  const handlePayment = async () => {
    if (safeAmount <= 0 || safeTokens <= 0) {
      setError("Invalid amount or tokens")
      return
    }

    if (!cashfreeLoaded) {
      setError("Payment gateway is loading. Please try again.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create order
      const response = await fetch("/api/payment/cashfree/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: safeAmount,
          tokens: totalTokens,
          plan_name: planName || "Token Purchase",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please sign in to continue with payment")
        }
        throw new Error(data.details || data.error || "Payment failed")
      }

      if (!data.success || !data.payment_session_id) {
        throw new Error("Failed to create payment session")
      }

      console.log("Payment session created:", data)

      // Initialize Cashfree checkout
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        returnUrl: `${config.app.url}/payment/success?order_id=${data.order_id}`,
        theme: {
          backgroundColor: "#ffffff",
          primaryColor: "#3b82f6",
          primaryTextColor: "#ffffff",
        },
        onSuccess: (data: any) => {
          console.log("Payment successful:", data)
          toast({
            title: "Payment Successful!",
            description: "Your tokens will be added shortly.",
          })
          // Redirect to success page
          window.location.href = `/payment/success?order_id=${data.order_id}&payment_id=${data.payment_id}`
        },
        onFailure: (data: any) => {
          console.error("Payment failed:", data)
          setError(data.error_description || "Payment failed")
          toast({
            title: "Payment Failed",
            description: data.error_description || "Please try again",
            variant: "destructive",
          })
        },
        onClose: () => {
          console.log("Payment popup closed")
          setIsLoading(false)
        },
      }

      // Open Cashfree checkout
      window.Cashfree.checkout(checkoutOptions)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed"
      setError(errorMessage)
      onError?.(errorMessage)

      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          Cashfree Payment
        </CardTitle>
        <CardDescription>
          Secure payment powered by Cashfree
          {!cashfreeLoaded && <span className="block text-xs text-orange-600 mt-1">Loading payment gateway...</span>}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="font-semibold">₹{safeAmount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Base Tokens</span>
            <span>{safeTokens.toLocaleString()} tokens</span>
          </div>

          {bonusTokens > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm flex items-center gap-1">
                <Gift className="h-3 w-3" />
                Bonus (10%)
              </span>
              <span>+{bonusTokens.toLocaleString()} tokens</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between items-center font-semibold">
            <span>Total Tokens</span>
            <Badge variant="secondary" className="text-base">
              {totalTokens.toLocaleString()} tokens
            </Badge>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Supported Payment Methods</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <CreditCard className="h-3 w-3" />
              Cards
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-3 w-3" />
              UPI
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-3 w-3" />
              Net Banking
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-3 w-3" />
              Wallets
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={isLoading || !cashfreeLoaded || safeAmount <= 0 || safeTokens <= 0}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : !cashfreeLoaded ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading Gateway...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ₹{safeAmount}
            </>
          )}
        </Button>

        {/* Security Note */}
        <p className="text-xs text-gray-500 text-center">
          🔒 Secured by 256-bit SSL encryption. Your payment information is safe.
        </p>

        {/* Environment Info */}
        {config.cashfree.environment === "SANDBOX" && (
          <div className="text-xs text-center p-2 bg-yellow-50 border border-yellow-200 rounded">
            <span className="text-yellow-700">🧪 Sandbox Mode - Use test cards for payment</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
