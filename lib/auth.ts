import { config } from "./config"
import { TestModeAuth } from "./test-mode"
import * as SupabaseAuth from "./supabase"
import type { User } from "./supabase"

// Unified auth interface that works in both test and production modes
export class AuthManager {
  static async signUp(email: string, password: string) {
    if (config.testMode) {
      return TestModeAuth.signUp(email, password)
    }

    try {
      const data = await SupabaseAuth.signUpUser(email, password)
      return { user: data.user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  static async signIn(email: string, password: string) {
    if (config.testMode) {
      return TestModeAuth.signIn(email, password)
    }

    try {
      const data = await SupabaseAuth.signInUser(email, password)
      const user = await SupabaseAuth.getCurrentUser()
      return { user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  static async signOut() {
    if (config.testMode) {
      return TestModeAuth.signOut()
    }

    try {
      await SupabaseAuth.signOutUser()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    if (config.testMode) {
      return TestModeAuth.getCurrentUser()
    }

    try {
      return await SupabaseAuth.getCurrentUser()
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }

  static async useTokens(userId: string, tokensToUse: number): Promise<boolean> {
    try {
      if (config.testMode) {
        return TestModeAuth.useUserTokens(userId, tokensToUse)
      }
      return await SupabaseAuth.useUserTokens(userId, tokensToUse)
    } catch (error) {
      console.error("Use tokens error:", error)
      return false
    }
  }

  static async addTokens(userId: string, tokensToAdd: number): Promise<number | null> {
    if (config.testMode) {
      return TestModeAuth.addUserTokens(userId, tokensToAdd)
    }

    try {
      return await SupabaseAuth.addUserTokens(userId, tokensToAdd)
    } catch (error) {
      console.error("Add tokens error:", error)
      return null
    }
  }

  static async getMessages(userId: string) {
    if (config.testMode) {
      return TestModeAuth.getMessages(userId)
    }

    try {
      return await SupabaseAuth.getUserMessages(userId)
    } catch (error) {
      console.error("Get messages error:", error)
      return []
    }
  }

  static async addMessage(
    content: string,
    role: "user" | "assistant",
    userId: string,
    tokensUsed = 1,
    modelUsed = "gemini-1.5-pro",
  ) {
    if (config.testMode) {
      return TestModeAuth.addMessage({
        user_id: userId,
        content,
        role,
        tokens_used: tokensUsed,
        model_used: modelUsed,
      })
    }

    try {
      return await SupabaseAuth.addMessage({
        user_id: userId,
        content,
        role,
        tokens_used: tokensUsed,
        model_used: modelUsed,
      })
    } catch (error) {
      console.error("Add message error:", error)
      throw error
    }
  }

  static async clearMessages(userId: string) {
    if (config.testMode) {
      return TestModeAuth.clearMessages(userId)
    }

    try {
      return await SupabaseAuth.clearUserMessages(userId)
    } catch (error) {
      console.error("Clear messages error:", error)
      throw error
    }
  }

  static async getTransactions(userId: string) {
    if (config.testMode) {
      return TestModeAuth.getTransactions(userId)
    }

    try {
      return await SupabaseAuth.getUserTransactions(userId)
    } catch (error) {
      console.error("Get transactions error:", error)
      return []
    }
  }

  static async createTransaction(
    userId: string,
    orderId: string,
    amount: number,
    tokensPurchased: number,
    bonusTokens = 0,
    planName?: string,
  ) {
    if (config.testMode) {
      return TestModeAuth.createTransaction({
        user_id: userId,
        order_id: orderId,
        payment_id: null,
        cashfree_order_id: null,
        amount,
        tokens_purchased: tokensPurchased,
        bonus_tokens: bonusTokens,
        status: "pending",
        payment_method: null,
        gateway_response: null,
        plan_name: planName || null,
      })
    }

    try {
      return await SupabaseAuth.createTransaction({
        user_id: userId,
        order_id: orderId,
        payment_id: null,
        cashfree_order_id: null,
        amount,
        tokens_purchased: tokensPurchased,
        bonus_tokens: bonusTokens,
        status: "pending",
        payment_method: null,
        gateway_response: null,
        plan_name: planName || null,
      })
    } catch (error) {
      console.error("Create transaction error:", error)
      throw error
    }
  }

  static async updateTransaction(transactionId: string, updates: any) {
    if (config.testMode) {
      return TestModeAuth.updateTransaction(transactionId, updates)
    }

    try {
      return await SupabaseAuth.updateTransaction(transactionId, updates)
    } catch (error) {
      console.error("Update transaction error:", error)
      throw error
    }
  }

  static async getTransactionByOrderId(orderId: string) {
    if (config.testMode) {
      return TestModeAuth.getTransactionByOrderId(orderId)
    }

    try {
      return await SupabaseAuth.getTransactionByOrderId(orderId)
    } catch (error) {
      console.error("Get transaction by order ID error:", error)
      return null
    }
  }

  // Admin functions
  static async getAllUsers() {
    if (config.testMode) {
      return TestModeAuth.getAllUsers()
    }

    try {
      return await SupabaseAuth.getAllUsers()
    } catch (error) {
      console.error("Get all users error:", error)
      return []
    }
  }

  static async getAllTransactions() {
    if (config.testMode) {
      return TestModeAuth.getAllTransactions()
    }

    try {
      return await SupabaseAuth.getAllTransactions()
    } catch (error) {
      console.error("Get all transactions error:", error)
      return []
    }
  }

  static async getAdminStats() {
    if (config.testMode) {
      return TestModeAuth.getAdminStats()
    }

    try {
      return await SupabaseAuth.getAdminStats()
    } catch (error) {
      console.error("Get admin stats error:", error)
      return {
        totalUsers: 0,
        totalMessages: 0,
        totalTransactions: 0,
        totalRevenue: 0,
        totalTokensSold: 0,
      }
    }
  }

  static async isUserAdmin(userId: string): Promise<boolean> {
    if (config.testMode) {
      const user = TestModeAuth.getCurrentUser()
      return user?.is_admin || false
    }

    try {
      return await SupabaseAuth.isUserAdmin(userId)
    } catch (error) {
      console.error("Check admin status error:", error)
      return false
    }
  }
}

// Export convenience functions
export const signUp = AuthManager.signUp.bind(AuthManager)
export const signIn = AuthManager.signIn.bind(AuthManager)
export const signOut = AuthManager.signOut.bind(AuthManager)
export const getCurrentUser = AuthManager.getCurrentUser.bind(AuthManager)
export const useTokens = AuthManager.useTokens.bind(AuthManager)
export const addTokens = AuthManager.addTokens.bind(AuthManager)
export const getMessages = AuthManager.getMessages.bind(AuthManager)
export const addMessage = AuthManager.addMessage.bind(AuthManager)
export const clearMessages = AuthManager.clearMessages.bind(AuthManager)
export const getTransactions = AuthManager.getTransactions.bind(AuthManager)
export const createTransaction = AuthManager.createTransaction.bind(AuthManager)
export const updateTransaction = AuthManager.updateTransaction.bind(AuthManager)
export const getTransactionByOrderId = AuthManager.getTransactionByOrderId.bind(AuthManager)
export const getAllUsers = AuthManager.getAllUsers.bind(AuthManager)
export const getAllTransactions = AuthManager.getAllTransactions.bind(AuthManager)
export const getAdminStats = AuthManager.getAdminStats.bind(AuthManager)
export const isUserAdmin = AuthManager.isUserAdmin.bind(AuthManager)

// Export logout as alias for signOut for backward compatibility
export const logout = signOut

// Export types
export type { User } from "./supabase"
