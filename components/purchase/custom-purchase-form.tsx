"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Wallet, DollarSign } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { CryptoPaymentModal } from "./crypto-payment-modal"

interface CustomPurchaseFormProps {
  amount: number
  tokens: number
}

export function CustomPurchaseForm({ amount, tokens }: CustomPurchaseFormProps) {
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
          amount: amount * 100, // Convert to paise
          tokens,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      // In demo mode, simulate successful payment
      toast({
        title: "Payment Successful! 🎉",
        description: `${tokens} tokens have been added to your account.`,
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
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Tokens</span>
            <span className="font-medium">{tokens.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rate</span>
            <span className="font-medium">₹0.10 per token</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{amount}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Choose Payment Method</h3>

        {/* INR Payment */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">INR Payment</h4>
                  <p className="text-sm text-gray-600">Cards, UPI, Net Banking, Wallets</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">₹{amount}</div>
                <Badge variant="secondary" className="text-xs">
                  Instant
                </Badge>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={handleINRPayment} disabled={loading}>
              {loading ? "Processing..." : "Pay with INR"}
            </Button>
          </CardContent>
        </Card>

        {/* Crypto Payment */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">USDT Payment</h4>
                  <p className="text-sm text-gray-600">Tron Network (TRC-20)</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">${(amount / 84.5).toFixed(2)} USDT</div>
                <Badge variant="secondary" className="text-xs">
                  Low Fees
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleCryptoPayment}>
              Pay with USDT
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Features */}
      <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center space-x-2">
          <Smartphone className="h-4 w-4" />
          <span>Mobile Friendly</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Secure Payments</span>
        </div>
      </div>

      {/* Crypto Payment Modal */}
      <CryptoPaymentModal
        isOpen={showCrypto}
        onClose={() => setShowCrypto(false)}
        amount={amount}
        tokens={tokens}
        usdtAmount={(amount / 84.5).toFixed(2)}
      />
    </div>
  )
}
