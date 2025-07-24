import { config, testUsers } from "./config"

// Test mode authentication
export class TestAuth {
  private static currentUser: any = null

  static async signIn(email: string, password: string) {
    if (!config.isTestMode) {
      throw new Error("Test auth only available in test mode")
    }

    // Find test user
    const user = testUsers.find((u) => u.email === email)
    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("test_user", JSON.stringify(user))
    }

    this.currentUser = user
    return { user }
  }

  static async signUp(email: string, password: string) {
    if (!config.isTestMode) {
      throw new Error("Test auth only available in test mode")
    }

    const newUser = {
      id: `test-user-${Date.now()}`,
      email,
      tokens: 10,
      is_admin: false,
      created_at: new Date().toISOString(),
      last_free_reset: new Date().toISOString().split("T")[0],
    }

    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("test_user", JSON.stringify(newUser))
    }

    this.currentUser = newUser
    return { user: newUser }
  }

  static async getCurrentUser() {
    if (!config.isTestMode) {
      return null
    }

    if (this.currentUser) {
      return this.currentUser
    }

    // Try to get from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("test_user")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }

    return null
  }

  static async signOut() {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("test_user")
    }
  }

  static updateTokens(tokens: number) {
    if (this.currentUser) {
      this.currentUser.tokens = tokens
      if (typeof window !== "undefined") {
        localStorage.setItem("test_user", JSON.stringify(this.currentUser))
      }
    }
  }
}
