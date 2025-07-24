interface FallbackResponse {
  text: string
  isContextual: boolean
}

const contextualResponses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm your AI assistant. How can I help you today?",
    "Hi there! I'm here to assist you with any questions or tasks you might have.",
    "Welcome! I'm ready to help you with whatever you need.",
  ],
  help: [
    "I'm here to help! You can ask me questions, request assistance with tasks, or just have a conversation.",
    "I can assist you with a wide variety of topics. What would you like to know or discuss?",
    "Feel free to ask me anything! I'm designed to be helpful, informative, and engaging.",
  ],
  technical: [
    "I can help with technical questions and provide detailed explanations on various topics.",
    "For technical assistance, I'll do my best to provide accurate and helpful information.",
    "I'm equipped to handle technical discussions and can break down complex topics for you.",
  ],
  general: [
    "I'm an AI assistant designed to help with a wide range of questions and tasks.",
    "I'm here to provide helpful, accurate, and engaging responses to your queries.",
    "As your AI assistant, I'm ready to help with information, analysis, and conversation.",
  ],
}

const defaultResponses = [
  "I'm currently experiencing some technical difficulties, but I'm still here to help! Could you please rephrase your question?",
  "I'm having trouble processing that request right now. Let me try to assist you in a different way.",
  "There seems to be a temporary issue with my response system. I'm still available to help - could you try asking again?",
  "I'm experiencing some connectivity issues, but I'm working to resolve them. How else can I assist you?",
  "My response system is currently limited, but I'm still here to help. What would you like to know?",
]

function detectContext(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "greeting"
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("assist") || lowerMessage.includes("support")) {
    return "help"
  }

  if (
    lowerMessage.includes("code") ||
    lowerMessage.includes("program") ||
    lowerMessage.includes("technical") ||
    lowerMessage.includes("api") ||
    lowerMessage.includes("software") ||
    lowerMessage.includes("computer")
  ) {
    return "technical"
  }

  return "general"
}

export function getFallbackResponse(userMessage?: string): FallbackResponse {
  if (userMessage) {
    const context = detectContext(userMessage)
    const responses = contextualResponses[context]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return {
      text: randomResponse,
      isContextual: true,
    }
  }

  const randomDefault = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  return {
    text: randomDefault,
    isContextual: false,
  }
}

export function getSystemStatus(): "operational" | "degraded" | "offline" {
  // In a real implementation, this would check actual system health
  // For now, we'll simulate different states
  const random = Math.random()
  if (random > 0.8) return "degraded"
  if (random > 0.95) return "offline"
  return "operational"
}
