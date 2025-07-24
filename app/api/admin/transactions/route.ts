import { type NextRequest, NextResponse } from "next/server"
import { testTransactions } from "@/lib/test-mode"

export async function GET(request: NextRequest) {
  try {
    // Always return mock transactions in this environment
    return NextResponse.json({ transactions: testTransactions })
  } catch (error) {
    console.error("Admin transactions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
