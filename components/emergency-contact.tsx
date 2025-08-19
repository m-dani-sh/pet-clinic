import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageCircle, Clock, MapPin } from "lucide-react"

export function EmergencyContact() {
  return (
    <section className="py-16 lg:py-24 bg-red-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Emergency Pet Care
            <span className="block text-yellow-300">Available 24/7</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            When your pet needs urgent medical attention, our emergency team is ready to provide immediate, professional
            care at any time of day or night.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Emergency Hotline</h3>
                    <p className="text-white/80">Call us immediately for urgent care</p>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  +91 98765 43210
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp Support</h3>
                    <p className="text-white/80">Quick consultation and guidance</p>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 font-bold text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Operating Hours</h3>
                    <p className="text-white/80">Professional care around the clock</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Emergency Care:</span>
                    <span className="font-semibold text-yellow-300 bg-white/10 px-2 py-1 rounded">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regular Checkups:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pet Store:</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grooming Services:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Visit Our Clinic</h3>
                    <p className="text-white/80">Convenient location with ample parking</p>
                  </div>
                </div>
                <p className="text-sm mb-4">
                  123 Pet Care Street, Medical District
                  <br />
                  Mumbai, Maharashtra 400001
                </p>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
