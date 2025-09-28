"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExportCenter } from "@/components/export/export-center"
import {
  Settings,
  Users,
  Shield,
  Database,
  Upload,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react"
import { mockUsers, auditLogs as initialAuditLogs } from "@/mocks/mockData"

interface ManagedUser {
  id: string
  username: string
  email: string
  role: "stakeholder" | "admin" | "subClusterFocalPerson"
  status: "active" | "inactive"
}

export function AdminPortal() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<
    "dashboard" | "users" | "roles" | "adm" | "kpis" | "import" | "audit" | "export"
  >("dashboard")

  const [users, setUsers] = useState<ManagedUser[]>(mockUsers)
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "stakeholder" as ManagedUser["role"] })

  const [auditLogs, setAuditLogs] = useState(
    initialAuditLogs as { ts: string; actor: string; action: string; details: string }[]
  )

  const addUser = () => {
    if (!newUser.username || !newUser.email) return
    const id = (users.length + 1).toString()
    const u: ManagedUser = { id, username: newUser.username, email: newUser.email, role: newUser.role, status: "active" }
    setUsers((prev) => [u, ...prev])
    setAuditLogs((prev) => [{ ts: new Date().toISOString(), actor: user?.username || "admin", action: "CREATE_USER", details: u.email }, ...prev])
    setNewUser({ username: "", email: "", role: "stakeholder" })
  }

  const toggleStatus = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
    const u = users.find((x) => x.id === id)
    if (u) setAuditLogs((prev) => [{ ts: new Date().toISOString(), actor: user?.username || "admin", action: "TOGGLE_STATUS", details: `${u.email} -> ${u.status === "active" ? "inactive" : "active"}` }, ...prev])
  }

  const importCsv = async (file: File) => {
    const text = await file.text()
    const lines = text.split(/\r?\n/).filter(Boolean)
    const imported: ManagedUser[] = []
    for (const line of lines.slice(1)) { // assume header
      const [username, email, role] = line.split(",").map((s) => s.trim())
      if (!username || !email) continue
      const id = (users.length + imported.length + 1).toString()
      const r = role === "admin" || role === "subClusterFocalPerson" ? (role as ManagedUser["role"]) : "stakeholder"
      imported.push({ id, username, email, role: r, status: "active" })
    }
    if (imported.length) {
      setUsers((prev) => [...imported, ...prev])
      setAuditLogs((prev) => [{ ts: new Date().toISOString(), actor: user?.username || "admin", action: "IMPORT_USERS", details: `${imported.length} users` }, ...prev])
    }
  }

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

  const menu = [
    { key: "dashboard", icon: Settings, label: "Admin Dashboard" },
    { key: "users", icon: Users, label: "User Management" },
    { key: "roles", icon: Shield, label: "Roles & Permissions" },
    { key: "adm", icon: Database, label: "Administrative Levels" },
    { key: "kpis", icon: Settings, label: "KPI/Sub-Clusters" },
    { key: "import", icon: Upload, label: "Bulk Import (CSV)" },
    { key: "audit", icon: FileSpreadsheet, label: "Audit Logs" },
    { key: "export", icon: FileSpreadsheet, label: "Export Center" },
  ] as const

  const Sidebar = (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 border-r border-blue-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">MIGEPROF SMT</h1>
              <p className="text-sm text-blue-200">System Administration</p>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <UserIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.username || "User"}</p>
              <Badge className="text-xs bg-blue-500 text-white">{getRoleLabel(user?.role || "")}</Badge>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((m) => (
            <Button
              key={m.key}
              variant="ghost"
              className={`w-full justify-start transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 hover:text-white ${
                currentView === m.key ? "bg-blue-700 text-white border-l-4 border-blue-400" : "text-blue-100"
              }`}
              onClick={() => {
                setCurrentView(m.key as any)
                setSidebarOpen(false)
              }}
            >
              <m.icon className="mr-3 h-4 w-4" />
              {m.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent text-red-300 hover:bg-red-600 hover:text-white"
            onClick={logout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )

  const TopBar = (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-border z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="relative">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <UserIcon className="h-4 w-4" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">{user?.username || "User"}</p>
                <p className="text-xs text-muted-foreground">{getRoleLabel(user?.role || "")}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-40">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium">{user?.username || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                </div>
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )

  const DashboardView = (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground">Manage users, permissions, and system configuration</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{users.length}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Badge>Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{users.filter((u) => u.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently enabled</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focal Persons</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{users.filter((u) => u.role === "subClusterFocalPerson").length}</div>
            <p className="text-xs text-muted-foreground">Assigned to sub-clusters</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Settings className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{users.filter((u) => u.role === "admin").length}</div>
            <p className="text-xs text-muted-foreground">System administrators</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const UsersView = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Create and manage user accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>Add a new user account</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Username</Label>
            <Input value={newUser.username} onChange={(e) => setNewUser((p) => ({ ...p, username: e.target.value }))} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <Label>Role</Label>
            <select
              className="w-full border border-border rounded-md h-10 px-3 text-sm"
              value={newUser.role}
              onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value as ManagedUser["role"] }))}
            >
              <option value="stakeholder">Stakeholder</option>
              <option value="subClusterFocalPerson">Sub-Cluster Focal Person</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={addUser} className="w-full">Create</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>All user accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">{u.username} <span className="text-xs text-muted-foreground">({u.email})</span></p>
                <p className="text-xs text-muted-foreground">{getRoleLabel(u.role)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={u.status === "active" ? "default" : "secondary"}>{u.status}</Badge>
                <Button variant="outline" onClick={() => toggleStatus(u.id)}>{u.status === "active" ? "Disable" : "Enable"}</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const RolesView = (
    <Card>
      <CardHeader>
        <CardTitle>Roles & Permissions</CardTitle>
        <CardDescription>Predefined roles with access scopes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium">Stakeholder</p>
          <p className="text-sm text-muted-foreground">Create action plans and submit quarterly reports</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium">Sub-Cluster Focal Person</p>
          <p className="text-sm text-muted-foreground">View and comment on all plans/reports in assigned sub-cluster; export data</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium">System Administrator</p>
          <p className="text-sm text-muted-foreground">Manage users, roles, KPIs, and system configuration</p>
        </div>
      </CardContent>
    </Card>
  )

  const AdmView = (
    <Card>
      <CardHeader>
        <CardTitle>Administrative Levels</CardTitle>
        <CardDescription>Country → Provinces → Districts</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Country</Label>
          <Input defaultValue="Rwanda" readOnly />
        </div>
        <div>
          <Label>Province</Label>
          <Input placeholder="Add or edit provinces" />
        </div>
        <div>
          <Label>District</Label>
          <Input placeholder="Add or edit districts" />
        </div>
      </CardContent>
    </Card>
  )

  const KpisView = (
    <Card>
      <CardHeader>
        <CardTitle>KPI & Sub-Cluster Configuration</CardTitle>
        <CardDescription>Define KPIs, units, and disaggregation options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Sub-Cluster</Label>
            <Input placeholder="e.g., Child Protection" />
          </div>
          <div>
            <Label>KPI Name</Label>
            <Input placeholder="e.g., Children supported" />
          </div>
          <div>
            <Label>Unit</Label>
            <Input placeholder="e.g., children" />
          </div>
        </div>
        <div>
          <Label>Disaggregation Fields</Label>
          <Input placeholder="Comma-separated (Gender, Age, Disability)" />
        </div>
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </CardContent>
    </Card>
  )

  const ImportView = (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import Users</CardTitle>
        <CardDescription>Upload a CSV file with columns: username,email,role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) importCsv(f)
          }}
          className="block w-full text-sm"
        />
        <div className="p-3 rounded bg-muted/50 text-sm">
          Example:
          <pre className="text-xs mt-2">username,email,role\njdoe,jdoe@example.com,stakeholder\nfp1,fp1@migeprof.gov.rw,subClusterFocalPerson</pre>
        </div>
      </CardContent>
    </Card>
  )

  const AuditView = (
    <Card>
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>Security-relevant activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {auditLogs.map((l, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm">{l.action}</p>
              <p className="text-xs text-muted-foreground">{l.details}</p>
            </div>
            <div className="text-xs text-muted-foreground">{new Date(l.ts).toLocaleString()}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )

  const Content = () => {
    switch (currentView) {
      case "users":
        return UsersView
      case "roles":
        return RolesView
      case "adm":
        return AdmView
      case "kpis":
        return KpisView
      case "import":
        return ImportView
      case "audit":
        return AuditView
      case "export":
        return <ExportCenter />
      default:
        return DashboardView
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      {Sidebar}
      <div className="lg:ml-64">
        {TopBar}
        <main className="p-6 mt-16">
          <Content />
        </main>
      </div>
      {userMenuOpen && <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />}
    </div>
  )
}
