import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Shield, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Aqib",
      role: "Chief Veterinarian",
      specialization: "Small Animal Medicine",
      experience: "5+ years",
      image: "/men1.jpeg",
      bio: "Passionate about providing comprehensive care for pets with expertise in internal medicine and surgery.",
    },
    {
      name: "Dr. Umer",
      role: "Exotic Pet Specialist",
      specialization: "Birds & Reptiles",
      experience: "2+ years",
      image: "/men2.jpeg",
      bio: "Specialized in exotic pet care with extensive knowledge in avian and reptile medicine.",
    },
    {
      name: "Dr. Kumar Warma",
      role: "Surgery Specialist",
      specialization: "Orthopedic Surgery",
      experience: "10+ years",
      image: "/men3.jpeg",
      bio: "Expert in advanced surgical procedures with a focus on orthopedic and soft tissue surgery.",
    },
    {
      name: "Dr. Shumaila",
      role: "Dental Specialist",
      specialization: "Pet Dentistry",
      experience: "8+ years",
      image: "/female1.jpeg",
      bio: "Dedicated to maintaining optimal oral health for pets through preventive and therapeutic dental care.",
    },
  ]

  // const facilities = [
  //   {
  //     title: "Modern Examination Rooms",
  //     description: "Fully equipped examination rooms with state-of-the-art diagnostic equipment",
  //   },
  //   {
  //     title: "Surgical Suite",
  //     description: "Advanced surgical facilities with modern anesthesia and monitoring equipment",
  //   },
  //   // {
  //   //   title: "Digital X-Ray",
  //   //   description: "High-quality digital radiography for accurate diagnosis",
  //   // },
  //   // {
  //   //   title: "Laboratory",
  //   //   description: "In-house laboratory for quick blood work and diagnostic tests",
  //   // },
  //   // {
  //   //   title: "Boarding Facility",
  //   //   description: "Comfortable and secure boarding areas with 24/7 supervision",
  //   // },
  //   {
  //     title: "Grooming Station",
  //     description: "Professional grooming facilities with specialized equipment",
  //   },
  // ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">About Petcare</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Trusted <span className="text-blue-600">Pet Care Partner</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over a decade, Petzoo has been providing exceptional veterinary care and pet services to families in
              our community. We're committed to keeping your beloved companions healthy and happy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/hero-image.png"
                alt="Petzoo clinic "
                width={500}
                height={500}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">Years of Service</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600">Expert Veterinarians</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Pet Parents</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Care</h3>
                  <p className="text-gray-600 text-sm">
                    Providing the highest standard of veterinary care with compassion and expertise.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Community</h3>
                  <p className="text-gray-600 text-sm">
                    Building lasting relationships with pet owners and contributing to our community's wellbeing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Trust</h3>
                  <p className="text-gray-600 text-sm">
                    Earning trust through transparency, reliability, and exceptional service every day.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Vets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our trusted veterinary professionals are here to care for your pets with compassion and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl"
              >
                <CardContent className="p-6 text-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-1">{member.role}</p>
                  <Badge variant="secondary" className="mb-2">{member.specialization}</Badge>
                  <p className="text-sm text-gray-600 mb-1">{member.experience} experience</p>
                  <p className="text-xs text-gray-500">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Facilities Section
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities designed to provide comprehensive care for your pets in a comfortable
              environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <Award className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{facility.title}</h3>
                      <p className="text-sm text-gray-600">{facility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Our Clinic</h2>
              <p className="text-lg text-gray-600">
                Conveniently located in the heart of the city with ample parking and easy access.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Location & Hours
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        Anda Mor
                        <br />
                        North karachi
                        <br />

                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Operating Hours
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>9:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday:</span>
                          <span>9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday:</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between font-semibold text-red-600">
                          <span>Emergency:</span>
                          <span>24/7 Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gray-200 rounded-lg h-64 lg:h-auto flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.4733646491674!2d67.04757937519908!3d24.847476745289807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e73a4f1f9ed%3A0x913fc6c73db45a88!2sAnda%20Mor!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
