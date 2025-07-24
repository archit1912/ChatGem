import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Zap, Shield, Brain, Globe, BarChart3, Clock, Users, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Advanced AI Intelligence",
      description:
        "ChatGem's AI understands context, nuance, and provides intelligent responses that feel natural and helpful.",
      badge: "Core Feature",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      title: "Natural Conversations",
      description: "Engage in fluid, contextual conversations that adapt to your communication style and preferences.",
      badge: "Popular",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized AI infrastructure designed for speed and reliability.",
      badge: "Performance",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Privacy First",
      description: "Your conversations are encrypted and secure. We prioritize your privacy and data protection.",
      badge: "Security",
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: "Multi-Language",
      description: "Communicate in multiple languages with our globally trained AI that understands cultural context.",
      badge: "Global",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      title: "Smart Analytics",
      description:
        "Track your usage, conversation insights, and optimize your AI interactions with detailed analytics.",
      badge: "Insights",
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-600" />,
      title: "24/7 Availability",
      description: "Your ChatGem AI assistant is always ready to help, providing consistent support around the clock.",
      badge: "Always On",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Team Collaboration",
      description: "Share conversations, collaborate with team members, and manage multiple AI assistants.",
      badge: "Team",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-pink-600" />,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices with our responsive design and mobile-first approach.",
      badge: "Mobile",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">✨ Powerful Features</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="block text-blue-600">Intelligent Conversations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ChatGem combines cutting-edge technology with intuitive design to deliver an exceptional conversational
            experience that adapts to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready to experience the future of AI conversations?</p>
          <a
            href="/auth"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started Free
            <MessageSquare className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
