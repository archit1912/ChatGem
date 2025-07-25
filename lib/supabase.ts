import { createClient } from "@supabase/supabase-js"
import { config } from "./config"

// Create Supabase client
export const supabase = createClient(config.supabase.url, config.supabase.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Create admin client for server-side operations
export const supabaseAdmin = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
export interface User {
  id: string
  email: string
  tokens: number
  is_admin: boolean
  last_free_reset: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  user_id: string
  content: string
  role: "user" | "assistant"
  tokens_used: number
  model_used: string
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  order_id: string
  payment_id: string | null
  cashfree_order_id: string | null
  amount: number
  tokens_purchased: number
  bonus_tokens: number
  total_tokens: number
  status: "pending" | "completed" | "failed" | "cancelled"
  payment_method: string | null
  gateway_response: any
  plan_name: string | null
  created_at: string
  updated_at: string
}

export interface PaymentLog {
  id: string
  transaction_id: string
  event_type: string
  event_data: any
  webhook_signature: string | null
  processed_at: string
}

// Auth functions
export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email: data.user.email,
        tokens: 10,
        is_admin: false,
        last_free_reset: new Date().toISOString().split("T")[0],
      },
    ])

    if (profileError) {
      console.error("Profile creation error:", profileError)
      // Don't throw here as the user was created successfully
    }
  }

  return data
}

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return profile
}

export async function getCurrentUserServer(): Promise<User | null> {
  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser()

  if (!user) return null

  const { data: profile, error } = await supabaseAdmin.from("users").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return profile
}

// Token management
export async function updateUserTokens(userId: string, tokens: number) {
  const { error } = await supabaseAdmin.rpc("add_tokens_to_user", {
    user_uuid: userId,
    tokens_to_add: tokens,
  })

  if (error) throw error
}

export async function addUserTokens(userId: string, tokensToAdd: number): Promise<number> {
  const { data, error } = await supabaseAdmin.rpc("add_tokens_to_user", {
    user_uuid: userId,
    tokens_to_add: tokensToAdd,
  })

  if (error) throw error
  return data
}

export async function useUserTokens(userId: string, tokensToUse: number): Promise<boolean> {
  const { data, error } = await supabaseAdmin.rpc("use_user_tokens", {
    user_uuid: userId,
    tokens_to_use: tokensToUse,
  })

  if (error) throw error
  return data
}

export async function resetDailyFreeTokens(): Promise<number> {
  const { data, error } = await supabaseAdmin.rpc("reset_daily_free_tokens")

  if (error) throw error
  return data
}

// Message management
export async function getUserMessages(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

export async function addMessage(message: Omit<Message, "id" | "created_at">): Promise<Message> {
  const { data, error } = await supabaseAdmin.from("messages").insert([message]).select().single()

  if (error) throw error
  return data
}

export async function clearUserMessages(userId: string): Promise<void> {
  const { error } = await supabaseAdmin.from("messages").delete().eq("user_id", userId)

  if (error) throw error
}

// Transaction management
export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "created_at" | "updated_at" | "total_tokens">,
): Promise<Transaction> {
  const { data, error } = await supabaseAdmin.from("transactions").insert([transaction]).select().single()

  if (error) throw error
  return data
}

export async function updateTransaction(transactionId: string, updates: Partial<Transaction>): Promise<Transaction> {
  const { data, error } = await supabaseAdmin
    .from("transactions")
    .update(updates)
    .eq("id", transactionId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getTransactionByOrderId(orderId: string): Promise<Transaction | null> {
  const { data, error } = await supabaseAdmin.from("transactions").select("*").eq("order_id", orderId).single()

  if (error) {
    if (error.code === "PGRST116") return null // Not found
    throw error
  }
  return data
}

// Payment logging
export async function logPaymentEvent(
  transactionId: string,
  eventType: string,
  eventData: any,
  webhookSignature?: string,
): Promise<PaymentLog> {
  const { data, error } = await supabaseAdmin
    .from("payment_logs")
    .insert([
      {
        transaction_id: transactionId,
        event_type: eventType,
        event_data: eventData,
        webhook_signature: webhookSignature,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Admin functions
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAllTransactions(): Promise<(Transaction & { users: { email: string } })[]> {
  const { data, error } = await supabaseAdmin
    .from("transactions")
    .select(
      `
      *,
      users (
        email
      )
    `,
    )
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAllMessages(): Promise<(Message & { users: { email: string } })[]> {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select(
      `
      *,
      users (
        email
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(1000) // Limit to prevent large queries

  if (error) throw error
  return data || []
}

export async function getUserStats(userId: string): Promise<any> {
  const { data, error } = await supabaseAdmin.rpc("get_user_stats", {
    user_uuid: userId,
  })

  if (error) throw error
  return data
}

export async function getAdminStats(): Promise<{
  totalUsers: number
  totalMessages: number
  totalTransactions: number
  totalRevenue: number
  totalTokensSold: number
}> {
  const [usersResult, messagesResult, transactionsResult] = await Promise.all([
    supabaseAdmin.from("users").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("messages").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("transactions").select("amount, total_tokens").eq("status", "completed"),
  ])

  if (usersResult.error) throw usersResult.error
  if (messagesResult.error) throw messagesResult.error
  if (transactionsResult.error) throw transactionsResult.error

  const completedTransactions = transactionsResult.data || []

  return {
    totalUsers: usersResult.count || 0,
    totalMessages: messagesResult.count || 0,
    totalTransactions: completedTransactions.length,
    totalRevenue: completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0),
    totalTokensSold: completedTransactions.reduce((sum, t) => sum + Number(t.total_tokens), 0),
  }
}

// Utility functions
export async function isUserAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin.from("users").select("is_admin").eq("id", userId).single()

  if (error) return false
  return data?.is_admin || false
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin.from("users").select("*").eq("email", email).single()

  if (error) {
    if (error.code === "PGRST116") return null // Not found
    throw error
  }
  return data
}

// Health check function
export async function healthCheck(): Promise<boolean> {
  try {
    const { error } = await supabase.from("users").select("id").limit(1)
    return !error
  } catch {
    return false
  }
}
