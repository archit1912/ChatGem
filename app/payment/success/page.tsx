"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, ArrowRight, Home, MessageSquare } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface PaymentResult {
  success: boolean
  payment_status: string
  tokens_added: number
  payment_id: string
  order_id: string
  error?: string
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [verificationResult, setVerificationResult] = useState<PaymentResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(true)

  const orderId = searchParams.get("order_id")
  const paymentId = searchParams.get("payment_id")

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        setVerificationResult({
          success: false,
          payment_status: "FAILED",
          tokens_added: 0,
          payment_id: "",
          order_id: "",
          error: "Missing order ID",
        })
        setIsVerifying(false)
        return
      }

      try {
        console.log("Verifying payment:", { orderId, paymentId })

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

        const result = await response.json()
        console.log("Verification result:", result)

        setVerificationResult(result)

        if (result.success) {
          toast({
            title: "Payment Successful!",
            description: `${result.tokens_added} tokens have been added to your account.`,
          })
        } else {
          toast({
            title: "Payment Verification Failed",
            description: result.error || "Please contact support if you were charged.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setVerificationResult({
          success: false,
          payment_status: "FAILED",
          tokens_added: 0,
          payment_id: "",
          order_id: orderId,
          error: "Verification failed",
        })

        toast({
          title: "Verification Error",
          description: "Unable to verify payment. Please contact support.",
          variant: "destructive",
        })
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [orderId, paymentId])

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <h2 className="text-lg font-semibold mb-2">Verifying Payment</h2>
            <p className="text-sm text-gray-600 text-center">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isSuccess = verificationResult?.success && verificationResult?.payment_status === "SUCCESS"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isSuccess ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className={isSuccess ? "text-green-700" : "text-red-700"}>
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </CardTitle>
          <CardDescription>
            {isSuccess ? "Your tokens have been added to your account" : "There was an issue with your payment"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="text-sm font-mono">{verificationResult?.order_id}</span>
            </div>

            {verificationResult?.payment_id && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment ID</span>
                <span className="text-sm font-mono">{verificationResult.payment_id}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <Badge variant={isSuccess ? "default" : "destructive"}>
                {verificationResult?.payment_status || "UNKNOWN"}
              </Badge>
            </div>

            {isSuccess && verificationResult?.tokens_added > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tokens Added</span>
                <Badge variant="secondary" className="text-base">
                  +{verificationResult.tokens_added.toLocaleString()} tokens
                </Badge>
              </div>
            )}
          </div>

          {/* Error Message */}
          {!isSuccess && verificationResult?.error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{verificationResult.error}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {isSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your payment has been processed successfully and tokens have been added to your account.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isSuccess ? (
              <>
                <Link href="/chat">
                  <Button className="w-full" size="lg">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chatting
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Home className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/pricing">
                  <Button className="w-full" size="lg">
                    Try Again
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Support
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Support Note */}
          <p className="text-xs text-gray-500 text-center">
            If you have any issues, please contact our support team with your order ID.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
