"use client"

import { Header } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Calendar, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <Shield className="h-3 w-3 mr-1" />
                Privacy Policy
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Your Privacy Matters</h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: January 15, 2024
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Personal Information</h3>
                  <p className="text-gray-600 mb-4">When you create an account with ChatBot AI, we collect:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Email address (required for account creation)</li>
                    <li>Password (encrypted and stored securely)</li>
                    <li>Account preferences and settings</li>
                    <li>Payment information (processed securely through Razorpay)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Usage Information</h3>
                  <p className="text-gray-600 mb-4">
                    We automatically collect certain information when you use our service:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Chat messages and AI responses (to provide the service)</li>
                    <li>Token usage and transaction history</li>
                    <li>Device information and IP address</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>Error logs and performance data</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.3 Cookies and Tracking</h3>
                  <p className="text-gray-600 mb-6">
                    We use cookies and similar technologies to enhance your experience, remember your preferences, and
                    analyze usage patterns. You can control cookie settings through your browser.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>

                  <p className="text-gray-600 mb-4">We use your information to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Provide and maintain our AI chatbot service</li>
                    <li>Process payments and manage your token balance</li>
                    <li>Improve our AI models and service quality</li>
                    <li>Send important account and service notifications</li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Detect and prevent fraud or abuse</li>
                    <li>Comply with legal obligations</li>
                    <li>Analyze usage patterns to improve our service</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 text-sm">
                      <strong>Important:</strong> We do not use your chat conversations to train AI models or share them
                      with third parties. Your conversations remain private and are only used to provide you with AI
                      responses.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 We Do Not Sell Your Data</h3>
                  <p className="text-gray-600 mb-6">
                    We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Service Providers</h3>
                  <p className="text-gray-600 mb-4">
                    We may share information with trusted service providers who help us operate our service:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>
                      <strong>Google (Gemini AI):</strong> Chat messages are sent to Google's Gemini API to generate AI
                      responses
                    </li>
                    <li>
                      <strong>Razorpay:</strong> Payment information for processing transactions
                    </li>
                    <li>
                      <strong>Supabase:</strong> Database hosting and user authentication
                    </li>
                    <li>
                      <strong>Vercel:</strong> Application hosting and performance monitoring
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Legal Requirements</h3>
                  <p className="text-gray-600 mb-6">
                    We may disclose your information if required by law, court order, or to protect our rights,
                    property, or safety, or that of our users or the public.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>

                  <p className="text-gray-600 mb-4">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Encryption in transit and at rest</li>
                    <li>Secure authentication and password hashing</li>
                    <li>Regular security audits and monitoring</li>
                    <li>Access controls and employee training</li>
                    <li>Secure payment processing through certified providers</li>
                  </ul>

                  <p className="text-gray-600 mb-6">
                    While we strive to protect your information, no method of transmission over the internet is 100%
                    secure. We cannot guarantee absolute security but are committed to protecting your data using best
                    practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Account Management</h3>
                  <p className="text-gray-600 mb-4">You can:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Update your account information at any time</li>
                    <li>Change your password and security settings</li>
                    <li>Delete your chat history</li>
                    <li>Export your data (contact support)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Data Rights (GDPR/CCPA)</h3>
                  <p className="text-gray-600 mb-4">If applicable, you have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your personal information</li>
                    <li>Port your data to another service</li>
                    <li>Object to processing of your information</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Account Deletion</h3>
                  <p className="text-gray-600 mb-6">
                    You can delete your account at any time by contacting our support team. Upon deletion, we will
                    remove your personal information within 30 days, except where required by law to retain certain
                    records.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>

                  <p className="text-gray-600 mb-4">We retain your information for as long as necessary to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Provide our services to you</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes and enforce agreements</li>
                    <li>Improve our services</li>
                  </ul>

                  <p className="text-gray-600 mb-6">
                    Chat messages are retained for the duration of your account to provide conversation history. Payment
                    records are retained for 7 years as required by Indian tax law.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>

                  <p className="text-gray-600 mb-6">
                    Our service is not intended for children under 13 years of age. We do not knowingly collect personal
                    information from children under 13. If you are a parent or guardian and believe your child has
                    provided us with personal information, please contact us immediately.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>

                  <p className="text-gray-600 mb-6">
                    Your information may be transferred to and processed in countries other than your own. We ensure
                    appropriate safeguards are in place to protect your information in accordance with this privacy
                    policy and applicable laws.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>

                  <p className="text-gray-600 mb-6">
                    We may update this privacy policy from time to time. We will notify you of any material changes by
                    posting the new policy on this page and updating the "Last updated" date. Your continued use of our
                    service after changes constitutes acceptance of the updated policy.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>

                  <p className="text-gray-600 mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-900">privacy@chatbotai.com</span>
                      </div>
                      <div className="text-gray-600">
                        <strong>ChatBot AI Privacy Team</strong>
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
