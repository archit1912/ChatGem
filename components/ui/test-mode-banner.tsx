"use client"

import { Badge } from "@/components/ui/badge"
import { TestTube } from "lucide-react"
import { config } from "@/lib/config"

export function TestModeBanner() {
  // Remove test mode banner in production
  if (!config.isTestMode) return null

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <TestTube className="h-4 w-4 text-yellow-600" />
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            DEMO MODE ACTIVE
          </Badge>
        </div>
        <div className="text-center text-sm text-yellow-700">
          <div className="font-medium mb-1">Demo Credentials Available:</div>
          <div className="flex justify-center space-x-4 text-xs">
            <span>
              <strong>User:</strong> demo@example.com
            </span>
            <span>
              <strong>Admin:</strong> admin@example.com
            </span>
            <span>
              <strong>Password:</strong> anything
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
