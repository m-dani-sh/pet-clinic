"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, User, Heart, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface UserAppointment {
  id: string
  petName: string
  date: string
  time: string
  doctor: string
  status: string
  createdAt: any
  userId?: string
}

export default function DashboardPage() {
  const { user, userProfile, loading, logout, isAdmin } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState<UserAppointment[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && userProfile) {
      fetchAppointments()
    }
  }, [user, userProfile])

  const fetchAppointments = async () => {
    if (!user) return

    try {
      let appointmentsQuery

      if (isAdmin) {
        appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"))
      } else {
        appointmentsQuery = query(
          collection(db, "appointments"),
          where("userId", "==", user.uid),
          // orderBy("createdAt", "desc")
        )
      }

      const snapshot = await getDocs(appointmentsQuery)
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserAppointment[]

      setAppointments(data)
    } catch (error) {
      console.error("Error fetching appointments:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userProfile?.name || "User"}!</h1>
              <p className="text-gray-600">Manage your pet care appointments and profile</p>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Button onClick={() => router.push("/admin")} className="bg-purple-600 hover:bg-purple-700">
                  <Settings className="w-4 h-4 mr-2" /> Admin Panel
                </Button>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent hidden md:flex"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => router.push("/appointment")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">Schedule a visit for your pet</p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => router.push("/services")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Our Services</h3>
              <p className="text-gray-600 text-sm">Check Our Services for your Pet</p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => router.push("/store")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Pet Store</h3>
              <p className="text-gray-600 text-sm">Shop for pet supplies</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="pets">Services</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No appointments yet</h3>
                    <p className="text-gray-500 mb-4">Book your first appointment to get started</p>
                    <Button onClick={() => router.push("/appointment")} className="bg-blue-600 hover:bg-blue-700">
                      Book Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.petName}</h3>
                            <p className="text-sm text-gray-600">{appointment.doctor}</p>
                          </div>
                          <Badge
                            className={
                              appointment.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : appointment.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Date:</span> {appointment.date}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {appointment.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pets Tab */}
          <TabsContent value="pets">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Our Servies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  {/* <h3 className="text-lg font-semibold text-gray-600 mb-2">No pets registered</h3> */}
                  <p className="text-gray-500 mb-4">Add your pets to keep track of their health records</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Check Services</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg">{userProfile?.name || "Not provided"}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="p-3 bg-gray-50 rounded-lg">{userProfile?.email || "Not provided"}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <div className="p-3 bg-gray-50 rounded-lg">{userProfile?.phone || "Not provided"}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {userProfile?.isAdmin ? "Administrator" : "Regular User"}
                    </div>
                  </div>
                </div>

                {/* <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button> */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
