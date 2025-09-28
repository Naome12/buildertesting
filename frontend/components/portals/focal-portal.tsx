"use client"

import { useMemo, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExportCenter } from "@/components/export/export-center"
import {
  BarChart3,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  Bell,
  Search,
  Filter,
} from "lucide-react"
import { samplePlans, sampleReports, sampleComments } from "@/mocks/mockData"

interface PlanItem {
  id: string
  title: string
  stakeholder: string
  district: string
  province: string
  kpi: string
  status: "Active" | "Planning" | "Submitted"
}

interface ReportItem {
  id: string
  planId: string
  quarter: string
  actual: number
  planned: number
  stakeholder: string
}

export function FocalPortal() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<
    "dashboard" | "plans" | "reports" | "comments" | "export" | "kpis"
  >("dashboard")

  const [filters, setFilters] = useState({ province: "", district: "", stakeholder: "" })
  const [comments, setComments] = useState(sampleComments as { id: string; target: string; text: string; author: string }[])
  const [newComment, setNewComment] = useState({ target: "", text: "" })

  const plans: PlanItem[] = samplePlans as PlanItem[]
  const reports: ReportItem[] = sampleReports as ReportItem[]

  const filteredPlans = useMemo(() => {
    return plans.filter((p) =>
      (!filters.province || p.province === filters.province) &&
      (!filters.district || p.district === filters.district) &&
      (!filters.stakeholder || p.stakeholder.toLowerCase().includes(filters.stakeholder.toLowerCase()))
    )
  }, [filters])

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
    { key: "dashboard", icon: BarChart3, label: "Dashboard" },
    { key: "plans", icon: FileText, label: "Review Plans" },
    { key: "reports", icon: BarChart3, label: "Review Reports" },
    { key: "comments", icon: MessageSquare, label: "Comments" },
    { key: "kpis", icon: Users, label: "KPI Overview" },
    { key: "export", icon: Calendar, label: "Export Center" },
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
              <p className="text-sm text-blue-200">Sub-Cluster Permissions</p>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Sub-Cluster Overview</h2>
          <p className="text-muted-foreground">Monitor plans and reports across your sub-cluster</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plans</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{plans.length}</div>
            <p className="text-xs text-muted-foreground">Total in sub-cluster</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Quarterly submissions</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stakeholders</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">3</div>
            <p className="text-xs text-muted-foreground">Active implementers</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">84%</div>
            <p className="text-xs text-muted-foreground">Planned vs actual</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const FiltersBar = (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
        <CardDescription>Filter by province, district, and stakeholder</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Province</Label>
          <select
            className="w-full border border-border rounded-md h-10 px-3 text-sm"
            value={filters.province}
            onChange={(e) => setFilters((p) => ({ ...p, province: e.target.value }))}
          >
            <option value="">All</option>
            <option value="Kigali City">Kigali City</option>
          </select>
        </div>
        <div>
          <Label>District</Label>
          <select
            className="w-full border border-border rounded-md h-10 px-3 text-sm"
            value={filters.district}
            onChange={(e) => setFilters((p) => ({ ...p, district: e.target.value }))}
          >
            <option value="">All</option>
            <option value="Gasabo">Gasabo</option>
            <option value="Kicukiro">Kicukiro</option>
            <option value="Nyarugenge">Nyarugenge</option>
          </select>
        </div>
        <div>
          <Label>Stakeholder</Label>
          <Input placeholder="Search by name" value={filters.stakeholder} onChange={(e) => setFilters((p) => ({ ...p, stakeholder: e.target.value }))} />
        </div>
      </CardContent>
    </Card>
  )

  const PlansView = (
    <div className="space-y-6">
      {FiltersBar}
      <Card>
        <CardHeader>
          <CardTitle>Plans</CardTitle>
          <CardDescription>All stakeholder plans in your sub-cluster</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredPlans.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.stakeholder} • {p.province}/{p.district} • KPI: {p.kpi}</p>
              </div>
              <Badge variant={p.status === "Active" ? "default" : "secondary"}>{p.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const ReportsView = (
    <Card>
      <CardHeader>
        <CardTitle>Quarterly Reports</CardTitle>
        <CardDescription>Planned vs actual achievements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">{r.quarter}</p>
              <p className="text-xs text-muted-foreground">{r.stakeholder} • Plan {r.planId}</p>
            </div>
            <div className="text-sm">{r.actual}/{r.planned}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )

  const CommentsView = (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Comment</CardTitle>
          <CardDescription>Leave feedback on a plan or report</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Label>Target</Label>
            <Input placeholder="e.g., Plan #1 or Report Q1 - Plan #3" value={newComment.target} onChange={(e) => setNewComment((p) => ({ ...p, target: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <Label>Comment</Label>
            <Input placeholder="Your feedback" value={newComment.text} onChange={(e) => setNewComment((p) => ({ ...p, text: e.target.value }))} />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button
              onClick={() => {
                if (!newComment.target || !newComment.text) return
                setComments((prev) => [
                  { id: `c${prev.length + 1}`,
                    target: newComment.target,
                    text: newComment.text,
                    author: user?.username || "focal" },
                  ...prev,
                ])
                setNewComment({ target: "", text: "" })
              }}
            >
              Add Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>History of feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium text-sm">{c.target}</p>
              <p className="text-sm">{c.text}</p>
              <p className="text-xs text-muted-foreground">By {c.author}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const Content = () => {
    switch (currentView) {
      case "plans":
        return PlansView
      case "reports":
        return ReportsView
      case "comments":
        return CommentsView
      case "kpis":
        return (
          <Card>
            <CardHeader>
              <CardTitle>KPI Overview</CardTitle>
              <CardDescription>Reference KPIs for your sub-cluster</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">View-only list of KPIs is available under Stakeholder KPI Management.</div>
            </CardContent>
          </Card>
        )
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
