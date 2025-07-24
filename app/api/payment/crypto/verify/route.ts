import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { TestModeAuth } from "@/lib/test-mode"

export async function POST(request: NextRequest) {
  try {
    const { orderId, transactionHash, tokens } = await request.json()

    if (!orderId || !transactionHash || !tokens) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Always return success in test mode
    if (config.isTestMode) {
      const currentUser = TestModeAuth.getCurrentUser()
      if (!currentUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Simulate verification delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock verification - in production, verify on blockchain
      const isValidTransaction = transactionHash.length > 10 // Simple mock validation

      if (isValidTransaction) {
        // Add tokens to user account
        const newTokens = currentUser.tokens + tokens
        TestModeAuth.updateTokens(newTokens)

        // Create mock transaction record
        const transaction = {
          id: `txn_${Date.now()}`,
          user_id: currentUser.id,
          amount: tokens * 0.1,
          tokens,
          currency: "USDT",
          status: "completed",
          transaction_hash: transactionHash,
          created_at: new Date().toISOString(),
        }

        return NextResponse.json({
          success: true,
          transaction,
          newTokenBalance: newTokens,
        })
      } else {
        return NextResponse.json({ error: "Invalid transaction hash" }, { status: 400 })
      }
    }

    // In production, this would verify the transaction on blockchain
    return NextResponse.json({ error: "Crypto verification not configured" }, { status: 501 })
  } catch (error: any) {
    console.error("Crypto verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
