"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  tokens: number
  usdtAmount: string
}

export function CryptoPaymentModal({ isOpen, onClose, amount, tokens, usdtAmount }: CryptoPaymentModalProps) {
  const [transactionHash, setTransactionHash] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)

  const walletAddress = "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE"
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletAddress}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    })
  }

  const handleVerifyTransaction = async () => {
    if (!transactionHash.trim()) {
      toast({
        title: "Error",
        description: "Please enter transaction hash",
        variant: "destructive",
      })
      return
    }

    setVerifying(true)
    try {
      const response = await fetch("/api/payment/crypto/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: `crypto_${Date.now()}`,
          transactionHash,
          tokens,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Verification failed")
      }

      setVerified(true)
      toast({
        title: "Payment Verified! 🎉",
        description: `${tokens} tokens have been added to your account.`,
      })

      // Close modal and redirect after success
      setTimeout(() => {
        onClose()
        window.location.href = "/dashboard"
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setVerifying(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>USDT Payment</DialogTitle>
          <DialogDescription>Send USDT to the address below to complete your purchase</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Details */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-gray-900">{usdtAmount} USDT</div>
                <Badge variant="secondary">TRC-20 Network</Badge>
                <div className="text-sm text-gray-600">
                  ≈ ₹{amount} • {tokens.toLocaleString()} tokens
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <div className="text-center">
            <img
              src={qrCodeUrl || "/placeholder.svg"}
              alt="Wallet QR Code"
              className="mx-auto mb-4 border rounded-lg"
              width={200}
              height={200}
            />
            <p className="text-sm text-gray-600">Scan with your USDT wallet</p>
          </div>

          {/* Wallet Address */}
          <div>
            <Label>Wallet Address (TRC-20)</Label>
            <div className="flex mt-1">
              <Input value={walletAddress} readOnly className="font-mono text-sm" />
              <Button
                variant="outline"
                size="icon"
                className="ml-2 bg-transparent"
                onClick={() => copyToClipboard(walletAddress)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Transaction Verification */}
          {!verified ? (
            <div className="space-y-4">
              <div>
                <Label>Transaction Hash</Label>
                <Input
                  placeholder="Enter transaction hash after sending"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <Button
                onClick={handleVerifyTransaction}
                disabled={verifying || !transactionHash.trim()}
                className="w-full"
              >
                {verifying ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Payment"
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <div>
                <h3 className="font-semibold text-green-900">Payment Verified!</h3>
                <p className="text-sm text-green-700">Tokens have been added to your account</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Important:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Send only USDT on TRC-20 network</li>
                    <li>• Minimum amount: {usdtAmount} USDT</li>
                    <li>• Tokens will be added after verification</li>
                    <li>• Keep transaction hash for reference</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Link */}
          <div className="text-center">
            <Button variant="link" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Need help? Contact support
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
