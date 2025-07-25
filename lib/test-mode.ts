import { config } from "./config"

// Test mode authentication system
export interface TestUser {
  id: string
  email: string
  tokens: number
  is_admin: boolean
  last_free_reset: string
  created_at: string
}

export class TestModeAuth {
  private static readonly STORAGE_KEY = "test-auth-user"
  private static readonly SESSION_KEY = "test-auth-session"
  private static currentUser: TestUser | null = null
  private static users: TestUser[] = [
    {
      id: "test-user-1",
      email: "demo@example.com",
      tokens: 150,
      is_admin: false,
      last_free_reset: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    },
    {
      id: "test-admin-1",
      email: "admin@example.com",
      tokens: 1000,
      is_admin: true,
      last_free_reset: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    },
  ]

  static async signUp(email: string, password: string): Promise<{ user: TestUser; error?: string }> {
    // Check if user already exists
    const existingUser = config.testUsers.find((u) => u.email === email)
    if (existingUser) {
      return { user: null as any, error: "User already exists" }
    }

    // Create new test user
    const newUser: TestUser = {
      id: `test-user-${Date.now()}`,
      email,
      tokens: 100, // Free tokens for new users
      is_admin: false,
      last_free_reset: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    }

    // Add to test users (in memory)
    config.testUsers.push(newUser)

    // Store user and session
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser))
      localStorage.setItem(
        this.SESSION_KEY,
        JSON.stringify({
          timestamp: new Date().toISOString(),
          email: newUser.email,
        }),
      )
    }

    return { user: newUser }
  }

  static async signIn(email: string, password: string): Promise<{ user: TestUser; error?: string }> {
    // Find user in test users
    const testUser = config.testUsers.find((u) => u.email === email)

    if (!testUser) {
      return { user: null as any, error: "Invalid email or password" }
    }

    const user: TestUser = {
      ...testUser,
      created_at: testUser.created_at || new Date().toISOString(),
    }

    // Store user and session
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
      localStorage.setItem(
        this.SESSION_KEY,
        JSON.stringify({
          timestamp: new Date().toISOString(),
          email: user.email,
        }),
      )
    }

    return { user }
  }

  static async signOut(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  static getCurrentUser(): TestUser | null {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem(this.STORAGE_KEY)
      const sessionData = localStorage.getItem(this.SESSION_KEY)

      if (!userData || !sessionData) return null

      const user = JSON.parse(userData)
      const session = JSON.parse(sessionData)

      // Check if session is still valid (24 hours)
      const sessionTime = new Date(session.timestamp).getTime()
      const currentTime = new Date().getTime()
      const hoursDiff = (currentTime - sessionTime) / (1000 * 60 * 60)

      if (hoursDiff > 24) {
        this.signOut()
        return null
      }

      return user
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  }

  static updateTokens(newTokens: number): void {
    if (typeof window === "undefined") return

    try {
      const userData = localStorage.getItem(this.STORAGE_KEY)
      if (!userData) return

      const user = JSON.parse(userData)
      user.tokens = Math.max(0, newTokens) // Ensure tokens don't go negative
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error("Error updating tokens:", error)
    }
  }

  static addTokens(tokensToAdd: number): void {
    if (typeof window === "undefined") return

    try {
      const userData = localStorage.getItem(this.STORAGE_KEY)
      if (!userData) return

      const user = JSON.parse(userData)
      user.tokens = (user.tokens || 0) + tokensToAdd
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error("Error adding tokens:", error)
    }
  }

  static getAllUsers(): TestUser[] {
    return config.testUsers
  }

  static isAdmin(): boolean {
    return this.currentUser?.is_admin || false
  }
}
