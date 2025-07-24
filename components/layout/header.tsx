"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, LogOut, Settings, CreditCard, Menu, X, Bot } from "lucide-react"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/auth"
import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Token Badge */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">ChatGem</h1>
            </Link>
            <Badge variant="secondary" className="flex items-center space-x-1 text-xs sm:text-sm">
              <Coins className="h-3 w-3" />
              <span className="hidden xs:inline">{user.tokens} tokens</span>
              <span className="xs:hidden">{user.tokens}</span>
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm">
                Chat
              </Button>
            </Link>
            <Link href="/purchase">
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="hidden xl:inline">Buy Tokens</span>
                <span className="xl:hidden">Buy</span>
              </Button>
            </Link>

            {user.is_admin && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden xl:inline">Admin</span>
                </Button>
              </Link>
            )}

            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden xl:inline">Sign Out</span>
            </Button>
          </div>

          {/* Mobile/Tablet Navigation */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Quick Buy Button for Mobile */}
            <Link href="/purchase" className="hidden sm:block">
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link
                href="/chat"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                💬 Chat with AI
              </Link>
              <Link
                href="/purchase"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                💳 Buy Tokens
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                📊 Dashboard
              </Link>

              {user.is_admin && (
                <Link
                  href="/admin"
                  className="block text-gray-600 hover:text-gray-900 transition-colors py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⚙️ Admin Panel
                </Link>
              )}

              <div className="pt-4 border-t">
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleSignOut()
                  }}
                  className="flex items-center w-full text-gray-600 hover:text-gray-900 transition-colors py-2 text-base font-medium"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>

              {/* User Info in Mobile Menu */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Signed in as:</span>
                  <span className="font-medium text-gray-900 truncate max-w-[150px]">{user.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                  <span>Available tokens:</span>
                  <Badge variant="secondary" className="text-xs">
                    <Coins className="h-3 w-3 mr-1" />
                    {user.tokens}
                  </Badge>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
