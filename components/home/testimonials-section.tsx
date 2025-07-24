"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "ChatBot AI has been a game-changer for my studies. It helps me understand complex algorithms and debug my code instantly. The explanations are clear and detailed.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I use ChatBot AI daily for creating marketing content and campaign ideas. It's like having a creative partner that never runs out of fresh perspectives.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As a busy entrepreneur, ChatBot AI helps me draft emails, create business plans, and even generate social media content. It's incredibly efficient.",
    rating: 5,
  },
  {
    name: "David Kumar",
    role: "Research Analyst",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The AI's ability to help with research and data analysis is impressive. It saves me hours of work and provides insights I might have missed.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "ChatBot AI is my go-to tool for brainstorming content ideas and overcoming writer's block. The creative suggestions are always on point.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Startup Founder",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "From pitch decks to product descriptions, ChatBot AI helps me communicate my ideas clearly and professionally. It's an essential business tool.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Thousands</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their productivity and creativity with ChatBot AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
