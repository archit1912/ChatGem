import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, getAllUsers, getAdminStats, isUserAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Admin Users API Request Started ===")

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

    // Get all users and stats
    const [users, stats] = await Promise.all([getAllUsers(), getAdminStats()])

    console.log(`✅ Retrieved ${users.length} users`)

    return NextResponse.json({
      users,
      stats,
      success: true,
    })
  } catch (error: any) {
    console.error("❌ Admin users API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve users",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
