import { PublicHeader } from "@/components/layout/public-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Target, Zap, Shield, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 10+ years in AI and technology innovation.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "AI expert and former Google engineer specializing in conversational AI.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Product strategist focused on creating intuitive AI experiences.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emily Watson",
      role: "Lead AI Engineer",
      bio: "Machine learning specialist with expertise in natural language processing.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const values = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Innovation",
      description: "Constantly pushing the boundaries of AI technology to deliver cutting-edge solutions.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Privacy",
      description: "Your data security and privacy are our top priorities in everything we build.",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Accessibility",
      description: "Making advanced AI technology accessible to everyone, everywhere.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "User-Centric",
      description: "Every feature we build is designed with our users' needs and experience in mind.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">About ChatGem</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Revolutionizing AI Conversations</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're building the future of intelligent communication with advanced AI technology that understands,
              learns, and adapts to your needs.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-xl text-gray-600">From a simple idea to a revolutionary AI platform</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The Beginning</h3>
                  <p className="text-gray-600 mb-6">
                    Founded in 2023, ChatGem started with a simple mission: make advanced AI technology accessible to
                    everyone. Our team of AI experts and engineers came together to create an intelligent conversation
                    platform that truly understands human communication.
                  </p>
                  <p className="text-gray-600">
                    Today, we serve thousands of users worldwide, providing intelligent AI assistance that adapts to
                    individual needs and preferences. Our platform combines cutting-edge AI technology with intuitive
                    design to deliver exceptional user experiences.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Our team working on AI technology"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    To democratize access to advanced AI technology by creating intelligent, intuitive, and accessible
                    conversation platforms that enhance human communication and productivity.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Bot className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    To be the leading platform for intelligent AI conversations, where technology seamlessly integrates
                    with human communication to create meaningful, productive, and engaging interactions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">The brilliant minds behind ChatGem</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-blue-100">Conversations</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the future of AI conversations with ChatGem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="/contact"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
