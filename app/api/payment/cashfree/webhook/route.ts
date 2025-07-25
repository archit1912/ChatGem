import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-webhook-signature")

    // Verify webhook signature in production
    if (!config.testMode && signature) {
      const expectedSignature = crypto.createHmac("sha256", config.cashfree.secretKey).update(body).digest("base64")

      if (signature !== expectedSignature) {
        console.error("Invalid webhook signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const webhookData = JSON.parse(body)
    console.log("Cashfree webhook received:", webhookData)

    // Process webhook based on event type
    switch (webhookData.type) {
      case "PAYMENT_SUCCESS_WEBHOOK":
        // Handle successful payment
        const { order_id, payment_id, payment_amount } = webhookData.data

        // Calculate tokens
        const tokens = payment_amount * config.pricing.tokensPerRupee
        const bonusTokens =
          payment_amount >= config.pricing.bonusThreshold
            ? Math.floor((tokens * config.pricing.bonusPercentage) / 100)
            : 0
        const totalTokens = tokens + bonusTokens

        // Update user tokens in database
        // TODO: Add Supabase token update logic
        console.log(`Payment successful: ${order_id}, adding ${totalTokens} tokens`)
        break

      case "PAYMENT_FAILED_WEBHOOK":
        // Handle failed payment
        console.log("Payment failed:", webhookData.data)
        break

      default:
        console.log("Unknown webhook type:", webhookData.type)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing Cashfree webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
