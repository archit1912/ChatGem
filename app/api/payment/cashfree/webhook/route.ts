import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-webhook-signature")
    const timestamp = request.headers.get("x-webhook-timestamp")

    if (!signature || !timestamp) {
      return NextResponse.json({ error: "Missing signature or timestamp" }, { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", config.cashfree.secretKey)
      .update(timestamp + body)
      .digest("base64")

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const webhookData = JSON.parse(body)
    const { type, data } = webhookData

    if (type === "PAYMENT_SUCCESS_WEBHOOK") {
      const { order_id, payment_id, order_amount } = data.payment

      // Update transaction status and add tokens to user
      // You would implement this with your database
      console.log("Payment successful:", { order_id, payment_id, order_amount })

      // Calculate tokens (assuming ₹0.10 per token)
      const tokens = Math.floor(order_amount / 0.1)

      // Update user tokens and transaction status
      // await updateTransaction(order_id, {
      //   payment_id,
      //   status: "completed",
      // })
      // await addTokensToUser(user_id, tokens)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Cashfree webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
