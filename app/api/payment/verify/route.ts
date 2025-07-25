import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, getTransactionByOrderId, updateTransaction, addTokens } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Verify Payment API Started ===")

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    // Always return success in test mode
    if (config.isTestMode) {
      console.log("✅ Test payment successful - adding tokens")
      const user = await getCurrentUser()
      if (!user) {
        console.log("❌ No authenticated user found")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      const newBalance = await addTokens(user.id, 1000)
      console.log("✅ Tokens added:", { tokensAdded: 1000, newBalance })
      return NextResponse.json({
        success: true,
        message: "Test payment successful! 1000 tokens added.",
        new_balance: newBalance,
      })
    }

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { order_id, payment_id, status } = await request.json()

    if (!order_id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    console.log("🔍 Verifying payment:", { order_id, payment_id, status })

    // Get transaction record
    const transaction = await getTransactionByOrderId(order_id)
    if (!transaction) {
      console.log("❌ Transaction not found for order:", order_id)
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    console.log("✅ Transaction found:", {
      id: transaction.id,
      status: transaction.status,
      amount: transaction.amount,
      tokens: transaction.total_tokens,
    })

    // If already completed, return success
    if (transaction.status === "completed") {
      console.log("✅ Payment already verified and completed")
      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Payment already verified",
        tokens_added: transaction.total_tokens,
      })
    }

    // Handle different payment statuses
    if (status === "SUCCESS" || status === "PAID") {
      console.log("✅ Payment successful - adding tokens")

      // Add tokens to user
      const newBalance = await addTokens(transaction.user_id, transaction.total_tokens)
      console.log("✅ Tokens added:", {
        tokensAdded: transaction.total_tokens,
        newBalance,
      })

      // Update transaction status
      await updateTransaction(transaction.id, {
        status: "completed",
        payment_id: payment_id || null,
        gateway_response: {
          status,
          payment_id,
          verified_at: new Date().toISOString(),
        },
      })

      console.log("✅ Payment verification completed successfully")

      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Payment verified successfully",
        tokens_added: transaction.total_tokens,
        new_balance: newBalance,
      })
    } else if (status === "PENDING" || status === "ACTIVE") {
      console.log("⏳ Payment still pending")
      return NextResponse.json({
        success: false,
        status: "pending",
        message: "Payment is still being processed",
      })
    } else {
      console.log("❌ Payment failed:", status)

      // Update transaction status
      await updateTransaction(transaction.id, {
        status: "failed",
        gateway_response: {
          status,
          payment_id,
          failed_at: new Date().toISOString(),
        },
      })

      return NextResponse.json({
        success: false,
        status: "failed",
        message: "Payment was not successful",
        details: status,
      })
    }
  } catch (error: any) {
    console.error("❌ Payment verification error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to verify payment",
        details: config.isDevelopment ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
