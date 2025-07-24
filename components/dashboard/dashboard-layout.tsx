"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Home, MessageSquare, CreditCard, History, Settings, LogOut, Menu, X, Coins, Shield } from "lucide-react"
import { signOut } from "@/lib/auth"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Buy Tokens", href: "/purchase", icon: CreditCard },
  { name: "History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <Link href="/" className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ChatBot AI</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ChatBot AI</span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{user.tokens} tokens</span>
                </div>
                {user.is_admin && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">Signed in as</div>
                <div className="text-sm font-medium text-gray-900 truncate">{user.email}</div>
              </div>

              <Button variant="ghost" size="sm" className="w-full mt-4 justify-start" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-600">
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">ChatBot AI</span>
            </Link>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Coins className="h-3 w-3 mr-1" />
                {user.tokens}
              </Badge>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
