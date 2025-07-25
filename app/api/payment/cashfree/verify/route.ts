import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, getTransactionByOrderId, updateTransaction, addTokens } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Verify Cashfree Payment API Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { order_id } = await request.json()

    if (!order_id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    console.log("🔍 Verifying payment for order:", order_id)

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

    // In test mode, simulate successful payment
    if (config.testMode) {
      console.log("🧪 Test mode - simulating payment verification")

      // Add tokens to user
      const newBalance = await addTokens(transaction.user_id, transaction.total_tokens)
      console.log("✅ Tokens added in test mode:", {
        tokensAdded: transaction.total_tokens,
        newBalance,
      })

      // Update transaction status
      await updateTransaction(transaction.id, {
        status: "completed",
        payment_id: `test_payment_${Date.now()}`,
        payment_method: "test",
        gateway_response: {
          test_mode: true,
          verified_at: new Date().toISOString(),
        },
      })

      console.log("✅ Test payment verification completed")

      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Payment verified successfully (test mode)",
        tokens_added: transaction.total_tokens,
        new_balance: newBalance,
        test_mode: true,
      })
    }

    // Production mode - verify with Cashfree
    console.log("🚀 Production mode - verifying with Cashfree")

    const verifyResponse = await fetch(`${config.cashfree.baseUrl}/orders/${order_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": config.cashfree.apiVersion,
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
    })

    const verifyData = await verifyResponse.json()
    console.log("📦 Cashfree verification response:", verifyData)

    if (!verifyResponse.ok) {
      console.error("❌ Payment verification failed:", verifyData)
      return NextResponse.json(
        {
          error: "Payment verification failed",
          details: verifyData.message || "Unknown error",
        },
        { status: 400 },
      )
    }

    // Check payment status
    if (verifyData.order_status === "PAID") {
      console.log("✅ Payment confirmed by Cashfree")

      // Add tokens to user
      const newBalance = await addTokens(transaction.user_id, transaction.total_tokens)
      console.log("✅ Tokens added:", {
        tokensAdded: transaction.total_tokens,
        newBalance,
      })

      // Update transaction status
      await updateTransaction(transaction.id, {
        status: "completed",
        payment_id: verifyData.cf_payment_id || null,
        cashfree_order_id: verifyData.cf_order_id || null,
        payment_method: verifyData.payment_method || null,
        gateway_response: verifyData,
      })

      console.log("✅ Payment verification completed successfully")

      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Payment verified successfully",
        tokens_added: transaction.total_tokens,
        new_balance: newBalance,
        payment_details: {
          payment_id: verifyData.cf_payment_id,
          payment_method: verifyData.payment_method,
          amount: verifyData.order_amount,
        },
      })
    } else if (verifyData.order_status === "ACTIVE") {
      console.log("⏳ Payment still pending")
      return NextResponse.json({
        success: false,
        status: "pending",
        message: "Payment is still being processed",
      })
    } else {
      console.log("❌ Payment failed or cancelled:", verifyData.order_status)

      // Update transaction status
      await updateTransaction(transaction.id, {
        status: "failed",
        gateway_response: verifyData,
      })

      return NextResponse.json({
        success: false,
        status: "failed",
        message: "Payment was not successful",
        details: verifyData.order_status,
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
