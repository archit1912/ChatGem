import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { addTokens, updateTransaction, getTransactionByOrderId } from "@/lib/auth"
import { logPaymentEvent } from "@/lib/supabase"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Cashfree Webhook Received ===")

    const body = await request.text()
    const signature = request.headers.get("x-webhook-signature")

    console.log("Webhook received:", {
      hasBody: !!body,
      hasSignature: !!signature,
      bodyLength: body.length,
    })

    // Verify webhook signature in production
    if (config.isProduction && signature) {
      const expectedSignature = crypto.createHmac("sha256", config.security.webhookSecret).update(body).digest("base64")

      if (signature !== expectedSignature) {
        console.error("❌ Invalid webhook signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
      console.log("✅ Webhook signature verified")
    }

    const webhookData = JSON.parse(body)
    console.log("Webhook data:", webhookData)

    // Process webhook based on event type
    switch (webhookData.type) {
      case "PAYMENT_SUCCESS_WEBHOOK":
        await handlePaymentSuccess(webhookData.data)
        break

      case "PAYMENT_FAILED_WEBHOOK":
        await handlePaymentFailure(webhookData.data)
        break

      case "PAYMENT_USER_DROPPED_WEBHOOK":
        await handlePaymentDropped(webhookData.data)
        break

      default:
        console.log("Unknown webhook type:", webhookData.type)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("❌ Webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handlePaymentSuccess(data: any) {
  try {
    console.log("=== Processing Payment Success ===")
    console.log("Payment data:", data)

    const { order_id, payment_id, payment_amount } = data

    // Get transaction record
    const transaction = await getTransactionByOrderId(order_id)
    if (!transaction) {
      console.error("❌ Transaction not found for order:", order_id)
      return
    }

    // Log payment event
    try {
      await logPaymentEvent(transaction.id, "PAYMENT_SUCCESS", data)
    } catch (error) {
      console.error("⚠️ Failed to log payment event:", error)
    }

    // Skip if already processed
    if (transaction.status === "completed") {
      console.log("✅ Payment already processed")
      return
    }

    console.log(`Adding ${transaction.total_tokens} tokens to user ${transaction.user_id}`)

    // Add tokens to user account
    const newBalance = await addTokens(transaction.user_id, transaction.total_tokens)
    console.log("✅ Tokens added successfully, new balance:", newBalance)

    // Update transaction status
    await updateTransaction(transaction.id, {
      payment_id: payment_id,
      status: "completed",
      payment_method: data.payment_method || "unknown",
      gateway_response: data,
    })

    console.log("✅ Transaction updated to completed")
    console.log("✅ Payment success processed successfully")
  } catch (error) {
    console.error("❌ Error processing payment success:", error)
  }
}

async function handlePaymentFailure(data: any) {
  try {
    console.log("=== Processing Payment Failure ===")
    console.log("Payment failure data:", data)

    const { order_id, payment_id } = data

    // Get transaction record
    const transaction = await getTransactionByOrderId(order_id)
    if (!transaction) {
      console.error("❌ Transaction not found for order:", order_id)
      return
    }

    // Log payment event
    try {
      await logPaymentEvent(transaction.id, "PAYMENT_FAILED", data)
    } catch (error) {
      console.error("⚠️ Failed to log payment event:", error)
    }

    // Update transaction status
    await updateTransaction(transaction.id, {
      payment_id: payment_id || null,
      status: "failed",
      gateway_response: data,
    })

    console.log("✅ Transaction updated to failed")
    console.log("✅ Payment failure processed successfully")
  } catch (error) {
    console.error("❌ Error processing payment failure:", error)
  }
}

async function handlePaymentDropped(data: any) {
  try {
    console.log("=== Processing Payment Dropped ===")
    console.log("Payment dropped data:", data)

    const { order_id } = data

    // Get transaction record
    const transaction = await getTransactionByOrderId(order_id)
    if (!transaction) {
      console.error("❌ Transaction not found for order:", order_id)
      return
    }

    // Log payment event
    try {
      await logPaymentEvent(transaction.id, "PAYMENT_DROPPED", data)
    } catch (error) {
      console.error("⚠️ Failed to log payment event:", error)
    }

    // Update transaction status
    await updateTransaction(transaction.id, {
      status: "cancelled",
      gateway_response: data,
    })

    console.log("✅ Transaction updated to cancelled")
    console.log("✅ Payment dropped processed successfully")
  } catch (error) {
    console.error("❌ Error processing payment dropped:", error)
  }
}
