"use client"

import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { Dashboard } from "@/components/dashboard/dashboard"
import { AdminPermissions } from "@/components/permissions/admin-permissions"
import { FocalPermissions } from "@/components/permissions/focal-permissions"

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (user.role === "admin") return <AdminPermissions />
  if (user.role === "subClusterFocalPerson") return <FocalPermissions />
  return <Dashboard />
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
