"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActionPlanForm } from "@/components/action-plans/action-plan-form"
import { ActionPlansList } from "@/components/action-plans/action-plans-list"
import { QuarterlyReportForm } from "@/components/reports/quarterly-report-form"
import { ReportsList } from "@/components/reports/reports-list"
import { StakeholderManagement } from "@/components/data-management/stakeholder-management"
import { KPIManagement } from "@/components/data-management/kpi-management"
import { ExportCenter } from "@/components/export/export-center"
import {
  BarChart3,
  FileText,
  Users,
  Target,
  Calendar,
  LogOut,
  Menu,
  X,
  Plus,
  TrendingUp,
  AlertCircle,
  Settings,
  Download,
  User,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react"
import { KpiForm } from "../data-management/kpi-form"
import { DashboardCharts } from "@/components/dashboard/charts"
import { actionPlans, sampleReports, sampleStakeholders } from "@/mocks/mockData"

export function Dashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")
  const [showActionPlanForm, setShowActionPlanForm] = useState(false)
  const [showReportForm, setShowReportForm] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [showKPIForm, setShowKPIForm] = useState(false)

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
    { icon: BarChart3, label: "Dashboard", key: "dashboard", active: currentView === "dashboard" },
    { icon: Target, label: "Action Plans", key: "action-plans", count: 3, active: currentView === "action-plans" },
    { icon: FileText, label: "Reports", key: "reports", count: 2, active: currentView === "reports" },
    { icon: Users, label: "Stakeholders", key: "stakeholders", active: currentView === "stakeholders" },
    { icon: Settings, label: "KPI Management", key: "kpis", active: currentView === "kpis" },
    { icon: Download, label: "Export Center", key: "export", active: currentView === "export" },
    { icon: Calendar, label: "Planning Calendar", key: "calendar", active: currentView === "calendar" },
  ]

  // Simple role -> allowed menu keys mapping
  const rolePermissions: Record<string, string[]> = {
    admin: ["dashboard", "action-plans", "reports", "stakeholders", "kpis", "export", "calendar"],
    subClusterFocalPerson: ["dashboard", "reports", "stakeholders", "export", "calendar"],
    stakeholder: ["dashboard", "action-plans", "reports", "kpis", "calendar"],
  }

  const allowedKeys = rolePermissions[user?.role || "stakeholder"] || []
  const visibleMenuItems = menuItems.filter((m) => allowedKeys.includes(m.key))

  const handleCreateActionPlan = (planData: any) => {
    console.log("Creating action plan:", planData)
    setShowActionPlanForm(false)
  }

  const handleCreateReport = (reportData: any) => {
    console.log("Creating report:", reportData)
    setShowReportForm(false)
  }

  const handleCreateKPI = (kpiData: any) => {
  console.log("Creating KPI:", kpiData)
  setShowKPIForm(false)
}

  const renderContent = () => {
    switch (currentView) {
      case "action-plans":
        return <ActionPlansList onCreateNew={() => setShowActionPlanForm(true)} />
      case "reports":
        return <ReportsList onCreateNew={() => setShowReportForm(true)} />
      case "stakeholders":
        return <StakeholderManagement />
      case "kpis":
        return <KPIManagement onCreateNew={() => setShowKPIForm(true)}/>
      case "export":
        return <ExportCenter />
      case "calendar":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Planning Calendar</h1>
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Planning Calendar</h3>
                <p className="text-foreground">Coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
                <p className="text-muted-foreground">Welcome back, {user?.username}</p>
              </div>
              <Button
                className="transition-all duration-200 hover:scale-[1.02]"
                onClick={() => setShowActionPlanForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Action Plan
              </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                  <Target className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                        <div className="text-2xl font-bold text-primary">{actionPlans.filter(p => p.status === 'Active').length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last quarter</p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reports Due</CardTitle>
                  <AlertCircle className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{sampleReports.filter(r => r.status === 'Due' || r.status === 'Overdue').length}</div>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stakeholders</CardTitle>
                  <Users className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{sampleStakeholders.length}</div>
                  <p className="text-xs text-muted-foreground">Across {sampleStakeholders.reduce((s, sh) => s + sh.subClusters.length, 0)} sub-clusters</p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Achievement Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{Math.round(sampleReports.reduce((s, r) => s + (r.achievement || 0), 0) / (sampleReports.length || 1))}%</div>
                  <p className="text-xs text-muted-foreground">+5% from last quarter</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div>
              <DashboardCharts />
            </div>

            {/* Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Action Plans</CardTitle>
                  <CardDescription>Latest plans created by stakeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "GBV Prevention Training", org: "CARE Rwanda", status: "Active", level: "District" },
                    { title: "Women Empowerment Program", org: "UN Women", status: "Planning", level: "Province" },
                    { title: "Youth Leadership Initiative", org: "World Vision", status: "Active", level: "Country" },
                  ].map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{plan.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.org} • {plan.level} Level
                        </p>
                      </div>
                      <Badge variant={plan.status === "Active" ? "default" : "secondary"}>{plan.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Reports and planning deadlines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Q1 Progress Report", due: "Due in 3 days", type: "Report", urgent: true },
                    { title: "Annual Plan Submission", due: "Due in 1 week", type: "Planning", urgent: false },
                    { title: "Mid-year Review", due: "Due in 2 weeks", type: "Review", urgent: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className={`text-sm ${item.urgent ? "text-secondary" : "text-muted-foreground"}`}>
                          {item.due}
                        </p>
                      </div>
                      <Badge variant={item.urgent ? "destructive" : "outline"}>{item.type}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 border-r border-blue-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
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

          {/* User info */}
          <div className="p-4 border-b border-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.username || "User"}</p>
                <Badge className="text-xs bg-blue-500 text-white">
                  {getRoleLabel(user?.role || "")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {visibleMenuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 hover:text-white ${
                  item.active
                    ? "bg-blue-700 text-white border-l-4 border-blue-400"
                    : "text-blue-100"
                }`}
                onClick={() => {
                  setCurrentView(item.key)
                  setSidebarOpen(false)
                }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.count && (
                  <Badge variant="secondary" className="ml-auto bg-blue-500 text-white">
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Logout in Sidebar */}
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

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Fixed Top Navbar */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-border z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>

              <h1 className="text-sm font-semibold text-foreground">Stakeholder Mapping Tool</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <User className="h-3 w-3" />
                </div>
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="text-sm font-medium">{user?.username || "User"}</span>
                  <span className="text-xs text-muted-foreground">{getRoleLabel(user?.role || "")}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content with padding for fixed navbar */}
        <main className="p-6 mt-16">
          {renderContent()}
        </main>
      </div>

      {/* Action Plan Form Modal */}
      {showActionPlanForm && (
        <ActionPlanForm onClose={() => setShowActionPlanForm(false)} onSubmit={handleCreateActionPlan} />
      )}

      {/* Report Form Modal */}
      {showReportForm && (
        <QuarterlyReportForm onClose={() => setShowReportForm(false)} onSubmit={handleCreateReport} />
      )}

      {/* KPI Form Modal */}
      {showKPIForm && (
        <KpiForm onClose={() => setShowKPIForm(false)} onSubmit={handleCreateKPI} />
      )}

      {/* Close dropdown when clicking outside */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  )
}
