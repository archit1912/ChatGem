"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { getCurrentUser, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, MessageSquare, TrendingUp } from "lucide-react"

interface AdminUser {
  id: string
  email: string
  tokens: number
  is_admin: boolean
  created_at: string
  messages: { count: number }[]
}

interface Transaction {
  id: string
  amount: number
  tokens_purchased: number
  status: string
  created_at: string
  users: { email: string }
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        if (!currentUser.is_admin) {
          router.push("/chat")
          return
        }
        setUser(currentUser)
        await loadAdminData()
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Error checking user:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const loadAdminData = async () => {
    try {
      // Load users
      const usersResponse = await fetch("/api/admin/users")
      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(usersData.users)
      }

      // Load transactions
      const transactionsResponse = await fetch("/api/admin/transactions")
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData.transactions)
      }
    } catch (error) {
      console.error("Error loading admin data:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalUsers = users.length
  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0) / 100
  const totalMessages = users.reduce((sum, u) => sum + (u.messages[0]?.count || 0), 0)
  const activeUsers = users.filter((u) => (u.messages[0]?.count || 0) > 0).length

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, transactions, and monitor system usage</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">{activeUsers} active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter((t) => t.status === "completed").length} transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages}</div>
              <p className="text-xs text-muted-foreground">Across all users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Messages/User</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers > 0 ? Math.round(totalMessages / totalUsers) : 0}</div>
              <p className="text-xs text-muted-foreground">Per user average</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.email}</span>
                          {user.is_admin && <Badge variant="secondary">Admin</Badge>}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{user.tokens} tokens</div>
                        <div className="text-sm text-gray-600">{user.messages[0]?.count || 0} messages</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{transaction.users.email}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {new Date(transaction.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{transaction.amount / 100}</div>
                        <div className="text-sm text-gray-600">{transaction.tokens_purchased} tokens</div>
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="mt-1">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
