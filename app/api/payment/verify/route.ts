import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import crypto from "crypto"
import { config } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    // Always return success in test mode
    if (config.isTestMode) {
      return NextResponse.json({
        success: true,
        message: "Test payment successful! 1000 tokens added.",
      })
    }

    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", config.razorpay.keySecret)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Update transaction status
    const { error: transactionError } = await supabase
      .from("transactions")
      .update({
        razorpay_payment_id,
        status: "completed",
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("user_id", user.id)

    if (transactionError) {
      return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
    }

    // Add tokens to user account
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("tokens")
      .eq("id", user.id)
      .single()

    if (userError) {
      return NextResponse.json({ error: "Failed to get user data" }, { status: 500 })
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ tokens: userData.tokens + 1000 })
      .eq("id", user.id)

    if (updateError) {
      return NextResponse.json({ error: "Failed to add tokens" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
