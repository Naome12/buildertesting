"use client"

import React, { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Menu, X, LogOut, Bell, Settings as SettingsIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "System Administrator"
      case "stakeholder":
        return "Stakeholder User"
      case "subClusterFocalPerson":
        return "Sub-Cluster Focal Person"
      default:
        return role
    }
  }

  const menuItems = [
    { key: "dashboard", label: "Dashboard" , href: "/"},
    { key: "action-plans", label: "Action Plans", href: "/" },
    { key: "reports", label: "Reports", href: "/" },
    { key: "stakeholders", label: "Stakeholders", href: "/" },
    { key: "kpis", label: "KPI Management", href: "/" },
    { key: "export", label: "Export Center", href: "/" },
    { key: "calendar", label: "Planning Calendar", href: "/" },
    { key: "settings", label: "Settings", href: "/settings" },
  ]

  const handleNav = (href: string) => {
    router.push(href)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 border-r border-blue-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">MIGEPROF SMT</h1>
                <p className="text-sm text-blue-200">Stakeholder Mapping</p>
              </div>
              <Button variant="ghost" size="sm" className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 border-b border-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.username || "User"}</p>
                <Badge className="text-xs bg-blue-500 text-white">{getRoleLabel(user?.role || "")}</Badge>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((m) => (
              <Button key={m.key} variant="ghost" className="w-full justify-start text-blue-100 hover:bg-blue-700 hover:text-white" onClick={() => handleNav(m.href)}>
                {m.label}
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t border-blue-700">
            <Button variant="outline" className="w-full justify-start bg-transparent text-red-300 hover:bg-red-600 hover:text-white" onClick={logout}>
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:ml-64">
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-border z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-sm font-semibold text-foreground">Stakeholder Mapping Tool</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative" aria-label="Notifications" onClick={() => router.push('/notifications')}>
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-medium">{user?.username || "User"}</span>
                  <span className="text-xs text-muted-foreground">{getRoleLabel(user?.role || "")}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 mt-16">{children}</main>
      </div>
    </div>
  )
}
