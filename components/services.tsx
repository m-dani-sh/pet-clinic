import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Scissors, Home, Syringe, AlertCircle, Apple, Heart, Shield } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Stethoscope,
      title: "Veterinary Care",
      description: "Comprehensive health checkups and medical care for all types of pets",
      features: ["Health Checkups", "Diagnosis & Treatment", "Medical Records", "Follow-up Care"],
      color: "bg-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      popular: true,
    },
    {
      icon: AlertCircle,
      title: "Emergency Care",
      description: "24/7 urgent medical services for critical pet health situations",
      features: ["24/7 Availability", "Critical Care Unit", "Emergency Surgery", "ICU Monitoring"],
      color: "bg-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      popular: false,
    },
    {
      icon: Syringe,
      title: "Vaccination & Prevention",
      description: "Complete vaccination programs and preventive care services",
      features: ["Core Vaccines", "Deworming", "Health Records", "Vaccination Reminders"],
      color: "bg-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      popular: true,
    },
    {
      icon: Scissors,
      title: "Grooming Services",
      description: "Professional grooming and hygiene services for your pets",
      features: ["Full Grooming", "Nail Trimming", "Ear Cleaning", "Dental Hygiene"],
      color: "bg-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      popular: false,
    },
    
    {
      icon: Apple,
      title: "Nutrition Consultation",
      description: "Expert guidance on proper diet and nutrition for optimal pet health",
      features: ["Custom Diet Plans", "Weight Management", "Special Dietary Needs", "Supplement Advice"],
      color: "bg-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      popular: true,
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Complete Pet Care
            <span className="block text-blue-600">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From routine checkups to emergency care, we provide comprehensive veterinary services with expertise,
            compassion, and state-of-the-art medical facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${service.color} mr-3`} />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
