import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { getCurrentUser, useTokens, addMessage } from "@/lib/auth"
import { config } from "@/lib/config"

const genAI = new GoogleGenerativeAI(config.googleAI.apiKey)

export async function POST(request: NextRequest) {
  try {
    console.log("=== Chat API Request Started ===")

    // Get current user
    const user = await getCurrentUser()
    let tokensUsed = false // Initialize tokensUsed variable at the top level

    if (!user) {
      console.log("❌ No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated:", { id: user.id, email: user.email, tokens: user.tokens })

    const { message } = await request.json()
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required and must be a non-empty string" }, { status: 400 })
    }

    console.log("📝 User message:", message.substring(0, 100) + (message.length > 100 ? "..." : ""))

    // Check if user has enough tokens
    if (user.tokens < 1) {
      console.log("❌ Insufficient tokens")
      return NextResponse.json(
        {
          error: "Insufficient tokens",
          message: "You don't have enough tokens to send this message. Please purchase more tokens.",
        },
        { status: 402 },
      )
    }

    // Use tokens first
    tokensUsed = await useTokens(user.id, 1)
    if (!tokensUsed) {
      console.log("❌ Failed to use tokens")
      return NextResponse.json({ error: "Failed to process token usage" }, { status: 500 })
    }

    console.log("✅ Token used successfully")

    // Save user message
    try {
      await addMessage(message, "user", user.id, 1)
      console.log("✅ User message saved")
    } catch (error) {
      console.error("⚠️ Failed to save user message:", error)
    }

    // Generate AI response
    let aiResponse = ""
    let modelUsed = "fallback"
    let isAIResponse = false

    try {
      // Try different Gemini models in order of preference
      for (const modelName of config.googleAI.models) {
        try {
          console.log(`🤖 Trying model: ${modelName}`)
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
              maxOutputTokens: config.googleAI.maxTokens,
              temperature: config.googleAI.temperature,
            },
          })

          const result = await model.generateContent([
            {
              text: `${config.ai.systemPrompt}\n\nUser: ${message}`,
            },
          ])

          const response = await result.response
          aiResponse = response.text()
          modelUsed = modelName
          isAIResponse = true
          console.log(`✅ Response generated using ${modelName}`)
          break
        } catch (modelError: any) {
          console.log(`❌ Model ${modelName} failed:`, modelError.message)
          continue
        }
      }

      // Fallback response if all models fail
      if (!aiResponse) {
        console.log("🔄 Using fallback response")
        aiResponse = getFallbackResponse(message)
        modelUsed = "fallback"
      }
    } catch (error: any) {
      console.error("❌ AI generation error:", error)
      aiResponse = getFallbackResponse(message)
      modelUsed = "fallback"
    }

    // Save AI response
    try {
      await addMessage(aiResponse, "assistant", user.id, 0, modelUsed)
      console.log("✅ AI response saved")
    } catch (error) {
      console.error("⚠️ Failed to save AI response:", error)
    }

    console.log("✅ Chat API request completed successfully")

    return NextResponse.json({
      response: aiResponse,
      model: modelUsed,
      tokensUsed: 1,
      remainingTokens: user.tokens - 1,
      isAI: isAIResponse,
    })
  } catch (error: any) {
    console.error("❌ Chat API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again.",
        details: config.isDevelopment ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Greeting responses
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm ChatGem, your AI assistant. How can I help you today?"
  }

  // Status responses
  if (lowerMessage.includes("how are you") || lowerMessage.includes("how do you do")) {
    return "I'm doing great, thank you for asking! I'm here and ready to help you with any questions or tasks you have."
  }

  // Capability responses
  if (lowerMessage.includes("what") && (lowerMessage.includes("do") || lowerMessage.includes("can"))) {
    return "I'm ChatGem, an AI assistant that can help you with various tasks like answering questions, providing information, helping with writing, solving problems, and having conversations. What would you like to explore?"
  }

  // Help responses
  if (lowerMessage.includes("help")) {
    return "I'm here to help! You can ask me questions, request information, get assistance with writing, problem-solving, or just have a conversation. What do you need help with?"
  }

  // Thank you responses
  if (lowerMessage.includes("thank")) {
    return "You're welcome! I'm glad I could help. Is there anything else you'd like to know or discuss?"
  }

  // Default fallback
  const fallbackResponses = config.ai.fallbackResponses
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}
