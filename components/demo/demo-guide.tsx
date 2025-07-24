"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Shield, MessageSquare, CreditCard, Settings, Coins, Bot, TestTube, Play } from "lucide-react"
import { useState } from "react"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export function DemoGuide() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleDemoLogin = async (email: string, userType: string) => {
    setLoading(email)
    try {
      await signIn(email, "demo123")
      toast({
        title: "Demo login successful!",
        description: `Logged in as ${userType}`,
      })
      router.push("/chat")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Chatbot Demo</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience a full-stack AI chatbot with token-based messaging, payment integration, and admin panel. Powered
          by Google Gemini AI with real responses!
        </p>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <TestTube className="h-3 w-3 mr-1" />
          Live Demo - No Setup Required
        </Badge>
      </div>

      {/* Quick Start */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-blue-600" />
            <span>Quick Start - Try Now!</span>
          </CardTitle>
          <CardDescription>Click below to instantly login and start chatting with AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => handleDemoLogin("demo@example.com", "Regular User")}
              disabled={loading === "demo@example.com"}
              className="h-auto p-4 flex flex-col items-start space-y-2"
              variant="outline"
            >
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">Login as Regular User</span>
              </div>
              <div className="text-xs text-left opacity-75">Experience the chat interface with 150 tokens</div>
            </Button>

            <Button
              onClick={() => handleDemoLogin("admin@example.com", "Admin User")}
              disabled={loading === "admin@example.com"}
              className="h-auto p-4 flex flex-col items-start space-y-2"
              variant="outline"
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Login as Admin</span>
              </div>
              <div className="text-xs text-left opacity-75">Access admin panel with user management</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Login Credentials</CardTitle>
          <CardDescription>Use these credentials to test different user roles and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Regular User Account</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                <div>
                  <strong>Email:</strong> demo@example.com
                </div>
                <div>
                  <strong>Password:</strong> Any password
                </div>
                <div>
                  <strong>Tokens:</strong> 150 available
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Admin Account</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                <div>
                  <strong>Email:</strong> admin@example.com
                </div>
                <div>
                  <strong>Password:</strong> Any password
                </div>
                <div>
                  <strong>Tokens:</strong> 1000 available
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <span>AI Chat</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• Real Google Gemini AI responses</div>
            <div>• Message history persistence</div>
            <div>• Token-based usage tracking</div>
            <div>• Mobile-responsive interface</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Coins className="h-5 w-5 text-yellow-600" />
              <span>Token System</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• 10 free messages daily</div>
            <div>• ₹100 = 1000 tokens</div>
            <div>• Real-time balance display</div>
            <div>• Auto token reset for free users</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>Payment System</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• Razorpay integration (test mode)</div>
            <div>• Secure payment verification</div>
            <div>• Automatic token addition</div>
            <div>• Transaction history</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Settings className="h-5 w-5 text-purple-600" />
              <span>Admin Panel</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• User management dashboard</div>
            <div>• Transaction monitoring</div>
            <div>• Usage analytics</div>
            <div>• System statistics</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• Secure authentication</div>
            <div>• Environment variables</div>
            <div>• Payment signature verification</div>
            <div>• Role-based access control</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <TestTube className="h-5 w-5 text-orange-600" />
              <span>Test Mode</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• No real payments required</div>
            <div>• Mock data for testing</div>
            <div>• Simulated payment flow</div>
            <div>• Easy development setup</div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Stack</CardTitle>
          <CardDescription>Built with modern technologies for scalability and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium mb-2">Frontend</div>
              <div className="space-y-1 text-gray-600">
                <div>• Next.js 14 (App Router)</div>
                <div>• React with TypeScript</div>
                <div>• Tailwind CSS</div>
                <div>• ShadCN UI Components</div>
              </div>
            </div>
            <div>
              <div className="font-medium mb-2">Backend</div>
              <div className="space-y-1 text-gray-600">
                <div>• Next.js API Routes</div>
                <div>• Supabase Database</div>
                <div>• Google Gemini AI</div>
                <div>• Razorpay Payments</div>
              </div>
            </div>
            <div>
              <div className="font-medium mb-2">Features</div>
              <div className="space-y-1 text-gray-600">
                <div>• Real-time chat</div>
                <div>• Token management</div>
                <div>• Payment processing</div>
                <div>• Admin dashboard</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">How to Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-700">
          <div>
            <strong>1.</strong> Click "Login as Regular User" above to start chatting
          </div>
          <div>
            <strong>2.</strong> Send messages to the AI and see real Gemini responses
          </div>
          <div>
            <strong>3.</strong> Try the "Buy Tokens" feature to test payment flow
          </div>
          <div>
            <strong>4.</strong> Login as Admin to access the management dashboard
          </div>
          <div>
            <strong>5.</strong> Explore all features in a safe test environment
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
