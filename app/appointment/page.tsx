
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, PawPrint, Stethoscope, UserCheck } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/auth-context";
import emailjs from '@emailjs/browser';

export default function AppointmentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [errors, setErrors] = useState<{ ownerEmail?: string }>({});
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = ["Pet Information", "Owner Information", "Appointment Details", "Confirmation"];

  const animalTypes = ["Dog", "Cat", "Bird", "Rabbit", "Cow", "Other"];
  const doctors = [
    "Dr. Aqib - General Veterinarian & Surgery Specialist",
    "Dr. Umer - Exotic Pet & Internal Medicine Specialist",
    "Any Available Doctor",
  ];
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
    "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
    "05:30 PM", "06:00 PM", "06:30 PM",
  ];

  const [formData, setFormData] = useState({
    petName: "",
    petBreed: "",
    petAge: "",
    animalType: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        if (!formData.petName || !formData.animalType) {
          toast({
            title: "Missing Information",
            description: "Please enter pet name and select animal type.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 1:
        if (!formData.ownerName || !formData.ownerPhone || !formData.ownerEmail) {
          toast({
            title: "Missing Information",
            description: "Please fill in all owner details.",
            variant: "destructive",
          });
          return false;
        }
        if (!validateEmail(formData.ownerEmail)) {
          setErrors({ ownerEmail: "Invalid email format" });
          toast({
            title: "Invalid Email",
            description: "Please provide a valid email address.",
            variant: "destructive",
          });
          return false;
        }
        setErrors({});
        break;
      case 2:
        if (!formData.date || !formData.time || !formData.doctor) {
          toast({
            title: "Missing Information",
            description: "Please select doctor, date and time.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  // ---- EmailJS helper (send both emails) ----
  const sendEmails = async (data: typeof formData) => {
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
    const TEMPLATE_USER = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER!;
    const TEMPLATE_ADMIN = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN!;
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!; // you can keep same as clinic Gmail

    // Email to Owner
    const ownerPromise = data.ownerEmail
      ? emailjs.send(
        SERVICE_ID,
        TEMPLATE_USER,
        {
          to_email: data.ownerEmail,
          owner_name: data.ownerName,
          owner_phone: data.ownerPhone,
          pet_name: data.petName,
          animal_type: data.animalType,
          date: data.date,
          time: data.time,
          doctor: data.doctor || "Any Available Doctor",
        },
        PUBLIC_KEY
      )
      : Promise.resolve();

    // Email to Admin
    const adminPromise = emailjs.send(
      SERVICE_ID,
      TEMPLATE_ADMIN,
      {
        to_email: ADMIN_EMAIL,
        owner_name: data.ownerName,
        owner_phone: data.ownerPhone,
        pet_name: data.petName,
        animal_type: data.animalType,
        date: data.date,
        time: data.time,
        doctor: data.doctor || "Any Available Doctor",
      },
      PUBLIC_KEY

    );


    await Promise.all([ownerPromise, adminPromise]);


  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to book an appointment.",
        variant: "destructive",
      });
      return router.push("/login");
    }

    // final validation across steps
    for (let i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...formData,
        userId: user.uid,
        status: "pending",
        createdAt: new Date(),
        consultationFee: "1000",
      });

      // send emails (owner + admin)
      await sendEmails(formData);

      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Your appointment has been booked and emails were sent!",
      });
      // optional: navigate or keep confirmation screen
      router.push("/dashboard");
    } catch (error) {
      console.error("Error booking appointment:", error);

      toast({
        title: "Error",
        description: "Booking saved failed or email sending failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirmation screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Appointment Booked Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for booking with PetCare. We’ve emailed your confirmation.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Consultation Fee:</strong> ₹1000
                </p>
              </div>
              <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-4">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Book Appointment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Schedule Your Pet&apos;s <span className="text-blue-600">Visit</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book an appointment with our experienced veterinarians for the best care for your beloved pet.
          </p>
        </div>
      </section>

      {/* Stepper + Form (keep your previous stepper UI) */}
      <section className="py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
          {/* Sidebar Stepper */}
          <div className="md:w-1/4 w-full bg-white shadow-md rounded-xl p-4">
            {/* Mobile: numbers only */}
            <ul className="flex md:hidden justify-between">
              {steps.map((_, index) => (
                <li key={index}>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs
                    ${index <= step ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
                  >
                    {index + 1}
                  </div>
                </li>
              ))}
            </ul>
            {/* Desktop: vertical with labels */}
            <ul className="hidden md:flex md:flex-col md:space-y-6">
              {steps.map((label, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs
                    ${index <= step ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
                  >
                    {index + 1}
                  </div>
                  <span className={index === step ? "font-semibold text-blue-600" : "text-gray-500"}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Content (same fields you already had) */}
          <div className="md:w-3/4 w-full">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PawPrint className="w-5 h-5 mr-2 text-blue-600" /> Pet Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="petName">Pet Name *</Label>
                      <Input
                        id="petName"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="animalType">Animal Type *</Label>
                      <Select
                        value={formData.animalType}
                        onValueChange={(value) => setFormData({ ...formData, animalType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select animal type" />
                        </SelectTrigger>
                        <SelectContent>
                          {animalTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="petBreed">Breed</Label>
                        <Input
                          id="petBreed"
                          value={formData.petBreed}
                          onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="petAge">Age</Label>
                        <Input
                          id="petAge"
                          value={formData.petAge}
                          onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                          placeholder="e.g., 2 years"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                      <Textarea
                        id="symptoms"
                        value={formData.symptoms}
                        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                        placeholder="Describe your pet's symptoms..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" /> Owner Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ownerName">Your Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerPhone">Phone Number *</Label>
                      <Input
                        id="ownerPhone"
                        type="tel"
                        value={formData.ownerPhone}
                        onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerEmail">Email Address *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                        required
                      />
                      {errors.ownerEmail && (
                        <p className="text-red-500 text-sm mt-1">{errors.ownerEmail}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" /> Appointment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="doctor">Preferred Doctor *</Label>
                        <Select
                          value={formData.doctor}
                          onValueChange={(value) => setFormData({ ...formData, doctor: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor} value={doctor}>
                                {doctor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) => setFormData({ ...formData, time: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Consultation Fee</h4>
                      <p className="text-sm text-blue-800">General consultation fee is <strong>1000</strong></p>
                    </div>
                  </CardContent>
                </Card>
              )}
            
              {step === 3 && (
                <Card className="shadow-xl border border-gray-200 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl p-6">
                    <CardTitle className="flex items-center text-xl font-semibold text-blue-800">
                      <Stethoscope className="w-6 h-6 mr-2 text-blue-600" />
                      Confirm Your Appointment
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Please review the details below before finalizing your booking.
                    </p>
                  </CardHeader>

                  <CardContent className="p-6 space-y-5">
                    {/* Pet Info */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <PawPrint className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Pet Details</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formData.petName}
                          <span className="ml-2 text-sm text-gray-500">({formData.animalType})</span>
                        </p>
                      </div>
                    </div>
                    <hr />

                    {/* Owner Info */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-green-100">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Owner Information</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formData.ownerName}
                        </p>
                        <p className="text-sm text-gray-600">{formData.ownerPhone}</p>
                      </div>
                    </div>
                    <hr />

                    {/* Date & Time */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-purple-100">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Appointment Time</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formData.date} at {formData.time}
                        </p>
                      </div>
                    </div>
                    <hr />

                    {/* Doctor */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-orange-100">
                        <UserCheck className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Doctor</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formData.doctor || "Any Available Doctor"}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-6 border-t bg-gray-50 flex justify-between items-center rounded-b-2xl">
                    <p className="text-sm text-gray-500">
                      Please ensure all details are correct before confirming.
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-md transition"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </Card>
              )}


              {/* Nav buttons */}
              <div className="flex justify-between mt-8">
                {step > 0 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={handleNextStep} className="ml-auto bg-blue-600 hover:bg-blue-700">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="ml-auto bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
