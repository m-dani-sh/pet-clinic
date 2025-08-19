"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const { login, resetPassword, loginWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address first")
      return
    }

    try {
      await resetPassword(formData.email)
      setResetEmailSent(true)
    } catch (error: any) {
      setError(error.message || "Failed to send reset email")
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)
    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Google login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
              <p className="text-gray-600 mt-2">Sign in to your Petzoo account</p>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {resetEmailSent && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    Password reset email sent! Check your inbox.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <span className="flex items-center justify-center">
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google icon"
                      className="w-5 h-5 mr-2"
                    />
                    {loading ? "Signing in..." : "Sign in with Google"}
                  </span>
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  For admin access, contact the clinic administrator
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
