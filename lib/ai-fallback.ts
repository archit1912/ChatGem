import { config } from "./config"

export class AIFallback {
  private static responses = config.ai.fallbackResponses

  static getResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    // Greeting responses
    if (this.containsAny(lowerMessage, ["hello", "hi", "hey", "greetings"])) {
      return "Hello! I'm ChatGem, your AI assistant. How can I help you today?"
    }

    // Status responses
    if (this.containsAny(lowerMessage, ["how are you", "how do you do", "what's up"])) {
      return "I'm doing great, thank you for asking! I'm here and ready to help you with any questions or tasks you have."
    }

    // Capability responses
    if (this.containsAny(lowerMessage, ["what can you do", "what do you do", "help me", "capabilities"])) {
      return "I'm ChatGem, an AI assistant that can help you with various tasks like answering questions, providing information, helping with writing, solving problems, and having conversations. What would you like to explore?"
    }

    // Help responses
    if (this.containsAny(lowerMessage, ["help", "assist", "support"])) {
      return "I'm here to help! You can ask me questions, request information, get assistance with writing, problem-solving, or just have a conversation. What do you need help with?"
    }

    // Thank you responses
    if (this.containsAny(lowerMessage, ["thank", "thanks", "appreciate"])) {
      return "You're welcome! I'm glad I could help. Is there anything else you'd like to know or discuss?"
    }

    // Goodbye responses
    if (this.containsAny(lowerMessage, ["bye", "goodbye", "see you", "farewell"])) {
      return "Goodbye! It was nice chatting with you. Feel free to come back anytime if you need assistance!"
    }

    // Technical questions
    if (this.containsAny(lowerMessage, ["code", "programming", "develop", "software"])) {
      return "I can help with programming and development questions! While I'm currently in fallback mode, I can still provide guidance on coding concepts, debugging tips, and software development practices. What specific topic would you like to discuss?"
    }

    // Writing assistance
    if (this.containsAny(lowerMessage, ["write", "essay", "article", "content", "blog"])) {
      return "I'd be happy to help with your writing! I can assist with essays, articles, creative writing, editing, and content creation. What type of writing project are you working on?"
    }

    // Math and calculations
    if (this.containsAny(lowerMessage, ["math", "calculate", "equation", "solve", "number"])) {
      return "I can help with math problems and calculations! While I'm in fallback mode, I can still provide guidance on mathematical concepts and problem-solving approaches. What math topic would you like help with?"
    }

    // General knowledge
    if (this.containsAny(lowerMessage, ["what is", "tell me about", "explain", "define"])) {
      return "I'd be happy to explain that topic! While I'm currently in fallback mode, I can still provide general information and explanations. Could you please be more specific about what you'd like to know?"
    }

    // Error or confusion
    if (this.containsAny(lowerMessage, ["error", "not working", "broken", "problem", "issue"])) {
      return "I understand you're experiencing an issue. I'm currently running in fallback mode, which means I have limited capabilities, but I'm still here to help as best I can. Could you describe the problem in more detail?"
    }

    // Random selection from configured responses
    return this.responses[Math.floor(Math.random() * this.responses.length)]
  }

  private static containsAny(text: string, keywords: string[]): boolean {
    return keywords.some((keyword) => text.includes(keyword))
  }

  static isAIAvailable(): boolean {
    return !!config.googleAI.apiKey && config.googleAI.apiKey !== "AIzaSyC4joS7lHiRCyHvjvHYz9G039ymVD5yLEs"
  }

  static getSystemStatus(): {
    ai: boolean
    database: boolean
    payments: boolean
    testMode: boolean
  } {
    return {
      ai: this.isAIAvailable(),
      database: !config.testMode,
      payments: config.features.enablePayments && !config.testMode,
      testMode: config.testMode,
    }
  }
}
