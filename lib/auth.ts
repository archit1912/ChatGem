import { TestModeAuth } from "./test-mode"

// Always use test mode in this environment
const isTestMode = true

export interface User {
  id: string
  email: string
  tokens: number
  is_admin: boolean
  last_free_reset: string
}

export const signUp = async (email: string, password: string) => {
  if (isTestMode) {
    return TestModeAuth.signUp(email, password)
  }

  // Production Supabase code would go here
  throw new Error("Production mode not available in this environment")
}

export const signIn = async (email: string, password: string) => {
  if (isTestMode) {
    return TestModeAuth.signIn(email, password)
  }

  // Production Supabase code would go here
  throw new Error("Production mode not available in this environment")
}

export const signOut = async () => {
  if (isTestMode) {
    return TestModeAuth.signOut()
  }

  // Production Supabase code would go here
  throw new Error("Production mode not available in this environment")
}

// Add logout as an alias for signOut for backward compatibility
export const logout = signOut

export const getCurrentUser = async (): Promise<User | null> => {
  if (isTestMode) {
    return TestModeAuth.getCurrentUser()
  }

  // Production Supabase code would go here
  throw new Error("Production mode not available in this environment")
}

export const updateTestUserTokens = (tokens: number) => {
  if (isTestMode) {
    TestModeAuth.updateTokens(tokens)
  }
}
