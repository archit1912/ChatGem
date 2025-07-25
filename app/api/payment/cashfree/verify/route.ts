import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { order_id, payment_id } = await request.json()

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In test mode, simulate successful payment
    if (config.isTestMode) {
      return NextResponse.json({
        success: true,
        message: "Payment successful! Tokens have been added to your account.",
        order_id,
        payment_id,
      })
    }

    // Verify payment with Cashfree
    const response = await fetch(`https://api.cashfree.com/pg/orders/${order_id}/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
    })

    const paymentData = await response.json()

    if (!response.ok) {
      throw new Error("Failed to verify payment")
    }

    // Check if payment is successful
    const payment = paymentData.find((p: any) => p.cf_payment_id === payment_id)
    if (!payment || payment.payment_status !== "SUCCESS") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Update transaction status and add tokens to user account
    // You would implement this with your database
    // await updateTransaction(order_id, {
    //   payment_id,
    //   status: "completed",
    // })
    // await addTokensToUser(user.id, tokens)

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully!",
      order_id,
      payment_id,
    })
  } catch (error: any) {
    console.error("Cashfree verify payment error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
