import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FeaturedPets() {
  const featuredPets = [
    {
      id: 1,
      name: "Luna",
      breed: "Golden Retriever",
      age: "2 years",
      gender: "Female",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description: "Friendly and energetic, loves playing fetch and swimming. Great with children.",
      vaccinated: true,
      trained: true,
    },
    {
      id: 2,
      name: "Whiskers",
      breed: "Persian Cat",
      age: "1 year",
      gender: "Male",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description: "Calm and affectionate, perfect for apartment living. Loves gentle petting.",
      vaccinated: true,
      trained: false,
    },
    {
      id: 3,
      name: "Buddy",
      breed: "Labrador Mix",
      age: "3 years",
      gender: "Male",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description: "Great with kids, well-trained and house-broken. Very loyal companion.",
      vaccinated: true,
      trained: true,
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Dog Food",
      brand: "Royal Canin",
      price: "₹2,499",
      originalPrice: "₹2,999",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 156,
      category: "Food",
    },
    {
      id: 2,
      name: "Interactive Cat Toy",
      brand: "PetSafe",
      price: "₹899",
      originalPrice: "₹1,199",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 89,
      category: "Toys",
    },
    {
      id: 3,
      name: "Pet Carrier Bag",
      brand: "Sherpa",
      price: "₹3,299",
      originalPrice: "₹3,999",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 234,
      category: "Accessories",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Adoptable Pets Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-50 rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 mr-2 text-red-600" />
              <span className="text-sm font-medium text-red-600">Pet Adoption</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect
              <span className="block text-red-600">Companion</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Give a loving home to these wonderful pets. All our pets are vaccinated, health-checked, and ready for
              their forever families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredPets.map((pet) => (
              <Card
                key={pet.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 bg-white overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white border-0">{pet.status}</Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3 w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white hover:text-red-600"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-1">{pet.name}</h3>
                      <p className="text-gray-600">{pet.breed}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{pet.age}</div>
                      <div>{pet.gender}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{pet.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pet.location}
                  </div>

                  <div className="flex gap-2 mb-4">
                    {pet.vaccinated && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        Vaccinated
                      </Badge>
                    )}
                    {pet.trained && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        Trained
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Adopt {pet.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
            >
              View All Pets for Adoption
            </Button>
          </div>
        </div>

        {/* Featured Products Section */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
              <Star className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Pet Store</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium Pet
              <span className="block text-blue-600">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              High-quality food, toys, and accessories for your beloved pets. All products are carefully selected and
              veterinarian-approved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 bg-white overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-600 text-white border-0">
                    {Math.round(
                      ((Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) -
                        Number.parseInt(product.price.replace("₹", "").replace(",", ""))) /
                        Number.parseInt(product.originalPrice.replace("₹", "").replace(",", ""))) *
                      100,
                    )}
                    % OFF
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <Badge variant="secondary" className="text-xs mb-3 bg-gray-100 text-gray-700">
                    {product.category}
                  </Badge>

                  <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.brand}</p>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/store" passHref>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
              >
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
