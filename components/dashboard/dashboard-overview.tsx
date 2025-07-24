"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Coins, TrendingUp, Calendar, ArrowRight, Sparkles, Clock, CreditCard } from "lucide-react"
import type { User } from "@/lib/auth"

interface DashboardOverviewProps {
  user: User
  onTokenUpdate: (tokens: number) => void
}

export function DashboardOverview({ user, onTokenUpdate }: DashboardOverviewProps) {
  const getTokenStatus = () => {
    if (user.tokens === 0) return { color: "text-red-600", bg: "bg-red-50", text: "No tokens remaining" }
    if (user.tokens <= 10) return { color: "text-orange-600", bg: "bg-orange-50", text: "Low tokens" }
    if (user.tokens <= 50) return { color: "text-yellow-600", bg: "bg-yellow-50", text: "Running low" }
    return { color: "text-green-600", bg: "bg-green-50", text: "Good balance" }
  }

  const tokenStatus = getTokenStatus()

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-blue-100">Ready to chat with your ChatGem AI assistant?</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{user.tokens}</div>
            <div className="text-blue-100 text-sm">tokens remaining</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/chat">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Chatting
            </Button>
          </Link>
          {user.tokens <= 50 && (
            <Link href="/purchase">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <CreditCard className="h-4 w-4 mr-2" />
                Buy More Tokens
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.tokens}</div>
            <div className={`text-xs ${tokenStatus.color}`}>{tokenStatus.text}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Type</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.tokens > 10 ? "Pro" : "Free"}</div>
            <div className="text-xs text-muted-foreground">{user.is_admin ? "Admin User" : "Regular User"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs text-muted-foreground">Start your first conversation</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <div className="text-xs text-muted-foreground">Welcome to ChatGem!</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              Start Chatting
            </CardTitle>
            <CardDescription>
              Begin a conversation with your ChatGem AI assistant. Get help with work, study, or creative projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/chat">
              <Button className="w-full">
                Open Chat
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              Buy More Tokens
            </CardTitle>
            <CardDescription>
              Get 1000 tokens for ₹100. Never run out of conversations with your ChatGem AI assistant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/purchase">
              <Button variant="outline" className="w-full bg-transparent">
                Purchase Tokens
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Token Status Alert */}
      {user.tokens <= 10 && (
        <Card
          className={`border-l-4 ${user.tokens === 0 ? "border-red-500 bg-red-50" : "border-orange-500 bg-orange-50"}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className={`h-5 w-5 mr-3 ${user.tokens === 0 ? "text-red-600" : "text-orange-600"}`} />
                <div>
                  <h3 className={`font-semibold ${user.tokens === 0 ? "text-red-900" : "text-orange-900"}`}>
                    {user.tokens === 0 ? "No Tokens Remaining" : "Low Token Balance"}
                  </h3>
                  <p className={`text-sm ${user.tokens === 0 ? "text-red-700" : "text-orange-700"}`}>
                    {user.tokens === 0
                      ? "Purchase tokens to continue chatting with your ChatGem AI assistant."
                      : `You have ${user.tokens} tokens left. Consider purchasing more to avoid interruptions.`}
                  </p>
                </div>
              </div>
              <Link href="/purchase">
                <Button
                  size="sm"
                  className={user.tokens === 0 ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"}
                >
                  Buy Tokens
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin Panel Link */}
      {user.is_admin && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900">Admin Dashboard</h3>
                  <p className="text-sm text-purple-700">Manage users, view transactions, and monitor system usage.</p>
                </div>
              </div>
              <Link href="/admin">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Open Admin Panel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
