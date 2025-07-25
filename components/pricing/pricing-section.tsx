"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Gift, Calculator } from "lucide-react"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 50,
    tokens: 500,
    popular: false,
    features: ["500 AI conversations", "Basic AI responses", "Email support", "Mobile & web access"],
  },
  {
    id: "popular",
    name: "Popular",
    price: 100,
    tokens: 1000,
    popular: true,
    features: [
      "1,000 AI conversations",
      "Advanced AI responses",
      "Priority support",
      "Mobile & web access",
      "Conversation history",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 500,
    tokens: 5500, // 5000 + 10% bonus
    popular: false,
    features: [
      "5,500 AI conversations",
      "Premium AI responses",
      "24/7 priority support",
      "Mobile & web access",
      "Unlimited history",
      "10% bonus tokens",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1000,
    tokens: 11000, // 10000 + 10% bonus
    popular: false,
    features: [
      "11,000 AI conversations",
      "Enterprise AI responses",
      "Dedicated support",
      "Mobile & web access",
      "Unlimited history",
      "10% bonus tokens",
      "API access",
    ],
  },
]

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
            } transition-all duration-200`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>
              </div>
              <CardDescription className="flex items-center justify-center mt-2">
                <Zap className="h-4 w-4 mr-1" />
                {plan.tokens.toLocaleString()} tokens
              </CardDescription>
              {plan.price >= 500 && (
                <div className="flex items-center justify-center mt-2">
                  <Gift className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-xs text-green-600">10% bonus included</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={`/purchase?plan=${plan.id}`} className="block">
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Amount Section */}
      <div className="text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Calculator className="h-5 w-5 mr-2" />
              Custom Amount
            </CardTitle>
            <CardDescription>Need a different amount? Choose exactly what you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Flexible pricing</div>
                <div className="text-lg font-semibold">₹10 - ₹10,000</div>
                <div className="text-xs text-gray-500">₹1 = 10 tokens</div>
              </div>
              <Link href="/purchase/custom">
                <Button variant="outline" className="w-full bg-transparent">
                  Choose Custom Amount
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bonus Information */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <div className="text-center">
          <Gift className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Bonus Tokens</h3>
          <p className="text-gray-600 mb-4">Get 10% extra tokens on purchases of ₹500 or more!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white p-3 rounded-lg">
              <div className="text-sm text-gray-600">₹500 purchase</div>
              <div className="font-semibold">5,500 tokens</div>
              <div className="text-xs text-green-600">+500 bonus</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-sm text-gray-600">₹1000 purchase</div>
              <div className="font-semibold">11,000 tokens</div>
              <div className="text-xs text-green-600">+1,000 bonus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
