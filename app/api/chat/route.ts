import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { config } from "@/lib/config"
import { TestModeAuth } from "@/lib/test-mode"
import { getFallbackResponse } from "@/lib/ai-fallback"

const genAI = new GoogleGenerativeAI(config.googleAI.apiKey)

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Always use test mode in this environment
    return handleTestMode(message)
  } catch (error: any) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleTestMode(message: string) {
  try {
    const currentUser = TestModeAuth.getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (currentUser.tokens <= 0) {
      return NextResponse.json({ error: "No tokens remaining" }, { status: 400 })
    }

    let aiResponse = getFallbackResponse(message)
    let isAIResponse = false

    try {
      // Try different model names in order of preference
      const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"]

      for (const modelName of modelNames) {
        try {
          console.log(`Trying model: ${modelName}`)
          const model = genAI.getGenerativeModel({ model: modelName })
          const result = await model.generateContent(message)
          const response = await result.response
          aiResponse = response.text()
          isAIResponse = true
          console.log(`Success with model: ${modelName}`)
          break // Success, exit the loop
        } catch (error: any) {
          console.log(`Failed with model ${modelName}:`, error.message)
          continue // Try next model
        }
      }

      if (!isAIResponse) {
        console.log("All AI models failed, using intelligent fallback response")
        aiResponse = getFallbackResponse(message)
      }
    } catch (error: any) {
      console.error("AI generation error:", error)
      aiResponse = getFallbackResponse(message)
    }

    // Create new messages
    const userMessage = {
      id: `msg-${Date.now()}`,
      user_id: currentUser.id,
      content: message,
      role: "user" as const,
      created_at: new Date().toISOString(),
    }

    const assistantMessage = {
      id: `msg-${Date.now() + 1}`,
      user_id: currentUser.id,
      content: aiResponse,
      role: "assistant" as const,
      created_at: new Date().toISOString(),
    }

    // Add messages to storage
    TestModeAuth.addMessage(userMessage)
    const allMessages = TestModeAuth.addMessage(assistantMessage)

    // Update user tokens
    const newTokens = currentUser.tokens - 1
    TestModeAuth.updateTokens(newTokens)

    return NextResponse.json({
      messages: allMessages,
      remainingTokens: newTokens,
      aiStatus: isAIResponse ? "connected" : "intelligent",
    })
  } catch (error: any) {
    console.error("Test mode chat error:", error)

    // Even if everything fails, we can still provide a response
    const currentUser = TestModeAuth.getCurrentUser()
    if (currentUser) {
      const userMessage = {
        id: `msg-${Date.now()}`,
        user_id: currentUser.id,
        content: message,
        role: "user" as const,
        created_at: new Date().toISOString(),
      }

      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        user_id: currentUser.id,
        content: getFallbackResponse(message),
        role: "assistant" as const,
        created_at: new Date().toISOString(),
      }

      TestModeAuth.addMessage(userMessage)
      const allMessages = TestModeAuth.addMessage(assistantMessage)

      const newTokens = currentUser.tokens - 1
      TestModeAuth.updateTokens(newTokens)

      return NextResponse.json({
        messages: allMessages,
        remainingTokens: newTokens,
        aiStatus: "intelligent",
      })
    }

    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
