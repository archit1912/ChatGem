"use client"

import { Header } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, Mail } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Disclaimer
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Important Disclaimers</h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Please read these important disclaimers regarding the use of ChatBot AI services.
              </p>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: January 15, 2024
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <Card className="mb-8 border-orange-200 bg-orange-50">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold text-orange-900 mb-3">Important Notice</h2>
                      <p className="text-orange-800">
                        ChatBot AI is an artificial intelligence service that provides automated responses. While we
                        strive for accuracy, AI-generated content should not be considered as professional advice or
                        absolute truth. Always verify important information independently.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. AI Service Limitations</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Accuracy of Information</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI assistant generates responses based on training data and algorithms. While we strive for
                    accuracy, we cannot guarantee that all information provided is correct, complete, or up-to-date.
                    Users should verify important information from authoritative sources.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 No Professional Advice</h3>
                  <p className="text-gray-600 mb-4">
                    ChatBot AI does not provide professional advice in any field, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                    <li>Medical or health advice</li>
                    <li>Legal advice or legal opinions</li>
                    <li>Financial or investment advice</li>
                    <li>Tax or accounting advice</li>
                    <li>Engineering or technical specifications</li>
                    <li>Psychological or therapeutic counseling</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.3 AI Behavior</h3>
                  <p className="text-gray-600 mb-6">
                    AI responses may sometimes be unpredictable, inconsistent, or inappropriate. We continuously work to
                    improve our AI, but cannot guarantee perfect behavior in all situations.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Availability</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Uptime and Availability</h3>
                  <p className="text-gray-600 mb-6">
                    While we strive to maintain high availability, we cannot guarantee uninterrupted service. The
                    service may be temporarily unavailable due to maintenance, technical issues, or circumstances beyond
                    our control.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Third-Party Dependencies</h3>
                  <p className="text-gray-600 mb-6">
                    Our service relies on third-party providers (Google Gemini AI, hosting services, payment
                    processors). Service disruptions from these providers may affect our service availability.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibility</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Verification of Information</h3>
                  <p className="text-gray-600 mb-6">
                    Users are responsible for verifying any information received from our AI assistant before making
                    decisions or taking actions based on that information.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Appropriate Use</h3>
                  <p className="text-gray-600 mb-6">
                    Users must use the service responsibly and in accordance with our Terms of Service. We are not
                    responsible for how users choose to use or act upon AI-generated content.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Content Ownership</h3>
                  <p className="text-gray-600 mb-6">
                    Users are responsible for ensuring they have the right to use any content they input into our system
                    and for respecting intellectual property rights in AI-generated content.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 No Warranties</h3>
                  <p className="text-gray-600 mb-6">
                    Our service is provided "as is" without warranties of any kind, either express or implied. We
                    disclaim all warranties, including but not limited to merchantability, fitness for a particular
                    purpose, and non-infringement.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Limitation of Damages</h3>
                  <p className="text-gray-600 mb-6">
                    To the maximum extent permitted by law, ChatBot AI shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including but not limited to loss of profits, data, or
                    business opportunities.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Maximum Liability</h3>
                  <p className="text-gray-600 mb-6">
                    Our total liability for any claims related to the service shall not exceed the amount paid by the
                    user for the service in the 12 months preceding the claim.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Data Processing</h3>
                  <p className="text-gray-600 mb-6">
                    Your conversations are processed by our AI system and third-party AI providers. While we implement
                    security measures, we cannot guarantee absolute security of data transmission or storage.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Sensitive Information</h3>
                  <p className="text-gray-600 mb-6">
                    Users should not share sensitive personal information, passwords, financial details, or confidential
                    business information through our service.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Regulatory Compliance</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Jurisdiction</h3>
                  <p className="text-gray-600 mb-6">
                    Our service is operated from India and subject to Indian laws. Users in other jurisdictions are
                    responsible for ensuring their use complies with local laws and regulations.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Export Controls</h3>
                  <p className="text-gray-600 mb-6">
                    Users must comply with applicable export control laws and regulations when using our service,
                    particularly regarding the transfer of technical information.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes and Updates</h2>

                  <p className="text-gray-600 mb-6">
                    We may update this disclaimer from time to time to reflect changes in our service, technology, or
                    legal requirements. Users are encouraged to review this disclaimer periodically.
                  </p>

                  <p className="text-gray-600 mb-6">
                    Continued use of our service after changes to this disclaimer constitutes acceptance of the updated
                    terms.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>

                  <p className="text-gray-600 mb-4">
                    If you have questions about this disclaimer or our service limitations:
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
