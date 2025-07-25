import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, getAllTransactions, isUserAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Admin Transactions API Request Started ===")

    // Get current user and check admin status
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isAdmin = await isUserAdmin(user.id)
    if (!isAdmin) {
      console.log("❌ User is not admin:", user.email)
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    console.log("✅ Admin user authenticated:", user.email)

    // Get all transactions
    const transactions = await getAllTransactions()
    console.log(`✅ Retrieved ${transactions.length} transactions`)

    // Calculate statistics
    const stats = {
      totalTransactions: transactions.length,
      completedTransactions: transactions.filter((t) => t.status === "completed").length,
      pendingTransactions: transactions.filter((t) => t.status === "pending").length,
      failedTransactions: transactions.filter((t) => t.status === "failed").length,
      totalRevenue: transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + Number(t.amount), 0),
      totalTokensSold: transactions
        .filter((t) => t.status === "completed")
        .reduce((sum, t) => sum + Number(t.total_tokens), 0),
    }

    return NextResponse.json({
      transactions,
      stats,
      success: true,
    })
  } catch (error: any) {
    console.error("❌ Admin transactions API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve transactions",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
