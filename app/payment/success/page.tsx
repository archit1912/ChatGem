"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Coins, MessageSquare, Home, Gift } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [verifying, setVerifying] = useState(true)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get("order_id")
  const paymentId = searchParams.get("payment_id")

  useEffect(() => {
    if (orderId) {
      verifyPayment()
    } else {
      setError("No order ID found")
      setVerifying(false)
    }
  }, [orderId, paymentId])

  const verifyPayment = async () => {
    try {
      const response = await fetch("/api/payment/cashfree/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          paymentId,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setPaymentData(data)
        toast({
          title: "Payment Successful!",
          description: `${data.tokens} tokens have been added to your account.`,
        })
      } else {
        setError(data.error || "Payment verification failed")
      }
    } catch (error) {
      console.error("Payment verification error:", error)
      setError("Failed to verify payment")
    } finally {
      setVerifying(false)
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600 text-center">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Payment Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/pricing")} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>Your tokens have been added to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Payment Details */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="text-sm font-mono">{orderId}</span>
            </div>
            {paymentId && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment ID</span>
                <span className="text-sm font-mono">{paymentId}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <span className="font-medium">₹{paymentData?.payment?.payment_amount || 100}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tokens Added</span>
              <Badge variant="default" className="text-sm">
                <Coins className="h-3 w-3 mr-1" />
                {paymentData?.tokens?.toLocaleString() || "1,000"}
              </Badge>
            </div>
            {paymentData?.bonusTokens > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 flex items-center">
                  <Gift className="h-3 w-3 mr-1" />
                  Bonus Tokens
                </span>
                <Badge variant="secondary" className="text-sm text-green-600">
                  +{paymentData.bonusTokens.toLocaleString()}
                </Badge>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">New Balance</span>
                <Badge variant="outline" className="text-sm">
                  {paymentData?.newBalance?.toLocaleString() || "1,000"} tokens
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button onClick={() => router.push("/chat")} className="w-full" size="lg">
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Chatting
            </Button>
            <Button onClick={() => router.push("/dashboard")} variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Thank you for choosing ChatGem! Your tokens are ready to use.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
