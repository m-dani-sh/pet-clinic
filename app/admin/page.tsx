"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  Heart,
  ShoppingBag,
  MessageCircle,
  Settings,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { collection, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Appointment {
  id: string
  petName: string
  ownerName: string
  ownerPhone: string
  date: string
  time: string
  doctor: string
  status: string
  createdAt: any
}

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: any
}

interface AdoptionRequest {
  id: string
  petName: string
  userEmail: string
  status: string
  requestDate: any
}

export default function AdminPage() {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([])
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalContacts: 0,
    totalAdoptions: 0,
  })

  useEffect(() => {

    if (!loading && (!user || !userProfile?.isAdmin)) {
      router.push("/login")
    }
  }, [user, userProfile, loading, router])

  useEffect(() => {
    if (userProfile?.isAdmin) {
      fetchData()
    }
  }, [userProfile])

  const fetchData = async () => {
    try {
      // Fetch appointments
      const appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"))
      const appointmentsSnapshot = await getDocs(appointmentsQuery)
      const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[]
      setAppointments(appointmentsData)

      // Fetch contacts
      const contactsQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"))
      const contactsSnapshot = await getDocs(contactsQuery)
      const contactsData = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[]
      setContacts(contactsData)

      // Fetch adoption requests
      const adoptionsQuery = query(collection(db, "adoptionRequests"), orderBy("requestDate", "desc"))
      const adoptionsSnapshot = await getDocs(adoptionsQuery)
      const adoptionsData = adoptionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AdoptionRequest[]
      setAdoptionRequests(adoptionsData)

      // Calculate stats
      setStats({
        totalAppointments: appointmentsData.length,
        pendingAppointments: appointmentsData.filter((a) => a.status === "pending").length,
        totalContacts: contactsData.length,
        totalAdoptions: adoptionsData.length,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status })
      fetchData() // Refresh data
    } catch (error) {
      console.error("Error updating appointment:", error)
    }
  }

  const updateContactStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "contacts", id), { status })
      fetchData() // Refresh data
    } catch (error) {
      console.error("Error updating contact:", error)
    }
  }

  const deleteAppointment = async (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteDoc(doc(db, "appointments", id))
        fetchData() // Refresh data
      } catch (error) {
        console.error("Error deleting appointment:", error)
      }
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

  if (!userProfile?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your pet clinic operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contact Messages</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalContacts}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Adoption Requests</p>
                  <p className="text-3xl font-bold text-red-600">{stats.totalAdoptions}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="adoptions">Adoptions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Appointments Management</span>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Appointment
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.petName}</h3>
                            <p className="text-sm text-gray-600">Owner: {appointment.ownerName}</p>
                          </div>
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

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Date:</span> {appointment.date}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {appointment.time}
                        </div>
                        <div>
                          <span className="font-medium">Doctor:</span> {appointment.doctor}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {appointment.ownerPhone}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                          onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteAppointment(appointment.id)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                        </div>
                        <Badge
                          className={
                            contact.status === "replied"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {contact.status || "new"}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <p className="font-medium text-gray-900 mb-1">Subject: {contact.subject}</p>
                        <p className="text-gray-600 text-sm">{contact.message}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => updateContactStatus(contact.id, "replied")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark as Replied
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Adoptions Tab */}
          <TabsContent value="adoptions">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Adoption Requests</span>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Pet
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adoptionRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">Pet: {request.petName}</h3>
                          <p className="text-sm text-gray-600">Requester: {request.userEmail}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">{request.status}</Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-600 bg-transparent">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Clinic Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Services
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Staff
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Working Hours
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Store Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Products
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Manage Inventory
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Orders
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
