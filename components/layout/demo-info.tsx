"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, UserIcon, MessageSquare, CreditCard, Shield, X, TestTube } from "lucide-react"
import { config } from "@/lib/config"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/supabase"

interface DemoInfoProps {
  className?: string
}

export default function DemoInfo({ className }: DemoInfoProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Failed to get current user:", error)
      }
    }

    checkUser()
  }, [])

  if (!isVisible || !config.testMode) {
    return null
  }

  const demoFeatures = [
    {
      icon: <UserIcon className="h-4 w-4" />,
      title: "Demo Authentication",
      description: "Sign in with demo@example.com (any password)",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      title: "AI Chat Testing",
      description: "Test AI responses with fallback mode",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      title: "Payment Simulation",
      description: "Test payment flows without real transactions",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Admin Dashboard",
      description: "Access admin features with admin@example.com",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ]

  return (
    <Card className={`border-yellow-200 bg-yellow-50 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg text-yellow-800">Demo Mode Active</CardTitle>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
              Development
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-yellow-700">
          You're using ChatGem in demo mode. All data is stored locally and payments are simulated.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current User Status */}
        {user && (
          <div className="bg-white/50 rounded-lg p-3 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-yellow-800">Signed in as: {user.email}</p>
                <p className="text-sm text-yellow-600">
                  Tokens: {user.tokens} | Admin: {user.is_admin ? "Yes" : "No"}
                </p>
              </div>
              <Badge variant={user.is_admin ? "default" : "secondary"}>{user.is_admin ? "Admin" : "User"}</Badge>
            </div>
          </div>
        )}

        {/* Demo Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {demoFeatures.map((feature, index) => (
            <div key={index} className={`p-3 rounded-lg border ${feature.color}`}>
              <div className="flex items-start gap-2">
                {feature.icon}
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs opacity-80">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-yellow-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/auth")}
            className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          >
            <UserIcon className="h-3 w-3 mr-1" />
            Demo Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/chat")}
            className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Try Chat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/purchase")}
            className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          >
            <CreditCard className="h-3 w-3 mr-1" />
            Test Payment
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/admin")}
            className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          >
            <Shield className="h-3 w-3 mr-1" />
            Admin Panel
          </Button>
        </div>

        {/* Production Note */}
        <div className="bg-white/30 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-700">
              <p className="font-medium">Ready for Production?</p>
              <p className="text-xs opacity-90">
                Set up your Supabase database, configure environment variables, and disable test mode.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
