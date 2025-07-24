import { type NextRequest, NextResponse } from "next/server"
import { testUsers } from "@/lib/test-mode"

export async function GET(request: NextRequest) {
  try {
    // Always return mock users in this environment
    const mockUsers = testUsers.map((user) => ({
      ...user,
      messages: [{ count: Math.floor(Math.random() * 50) + 1 }],
    }))
    return NextResponse.json({ users: mockUsers })
  } catch (error) {
    console.error("Admin users API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
