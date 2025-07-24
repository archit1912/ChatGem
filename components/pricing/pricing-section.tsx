"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Free Plan",
    price: "₹0",
    description: "Get started with basic AI conversations",
    tokens: "50 tokens",
    features: ["50 AI conversations", "Basic chat interface", "Standard response time", "Email support"],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    href: "/auth",
    popular: false,
  },
  {
    name: "Flexible Tokens",
    price: "Custom",
    description: "Pay for exactly what you need",
    tokens: "₹0.10 per token",
    features: [
      "Custom token amount",
      "₹10 - ₹10,000 range",
      "INR & USDT payments",
      "Instant token delivery",
      "Priority support",
    ],
    buttonText: "Choose Amount",
    buttonVariant: "default" as const,
    href: "/purchase/custom",
    popular: true,
  },
  {
    name: "Pro Bundle",
    price: "₹100",
    description: "Best value for regular users",
    tokens: "1,000 tokens",
    features: [
      "1,000 AI conversations",
      "Advanced chat features",
      "Fast response time",
      "Multiple payment options",
      "Priority support",
      "Usage analytics",
    ],
    buttonText: "Buy Pro Bundle",
    buttonVariant: "default" as const,
    href: "/purchase?plan=pro",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your AI conversation needs. Pay only for what you use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.name === "Flexible Tokens" && (
                    <div className="text-sm text-gray-600 mt-1">Starting from ₹10</div>
                  )}
                </div>
                <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-sm">
                    {plan.tokens}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href={plan.href} className="w-full">
                  <Button variant={plan.buttonVariant} className="w-full" size="lg">
                    {plan.popular && <Zap className="h-4 w-4 mr-2" />}
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include secure payments, instant delivery, and 24/7 support</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✓ No hidden fees</span>
            <span>✓ Instant activation</span>
            <span>✓ Secure payments</span>
          </div>
        </div>
      </div>
    </section>
  )
}
