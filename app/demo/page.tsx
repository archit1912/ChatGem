"use client"

import { DemoGuide } from "@/components/demo/demo-guide"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <DemoGuide />
      </div>
    </div>
  )
}
