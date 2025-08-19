// components/ContactPage.tsx
"use client"

import { useState, useContext } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"

export default function ContactPage() {
const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date(),
        status: "new",
        userId: user?.uid || null,
      })
      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
            <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our services or need to schedule an appointment? We're here to help you and your pets.
          </p>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Phone */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-gray-600">Call us anytime</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">0312 3456789</p>
                <p className="text-sm text-gray-600">Main clinic line</p>
                
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp</h3>
                    <p className="text-gray-600">Quick consultation</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open("https://wa.me/923093902000", "_blank")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-600">Send us a message</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">info@petcare.com</p>
              </CardContent>
            </Card>

          
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="pb-8">
                <CardTitle className="flex items-center text-2xl">
                  <Send className="w-6 h-6 mr-3 text-blue-600" /> Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-600 text-lg">We will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full text-lg">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-gray-600 mb-6">We are located at Anda Mor, North Karachi</p>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2643780603334!2d67.04176371442157!3d24.90690008403674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33944b56d4a6f%3A0x607086fcf114989b!2sAnda%20Mor%2C%20Karachi!5e0!3m2!1sen!2s!4v1657865431234"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
