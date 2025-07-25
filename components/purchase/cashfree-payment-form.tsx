"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Building2, Wallet, Gift } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CashfreePaymentFormProps {
  amount: number
  tokens: number
  onSuccess?: () => void
}

export function CashfreePaymentForm({ amount, tokens, onSuccess }: CashfreePaymentFormProps) {
  const [loading, setLoading] = useState(false)

  const bonusTokens = amount >= 500 ? Math.floor(tokens * 0.1) : 0
  const totalTokens = tokens + bonusTokens

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
          amount,
          tokens: totalTokens,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment order")
      }

      // Redirect to Cashfree payment page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        throw new Error("Payment URL not received")
      }
    } catch (error: any) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Cashfree Payment</span>
        </CardTitle>
        <CardDescription>Secure payment with multiple options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Summary */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Base Tokens</span>
            <span className="font-medium">{tokens.toLocaleString()}</span>
          </div>
          {bonusTokens > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600 flex items-center">
                <Gift className="h-3 w-3 mr-1" />
                Bonus Tokens (10%)
              </span>
              <span className="font-medium text-green-600">+{bonusTokens.toLocaleString()}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Tokens</span>
            <Badge variant="default" className="text-sm">
              {totalTokens.toLocaleString()} tokens
            </Badge>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Supported Payment Methods:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <CreditCard className="h-3 w-3" />
              <span>Cards</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Smartphone className="h-3 w-3" />
              <span>UPI</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Building2 className="h-3 w-3" />
              <span>Net Banking</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Wallet className="h-3 w-3" />
              <span>Wallets</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <Button onClick={handlePayment} disabled={loading} className="w-full" size="lg">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Pay ₹${amount}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Secure payment powered by Cashfree. Your payment information is encrypted and secure.
        </p>
      </CardContent>
    </Card>
  )
}
