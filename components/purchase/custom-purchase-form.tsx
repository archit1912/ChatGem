"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Coins, Gift, Calculator } from "lucide-react"
import { CashfreePaymentForm } from "./cashfree-payment-form"
import { CryptoPaymentModal } from "./crypto-payment-modal"

export function CustomPurchaseForm() {
  const [amount, setAmount] = useState<number>(100)
  const [tokens, setTokens] = useState<number>(1000)
  const [bonusTokens, setBonusTokens] = useState<number>(0)
  const [totalTokens, setTotalTokens] = useState<number>(1000)
  const [activeTab, setActiveTab] = useState("cashfree")

  // Token calculation: ₹1 = 10 tokens, 10% bonus on ₹500+
  useEffect(() => {
    const baseTokens = amount * 10
    const bonus = amount >= 500 ? Math.floor(baseTokens * 0.1) : 0
    const total = baseTokens + bonus

    setTokens(baseTokens)
    setBonusTokens(bonus)
    setTotalTokens(total)
  }, [amount])

  const handleAmountChange = (value: string) => {
    const numValue = Number.parseFloat(value) || 0
    if (numValue >= 10 && numValue <= 10000) {
      setAmount(numValue)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Token Purchase</h1>
          <p className="text-gray-600">Enter any amount between ₹10 - ₹10,000</p>
        </div>

        {/* Amount Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Token Calculator</span>
            </CardTitle>
            <CardDescription>Calculate tokens based on your budget</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                min="10"
                max="10000"
                step="1"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="text-lg"
              />
              <p className="text-xs text-gray-500">Minimum: ₹10 • Maximum: ₹10,000</p>
            </div>

            {/* Token Breakdown */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Base Tokens (₹1 = 10 tokens)</span>
                <span className="font-medium">{tokens.toLocaleString()}</span>
              </div>

              {bonusTokens > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600 flex items-center">
                    <Gift className="h-3 w-3 mr-1" />
                    Bonus Tokens (10% on ₹500+)
                  </span>
                  <span className="font-medium text-green-600">+{bonusTokens.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Tokens</span>
                  <Badge variant="default" className="text-sm">
                    {totalTokens.toLocaleString()} tokens
                  </Badge>
                </div>
              </div>

              {amount >= 500 && (
                <div className="text-xs text-green-600 flex items-center">
                  <Gift className="h-3 w-3 mr-1" />
                  You're getting 10% bonus tokens!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay for your tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cashfree" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Cards & UPI</span>
                </TabsTrigger>
                <TabsTrigger value="crypto" className="flex items-center space-x-2">
                  <Coins className="h-4 w-4" />
                  <span>Crypto (USDT)</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cashfree" className="mt-6">
                <CashfreePaymentForm amount={amount} tokens={totalTokens} />
              </TabsContent>

              <TabsContent value="crypto" className="mt-6">
                <CryptoPaymentModal amount={amount} tokens={totalTokens} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
