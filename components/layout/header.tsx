"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, Coins, CreditCard, Shield } from "lucide-react"
import type { User as UserType } from "@/lib/auth"
import { signOut } from "@/lib/auth"

interface HeaderProps {
  user: UserType
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    window.location.href = "/"
  }

  // Safe token handling with fallback
  const userTokens = user?.tokens ?? 0
  const userEmail = user?.email ?? "Unknown User"
  const isAdmin = user?.is_admin ?? false

  const getTokenStatus = () => {
    if (userTokens === 0) return { color: "bg-red-500", text: "0" }
    if (userTokens <= 10) return { color: "bg-orange-500", text: userTokens.toString() }
    if (userTokens <= 50) return { color: "bg-yellow-500", text: userTokens.toString() }
    return { color: "bg-green-500", text: userTokens.toString() }
  }

  const tokenStatus = getTokenStatus()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CG</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">ChatGem</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/chat" className="text-gray-600 hover:text-gray-900 transition-colors">
              Chat
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Token Badge */}
            <Link href="/pricing">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                <Coins className="h-3 w-3 mr-1" />
                <span className="hidden lg:inline">Tokens: </span>
                {userTokens}
              </Badge>
            </Link>

            {/* Buy Tokens Button */}
            {userTokens <= 50 && (
              <Link href="/pricing">
                <Button size="sm" variant="outline" className="hidden lg:flex bg-transparent">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy Tokens
                </Button>
              </Link>
            )}

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userEmail}</p>
                    <p className="text-xs text-muted-foreground">{userTokens} tokens remaining</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing" className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Tokens
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Token Badge */}
            <Link href="/pricing">
              <Badge variant="outline" className="cursor-pointer">
                <Coins className="h-3 w-3 mr-1" />
                {userTokens}
              </Badge>
            </Link>

            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="h-8 w-8">
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* User Info */}
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">{userEmail}</p>
                <p className="text-xs text-gray-600">{userTokens} tokens remaining</p>
              </div>

              {/* Navigation Links */}
              <Link
                href="/chat"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              {/* Buy Tokens Button */}
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy Tokens
                </Button>
              </Link>

              {/* Logout */}
              <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
