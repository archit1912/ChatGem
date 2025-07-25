import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, createTransaction } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Create Order API Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated:", { id: user.id, email: user.email })

    const { amount, tokens, plan } = await request.json()

    // Validate input
    if (!amount || !tokens || amount <= 0 || tokens <= 0) {
      return NextResponse.json({ error: "Invalid amount or tokens" }, { status: 400 })
    }

    console.log("📝 Order details:", { amount, tokens, plan, user: user.email })

    // Calculate bonus tokens
    const bonusTokens =
      amount >= config.pricing.bonusThreshold ? Math.floor(tokens * (config.pricing.bonusPercentage / 100)) : 0
    const totalTokens = tokens + bonusTokens

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("💰 Token calculation:", {
      baseTokens: tokens,
      bonusTokens,
      totalTokens,
      orderId,
    })

    // Create transaction record
    const transaction = await createTransaction(user.id, orderId, amount, tokens, bonusTokens, plan)

    console.log("✅ Transaction created:", transaction.id)

    return NextResponse.json({
      order_id: orderId,
      transaction_id: transaction.id,
      amount: amount,
      currency: "INR",
      tokens: totalTokens,
      bonus_tokens: bonusTokens,
      success: true,
    })
  } catch (error: any) {
    console.error("❌ Create order error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to create order",
        details: config.isDevelopment ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
