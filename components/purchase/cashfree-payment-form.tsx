"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Coins, Smartphone, Shield, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CashfreePaymentFormProps {
  amount: number
  tokens: number
  planName?: string
  features?: string[]
}

export function CashfreePaymentForm({ amount, tokens, planName, features }: CashfreePaymentFormProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create Cashfree order
      const response = await fetch("/api/payment/cashfree/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          tokens: tokens,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      // In test mode, simulate successful payment
      if (data.order_id?.startsWith("CF_ORDER_")) {
        toast({
          title: "Payment Successful! 🎉",
          description: `${tokens} tokens have been added to your account.`,
        })

        // Redirect to dashboard after successful payment
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
        return
      }

      // In production, redirect to Cashfree payment page
      if (data.payment_link) {
        window.location.href = data.payment_link
      } else {
        throw new Error("No payment link received")
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Zap className="h-5 w-5 mr-2 text-blue-600" />
            {planName || "Token Purchase"}
          </CardTitle>
          <CardDescription>Secure payment with Cashfree</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">₹{amount}</div>
              <Badge className="mt-2">
                <Coins className="h-3 w-3 mr-1" />
                {tokens.toLocaleString()} tokens
              </Badge>
            </div>
            {features && (
              <ul className="space-y-2 text-sm">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Payment Method</h3>

            <Button className="w-full justify-between h-12" onClick={handlePayment} disabled={loading}>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay ₹{amount} with Cashfree
              </div>
              <Badge variant="secondary" className="text-xs">
                Secure
              </Badge>
            </Button>
          </div>

          {/* Payment Features */}
          <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
            <div className="flex flex-col items-center space-y-1">
              <Shield className="h-4 w-4" />
              <span>Secure</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Zap className="h-4 w-4" />
              <span>Instant</span>
            </div>
          </div>

          {/* Supported Payment Methods */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Supported Payment Methods</p>
            <div className="flex justify-center space-x-2 text-xs text-gray-400">
              <span>Cards</span>
              <span>•</span>
              <span>UPI</span>
              <span>•</span>
              <span>Net Banking</span>
              <span>•</span>
              <span>Wallets</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-center text-xs text-gray-500">
            🔒 Payments secured by Cashfree with 256-bit SSL encryption
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
