"use client"

import { Header } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Calendar, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <RefreshCw className="h-3 w-3 mr-1" />
                Refund & Cancellation Policy
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Refund & Cancellation Policy</h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We want you to be completely satisfied with ChatBot AI. Here's our comprehensive refund and cancellation
                policy.
              </p>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: January 15, 2024
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Summary</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center p-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-900 mb-2">7-Day Money Back</h3>
                  <p className="text-green-700 text-sm">
                    Full refund within 7 days of purchase if you're not satisfied
                  </p>
                </Card>

                <Card className="text-center p-6 border-blue-200 bg-blue-50">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Processing</h3>
                  <p className="text-blue-700 text-sm">
                    Refunds processed within 5-7 business days to your original payment method
                  </p>
                </Card>

                <Card className="text-center p-6 border-orange-200 bg-orange-50">
                  <AlertCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-orange-900 mb-2">Fair Usage</h3>
                  <p className="text-orange-700 text-sm">Refunds available for unused tokens or technical issues</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Policy */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Refund Eligibility</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Eligible for Full Refund</h3>
                  <p className="text-gray-600 mb-4">You are eligible for a full refund if:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>You request a refund within 7 days of purchase</li>
                    <li>You have used less than 10% of purchased tokens</li>
                    <li>You experienced technical issues that prevented service usage</li>
                    <li>You were charged incorrectly due to a system error</li>
                    <li>The service was unavailable for more than 24 hours after purchase</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Partial Refund</h3>
                  <p className="text-gray-600 mb-4">You may be eligible for a partial refund if:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>You request a refund within 30 days of purchase</li>
                    <li>You have used 10-50% of purchased tokens</li>
                    <li>You experienced significant service disruptions</li>
                    <li>There were changes to service terms that materially affect your usage</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.3 Not Eligible for Refund</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 mb-2">Refunds are not available in the following cases:</p>
                    <ul className="list-disc pl-6 text-red-700 text-sm space-y-1">
                      <li>More than 30 days have passed since purchase</li>
                      <li>You have used more than 50% of purchased tokens</li>
                      <li>Your account was suspended for violating our Terms of Service</li>
                      <li>You simply changed your mind after extensive usage</li>
                      <li>You purchased tokens during a promotional offer (unless specified otherwise)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How to Request a Refund</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Contact Our Support Team</h3>
                  <p className="text-gray-600 mb-4">To request a refund, please contact our support team with:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Your account email address</li>
                    <li>Transaction ID or payment reference</li>
                    <li>Reason for refund request</li>
                    <li>Date of purchase</li>
                    <li>Any relevant screenshots or documentation</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Contact Information:</h4>
                    <div className="space-y-2 text-blue-800">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>refunds@chatbotai.com</span>
                      </div>
                      <div>Subject Line: "Refund Request - [Your Email]"</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Response Time</h3>
                  <p className="text-gray-600 mb-6">
                    We will acknowledge your refund request within 24 hours and provide a decision within 3 business
                    days. Complex cases may take up to 5 business days to review.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Processing</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Processing Time</h3>
                  <p className="text-gray-600 mb-4">Once approved, refunds are processed as follows:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>
                      <strong>Credit/Debit Cards:</strong> 5-7 business days
                    </li>
                    <li>
                      <strong>UPI/Digital Wallets:</strong> 1-3 business days
                    </li>
                    <li>
                      <strong>Net Banking:</strong> 3-5 business days
                    </li>
                    <li>
                      <strong>International Cards:</strong> 7-14 business days
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Refund Method</h3>
                  <p className="text-gray-600 mb-6">
                    Refunds will be processed to your original payment method. We cannot process refunds to a different
                    payment method or account for security reasons.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Partial Refund Calculation</h3>
                  <p className="text-gray-600 mb-4">For partial refunds, we calculate the refund amount as:</p>
                  <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                    <p className="text-gray-800 font-mono text-center">
                      Refund Amount = (Unused Tokens ÷ Total Purchased Tokens) × Purchase Amount
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancellation Policy</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Account Cancellation</h3>
                  <p className="text-gray-600 mb-6">
                    You can cancel your ChatBot AI account at any time. Since we operate on a pay-per-use model without
                    recurring subscriptions, there are no cancellation fees. Any unused tokens will remain in your
                    account until you choose to use them or request a refund (subject to our refund policy).
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Service Cancellation by Us</h3>
                  <p className="text-gray-600 mb-6">
                    We reserve the right to cancel or suspend your account if you violate our Terms of Service. In such
                    cases, no refund will be provided for unused tokens.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Special Circumstances</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Technical Issues</h3>
                  <p className="text-gray-600 mb-6">
                    If you experience technical issues that prevent you from using our service, we will investigate and
                    may provide additional tokens, service credits, or a full refund depending on the severity and
                    duration of the issue.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Service Changes</h3>
                  <p className="text-gray-600 mb-6">
                    If we make significant changes to our service that materially affect your ability to use purchased
                    tokens, we will offer refunds for unused tokens or provide equivalent value in the updated service.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Promotional Purchases</h3>
                  <p className="text-gray-600 mb-6">
                    Tokens purchased during promotional offers or with discount codes may have different refund terms,
                    which will be clearly stated at the time of purchase.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Dispute Resolution</h2>

                  <p className="text-gray-600 mb-6">
                    If you're not satisfied with our refund decision, you can escalate the matter by contacting our
                    management team at <strong>disputes@chatbotai.com</strong>. We will review your case within 7
                    business days and provide a final decision.
                  </p>

                  <p className="text-gray-600 mb-6">
                    For payment disputes, you may also contact your bank or payment provider. However, we encourage you
                    to work with us directly first, as we're committed to resolving issues fairly and quickly.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Consumer Rights</h2>

                  <p className="text-gray-600 mb-6">
                    This refund policy does not affect your statutory rights as a consumer under Indian consumer
                    protection laws. If you believe your consumer rights have been violated, you may file a complaint
                    with the appropriate consumer forum.
                  </p>

                  <p className="text-gray-600 mb-6">
                    For international users, this policy is in addition to any rights you may have under your local
                    consumer protection laws.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Policy Updates</h2>

                  <p className="text-gray-600 mb-6">
                    We may update this refund policy from time to time. Changes will be posted on this page with an
                    updated "Last updated" date. Significant changes will be communicated to users via email or in-app
                    notifications.
                  </p>

                  <p className="text-gray-600 mb-6">
                    Policy changes will not affect refund requests made before the change date.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>

                  <p className="text-gray-600 mb-4">For refund requests or questions about this policy, contact us:</p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-900">refunds@chatbotai.com</span>
                      </div>
                      <div className="text-gray-600">
                        <strong>ChatBot AI Private Limited</strong>
                        <br />
                        Customer Support Team
                        <br />
                        123 Tech Street
                        <br />
                        Koramangala, Bangalore
                        <br />
                        Karnataka 560034, India
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link href="/contact">
                      <Button className="mr-4">Contact Support</Button>
                    </Link>
                    <Link href="/terms">
                      <Button variant="outline">View Terms of Service</Button>
                    </Link>
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
