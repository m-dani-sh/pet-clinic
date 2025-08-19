"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, userData: { name: string; phone: string }) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  isAdmin: boolean
}

interface UserProfile {
  uid: string
  email: string
  name: string
  phone?: string
  isAdmin: boolean
  createdAt: Date
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile)
        }
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async (email: string, password: string, userData: { name: string; phone: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Optional: Update Firebase displayName
    await updateProfile(user, { displayName: userData.name })

    // Create Firestore user profile
    const newUserProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      name: userData.name,
      phone: userData.phone,
      isAdmin: false,
      createdAt: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), newUserProfile)
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      const newUserProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        name: user.displayName || "Unknown",
        phone: "",
        isAdmin: false,
        createdAt: new Date(),
      }
      await setDoc(doc(db, "users", user.uid), newUserProfile)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const isAdmin = userProfile?.isAdmin || false

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
