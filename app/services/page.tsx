import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Scissors, Home, Syringe, Apple, Heart, Clock, CheckCircle } from "lucide-react"
import Link from "next/link";
export default function ServicesPage() {
  const services = [
    {
      id: 1,
      icon: Stethoscope,
      title: "Veterinary Care",
      description: "Comprehensive health checkups and medical care for cats, dogs, birds, and exotic pets",
      features: [
        "Complete Health Checkups",
        "Disease Diagnosis",
        "Treatment Plans",
        "Medical Records",
        "Follow-up Care",
      ],
      price: "500 - 2000/Rs",
      duration: "30-60 minutes",
      color: "bg-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: Syringe,
      title: "Vaccination & Prevention",
      description: "Complete vaccination programs and preventive care to keep your pets healthy",
      features: ["Core Vaccines", "Non-core Vaccines", "Deworming", "Health Certificates", "Vaccination Records"],
      price: "1000 - 2500/Rs",
      duration: "15-30 minutes",
      color: "bg-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      icon: Scissors,
      title: "Grooming Services",
      description: "Professional grooming and hygiene services to keep your pets clean and healthy",
      features: ["Full Body Grooming", "Nail Trimming", "Ear Cleaning", "Dental Care", "Flea Treatment"],
      price: "Rs800 - Rs3500/Rs",
      duration: "1-3 hours",
      color: "bg-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },

    {
      id: 4,
      icon: Apple,
      title: "Nutrition Consultation",
      description: "Expert guidance on proper diet and nutrition for optimal pet health",
      features: [
        "Diet Assessment",
        "Custom Meal Plans",
        "Weight Management",
        "Special Dietary Needs",
        "Supplement Advice",
      ],
     price: "500 - 1000/Rs",
      duration: "30-45 minutes",
      color: "bg-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Professional Pet Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive veterinary care and pet services designed to keep your furry friends healthy, happy, and
              well-cared for throughout their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-2xl text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{service.price}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Book This Service</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book an Appointment?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our experienced veterinarians are here to provide the best care for your beloved pets. Schedule your
            appointment today.
          </p>
          <Link href="/appointment">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Book Appointment Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
