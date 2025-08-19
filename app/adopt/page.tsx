"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Filter, MapPin, Calendar, User } from "lucide-react"
import Image from "next/image"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Pet {
  id: string
  name: string
  breed: string
  age: string
  gender: string
  species: string
  location: string
  image: string
  status: string
  description: string
  vaccinated: boolean
  trained: boolean
  goodWithKids: boolean
  goodWithPets: boolean
  adoptionFee: string
}

export default function AdoptPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [speciesFilter, setSpeciesFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Sample data - in real app, this would come from Firestore
  const samplePets: Pet[] = [
    {
      id: "1",
      name: "Luna",
      breed: "Golden Retriever",
      age: "2 years",
      gender: "Female",
      species: "Dog",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description:
        "Luna is a friendly and energetic Golden Retriever who loves playing fetch and swimming. She's great with children and other dogs, making her the perfect family companion.",
      vaccinated: true,
      trained: true,
      goodWithKids: true,
      goodWithPets: true,
      adoptionFee: "₹15,000",
    },
    {
      id: "2",
      name: "Whiskers",
      breed: "Persian Cat",
      age: "1 year",
      gender: "Male",
      species: "Cat",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description:
        "Whiskers is a calm and affectionate Persian cat who loves gentle petting and quiet environments. Perfect for apartment living and ideal for someone looking for a peaceful companion.",
      vaccinated: true,
      trained: false,
      goodWithKids: true,
      goodWithPets: false,
      adoptionFee: "₹8,000",
    },
    {
      id: "3",
      name: "Buddy",
      breed: "Labrador Mix",
      age: "3 years",
      gender: "Male",
      species: "Dog",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description:
        "Buddy is a well-trained Labrador mix who's great with kids and other pets. He's house-broken, knows basic commands, and would make an excellent family dog.",
      vaccinated: true,
      trained: true,
      goodWithKids: true,
      goodWithPets: true,
      adoptionFee: "₹12,000",
    },
    {
      id: "4",
      name: "Bella",
      breed: "Siamese Cat",
      age: "6 months",
      gender: "Female",
      species: "Cat",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description:
        "Bella is a playful Siamese kitten with striking blue eyes. She's very social and loves attention. She would do well in a home where she gets plenty of interaction.",
      vaccinated: true,
      trained: false,
      goodWithKids: true,
      goodWithPets: true,
      adoptionFee: "₹6,000",
    },
    {
      id: "5",
      name: "Max",
      breed: "German Shepherd",
      age: "4 years",
      gender: "Male",
      species: "Dog",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description:
        "Max is a loyal German Shepherd who's looking for an experienced dog owner. He's protective, intelligent, and would make an excellent guard dog for the right family.",
      vaccinated: true,
      trained: true,
      goodWithKids: false,
      goodWithPets: false,
      adoptionFee: "₹20,000",
    },
    {
      id: "6",
      name: "Mimi",
      breed: "Domestic Shorthair",
      age: "2 years",
      gender: "Female",
      species: "Cat",
      location: "Petzoo Clinic",
      image: "/placeholder.svg?height=300&width=300",
      status: "Available",
      description:
        "Mimi is a sweet domestic shorthair who loves to cuddle. She's independent but affectionate, and would be perfect for someone looking for a loving feline companion.",
      vaccinated: true,
      trained: false,
      goodWithKids: true,
      goodWithPets: true,
      adoptionFee: "₹4,000",
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch from Firestore
    // For now, we'll use sample data
    setPets(samplePets)
    setFilteredPets(samplePets)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = pets

    if (searchTerm) {
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (speciesFilter !== "all") {
      filtered = filtered.filter((pet) => pet.species.toLowerCase() === speciesFilter)
    }

    if (genderFilter !== "all") {
      filtered = filtered.filter((pet) => pet.gender.toLowerCase() === genderFilter)
    }

    setFilteredPets(filtered)
  }, [searchTerm, speciesFilter, genderFilter, pets])

  const handleAdopt = async (petId: string, petName: string) => {
    try {
      await addDoc(collection(db, "adoptionRequests"), {
        petId,
        petName,
        requestDate: new Date(),
        status: "pending",
        // In a real app, you'd get user info from auth
        userId: "anonymous",
        userEmail: "user@example.com",
      })
      alert(`Adoption request submitted for ${petName}! We'll contact you soon.`)
    } catch (error) {
      console.error("Error submitting adoption request:", error)
      alert("Error submitting request. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading pets...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-50 rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 mr-2 text-red-600" />
              <span className="text-sm font-medium text-red-600">Pet Adoption</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect <span className="text-red-600">Companion</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Give a loving home to these wonderful pets. All our pets are vaccinated, health-checked, and ready for
              their forever families.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                </SelectContent>
              </Select>

              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredPets.length} pets available
            </div>
          </div>
        </div>
      </section>

      {/* Pets Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPets.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No pets found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPets.map((pet) => (
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

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{pet.description}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {pet.location}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
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
                      {pet.goodWithKids && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                          Good with Kids
                        </Badge>
                      )}
                      {pet.goodWithPets && (
                        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                          Good with Pets
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">Adoption Fee:</span>
                        <span className="text-lg font-bold text-red-600 ml-2">{pet.adoptionFee}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleAdopt(pet.id, pet.name)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Adopt {pet.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Adoption Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Adoption Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple adoption process ensures the best match between pets and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Browse Pets</h3>
              <p className="text-gray-600 text-sm">Browse our available pets and find your perfect match.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Submit Request</h3>
              <p className="text-gray-600 text-sm">Submit an adoption request for your chosen pet.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Meet & Greet</h3>
              <p className="text-gray-600 text-sm">Schedule a visit to meet your potential new family member.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">4. Take Home</h3>
              <p className="text-gray-600 text-sm">Complete the adoption and welcome your new pet home!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
