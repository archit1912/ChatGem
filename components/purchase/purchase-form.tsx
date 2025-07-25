"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Coins } from "lucide-react"
import { CashfreePaymentForm } from "./cashfree-payment-form"
import { CryptoPaymentModal } from "./crypto-payment-modal"

interface PurchaseFormProps {
  selectedPlan: {
    name: string
    price: number
    tokens: number
    popular?: boolean
  }
}

export function PurchaseForm({ selectedPlan }: PurchaseFormProps) {
  const [activeTab, setActiveTab] = useState("cashfree")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        {/* Selected Plan Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Selected Plan</span>
              {selectedPlan.popular && <Badge variant="default">Popular</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <Coins className="h-4 w-4 mr-1" />
                  {selectedPlan.tokens.toLocaleString()} tokens
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹{selectedPlan.price}</div>
                <div className="text-sm text-gray-500">
                  ₹{(selectedPlan.price / selectedPlan.tokens).toFixed(2)} per token
                </div>
              </div>
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
                <CashfreePaymentForm amount={selectedPlan.price} tokens={selectedPlan.tokens} />
              </TabsContent>

              <TabsContent value="crypto" className="mt-6">
                <CryptoPaymentModal amount={selectedPlan.price} tokens={selectedPlan.tokens} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
