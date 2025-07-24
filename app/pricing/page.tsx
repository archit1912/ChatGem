"use client"

import { Header } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { PricingSection } from "@/components/pricing/pricing-section"
import { FAQSection } from "@/components/pricing/faq-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
