"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Coins, DollarSign, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { CryptoPaymentModal } from "./crypto-payment-modal"

interface PurchaseFormProps {
  plan: {
    name: string
    price: number
    tokens: number
    features: string[]
  }
}

export function PurchaseForm({ plan }: PurchaseFormProps) {
  const [loading, setLoading] = useState(false)
  const [showCrypto, setShowCrypto] = useState(false)

  const handleINRPayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.price * 100, // Convert to paise
          tokens: plan.tokens,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      // In demo mode, simulate successful payment
      toast({
        title: "Payment Successful! 🎉",
        description: `${plan.tokens} tokens have been added to your account.`,
      })

      // Redirect to dashboard after successful payment
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
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

  const handleCryptoPayment = () => {
    setShowCrypto(true)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Zap className="h-5 w-5 mr-2 text-blue-600" />
            {plan.name}
          </CardTitle>
          <CardDescription>Complete your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">₹{plan.price}</div>
              <Badge className="mt-2">
                <Coins className="h-3 w-3 mr-1" />
                {plan.tokens.toLocaleString()} tokens
              </Badge>
            </div>
            <ul className="space-y-2 text-sm">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Payment Methods</h3>

            {/* INR Payment */}
            <Button className="w-full justify-between" onClick={handleINRPayment} disabled={loading}>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay ₹{plan.price} with INR
              </div>
              <Badge variant="secondary" className="text-xs">
                Instant
              </Badge>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Crypto Payment */}
            <Button variant="outline" className="w-full justify-between bg-transparent" onClick={handleCryptoPayment}>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Pay ${(plan.price / 84.5).toFixed(2)} USDT
              </div>
              <Badge variant="secondary" className="text-xs">
                Low Fees
              </Badge>
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center text-xs text-gray-500">
            🔒 Secure payment processing with 256-bit SSL encryption
          </div>
        </CardContent>
      </Card>

      {/* Crypto Payment Modal */}
      <CryptoPaymentModal
        isOpen={showCrypto}
        onClose={() => setShowCrypto(false)}
        amount={plan.price}
        tokens={plan.tokens}
        usdtAmount={(plan.price / 84.5).toFixed(2)}
      />
    </div>
  )
}
