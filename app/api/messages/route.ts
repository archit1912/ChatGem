import { type NextRequest, NextResponse } from "next/server"
import { TestModeAuth } from "@/lib/test-mode"

export async function GET(request: NextRequest) {
  try {
    // Always use test mode in this environment
    const messages = TestModeAuth.getMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Messages API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
