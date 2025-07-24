"use client"

import { config } from "@/lib/config"

export function DemoInfo() {
  // Remove demo info in production
  if (!config.isTestMode) return null

  return null // Completely hidden now
}
