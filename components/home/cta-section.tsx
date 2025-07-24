"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Start Your AI Journey Today
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Future of AI?</h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already boosting their productivity with our advanced AI assistant. Start
            with 10 free messages today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 bg-transparent"
              >
                View Pricing Plans
              </Button>
            </Link>
          </div>

          <p className="text-blue-200 text-sm mt-6">
            No credit card required • 10 free messages daily • Cancel anytime
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500" />
    </section>
  )
}
