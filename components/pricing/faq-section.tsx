"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How does the token system work?",
    answer:
      "Each message you send to the AI costs 1 token. When you purchase the Pro Plan for ₹100, you get 1000 tokens, which means 1000 messages. Tokens don't expire and you can use them at your own pace.",
  },
  {
    question: "What happens when I run out of free messages?",
    answer:
      "Free users get 10 messages per day that reset every 24 hours. Once you've used your daily limit, you'll need to wait for the reset or purchase tokens to continue chatting.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes! We offer a 7-day money-back guarantee. If you're not satisfied with your purchase, contact our support team within 7 days for a full refund.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption to protect your conversations. We don't store your personal conversations or share your data with third parties. Your privacy is our priority.",
  },
  {
    question: "Can I use ChatBot AI for commercial purposes?",
    answer:
      "Yes, both Free and Pro plans allow commercial use. You can use the AI assistant for business content creation, customer service, and other commercial applications.",
  },
  {
    question: "Do tokens expire?",
    answer:
      "No, tokens never expire. Once you purchase tokens, you can use them whenever you want, at your own pace. There's no time limit or monthly commitment.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "You can purchase additional tokens anytime. Since we use a pay-per-use model rather than subscriptions, you have complete flexibility in how much you spend.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment partner Razorpay. All payments are processed securely.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our
            support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
