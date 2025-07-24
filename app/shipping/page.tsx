"use client"

import { Header } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Calendar, Zap, Globe } from "lucide-react"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <Truck className="h-3 w-3 mr-1" />
                Shipping & Delivery Policy
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Shipping & Delivery Policy</h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                ChatBot AI is a digital service - no physical shipping required! Here's how our digital delivery works.
              </p>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: January 15, 2024
              </div>
            </div>
          </div>
        </section>

        {/* Digital Service Notice */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-8 text-center">
                  <Zap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">Instant Digital Delivery</h2>
                  <p className="text-blue-800 text-lg">
                    ChatBot AI is a 100% digital service. There are no physical products to ship. Your tokens are
                    delivered instantly to your account upon successful payment!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Nature of Our Service</h2>

                  <p className="text-gray-600 mb-6">
                    ChatBot AI provides digital artificial intelligence services through our web platform. We do not
                    sell or ship any physical products. All purchases are for digital tokens that provide access to our
                    AI chatbot service.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">What You Receive:</h3>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Digital tokens added to your account</li>
                    <li>Immediate access to AI chat services</li>
                    <li>Online dashboard and conversation history</li>
                    <li>Email confirmation of your purchase</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Digital Delivery Process</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Instant Delivery</h3>
                  <p className="text-gray-600 mb-6">
                    Upon successful payment verification, your purchased tokens are immediately added to your ChatBot AI
                    account. This process typically takes less than 30 seconds.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Delivery Confirmation</h3>
                  <p className="text-gray-600 mb-4">You will receive confirmation through:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Immediate on-screen confirmation</li>
                    <li>Updated token balance in your dashboard</li>
                    <li>Email receipt with transaction details</li>
                    <li>Transaction history in your account</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Access Requirements</h3>
                  <p className="text-gray-600 mb-6">To access your purchased tokens, you need:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Active internet connection</li>
                    <li>Valid ChatBot AI account</li>
                    <li>Compatible web browser or mobile device</li>
                    <li>Your login credentials</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Availability</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Global Access</h3>
                  <p className="text-gray-600 mb-6">
                    Our digital service is available worldwide, 24/7, subject to local internet connectivity and any
                    applicable local restrictions.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Platform Compatibility</h3>
                  <p className="text-gray-600 mb-4">ChatBot AI works on:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Desktop computers (Windows, Mac, Linux)</li>
                    <li>Mobile devices (iOS, Android)</li>
                    <li>Tablets and other internet-enabled devices</li>
                    <li>All modern web browsers</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Service Uptime</h3>
                  <p className="text-gray-600 mb-6">
                    We maintain a 99.9% uptime target for our service. In rare cases of maintenance or technical issues,
                    we will notify users in advance when possible.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Delivery Issues and Support</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Common Issues</h3>
                  <p className="text-gray-600 mb-4">
                    If you don't see your tokens immediately after purchase, it may be due to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Payment processing delays (usually resolves within 5 minutes)</li>
                    <li>Browser cache issues (try refreshing the page)</li>
                    <li>Network connectivity problems</li>
                    <li>Temporary system maintenance</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Troubleshooting Steps</h3>
                  <p className="text-gray-600 mb-4">If your tokens don't appear:</p>
                  <ol className="list-decimal pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Wait 5 minutes and refresh your browser</li>
                    <li>Log out and log back into your account</li>
                    <li>Check your email for payment confirmation</li>
                    <li>Clear your browser cache and cookies</li>
                    <li>Try accessing from a different device or browser</li>
                  </ol>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Contact Support</h3>
                  <p className="text-gray-600 mb-6">
                    If issues persist after trying the above steps, contact our support team at{" "}
                    <strong>support@chatbotai.com</strong> with your transaction ID and account email. We typically
                    resolve delivery issues within 2 hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. International Users</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Global Availability</h3>
                  <p className="text-gray-600 mb-6">
                    Our service is available to users worldwide. There are no geographical restrictions on digital
                    delivery, though payment methods may vary by country.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Currency and Pricing</h3>
                  <p className="text-gray-600 mb-6">
                    All prices are displayed in Indian Rupees (INR). International users' banks may apply currency
                    conversion fees, which are not controlled by ChatBot AI.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Time Zones</h3>
                  <p className="text-gray-600 mb-6">
                    Our service operates 24/7 across all time zones. Support response times are based on Indian Standard
                    Time (IST) business hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Account Access and Security</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Account Security</h3>
                  <p className="text-gray-600 mb-6">
                    Your purchased tokens are securely stored in your account. We recommend using a strong password and
                    keeping your login credentials confidential.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Account Recovery</h3>
                  <p className="text-gray-600 mb-6">
                    If you lose access to your account, you can recover it using the "Forgot Password" feature or by
                    contacting our support team with proof of purchase.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Token Persistence</h3>
                  <p className="text-gray-600 mb-6">
                    Your purchased tokens do not expire and will remain in your account until used, even if you don't
                    access the service for extended periods.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Limitations</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Technical Requirements</h3>
                  <p className="text-gray-600 mb-6">
                    To use our service, you need a device with internet connectivity and a modern web browser. We
                    support the latest versions of Chrome, Firefox, Safari, and Edge.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Usage Limitations</h3>
                  <p className="text-gray-600 mb-6">
                    While our service is available 24/7, usage may be subject to fair use policies and rate limiting to
                    ensure optimal performance for all users.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>

                  <p className="text-gray-600 mb-4">For questions about digital delivery or service access:</p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-900">support@chatbotai.com</span>
                      </div>
                      <div className="text-gray-600">
                        <strong>ChatBot AI Private Limited</strong>
                        <br />
                        Digital Services Team
                        <br />
                        123 Tech Street
                        <br />
                        Koramangala, Bangalore
                        <br />
                        Karnataka 560034, India
                      </div>
                      <div className="text-sm text-gray-500">Support Hours: Monday-Friday, 9:00 AM - 6:00 PM IST</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
