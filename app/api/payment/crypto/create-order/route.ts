import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, createTransaction } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Create Crypto Order API Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated:", { id: user.id, email: user.email })

    const { amount, tokens, plan, crypto_currency } = await request.json()

    // Validate input
    if (!amount || !tokens || !crypto_currency || amount <= 0 || tokens <= 0) {
      return NextResponse.json({ error: "Invalid amount, tokens, or crypto currency" }, { status: 400 })
    }

    console.log("📝 Crypto order details:", { amount, tokens, plan, crypto_currency, user: user.email })

    // Calculate bonus tokens
    const bonusTokens =
      amount >= config.pricing.bonusThreshold ? Math.floor(tokens * (config.pricing.bonusPercentage / 100)) : 0
    const totalTokens = tokens + bonusTokens

    // Generate unique order ID
    const orderId = `crypto_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("💰 Token calculation:", {
      baseTokens: tokens,
      bonusTokens,
      totalTokens,
      orderId,
      cryptoCurrency: crypto_currency,
    })

    // Create transaction record
    const transaction = await createTransaction(user.id, orderId, amount, tokens, bonusTokens, plan)

    console.log("✅ Crypto transaction created:", transaction.id)

    // In test mode or for demo purposes, return mock crypto payment data
    const mockCryptoData = {
      order_id: orderId,
      transaction_id: transaction.id,
      amount: amount,
      currency: "INR",
      crypto_currency: crypto_currency,
      tokens: totalTokens,
      bonus_tokens: bonusTokens,
      // Mock crypto payment details
      crypto_amount: getCryptoAmount(amount, crypto_currency),
      wallet_address: getMockWalletAddress(crypto_currency),
      qr_code: `data:image/svg+xml;base64,${Buffer.from(generateMockQR(orderId)).toString("base64")}`,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      success: true,
    }

    return NextResponse.json(mockCryptoData)
  } catch (error: any) {
    console.error("❌ Create crypto order error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to create crypto order",
        details: config.isDevelopment ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

// Helper functions for mock crypto payment
function getCryptoAmount(inrAmount: number, cryptoCurrency: string): string {
  // Mock exchange rates (in a real app, you'd fetch from an API)
  const exchangeRates: Record<string, number> = {
    BTC: 0.000012, // 1 INR = 0.000012 BTC
    ETH: 0.00018, // 1 INR = 0.00018 ETH
    USDT: 0.012, // 1 INR = 0.012 USDT
  }

  const rate = exchangeRates[cryptoCurrency] || 0.012
  const cryptoAmount = inrAmount * rate

  return cryptoAmount.toFixed(8)
}

function getMockWalletAddress(cryptoCurrency: string): string {
  // Mock wallet addresses for different cryptocurrencies
  const mockAddresses: Record<string, string> = {
    BTC: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    ETH: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    USDT: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
  }

  return mockAddresses[cryptoCurrency] || mockAddresses.USDT
}

function generateMockQR(orderId: string): string {
  // Generate a simple SVG QR code placeholder
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <rect x="20" y="20" width="160" height="160" fill="black"/>
    <rect x="40" y="40" width="120" height="120" fill="white"/>
    <text x="100" y="105" text-anchor="middle" font-family="Arial" font-size="12" fill="black">QR Code</text>
    <text x="100" y="125" text-anchor="middle" font-family="Arial" font-size="8" fill="black">${orderId.slice(-8)}</text>
  </svg>`
}
