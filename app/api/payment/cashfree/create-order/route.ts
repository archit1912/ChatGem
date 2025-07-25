import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, tokens } = await request.json()

    if (!amount || !tokens || amount < 10) {
      return NextResponse.json({ error: "Invalid amount or tokens" }, { status: 400 })
    }

    // In test mode, return mock order
    if (config.isTestMode) {
      const mockOrder = {
        order_id: `test_order_${Date.now()}`,
        payment_session_id: `test_session_${Date.now()}`,
        order_amount: amount,
        order_currency: "INR",
        order_status: "ACTIVE",
        payment_link: `${config.app.url}/payment/success?order_id=test_order_${Date.now()}&payment_id=test_payment_${Date.now()}`,
      }

      return NextResponse.json({
        success: true,
        order: mockOrder,
        paymentUrl: mockOrder.payment_link,
      })
    }

    // Create Cashfree order
    const orderId = `chatgem_${user.id}_${Date.now()}`

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
      order_note: `ChatGem tokens purchase - ${tokens} tokens`,
    }

    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": config.cashfree.apiVersion,
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
      },
      body: JSON.stringify(orderData),
    })

    const order = await response.json()

    if (!response.ok) {
      console.error("Cashfree order creation failed:", order)
      return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
    }

    // Store transaction record (you might want to implement this with your database)
    // await storeTransaction({
    //   user_id: user.id,
    //   order_id: order.order_id,
    //   amount: amount,
    //   tokens_purchased: tokens,
    //   status: "pending",
    // })

    // Store order in database (test mode uses memory)
    if (config.isTestMode) {
      // In test mode, we'll store in memory or mock database
      console.log("Test order created:", order)
    } else {
      // In production, store in Supabase
      // TODO: Add Supabase order storage
    }

    return NextResponse.json({
      success: true,
      order,
      paymentUrl: order.payment_link,
    })
  } catch (error: any) {
    console.error("Error creating Cashfree order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
