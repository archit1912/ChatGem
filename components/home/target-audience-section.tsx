"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const audiences = [
  {
    icon: GraduationCap,
    title: "Students & Researchers",
    description:
      "Get help with homework, research papers, study guides, and exam preparation. Perfect for all academic levels.",
    benefits: [
      "Homework assistance and explanations",
      "Research paper writing support",
      "Study guide creation",
      "Concept clarification",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "Business Professionals",
    description:
      "Enhance productivity with AI-powered content creation, email drafting, and strategic planning assistance.",
    benefits: [
      "Email and document drafting",
      "Meeting summaries and notes",
      "Strategic planning support",
      "Market research insights",
    ],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Users,
    title: "Small Business Owners",
    description: "Scale your business with AI assistance for marketing, customer service, and operational efficiency.",
    benefits: [
      "Marketing content creation",
      "Customer service automation",
      "Business plan development",
      "Social media content",
    ],
    color: "from-purple-500 to-purple-600",
  },
]

export function TargetAudienceSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perfect for Everyone</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a student, professional, or business owner, our AI assistant adapts to your unique needs and
            goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${audience.color}`} />
              <CardHeader className="text-center pb-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${audience.color} text-white mb-4 mx-auto`}
                >
                  <audience.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{audience.title}</CardTitle>
                <CardDescription className="text-gray-600">{audience.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {audience.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${audience.color} mr-3 flex-shrink-0`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link href="/auth" className="block">
                  <Button className="w-full group-hover:shadow-md transition-shadow">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
