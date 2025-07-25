import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { amount, tokens } = await request.json()

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In test mode, return mock order
    if (config.isTestMode) {
      const mockOrder = {
        order_id: `CF_ORDER_${Date.now()}`,
        payment_session_id: `session_${Date.now()}`,
        order_amount: amount,
        order_currency: "INR",
        order_status: "ACTIVE",
        payment_link: `https://payments-test.cashfree.com/pay/${Date.now()}`,
      }
      return NextResponse.json(mockOrder)
    }

    // Create Cashfree order
    const orderData = {
      order_id: `CF_ORDER_${Date.now()}`,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: user.id,
        customer_email: user.email,
        customer_phone: "9999999999", // You might want to collect this
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/cashfree/webhook`,
      },
    }

    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
      body: JSON.stringify(orderData),
    })

    const order = await response.json()

    if (!response.ok) {
      throw new Error(order.message || "Failed to create Cashfree order")
    }

    // Store transaction record (you might want to implement this with your database)
    // await storeTransaction({
    //   user_id: user.id,
    //   order_id: order.order_id,
    //   amount: amount,
    //   tokens_purchased: tokens,
    //   status: "pending",
    // })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Cashfree create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
