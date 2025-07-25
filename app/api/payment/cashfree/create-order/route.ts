import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { config } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, tokens, plan_name } = body

    if (!amount || !tokens) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate unique order ID
    const orderId = `order_${user.id}_${Date.now()}`

    // Create Cashfree order data
    const orderData = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: user.id,
        customer_email: user.email,
        customer_phone: "9999999999", // Default phone for test
        customer_name: user.email.split("@")[0] || "Customer",
      },
      order_meta: {
        return_url: `${config.app.url}/payment/success?order_id=${orderId}`,
        notify_url: `${config.app.url}/api/payment/cashfree/webhook`,
        payment_methods: "cc,dc,upi,nb,wallet",
      },
      order_note: `ChatGem Token Purchase - ${tokens} tokens${plan_name ? ` (${plan_name})` : ""}`,
      order_tags: {
        user_id: user.id,
        tokens: tokens.toString(),
        plan_name: plan_name || "custom",
      },
    }

    console.log("Creating Cashfree order:", {
      orderId,
      amount,
      tokens,
      environment: config.cashfree.environment,
    })

    // Create Cashfree order
    const response = await fetch(`https://api.cashfree.com/pg/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": config.cashfree.apiVersion,
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
      body: JSON.stringify(orderData),
    })

    const result = await response.json()

    console.log("Cashfree API Response:", {
      status: response.status,
      ok: response.ok,
      result,
    })

    if (!response.ok) {
      console.error("Cashfree API Error:", result)
      return NextResponse.json(
        {
          error: "Payment gateway error",
          details: result.message || result.error_description || "Unknown error",
          code: result.error_code,
        },
        { status: 400 },
      )
    }

    // Return the payment session details
    return NextResponse.json({
      success: true,
      order_id: result.order_id,
      payment_session_id: result.payment_session_id,
      order_status: result.order_status,
      order_token: result.order_token,
      cashfree_order_id: result.cf_order_id,
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
