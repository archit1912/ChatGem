"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Coins, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState("")

  const orderId = searchParams.get("order_id")
  const paymentId = searchParams.get("payment_id")

  useEffect(() => {
    if (orderId && paymentId) {
      verifyPayment()
    } else {
      setVerifying(false)
      setVerified(true) // For demo purposes
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
          order_id: orderId,
          payment_id: paymentId,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setVerified(true)
      } else {
        setError(data.error || "Payment verification failed")
      }
    } catch (error) {
      setError("Failed to verify payment")
    } finally {
      setVerifying(false)
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Verifying your payment...</p>
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
            <CardTitle className="text-red-600">Payment Verification Failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
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
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>Your tokens have been added to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Coins className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold">Tokens Added</span>
            </div>
            <p className="text-sm text-gray-600">Your tokens are now available in your account</p>
          </div>

          {orderId && (
            <div className="text-center text-sm text-gray-500">
              <p>Order ID: {orderId}</p>
              {paymentId && <p>Payment ID: {paymentId}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/chat">
                Start Chatting
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
