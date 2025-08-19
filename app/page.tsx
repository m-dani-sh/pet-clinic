import { Hero } from "@/components/hero"
import { QuickInfo } from "@/components/quick-info"
import { Services } from "@/components/services"
import { FeaturedPets } from "@/components/featured-pets"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <QuickInfo />
        <Services />
        {/* <FeaturedPets /> */}
      </main>
      <Footer />
    </div>
  )
}
