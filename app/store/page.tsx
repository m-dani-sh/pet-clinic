// "use client"

// import { useState, useEffect } from "react"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ShoppingCart, Search, Star, Filter } from "lucide-react"
// import Image from "next/image"
// import { collection, addDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"

// interface Product {
//   id: string
//   name: string
//   brand: string
//   price: string
//   originalPrice: string
//   image: string
//   rating: number
//   reviews: number
//   category: string
//   description: string
//   inStock: boolean
// }

// interface CartItem extends Product {
//   quantity: number
// }

// export default function StorePage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//   const [cart, setCart] = useState<CartItem[]>([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [loading, setLoading] = useState(true)

//   // Sample products data
//   const sampleProducts: Product[] = [
//     {
//       id: "1",
//       name: "Premium Dog Food",
//       brand: "Royal Canin",
//       price: "₹2,499",
//       originalPrice: "₹2,999",
//       image: "/placeholder.svg?height=200&width=200",
//       rating: 4.8,
//       reviews: 156,
//       category: "Food",
//       description: "High-quality nutrition for adult dogs with balanced proteins and vitamins.",
//       inStock: true,
//     },
//     {
//       id: "2",
//       name: "Interactive Cat Toy",
//       brand: "PetSafe",
//       price: "₹899",
//       originalPrice: "₹1,199",
//       image: "/placeholder.svg?height=200&width=200",
//       rating: 4.6,
//       reviews: 89,
//       category: "Toys",
//       description: "Engaging interactive toy to keep your cat mentally stimulated and active.",
//       inStock: true,
//     },
//     {
//       id: "3",
//       name: "Pet Carrier Bag",
//       brand: "Sherpa",
//       price: "₹3,299",
//       originalPrice: "₹3,999",
//       image: "/placeholder.svg?height=200&width=200",
//       rating: 4.9,
//       reviews: 234,
//       category: "Accessories",
//       description: "Comfortable and secure carrier for safe pet transportation.",
//       inStock: true,
//     },
//     {
//       id: "4",
//       name: "Cat Litter Premium",
//       brand: "Fresh Step",
//       price: "₹1,299",
//       originalPrice: "₹1,599",
//       image: "/placeholder.svg?height=200&width=200",
//       rating: 4.5,
//       reviews: 67,
//       category: "Hygiene",
//       description: "Odor-controlling clumping cat litter for maximum freshness.",
//       inStock: true,
//     },
//     {
//       id: "5",
//       name: "Dog Leash & Collar Set",
//       brand: "Ruffwear",
//       price: "₹1,899",
//       originalPrice: "₹2,299",
//       image: "/placeholder.svg?height=200&width=200",
//       rating: 4.7,
//       reviews: 123,
//       category: "Accessories",
//       description: "Durable and comfortable leash and collar set for daily walks.",
//       inStock: true,
//     },
//     {
//       id: "6",
//       name: "Pet Vitamins",
//       brand: "NutriVet",
//       price: "₹799",
//       originalPrice: "₹999",
//       image: "/placeholder.svg?height=200&width=200",
//       rating: 4.4,
//       reviews: 45,
//       category: "Health",
//       description: "Essential vitamins and minerals for optimal pet health.",
//       inStock: true,
//     },
//   ]

//   const categories = ["all", "Food", "Toys", "Accessories", "Hygiene", "Health"]

//   useEffect(() => {
//     // In a real app, fetch from Firestore
//     setProducts(sampleProducts)
//     setFilteredProducts(sampleProducts)
//     setLoading(false)
//   }, [])

