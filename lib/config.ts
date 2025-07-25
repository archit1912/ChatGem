export const config = {
  // Environment detection
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  testMode: process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_TEST_MODE === "true",

  // App configuration
  app: {
    name: "ChatGem",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    description: "AI-powered chatbot platform with advanced conversation capabilities",
    version: "1.0.0",
    supportEmail: "support@chatgem.com",
  },

  // Supabase configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co",
    anonKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ1MTkyODAwLCJleHAiOjE5NjA3Njg4MDB9.example",
    serviceRoleKey:
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.example",
  },

  // Cashfree configuration
  cashfree: {
    appId: process.env.NEXT_PUBLIC_CASHFREE_APP_ID || "10316540dfbe6fd07ffb7a85ecd4561301",
    secretKey: process.env.CASHFREE_SECRET_KEY || "cfsk_ma_prod_dcfcdffe5f803624e4ffac98dc6704c1_d6a99017",
    environment: (process.env.CASHFREE_ENVIRONMENT as "SANDBOX" | "PRODUCTION") || "SANDBOX",
    apiVersion: "2023-08-01",
    baseUrl:
      process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
        ? "https://api.cashfree.com/pg"
        : "https://sandbox.cashfree.com/pg",
  },

  // Google AI configuration
  googleAI: {
    apiKey: process.env.GOOGLE_AI_API_KEY || "AIzaSyC4joS7lHiRCyHvjvHYz9G039ymVD5yLEs",
    models: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"],
    maxTokens: 8192,
    temperature: 0.7,
  },

  // Pricing configuration
  pricing: {
    tokensPerRupee: 10, // 10 tokens per ₹1
    bonusThreshold: 500, // ₹500 minimum for bonus
    bonusPercentage: 10, // 10% bonus tokens
    freeTokensDaily: 10, // Daily free tokens
    plans: {
      starter: {
        name: "Starter",
        price: 99,
        tokens: 1000,
        popular: false,
        description: "Perfect for trying out ChatGem",
        features: ["1,000 tokens", "Basic AI responses", "Email support"],
      },
      popular: {
        name: "Popular",
        price: 299,
        tokens: 3500,
        popular: true,
        description: "Most popular choice for regular users",
        features: ["3,500 tokens", "Advanced AI responses", "Priority support", "10% bonus tokens"],
      },
      pro: {
        name: "Pro",
        price: 599,
        tokens: 7500,
        popular: false,
        description: "For power users and businesses",
        features: ["7,500 tokens", "Premium AI responses", "24/7 support", "10% bonus tokens", "API access"],
      },
    },
  },

  // Rate limiting
  rateLimit: {
    messagesPerMinute: 10,
    messagesPerHour: 100,
    messagesPerDay: 500,
    tokensPerRequest: 1,
  },

  // Test data for development
  testUsers: [
    {
      id: "test-user-1",
      email: "demo@example.com",
      tokens: 150,
      is_admin: false,
      last_free_reset: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "test-admin-1",
      email: "admin@example.com",
      tokens: 1000,
      is_admin: true,
      last_free_reset: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],

  // Email configuration
  email: {
    from: process.env.EMAIL_FROM || "noreply@chatgem.com",
    replyTo: process.env.EMAIL_REPLY_TO || "support@chatgem.com",
    supportEmail: "support@chatgem.com",
  },

  // Security configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
    sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    webhookSecret: process.env.WEBHOOK_SECRET || "your-webhook-secret",
  },

  // Feature flags
  features: {
    enableSignup: process.env.ENABLE_SIGNUP !== "false",
    enablePayments: process.env.ENABLE_PAYMENTS !== "false",
    enableAdmin: process.env.ENABLE_ADMIN !== "false",
    enableAnalytics: process.env.ENABLE_ANALYTICS === "true",
    enableNotifications: process.env.ENABLE_NOTIFICATIONS === "true",
    enableRateLimit: process.env.ENABLE_RATE_LIMIT !== "false",
  },

  // AI configuration
  ai: {
    systemPrompt: `You are ChatGem, an intelligent and helpful AI assistant. You provide accurate, helpful, and engaging responses to user queries. You are knowledgeable about a wide range of topics and can assist with various tasks including answering questions, providing explanations, helping with writing, problem-solving, and general conversation.

Key guidelines:
- Be helpful, accurate, and informative
- Maintain a friendly and professional tone
- If you're unsure about something, acknowledge it
- Provide structured responses when appropriate
- Be concise but thorough in your explanations`,
    maxContextLength: 4000,
    fallbackResponses: [
      "I'm here to help! Could you please rephrase your question or provide more details?",
      "I'm ChatGem, your AI assistant. I'm currently experiencing some technical difficulties, but I'm still here to help as best I can.",
      "Thank you for your question. While I'm having some connectivity issues, I'd be happy to help you with that topic.",
    ],
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableConsole: process.env.NODE_ENV === "development",
    enableFile: process.env.ENABLE_FILE_LOGGING === "true",
  },

  // Cache configuration
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 1000,
  },
}

// Validation function
export function validateConfig() {
  const errors: string[] = []
  const warnings: string[] = []

  // Required for AI functionality
  if (!config.googleAI.apiKey || config.googleAI.apiKey === "AIzaSyC4joS7lHiRCyHvjvHYz9G039ymVD5yLEs") {
    errors.push("GOOGLE_AI_API_KEY is required and should be set to your actual API key")
  }

  // Required for production
  if (!config.testMode) {
    if (!config.supabase.url || config.supabase.url === "https://your-project.supabase.co") {
      errors.push("NEXT_PUBLIC_SUPABASE_URL is required for production")
    }
    if (!config.supabase.anonKey || config.supabase.anonKey.includes("example")) {
      errors.push("NEXT_PUBLIC_SUPABASE_ANON_KEY is required for production")
    }
    if (!config.supabase.serviceRoleKey || config.supabase.serviceRoleKey.includes("example")) {
      errors.push("SUPABASE_SERVICE_ROLE_KEY is required for production")
    }
    if (!config.cashfree.appId) {
      errors.push("NEXT_PUBLIC_CASHFREE_APP_ID is required for production")
    }
    if (!config.cashfree.secretKey) {
      errors.push("CASHFREE_SECRET_KEY is required for production")
    }
  }

  // Security warnings
  if (config.security.jwtSecret === "your-super-secret-jwt-key-change-in-production") {
    warnings.push("JWT_SECRET should be changed from default value")
  }
  if (config.security.webhookSecret === "your-webhook-secret") {
    warnings.push("WEBHOOK_SECRET should be changed from default value")
  }

  // Log results
  if (errors.length > 0) {
    console.error("❌ Configuration errors:", errors)
  }
  if (warnings.length > 0) {
    console.warn("⚠️ Configuration warnings:", warnings)
  }

  return { valid: errors.length === 0, errors, warnings }
}

// Initialize configuration validation
if (typeof window === "undefined") {
  validateConfig()
}

export default config
