"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, MapPin, Target, TrendingUp, Plus } from "lucide-react"
import { actionPlans as mockActionPlans, subClusters } from "@/mocks/mockData"

interface ActionPlansListProps {
  onCreateNew: () => void
}

export function ActionPlansList({ onCreateNew }: ActionPlansListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSubCluster, setFilterSubCluster] = useState("all")

  const actionPlans = mockActionPlans

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-accent text-accent-foreground"
      case "Planning":
        return "bg-secondary text-secondary-foreground"
      case "Completed":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-foreground"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-accent"
    if (progress >= 50) return "bg-primary"
    if (progress >= 25) return "bg-secondary"
    return "bg-muted"
  }

  const filteredPlans = actionPlans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.stakeholder.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || plan.status.toLowerCase() === filterStatus
    const matchesSubCluster = filterSubCluster === "all" || plan.subCluster === filterSubCluster

    return matchesSearch && matchesStatus && matchesSubCluster
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Action Plans</h1>
          <p className="text-foreground">Manage and track your organization's action plans</p>
        </div>
        <Button onClick={onCreateNew} className="transition-all duration-200 hover:scale-[1.02]">
          <Plus className="mr-2 h-4 w-4" />
          New Action Plan
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  placeholder="Search action plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSubCluster} onValueChange={setFilterSubCluster}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sub-Cluster" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sub-Clusters</SelectItem>
                  {subClusters.filter(c => c !== 'All Sub-Clusters').map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{plan.title}</CardTitle>
                  <CardDescription className="mt-1">{plan.stakeholder}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Plan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Status and Progress */}
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <TrendingUp className="h-4 w-4" />
                  {plan.progress}% Complete
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {plan.actualValue} / {plan.plannedValue}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(plan.progress)}`}
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Target className="h-4 w-4" />
                  <span>{plan.kpi}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {plan.location} ({plan.level})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(plan.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Sub-cluster */}
              <div className="pt-2 border-t">
                <Badge variant="outline" className="text-xs">
                  {plan.subCluster}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Action Plans Found</h3>
            <p className="text-foreground mb-4">
              {searchTerm || filterStatus !== "all" || filterSubCluster !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first action plan"}
            </p>
            <Button onClick={onCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              Create Action Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
