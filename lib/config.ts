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
    apiKey: process.env.GOOGLE_AI_API_KEY || "",
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
}
