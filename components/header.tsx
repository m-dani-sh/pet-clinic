"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, userProfile, logout } = useAuth()
  const router = useRouter()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Book Appointment", href: "/appointment" },
    // { name: "Adopt Pet", href: "/adopt" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Pet<span className="text-blue-600">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => router.push("/dashboard")}
                >
                  <User className="w-4 h-4 mr-2" />
                  {userProfile?.name || "Dashboard"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => router.push("/login")}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    Pet<span className="text-blue-600">zoo</span>
                  </span>
                </div>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t pt-4 space-y-2">
                  {user ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-blue-600"
                        onClick={() => {
                          router.push("/dashboard")
                          setIsOpen(false)
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-red-600"
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-blue-600"
                      onClick={() => {
                        router.push("/login")
                        setIsOpen(false)
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
