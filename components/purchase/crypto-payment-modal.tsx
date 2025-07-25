"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Copy, CheckCircle, Clock, Bitcoin, QrCode } from "lucide-react"
import { config } from "@/lib/config"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/supabase"

interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: number
    tokens: number
    popular?: boolean
  }
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface CryptoOrderData {
  order_id: string
  crypto_currency: string
  crypto_amount: string
  wallet_address: string
  qr_code: string
  expires_at: string
}

export default function CryptoPaymentModal({ isOpen, onClose, plan, onSuccess, onError }: CryptoPaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState("USDT")
  const [cryptoOrder, setCryptoOrder] = useState<CryptoOrderData | null>(null)
  const [transactionHash, setTransactionHash] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [copied, setCopied] = useState(false)

  // Calculate bonus tokens
  const bonusTokens =
    plan.price >= config.pricing.bonusThreshold ? Math.floor(plan.tokens * (config.pricing.bonusPercentage / 100)) : 0
  const totalTokens = plan.tokens + bonusTokens

  // Crypto options
  const cryptoOptions = [
    { value: "BTC", label: "Bitcoin", icon: "₿" },
    { value: "ETH", label: "Ethereum", icon: "Ξ" },
    { value: "USDT", label: "Tether", icon: "₮" },
  ]

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        if (!currentUser) {
          setError("Please sign in to continue with payment")
        }
      } catch (err) {
        console.error("Auth check error:", err)
        setError("Authentication error. Please try signing in again.")
      }
    }

    if (isOpen) {
      checkAuth()
    }
  }, [isOpen])

  // Timer for payment expiry
  useEffect(() => {
    if (cryptoOrder && cryptoOrder.expires_at) {
      const updateTimer = () => {
        const expiryTime = new Date(cryptoOrder.expires_at).getTime()
        const now = new Date().getTime()
        const remaining = Math.max(0, expiryTime - now)
        setTimeLeft(remaining)

        if (remaining === 0) {
          setError("Payment session expired. Please create a new order.")
        }
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [cryptoOrder])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleCreateOrder = async () => {
    if (!user) {
      setError("Please sign in to continue")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Creating crypto order:", { plan, selectedCrypto, user: user.email })

      const response = await fetch("/api/payment/crypto/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.price,
          tokens: totalTokens,
          plan: plan.name.toLowerCase(),
          crypto_currency: selectedCrypto,
        }),
      })

      const data = await response.json()
      console.log("Crypto order response:", data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to create crypto order")
      }

      setCryptoOrder({
        order_id: data.order_id,
        crypto_currency: data.crypto_currency,
        crypto_amount: data.crypto_amount,
        wallet_address: data.wallet_address,
        qr_code: data.qr_code,
        expires_at: data.expires_at,
      })
    } catch (err) {
      console.error("Crypto order error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to create crypto order"
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPayment = async () => {
    if (!cryptoOrder || !transactionHash.trim()) {
      setError("Please enter the transaction hash")
      return
    }

    setVerifying(true)
    setError(null)

    try {
      console.log("Verifying crypto payment:", {
        orderId: cryptoOrder.order_id,
        transactionHash,
        cryptoCurrency: cryptoOrder.crypto_currency,
      })

      const response = await fetch("/api/payment/crypto/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: cryptoOrder.order_id,
          transaction_hash: transactionHash,
          crypto_currency: cryptoOrder.crypto_currency,
        }),
      })

      const data = await response.json()
      console.log("Crypto verification response:", data)

      if (data.success) {
        console.log("✅ Crypto payment verified successfully")
        onSuccess?.()
        onClose()
      } else {
        throw new Error(data.message || "Payment verification failed")
      }
    } catch (err) {
      console.error("Crypto verification error:", err)
      const errorMessage = err instanceof Error ? err.message : "Payment verification failed"
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setVerifying(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleClose = () => {
    setCryptoOrder(null)
    setTransactionHash("")
    setError(null)
    setTimeLeft(0)
    onClose()
  }

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>Please sign in to continue with crypto payment</DialogDescription>
          </DialogHeader>
          <Button onClick={() => (window.location.href = "/auth")}>Sign In</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bitcoin className="h-5 w-5" />
            Crypto Payment - {plan.name} Plan
          </DialogTitle>
          <DialogDescription>Pay with cryptocurrency to get {totalTokens.toLocaleString()} tokens</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Signed in as:</p>
            <p className="font-medium">{user.email}</p>
            <p className="text-sm text-gray-600">Current tokens: {user.tokens}</p>
          </div>

          {!cryptoOrder ? (
            // Step 1: Select cryptocurrency and create order
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base tokens:</span>
                    <span>{plan.tokens.toLocaleString()}</span>
                  </div>
                  {bonusTokens > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Bonus tokens ({config.pricing.bonusPercentage}%):</span>
                      <span>+{bonusTokens.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total tokens:</span>
                    <span>{totalTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Amount:</span>
                    <span>₹{plan.price}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="crypto-select">Select Cryptocurrency</Label>
                <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoOptions.map((crypto) => (
                      <SelectItem key={crypto.value} value={crypto.value}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{crypto.icon}</span>
                          <span>
                            {crypto.label} ({crypto.value})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button onClick={handleCreateOrder} disabled={loading} className="w-full" size="lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  `Create ${selectedCrypto} Payment`
                )}
              </Button>
            </div>
          ) : (
            // Step 2: Show payment details and verify
            <div className="space-y-6">
              {/* Timer */}
              {timeLeft > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      Payment expires in: <strong>{formatTime(timeLeft)}</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Payment Details
                  </CardTitle>
                  <CardDescription>
                    Send exactly {cryptoOrder.crypto_amount} {cryptoOrder.crypto_currency} to the address below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* QR Code */}
                  <div className="flex justify-center">
                    <img
                      src={cryptoOrder.qr_code || "/placeholder.svg"}
                      alt="Payment QR Code"
                      className="w-48 h-48 border rounded-lg"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label>Amount to Send</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={`${cryptoOrder.crypto_amount} ${cryptoOrder.crypto_currency}`}
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(cryptoOrder.crypto_amount)}>
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="space-y-2">
                    <Label>Wallet Address</Label>
                    <div className="flex items-center gap-2">
                      <Input value={cryptoOrder.wallet_address} readOnly className="font-mono text-xs" />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(cryptoOrder.wallet_address)}>
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Hash Input */}
              <div className="space-y-3">
                <Label htmlFor="tx-hash">Transaction Hash (after sending payment)</Label>
                <Input
                  id="tx-hash"
                  placeholder="Enter transaction hash from your wallet"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-gray-500">
                  After sending the payment, paste the transaction hash here to verify your payment
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Test Mode Banner */}
              {config.testMode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    🧪 Test Mode: You can verify payment with any transaction hash for testing
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleVerifyPayment}
                  disabled={verifying || !transactionHash.trim() || timeLeft === 0}
                  className="flex-1"
                  size="lg"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Payment"
                  )}
                </Button>
                <Button variant="outline" onClick={handleClose} size="lg">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Security Note */}
          <p className="text-xs text-gray-500 text-center">
            🔒 Secure crypto payment • Only send to the exact address shown above
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
