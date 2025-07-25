import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, updateTestUserTokens } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { orderId, paymentId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    console.log("Verifying payment:", { orderId, paymentId, userId: user.id })

    // Production Cashfree payment verification
    const response = await fetch(`https://api.cashfree.com/pg/orders/${orderId}/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": config.cashfree.apiVersion,
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
    })

    const payments = await response.json()

    console.log("Cashfree verification response:", {
      status: response.status,
      ok: response.ok,
      payments,
    })

    if (!response.ok) {
      console.error("Cashfree payment verification failed:", payments)

      // Fallback for test mode - simulate successful payment
      if (config.cashfree.environment === "SANDBOX" || orderId.includes("test")) {
        const testAmount = 100
        const tokens = testAmount * config.pricing.tokensPerRupee
        const bonusTokens =
          testAmount >= config.pricing.bonusThreshold ? Math.floor((tokens * config.pricing.bonusPercentage) / 100) : 0
        const totalTokens = tokens + bonusTokens

        // Update user tokens in test mode
        const newTokens = user.tokens + totalTokens
        updateTestUserTokens(newTokens)

        return NextResponse.json({
          success: true,
          payment: {
            order_id: orderId,
            payment_id: paymentId || `test_payment_${Date.now()}`,
            payment_status: "SUCCESS",
            payment_amount: testAmount,
            payment_currency: "INR",
          },
          tokens: totalTokens,
          bonusTokens,
          newBalance: newTokens,
        })
      }

      return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
    }

    const payment = payments[0] // Get the latest payment

    if (!payment) {
      return NextResponse.json({ error: "No payment found" }, { status: 404 })
    }

    if (payment.payment_status !== "SUCCESS") {
      return NextResponse.json(
        {
          error: "Payment not successful",
          status: payment.payment_status,
        },
        { status: 400 },
      )
    }

    // Calculate tokens
    const amount = payment.payment_amount
    const tokens = amount * config.pricing.tokensPerRupee
    const bonusTokens =
      amount >= config.pricing.bonusThreshold ? Math.floor((tokens * config.pricing.bonusPercentage) / 100) : 0
    const totalTokens = tokens + bonusTokens

    // Update user tokens
    const newTokens = user.tokens + totalTokens

    // In test mode, update localStorage
    if (config.testMode) {
      updateTestUserTokens(newTokens)
    }
    // TODO: Add Supabase token update for production

    console.log("Payment verified successfully:", {
      orderId,
      amount,
      tokens: totalTokens,
      newBalance: newTokens,
    })

    return NextResponse.json({
      success: true,
      payment,
      tokens: totalTokens,
      bonusTokens,
      newBalance: newTokens,
    })
  } catch (error: any) {
    console.error("Error verifying Cashfree payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
