"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calculator, CreditCard, Coins } from "lucide-react"
import Link from "next/link"
import { CustomPurchaseForm } from "@/components/purchase/custom-purchase-form"

export default function CustomPurchasePage() {
  const [amount, setAmount] = useState<number>(100)
  const [tokens, setTokens] = useState<number>(1000)

  const presetAmounts = [50, 100, 250, 500, 1000, 2500]
  const tokenRate = 0.1 // ₹0.10 per token

  useEffect(() => {
    setTokens(Math.floor(amount / tokenRate))
  }, [amount])

  const handleAmountChange = (value: string) => {
    const numValue = Number.parseFloat(value) || 0
    if (numValue >= 10 && numValue <= 10000) {
      setAmount(numValue)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/pricing">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Token Purchase</h1>
          <p className="text-gray-600">Choose exactly how many tokens you need for your AI conversations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Amount Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Select Amount
              </CardTitle>
              <CardDescription>Enter a custom amount or choose from preset options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="amount">Custom Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="10"
                  max="10000"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="text-lg font-semibold"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum: ₹10 • Maximum: ₹10,000</p>
              </div>

              <div>
                <Label>Quick Select</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      variant={amount === preset ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(preset)}
                    >
                      ₹{preset}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">You'll receive:</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Coins className="h-3 w-3 mr-1" />
                    {tokens.toLocaleString()} tokens
                  </Badge>
                </div>
                <div className="text-xs text-blue-700">Rate: ₹{tokenRate} per token • 1 token = 1 AI conversation</div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Details
              </CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomPurchaseForm amount={amount} tokens={tokens} />
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Delivery</h3>
                <p className="text-sm text-gray-600">Tokens are added to your account immediately after payment</p>
              </div>
              <div>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-sm text-gray-600">Multiple payment options with bank-grade security</p>
              </div>
              <div>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fair Pricing</h3>
                <p className="text-sm text-gray-600">Pay only for what you need with transparent pricing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
