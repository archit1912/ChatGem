"use client"

import { Header } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Mail, AlertTriangle } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <FileText className="h-3 w-3 mr-1" />
                Terms of Service
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Please read these terms carefully before using ChatBot AI. By using our service, you agree to these
                terms.
              </p>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: January 15, 2024
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>

                  <p className="text-gray-600 mb-6">
                    By accessing or using ChatBot AI ("Service"), operated by ChatBot AI Private Limited ("Company",
                    "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not
                    agree to these Terms, you may not use our Service.
                  </p>

                  <p className="text-gray-600 mb-6">
                    These Terms apply to all visitors, users, and others who access or use the Service. By using our
                    Service, you represent that you are at least 18 years old or have parental consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>

                  <p className="text-gray-600 mb-4">
                    ChatBot AI provides an artificial intelligence-powered conversational assistant service that allows
                    users to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Engage in conversations with AI-powered chatbot</li>
                    <li>Receive intelligent responses and assistance</li>
                    <li>Access the service through web and mobile interfaces</li>
                    <li>Purchase tokens for extended usage</li>
                    <li>Manage conversation history and preferences</li>
                  </ul>

                  <p className="text-gray-600 mb-6">
                    The Service is powered by Google's Gemini AI technology and is subject to availability and technical
                    limitations.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
                  <p className="text-gray-600 mb-4">
                    To use certain features of our Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Be responsible for all activities under your account</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Termination</h3>
                  <p className="text-gray-600 mb-6">
                    You may terminate your account at any time. We may suspend or terminate your account if you violate
                    these Terms or engage in prohibited activities.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Token System and Payments</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Token Usage</h3>
                  <p className="text-gray-600 mb-4">Our Service operates on a token-based system:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Free users receive 10 tokens daily (reset every 24 hours)</li>
                    <li>Each message to the AI consumes 1 token</li>
                    <li>Additional tokens can be purchased (₹100 = 1000 tokens)</li>
                    <li>Purchased tokens do not expire</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Payments</h3>
                  <p className="text-gray-600 mb-4">Payment terms:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>All payments are processed securely through Razorpay</li>
                    <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                    <li>Tokens are added to your account immediately upon successful payment</li>
                    <li>All sales are final unless otherwise specified in our Refund Policy</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Billing</h3>
                  <p className="text-gray-600 mb-6">
                    We use a pay-per-use model with no recurring subscriptions. You only pay when you choose to purchase
                    additional tokens.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-semibold mb-2">Prohibited Activities</p>
                        <p className="text-red-700 text-sm">
                          Violation of these terms may result in immediate account suspension or termination.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">You agree NOT to use our Service to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Generate harmful, illegal, or offensive content</li>
                    <li>Harass, threaten, or abuse others</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Attempt to reverse engineer or hack our systems</li>
                    <li>Share account credentials with others</li>
                    <li>Use automated tools to access the Service</li>
                    <li>Generate spam or malicious content</li>
                    <li>Impersonate others or provide false information</li>
                    <li>Use the Service for commercial purposes without permission</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Our Rights</h3>
                  <p className="text-gray-600 mb-6">
                    The Service, including its design, functionality, and content, is owned by ChatBot AI and protected
                    by intellectual property laws. You may not copy, modify, or distribute our Service without
                    permission.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Your Content</h3>
                  <p className="text-gray-600 mb-6">
                    You retain ownership of the messages you send to our AI. By using our Service, you grant us a
                    limited license to process your messages to provide AI responses. We do not claim ownership of your
                    conversations.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 AI-Generated Content</h3>
                  <p className="text-gray-600 mb-6">
                    AI responses are generated by our system and may not be subject to copyright protection. You may use
                    AI-generated content for your personal or commercial purposes, but we make no warranties about its
                    accuracy or originality.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>

                  <p className="text-gray-600 mb-6">
                    Your privacy is important to us. Our collection and use of personal information is governed by our
                    Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you
                    consent to the collection and use of information as described in our Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability and Modifications</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Service Availability</h3>
                  <p className="text-gray-600 mb-6">
                    We strive to maintain high availability but cannot guarantee uninterrupted service. The Service may
                    be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Service Modifications</h3>
                  <p className="text-gray-600 mb-6">
                    We reserve the right to modify, suspend, or discontinue any part of our Service at any time. We will
                    provide reasonable notice of significant changes when possible.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers and Limitations</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 AI Limitations</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI assistant is a tool that provides responses based on training data and algorithms. We do not
                    guarantee the accuracy, completeness, or reliability of AI-generated content. Users should verify
                    important information independently.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">9.2 No Professional Advice</h3>
                  <p className="text-gray-600 mb-6">
                    Our Service does not provide professional advice (legal, medical, financial, etc.). AI responses
                    should not be considered as professional consultation or recommendations.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">9.3 Limitation of Liability</h3>
                  <p className="text-gray-600 mb-6">
                    To the maximum extent permitted by law, ChatBot AI shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your use of the Service.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>

                  <p className="text-gray-600 mb-6">
                    You agree to indemnify and hold harmless ChatBot AI from any claims, damages, or expenses arising
                    from your use of the Service, violation of these Terms, or infringement of any rights of another
                    party.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Disputes</h2>

                  <p className="text-gray-600 mb-6">
                    These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of
                    the Service shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka,
                    India.
                  </p>

                  <p className="text-gray-600 mb-6">
                    We encourage users to contact us first to resolve any disputes informally before pursuing legal
                    action.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>

                  <p className="text-gray-600 mb-6">
                    We may update these Terms from time to time. We will notify users of material changes by posting the
                    updated Terms on our website and updating the "Last updated" date. Your continued use of the Service
                    after changes constitutes acceptance of the new Terms.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>

                  <p className="text-gray-600 mb-6">
                    If any provision of these Terms is found to be unenforceable, the remaining provisions will continue
                    to be valid and enforceable.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>

                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-900">legal@chatbotai.com</span>
                      </div>
                      <div className="text-gray-600">
                        <strong>ChatBot AI Private Limited</strong>
                        <br />
                        Legal Department
                        <br />
                        123 Tech Street
                        <br />
                        Koramangala, Bangalore
                        <br />
                        Karnataka 560034, India
                      </div>
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
