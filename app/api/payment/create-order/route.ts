import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { config } from "@/lib/config"

const razorpay = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret,
})

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    // Always return mock order in this environment
    const mockOrder = {
      id: `order_test_${Date.now()}`,
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      status: "created",
    }
    return NextResponse.json(mockOrder)

    // In test mode, return mock order
    // if (config.isTestMode) {
    //   const mockOrder = {
    //     id: `order_test_${Date.now()}`,
    //     amount: amount,
    //     currency: "INR",
    //     receipt: `receipt_${Date.now()}`,
    //     status: "created",
    //   }
    //   return NextResponse.json(mockOrder)
    // }

    // const supabase = createServerClient()
    // const {
    //   data: { user },
    //   error: authError,
    // } = await supabase.auth.getUser()

    // if (authError || !user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // const options = {
    //   amount: amount, // amount in paise
    //   currency: "INR",
    //   receipt: `receipt_${Date.now()}`,
    // }

    // const order = await razorpay.orders.create(options)

    // // Save transaction record
    // const { error: transactionError } = await supabase.from("transactions").insert([
    //   {
    //     user_id: user.id,
    //     razorpay_order_id: order.id,
    //     amount: amount,
    //     tokens_purchased: 1000,
    //     status: "pending",
    //   },
    // ])

    // if (transactionError) {
    //   return NextResponse.json({ error: "Failed to create transaction record" }, { status: 500 })
    // }

    // return NextResponse.json(order)
  } catch (error: any) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