//   useEffect(() => {
//     let filtered = products

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     if (categoryFilter !== "all") {
//       filtered = filtered.filter((product) => product.category === categoryFilter)
//     }

//     setFilteredProducts(filtered)
//   }, [searchTerm, categoryFilter, products])

//   const addToCart = async (product: Product) => {
//     const existingItem = cart.find((item) => item.id === product.id)

//     if (existingItem) {
//       setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }])
//     }

//     // In a real app, save to Firestore
//     try {
//       await addDoc(collection(db, "cartItems"), {
//         productId: product.id,
//         productName: product.name,
//         price: product.price,
//         quantity: 1,
//         userId: "anonymous", // In real app, get from auth
//         addedAt: new Date(),
//       })
//     } catch (error) {
//       console.error("Error adding to cart:", error)
//     }
//   }

//   const getTotalItems = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-16">
//           <div className="text-center">Loading products...</div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {/* Hero Section */}
//       <section className="bg-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
//               <ShoppingCart className="w-4 h-4 mr-2 text-blue-600" />
//               <span className="text-sm font-medium text-blue-600">Pet Store</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Premium Pet <span className="text-blue-600">Products</span>
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               High-quality food, toys, and accessories for your beloved pets. All products are carefully selected and
//               veterinarian-approved.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Filters & Search */}
//       <section className="py-8 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                 <SelectTrigger className="w-full sm:w-48">
//                   <SelectValue placeholder="Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex items-center text-sm text-gray-600">
//                 <Filter className="w-4 h-4 mr-2" />
//                 {filteredProducts.length} products
//               </div>

//               {getTotalItems() > 0 && (
//                 <Button className="bg-blue-600 hover:bg-blue-700">
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                   Cart ({getTotalItems()})
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Grid */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           {filteredProducts.length === 0 ? (
//             <div className="text-center py-16">
//               <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
//               <p className="text-gray-500">Try adjusting your search criteria</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <Card
//                   key={product.id}
//                   className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 bg-white overflow-hidden"
//                 >
//                   <div className="relative">
//                     <Image
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.name}
//                       width={200}
//                       height={200}
//                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <Badge className="absolute top-3 left-3 bg-red-600 text-white border-0">
//                       {Math.round(
//                         ((Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) -
//                           Number.parseInt(product.price.replace("₹", "").replace(",", ""))) /
//                           Number.parseInt(product.originalPrice.replace("₹", "").replace(",", ""))) *
//                           100,
//                       )}
//                       % OFF
//                     </Badge>
//                     {!product.inStock && (
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                         <Badge variant="secondary" className="bg-gray-800 text-white">
//                           Out of Stock
//                         </Badge>
//                       </div>
//                     )}
//                   </div>

//                   <CardContent className="p-4">
//                     <Badge variant="secondary" className="text-xs mb-2 bg-gray-100 text-gray-700">
//                       {product.category}
//                     </Badge>

//                     <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
//                     <p className="text-gray-600 text-sm mb-2">{product.brand}</p>

//                     <div className="flex items-center mb-3">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${
//                               i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-600 ml-2">
//                         {product.rating} ({product.reviews})
//                       </span>
//                     </div>

//                     <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <span className="text-xl font-bold text-gray-900">{product.price}</span>
//                         <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
//                       </div>
//                     </div>

//                     <Button
//                       className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                       onClick={() => addToCart(product)}
//                       disabled={!product.inStock}
//                     >
//                       <ShoppingCart className="w-4 h-4 mr-2" />
//                       {product.inStock ? "Add to Cart" : "Out of Stock"}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Payment Info */}
//       <section className="py-16 bg-blue-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Easy Payment Options</h2>
//           <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
//             We offer convenient payment methods for your shopping convenience.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
//               <h3 className="font-bold text-lg mb-2">Cash on Delivery</h3>
//               <p className="text-blue-100 text-sm">Pay when your order arrives at your doorstep</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
//               <h3 className="font-bold text-lg mb-2">Pay at Counter</h3>
//               <p className="text-blue-100 text-sm">Visit our store and pay when you collect your items</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function StorePage() {
  const [products, setProducts] = useState([])

  const sampleProducts = [
    { id: "1", name: "Premium Dog Food", brand: "Royal Canin", price: "₹2,499", image: "/dog-food.jpeg" },
    { id: "2", name: "Interactive Cat Toy", brand: "PetSafe", price: "₹899", image: "/cat-toy.jpeg" },
    { id: "3", name: "Pet Carrier Bag", brand: "Sherpa", price: "₹3,299", image: "/pet-bag.jpeg" }
  ]

  useEffect(() => {
    setProducts(sampleProducts)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Pet Store</h1>
          <p className="text-gray-600 mb-4">Your favorite pet products — coming soon!</p>
          <Badge className="bg-yellow-400 text-black px-4 py-1 rounded-full">Features launching shortly 🚀</Badge>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="border border-gray-200 overflow-hidden flex flex-col">
              {/* Image wrapper */}
              <div className="relative w-full h-52">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="100%"
                  className="object-scale-down"
                />
              </div>

              {/* Text + Button */}
              <CardContent className="flex flex-col flex-grow">
                <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <p className="font-semibold text-gray-900">{product.price}</p>

                <div className="mt-auto">
                  <Button className="mt-3 w-full bg-gray-400 hover:bg-gray-500 cursor-not-allowed" disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>


          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
