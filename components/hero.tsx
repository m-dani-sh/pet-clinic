// import { Button } from "@/components/ui/button"
// import { Calendar, Heart, Shield, Award, Users } from "lucide-react"
// import Image from "next/image"

// export function Hero() {
//   return (
//     <section className="relative bg-white overflow-hidden">
//       <div className="container mx-auto px-4 py-16 lg:py-24">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="text-center lg:text-left">
//             <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-6">
//               <Shield className="w-4 h-4 mr-2 text-blue-600" />
//               <span className="text-sm font-medium text-blue-600">Trusted by 10,000+ Pet Parents</span>
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
//               Professional
//               <span className="block text-blue-600">Pet Care Services</span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
//               Comprehensive veterinary care, grooming, boarding, and premium pet products. Your pet's health and
//               happiness is our priority.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
//               <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
//                 <Calendar className="w-5 h-5 mr-2" />
//                 Book Appointment
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
//               >
//                 <Heart className="w-5 h-5 mr-2" />
//                 Adopt a Pet
//               </Button>
//             </div>

//             <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
//                   <Shield className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">24/7</div>
//                 <div className="text-sm text-gray-600">Emergency Care</div>
//               </div>
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
//                   <Users className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">15+</div>
//                 <div className="text-sm text-gray-600">Expert Vets</div>
//               </div>
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
//                   <Award className="w-6 h-6 text-yellow-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">5★</div>
//                 <div className="text-sm text-gray-600">Rating</div>
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative z-10">
//               <Image
//                 src="/placeholder.svg?height=600&width=500"
//                 alt="Professional veterinarian with happy pets"
//                 width={500}
//                 height={600}
//                 className="rounded-2xl shadow-2xl"
//               />
//             </div>
//             <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-60" />
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 rounded-full opacity-40" />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start bg-blue-50 px-6 md:px-12 py-12 md:py-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/paw-pattern.svg')] opacity-10 pointer-events-none" />

        <p className="text-blue-600 font-medium mb-2">
          We help to groom your pet
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-snug">
          We Care Your Pets
        </h1>

        <p className="text-gray-600 max-w-md mb-6 text-base sm:text-lg">
          Professional veterinary care, grooming, and premium products — because your pet deserves the best.
        </p>

        {/* Book Appointment Button with Link */}
        <Link href="/appointment">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </Button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="relative w-full h-64 sm:h-80 md:h-full">
        <Image
          src="/hero-image.png"
          alt="Vet caring for a dog"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
