import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, fetch real exchange rates from API like CoinGecko, CoinMarketCap, etc.
    // For demo purposes, return mock rates

    const mockRates = {
      USDT_INR: 84.5,
      BTC_INR: 3650000,
      ETH_INR: 280000,
      lastUpdated: new Date().toISOString(),
    }

    // In production, you might fetch from:
    // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,bitcoin,ethereum&vs_currencies=inr')
    // const data = await response.json()

    return NextResponse.json({
      rates: mockRates,
      success: true,
    })
  } catch (error: any) {
    console.error("Exchange rate fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 })
  }
}
