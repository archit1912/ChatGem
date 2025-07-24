import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChatGem - Intelligent AI Conversations",
  description:
    "Experience the power of AI with ChatGem, our advanced chatbot platform. Get intelligent responses, creative assistance, and personalized conversations.",
  keywords: "ChatGem, AI chatbot, artificial intelligence, conversation, chat assistant, AI platform",
  authors: [{ name: "ChatGem Team" }],
  openGraph: {
    title: "ChatGem - Intelligent AI Conversations",
    description: "Experience the power of AI with ChatGem, our advanced chatbot platform",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
