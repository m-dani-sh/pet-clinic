import Link from "next/link"
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Pet<span className="text-blue-400">Care</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted pet care partner providing comprehensive veterinary services, grooming, boarding, and premium
              pet products with professional expertise and genuine care.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                // { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Services", href: "/services" },
                { name: "Book Appointment", href: "/appointment" },
                { name: "Emergency Care", href: "/emergency" },
                { name: "Pet Store", href: "/store" },
                // { name: "Adopt a Pet", href: "/adopt" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Veterinary Care",
                "Emergency Services",
                "Vaccination Programs",
                "Pet Grooming",
                "Nutrition Consultation",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">+92 312456789</p>
                  <p className="text-gray-400 text-sm">24/7 Emergency Hotline</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white">info@petcare.com</p>
                  <p className="text-gray-400 text-sm">General inquiries</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-white">Anda Mor</p>
                  <p className="text-gray-400 text-sm">North karachi</p>
                  {/* <p className="text-gray-400 text-sm">Maharashtra 400001</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PetCare. All rights reserved. Professional pet care services you can trust.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
