"use client"

import Link from "next/link"
import { Bot, Mail, Phone, MapPin, Twitter, Linkedin, Github, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <span className="text-xl sm:text-2xl font-bold">ChatGem</span>
              </Link>
              <p className="text-gray-300 text-sm sm:text-base max-w-md">
                Experience the future of AI conversations with ChatGem. Our advanced AI technology provides intelligent,
                contextual responses for all your communication needs.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/auth" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:support@chatgem.com"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all"
                  >
                    support@chatgem.com
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:+15551234567"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">
                    San Francisco, CA
                    <br />
                    United States
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2024 ChatGem. All rights reserved. Advanced AI Technology Platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-1 text-gray-400 text-xs sm:text-sm">
                <span>Made with</span>
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                <span>for intelligent conversations</span>
              </div>

              {/* Additional Legal Links for Mobile */}
              <div className="flex space-x-4 sm:hidden">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-xs transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-xs transition-colors">
                  Terms
                </Link>
                <Link href="/refund" className="text-gray-400 hover:text-white text-xs transition-colors">
                  Refund
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
