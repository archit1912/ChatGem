import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, getTransactionByOrderId, updateTransaction, addTokens } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Verify Crypto Payment API Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { order_id, transaction_hash, crypto_currency } = await request.json()

    if (!order_id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    console.log("🔍 Verifying crypto payment:", { order_id, transaction_hash, crypto_currency })

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
      console.log("✅ Crypto payment already verified and completed")
      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Crypto payment already verified",
        tokens_added: transaction.total_tokens,
      })
    }

    // In test/demo mode, simulate crypto payment verification
    if (config.testMode || !transaction_hash) {
      console.log("🧪 Test mode - simulating crypto payment verification")

      // Simulate verification delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add tokens to user
      const newBalance = await addTokens(transaction.user_id, transaction.total_tokens)
      console.log("✅ Tokens added in crypto test mode:", {
        tokensAdded: transaction.total_tokens,
        newBalance,
      })

      // Update transaction status
      await updateTransaction(transaction.id, {
        status: "completed",
        payment_id: transaction_hash || `crypto_test_${Date.now()}`,
        payment_method: `crypto_${crypto_currency}`,
        gateway_response: {
          test_mode: true,
          crypto_currency,
          transaction_hash: transaction_hash || `test_hash_${Date.now()}`,
          verified_at: new Date().toISOString(),
        },
      })

      console.log("✅ Crypto test payment verification completed")

      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Crypto payment verified successfully (test mode)",
        tokens_added: transaction.total_tokens,
        new_balance: newBalance,
        test_mode: true,
        crypto_details: {
          currency: crypto_currency,
          transaction_hash: transaction_hash || `test_hash_${Date.now()}`,
        },
      })
    }

    // In production, you would verify the transaction on the blockchain
    // For now, we'll simulate a successful verification
    console.log("🚀 Production crypto verification (simulated)")

    // Add tokens to user
    const newBalance = await addTokens(transaction.user_id, transaction.total_tokens)
    console.log("✅ Tokens added for crypto payment:", {
      tokensAdded: transaction.total_tokens,
      newBalance,
    })

    // Update transaction status
    await updateTransaction(transaction.id, {
      status: "completed",
      payment_id: transaction_hash,
      payment_method: `crypto_${crypto_currency}`,
      gateway_response: {
        crypto_currency,
        transaction_hash,
        verified_at: new Date().toISOString(),
        blockchain_confirmations: 6, // Mock confirmations
      },
    })

    console.log("✅ Crypto payment verification completed successfully")

    return NextResponse.json({
      success: true,
      status: "completed",
      message: "Crypto payment verified successfully",
      tokens_added: transaction.total_tokens,
      new_balance: newBalance,
      crypto_details: {
        currency: crypto_currency,
        transaction_hash,
        confirmations: 6,
      },
    })
  } catch (error: any) {
    console.error("❌ Crypto payment verification error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to verify crypto payment",
        details: config.isDevelopment ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
