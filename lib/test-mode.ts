import { config } from "./config"
import type { User, Message, Transaction } from "./supabase"

// Test mode authentication and data management
export class TestModeAuth {
  private static readonly STORAGE_KEYS = {
    CURRENT_USER: "chatgem_test_current_user",
    USERS: "chatgem_test_users",
    MESSAGES: "chatgem_test_messages",
    TRANSACTIONS: "chatgem_test_transactions",
    SESSION: "chatgem_test_session",
  }

  // Initialize test data
  static init() {
    if (typeof window === "undefined") return

    // Initialize users if not exists
    const existingUsers = this.getStoredUsers()
    if (existingUsers.length === 0) {
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(config.testUsers))
    }

    // Initialize empty arrays for other data
    if (!localStorage.getItem(this.STORAGE_KEYS.MESSAGES)) {
      localStorage.setItem(this.STORAGE_KEYS.MESSAGES, JSON.stringify([]))
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)) {
      localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify([]))
    }
  }

  // User management
  static async signUp(email: string, password: string) {
    this.init()

    const users = this.getStoredUsers()
    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      return { user: null, error: "User already exists" }
    }

    const newUser: User = {
      id: `test-user-${Date.now()}`,
      email,
      tokens: 10,
      is_admin: false,
      last_free_reset: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users))

    // Set as current user
    this.setCurrentUser(newUser)

    return { user: newUser, error: null }
  }

  static async signIn(email: string, password: string) {
    this.init()

    const users = this.getStoredUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      return { user: null, error: "User not found" }
    }

    // Set as current user
    this.setCurrentUser(user)

    return { user, error: null }
  }

  static async signOut() {
    if (typeof window === "undefined") return

    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER)
    localStorage.removeItem(this.STORAGE_KEYS.SESSION)
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    this.init()

    const userStr = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER)
    if (!userStr) return null

    try {
      const user = JSON.parse(userStr)

      // Check if we need to reset daily tokens
      const today = new Date().toISOString().split("T")[0]
      if (user.last_free_reset !== today && user.tokens < 10) {
        user.tokens = Math.max(user.tokens, 10)
        user.last_free_reset = today
        user.updated_at = new Date().toISOString()

        // Update in storage
        this.updateUser(user.id, {
          tokens: user.tokens,
          last_free_reset: user.last_free_reset,
          updated_at: user.updated_at,
        })
        this.setCurrentUser(user)
      }

      return user
    } catch {
      return null
    }
  }

  // Token management
  static async useUserTokens(userId: string, tokensToUse: number): Promise<boolean> {
    const users = this.getStoredUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) return false

    const user = users[userIndex]
    if (user.tokens < tokensToUse) return false

    user.tokens -= tokensToUse
    user.updated_at = new Date().toISOString()
    users[userIndex] = user

    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users))

    // Update current user if it's the same
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(user)
    }

    return true
  }

  static async addUserTokens(userId: string, tokensToAdd: number): Promise<number | null> {
    const users = this.getStoredUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) return null

    const user = users[userIndex]
    user.tokens += tokensToAdd
    user.updated_at = new Date().toISOString()
    users[userIndex] = user

    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users))

    // Update current user if it's the same
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(user)
    }

    return user.tokens
  }

  static async updateUserTokens(userId: string, tokens: number): Promise<void> {
    const users = this.getStoredUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) return

    const user = users[userIndex]
    user.tokens = tokens
    user.updated_at = new Date().toISOString()
    users[userIndex] = user

    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users))

    // Update current user if it's the same
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(user)
    }
  }

  // Message management
  static getMessages(userId: string): Message[] {
    if (typeof window === "undefined") return []

    const messagesStr = localStorage.getItem(this.STORAGE_KEYS.MESSAGES)
    if (!messagesStr) return []

    try {
      const allMessages = JSON.parse(messagesStr)
      return allMessages
        .filter((m: Message) => m.user_id === userId)
        .sort((a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } catch {
      return []
    }
  }

  static async addMessage(message: Omit<Message, "id" | "created_at">): Promise<Message> {
    if (typeof window === "undefined") throw new Error("Not in browser environment")

    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
    }

    const messagesStr = localStorage.getItem(this.STORAGE_KEYS.MESSAGES)
    const messages = messagesStr ? JSON.parse(messagesStr) : []
    messages.push(newMessage)

    localStorage.setItem(this.STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
    return newMessage
  }

  static async clearMessages(userId: string): Promise<void> {
    if (typeof window === "undefined") return

    const messagesStr = localStorage.getItem(this.STORAGE_KEYS.MESSAGES)
    if (!messagesStr) return

    try {
      const allMessages = JSON.parse(messagesStr)
      const filteredMessages = allMessages.filter((m: Message) => m.user_id !== userId)
      localStorage.setItem(this.STORAGE_KEYS.MESSAGES, JSON.stringify(filteredMessages))
    } catch {
      // If parsing fails, just clear all messages
      localStorage.setItem(this.STORAGE_KEYS.MESSAGES, JSON.stringify([]))
    }
  }

  // Transaction management
  static getTransactions(userId: string): Transaction[] {
    if (typeof window === "undefined") return []

    const transactionsStr = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)
    if (!transactionsStr) return []

    try {
      const allTransactions = JSON.parse(transactionsStr)
      return allTransactions
        .filter((t: Transaction) => t.user_id === userId)
        .sort((a: Transaction, b: Transaction) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } catch {
      return []
    }
  }

  static async createTransaction(
    transaction: Omit<Transaction, "id" | "created_at" | "updated_at" | "total_tokens">,
  ): Promise<Transaction> {
    if (typeof window === "undefined") throw new Error("Not in browser environment")

    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      total_tokens: transaction.tokens_purchased + transaction.bonus_tokens,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const transactionsStr = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)
    const transactions = transactionsStr ? JSON.parse(transactionsStr) : []
    transactions.push(newTransaction)

    localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
    return newTransaction
  }

  static async updateTransaction(transactionId: string, updates: Partial<Transaction>): Promise<Transaction | null> {
    if (typeof window === "undefined") return null

    const transactionsStr = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)
    if (!transactionsStr) return null

    try {
      const transactions = JSON.parse(transactionsStr)
      const transactionIndex = transactions.findIndex((t: Transaction) => t.id === transactionId)

      if (transactionIndex === -1) return null

      const updatedTransaction = {
        ...transactions[transactionIndex],
        ...updates,
        updated_at: new Date().toISOString(),
      }

      // Recalculate total_tokens if needed
      if (updates.tokens_purchased !== undefined || updates.bonus_tokens !== undefined) {
        updatedTransaction.total_tokens = updatedTransaction.tokens_purchased + updatedTransaction.bonus_tokens
      }

      transactions[transactionIndex] = updatedTransaction
      localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))

      return updatedTransaction
    } catch {
      return null
    }
  }

  static async getTransactionByOrderId(orderId: string): Promise<Transaction | null> {
    if (typeof window === "undefined") return null

    const transactionsStr = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)
    if (!transactionsStr) return null

    try {
      const transactions = JSON.parse(transactionsStr)
      return transactions.find((t: Transaction) => t.order_id === orderId) || null
    } catch {
      return null
    }
  }

  // Admin functions
  static getAllUsers(): User[] {
    return this.getStoredUsers()
  }

  static getAllTransactions(): (Transaction & { users: { email: string } })[] {
    if (typeof window === "undefined") return []

    const transactionsStr = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)
    if (!transactionsStr) return []

    try {
      const transactions = JSON.parse(transactionsStr)
      const users = this.getStoredUsers()

      return transactions
        .map((t: Transaction) => {
          const user = users.find((u) => u.id === t.user_id)
          return {
            ...t,
            users: { email: user?.email || "Unknown" },
          }
        })
        .sort((a: Transaction, b: Transaction) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } catch {
      return []
    }
  }

  static async getAdminStats() {
    const users = this.getAllUsers()
    const transactions = this.getAllTransactions()
    const messages = this.getAllMessages()

    const completedTransactions = transactions.filter((t) => t.status === "completed")

    return {
      totalUsers: users.length,
      totalMessages: messages.length,
      totalTransactions: transactions.length,
      totalRevenue: completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0),
      totalTokensSold: completedTransactions.reduce((sum, t) => sum + Number(t.total_tokens), 0),
    }
  }

  // Helper methods
  private static getStoredUsers(): User[] {
    if (typeof window === "undefined") return []

    const usersStr = localStorage.getItem(this.STORAGE_KEYS.USERS)
    if (!usersStr) return []

    try {
      return JSON.parse(usersStr)
    } catch {
      return []
    }
  }

  private static getAllMessages(): Message[] {
    if (typeof window === "undefined") return []

    const messagesStr = localStorage.getItem(this.STORAGE_KEYS.MESSAGES)
    if (!messagesStr) return []

    try {
      return JSON.parse(messagesStr)
    } catch {
      return []
    }
  }

  private static setCurrentUser(user: User) {
    if (typeof window === "undefined") return

    localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))

    // Set session
    const session = {
      user_id: user.id,
      expires_at: new Date(Date.now() + config.security.sessionDuration).toISOString(),
      created_at: new Date().toISOString(),
    }
    localStorage.setItem(this.STORAGE_KEYS.SESSION, JSON.stringify(session))
  }

  private static updateUser(userId: string, updates: Partial<User>) {
    const users = this.getStoredUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users))
    }
  }
}

// Initialize test mode when module loads
if (typeof window !== "undefined") {
  TestModeAuth.init()
}
