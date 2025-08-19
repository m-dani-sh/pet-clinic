import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
// import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Petzoo - Professional Pet Care Services",
  description:
    "Your trusted pet care partner providing comprehensive veterinary services, grooming, boarding, and premium pet products.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        {/* <Toaster position="top-right" reverseOrder={false} /> */}
      </body>
    </html>
  )
}
