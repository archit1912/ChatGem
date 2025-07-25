// Configuration for test/demo environment
export const config = {
  // Always test mode in this environment
  isTestMode: true,

  // Supabase config
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co",
    anonKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMAs_-EmUM",
    serviceRoleKey:
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU",
  },

  // Google AI config - Updated API key
  googleAI: {
    apiKey: "AIzaSyC4joS7lHiRCyHvjvHYz9G039ymVD5yLEs",
    // Fallback models to try in order
    models: ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"],
  },

  // Cashfree config (production keys)
  cashfree: {
    appId: "10316540dfbe6fd07ffb7a85ecd4561301",
    secretKey: "cfsk_ma_prod_dcfcdffe5f803624e4ffac98dc6704c1_d6a99017",
    environment: "PRODUCTION", // or "SANDBOX" for testing
  },

  // Razorpay config (test keys) - keeping as fallback
  razorpay: {
    keyId: "rzp_test_1DP5mmOlF5G5ag",
    keySecret: "thisissecretkey",
  },
}

// Test user data for demo purposes
export const testUsers = [
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

// Test messages for demo
export const testMessages = [
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
    content:
      "Hello! I'm doing great, thank you for asking. I'm an AI assistant powered by advanced technology. How can I help you today?",
    role: "assistant",
    created_at: new Date(Date.now() - 30000).toISOString(),
  },
]

// Test transactions for demo
export const testTransactions = [
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
