// Pure test mode implementation without any external dependencies
export interface TestUser {
  id: string
  email: string
  tokens: number
  is_admin: boolean
  created_at: string
  last_free_reset: string
}

export interface TestMessage {
  id: string
  user_id: string
  content: string
  role: "user" | "assistant"
  created_at: string
}

export interface TestTransaction {
  id: string
  user_id: string
  razorpay_payment_id: string
  razorpay_order_id: string
  amount: number
  tokens_purchased: number
  status: string
  created_at: string
  users: { email: string }
}

// Test data
export const testUsers: TestUser[] = [
  {
    id: "test-user-1",
    email: "demo@example.com",
    tokens: 150,
    is_admin: false,
    created_at: new Date().toISOString(),
    last_free_reset: new Date().toISOString().split("T")[0],
  },
  {
    id: "test-admin-1",
    email: "admin@example.com",
    tokens: 1000,
    is_admin: true,
    created_at: new Date().toISOString(),
    last_free_reset: new Date().toISOString().split("T")[0],
  },
]

export const testMessages: TestMessage[] = [
  {
    id: "msg-1",
    user_id: "test-user-1",
    content: "Hello! How are you?",
    role: "user",
    created_at: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: "msg-2",
    user_id: "test-user-1",
    content: "Hello! I'm doing great, thank you for asking. How can I help you today?",
    role: "assistant",
    created_at: new Date(Date.now() - 30000).toISOString(),
  },
]

export const testTransactions: TestTransaction[] = [
  {
    id: "txn-1",
    user_id: "test-user-1",
    razorpay_payment_id: "pay_test123",
    razorpay_order_id: "order_test123",
    amount: 10000,
    tokens_purchased: 1000,
    status: "completed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    users: { email: "demo@example.com" },
  },
]

// Test mode storage helpers
const STORAGE_KEY = "test_user"
const MESSAGES_KEY = "test_messages"

export class TestModeAuth {
  static getCurrentUser(): TestUser | null {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  }

  static setCurrentUser(user: TestUser | null): void {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  static async signIn(email: string, password: string): Promise<{ user: TestUser }> {
    // Find existing test user or create new one
    let user = testUsers.find((u) => u.email === email)

    if (!user) {
      user = {
        id: `test-user-${Date.now()}`,
        email,
        tokens: email === "admin@example.com" ? 1000 : 150,
        is_admin: email === "admin@example.com",
        created_at: new Date().toISOString(),
        last_free_reset: new Date().toISOString().split("T")[0],
      }
    }

    this.setCurrentUser(user)
    return { user }
  }

  static async signUp(email: string, password: string): Promise<{ user: TestUser }> {
    const user: TestUser = {
      id: `test-user-${Date.now()}`,
      email,
      tokens: 10,
      is_admin: false,
      created_at: new Date().toISOString(),
      last_free_reset: new Date().toISOString().split("T")[0],
    }

    this.setCurrentUser(user)
    return { user }
  }

  static async signOut(): Promise<void> {
    this.setCurrentUser(null)
    localStorage.removeItem(MESSAGES_KEY)
  }

  static updateTokens(tokens: number): void {
    const user = this.getCurrentUser()
    if (user) {
      user.tokens = tokens
      this.setCurrentUser(user)
    }
  }

  static getMessages(): TestMessage[] {
    if (typeof window === "undefined") return testMessages
    const stored = localStorage.getItem(MESSAGES_KEY)
    return stored ? JSON.parse(stored) : testMessages
  }

  static addMessage(message: TestMessage): TestMessage[] {
    const messages = this.getMessages()
    const newMessages = [...messages, message]
    if (typeof window !== "undefined") {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMessages))
    }
    return newMessages
  }
}
