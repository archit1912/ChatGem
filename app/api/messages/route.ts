import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, getMessages, clearMessages } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Messages API Request Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated:", { id: user.id, email: user.email })

    // Get user messages
    const messages = await getMessages(user.id)
    console.log(`✅ Retrieved ${messages.length} messages`)

    return NextResponse.json({
      messages,
      count: messages.length,
      user: {
        id: user.id,
        email: user.email,
        tokens: user.tokens,
      },
    })
  } catch (error: any) {
    console.error("❌ Messages API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve messages",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log("=== Clear Messages API Request Started ===")

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated:", { id: user.id, email: user.email })

    // Clear user messages
    await clearMessages(user.id)
    console.log("✅ Messages cleared for user")

    return NextResponse.json({
      success: true,
      message: "Messages cleared successfully",
    })
  } catch (error: any) {
    console.error("❌ Clear messages API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to clear messages",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
