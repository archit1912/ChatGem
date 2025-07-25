// Configuration for test/demo environment
export const config = {
  // Test mode configuration
  testMode: process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_TEST_MODE === "true",

  // Supabase configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },

  // Razorpay configuration
  razorpay: {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "demo_secret",
  },

  // Cashfree configuration
  cashfree: {
    appId: process.env.NEXT_PUBLIC_CASHFREE_APP_ID || "10316540dfbe6fd07ffb7a85ecd4561301",
    secretKey: process.env.CASHFREE_SECRET_KEY || "cfsk_ma_prod_dcfcdffe5f803624e4ffac98dc6704c1_d6a99017",
    environment: process.env.NODE_ENV === "production" ? "PRODUCTION" : "SANDBOX",
    apiVersion: "2023-08-01",
  },

  // Google AI configuration
  googleAI: {
    apiKey: process.env.GOOGLE_AI_API_KEY || "AIzaSyC4joS7lHiRCyHvjvHYz9G039ymVD5yLEs",
  },

  // App configuration
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    name: "ChatGem",
    description: "Intelligent AI Conversations",
  },

  // Token pricing
  pricing: {
    tokensPerRupee: 10, // 10 tokens per ₹1
    bonusThreshold: 500, // ₹500 minimum for bonus
    bonusPercentage: 10, // 10% bonus tokens
  },

  // Test user data for demo purposes
  testUsers: [
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
  ],
}

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
