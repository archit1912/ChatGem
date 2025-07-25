import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser, createTransaction } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== Create Cashfree Order API Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated:", { id: user.id, email: user.email })

    const { amount, tokens, plan } = await request.json()

    // Validate input
    if (!amount || !tokens || amount <= 0 || tokens <= 0) {
      return NextResponse.json({ error: "Invalid amount or tokens" }, { status: 400 })
    }

    console.log("📝 Order details:", { amount, tokens, plan, user: user.email })

    // Calculate bonus tokens
    const bonusTokens =
      amount >= config.pricing.bonusThreshold ? Math.floor(tokens * (config.pricing.bonusPercentage / 100)) : 0
    const totalTokens = tokens + bonusTokens

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("💰 Token calculation:", {
      baseTokens: tokens,
      bonusTokens,
      totalTokens,
      orderId,
    })

    // In test mode, return mock order data
    if (config.testMode) {
      console.log("🧪 Test mode - creating mock order")

      // Create transaction record
      const transaction = await createTransaction(user.id, orderId, amount, tokens, bonusTokens, plan)

      console.log("✅ Test transaction created:", transaction.id)

      return NextResponse.json({
        order_id: orderId,
        payment_session_id: `test_session_${orderId}`,
        amount: amount,
        currency: "INR",
        tokens: totalTokens,
        test_mode: true,
        success: true,
      })
    }

    // Production mode - create actual Cashfree order
    const orderData = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: user.id,
        customer_email: user.email,
        customer_phone: "9999999999", // Default phone for now
      },
      order_meta: {
        return_url: `${config.app.url}/payment/success?order_id=${orderId}`,
        notify_url: `${config.app.url}/api/payment/cashfree/webhook`,
      },
      order_tags: {
        user_id: user.id,
        tokens: totalTokens.toString(),
        plan: plan || "custom",
        bonus_tokens: bonusTokens.toString(),
      },
    }

    console.log("🚀 Creating Cashfree order:", orderData)

    const response = await fetch(`${config.cashfree.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": config.cashfree.apiVersion,
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
      body: JSON.stringify(orderData),
    })

    const responseData = await response.json()
    console.log("📦 Cashfree response:", responseData)

    if (!response.ok) {
      console.error("❌ Cashfree order creation failed:", responseData)
      return NextResponse.json(
        {
          error: "Failed to create payment order",
          details: responseData.message || "Unknown error",
        },
        { status: 400 },
      )
    }

    // Create transaction record
    const transaction = await createTransaction(user.id, orderId, amount, tokens, bonusTokens, plan)

    console.log("✅ Transaction created:", transaction.id)
    console.log("✅ Order created successfully")

    return NextResponse.json({
      order_id: orderId,
      payment_session_id: responseData.payment_session_id,
      amount: amount,
      currency: "INR",
      tokens: totalTokens,
      cashfree_order_id: responseData.cf_order_id,
      success: true,
    })
  } catch (error: any) {
    console.error("❌ Create order error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to create payment order",
        details: config.isDevelopment ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
