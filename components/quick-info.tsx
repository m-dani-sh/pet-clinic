"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ShoppingBag, Stethoscope } from "lucide-react"

export function QuickInfo() {
  const quickActions = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule a visit with our expert veterinarians",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      href: "/appointment",
    },
    {
      icon: ShoppingBag,
      title: "Pet Store",
      description: "Premium food, toys & accessories for your pets",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      href: "/store",
    },
    {
      icon: Stethoscope,
      title: "Emergency Care",
      description: "24/7 urgent pet medical services available",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      href: "/contact",
    },
  ]

  return (
    <section className="py-16 lg:py-20 bg-gray-50 -mt-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href} className="group w-full sm:w-[300px]">
              <Card className="h-full group-hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{action.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full border-gray-300 text-gray-700 ${action.hoverColor} hover:text-white hover:border-transparent transition-all duration-300`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
