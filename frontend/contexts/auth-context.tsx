"use client"

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "@/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

import { mockUsers } from "@/mocks/mockData"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("smt-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("smt-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("smt-user")
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    const perms: Record<string, string[]> = {
      admin: ["manage_system", "manage_users", "export_data"],
      subClusterFocalPerson: ["export_data", "view_reports"],
      stakeholder: ["create_action_plans", "view_own_reports"],
    }
    return perms[user.role]?.includes(permission) || false
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
