"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TestTube, X, Settings, Database, CreditCard } from "lucide-react"
import { config } from "@/lib/config"

export default function TestModeBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!config.testMode || !isVisible) {
    return null
  }

  return (
    <Alert className="border-yellow-200 bg-yellow-50 mb-4">
      <TestTube className="h-4 w-4 text-yellow-600" />
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <AlertDescription className="text-yellow-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Development Mode Active</span>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                Test Environment
              </Badge>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  Data stored locally
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Payments simulated
                </span>
                <span className="flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  AI fallback enabled
                </span>
              </div>
            </div>
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 ml-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}
