import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Exchange Rate API Request Started ===")

    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from") || "INR"
    const to = searchParams.get("to") || "USD"

    console.log("📊 Fetching exchange rate:", { from, to })

    // Mock exchange rates for demo purposes
    // In production, you'd fetch from a real API like CoinGecko, CryptoCompare, etc.
    const mockRates: Record<string, Record<string, number>> = {
      INR: {
        USD: 0.012,
        EUR: 0.011,
        BTC: 0.000000285,
        ETH: 0.0000043,
        USDT: 0.012,
      },
      USD: {
        INR: 83.25,
        EUR: 0.92,
        BTC: 0.000024,
        ETH: 0.00036,
        USDT: 1.0,
      },
      BTC: {
        INR: 3500000,
        USD: 42000,
        EUR: 38640,
        ETH: 15.2,
        USDT: 42000,
      },
      ETH: {
        INR: 230000,
        USD: 2760,
        EUR: 2540,
        BTC: 0.066,
        USDT: 2760,
      },
      USDT: {
        INR: 83.25,
        USD: 1.0,
        EUR: 0.92,
        BTC: 0.000024,
        ETH: 0.00036,
      },
    }

    const rate = mockRates[from]?.[to] || 1

    console.log("✅ Exchange rate retrieved:", { from, to, rate })

    return NextResponse.json({
      from,
      to,
      rate,
      timestamp: new Date().toISOString(),
      source: "mock", // In production, this would be the actual API source
      success: true,
    })
  } catch (error: any) {
    console.error("❌ Exchange rate API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to fetch exchange rate",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
