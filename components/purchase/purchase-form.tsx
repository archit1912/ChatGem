"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign } from "lucide-react"
import { CryptoPaymentModal } from "./crypto-payment-modal"
import { CashfreePaymentForm } from "./cashfree-payment-form"

interface PurchaseFormProps {
  plan: {
    name: string
    price: number
    tokens: number
    features: string[]
  }
}

export function PurchaseForm({ plan }: PurchaseFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cashfree" | "crypto">("cashfree")
  const [showCrypto, setShowCrypto] = useState(false)

  if (paymentMethod === "cashfree") {
    return (
      <div className="space-y-4">
        <CashfreePaymentForm amount={plan.price} tokens={plan.tokens} planName={plan.name} features={plan.features} />

        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 max-w-md mx-auto justify-between bg-transparent"
            onClick={() => setShowCrypto(true)}
          >
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Pay ${(plan.price / 84.5).toFixed(2)} USDT
            </div>
            <Badge variant="secondary" className="text-xs">
              Crypto
            </Badge>
          </Button>
        </div>

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

  return null
}
