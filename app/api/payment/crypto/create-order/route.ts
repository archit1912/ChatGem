import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const { amount, tokens, usdtAmount } = await request.json()

    if (!amount || !tokens || !usdtAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In test mode, return mock crypto order
    if (config.isTestMode) {
      const mockOrder = {
        id: `crypto_${Date.now()}`,
        amount: Number.parseFloat(usdtAmount),
        currency: "USDT",
        tokens,
        walletAddress: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE", // Mock USDT TRC-20 address
        network: "TRC-20",
        status: "pending",
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE`,
        exchangeRate: 84.5, // 1 USDT = 84.5 INR
      }

      return NextResponse.json({ order: mockOrder })
    }

    // In production, integrate with actual crypto payment processor
    // This would typically involve:
    // 1. Generate unique wallet address or payment ID
    // 2. Set up blockchain monitoring
    // 3. Create order in database
    // 4. Return payment details

    return NextResponse.json({ error: "Crypto payments not configured" }, { status: 501 })
  } catch (error: any) {
    console.error("Crypto order creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
