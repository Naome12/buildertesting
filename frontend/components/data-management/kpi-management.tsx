"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Target, TrendingUp, Users, FileText, Search } from "lucide-react"

import { subClusters, initialKPIs } from "@/mocks/mockData"

interface KPIManagementProps {
  onCreateNew: () => void
}

export function KPIManagement({ onCreateNew }: KPIManagementProps) {
  const [selectedSubCluster, setSelectedSubCluster] = useState("All Sub-Clusters")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKPI, setSelectedKPI] = useState(initialKPIs[0])
  const [allKPIs, setAllKPIs] = useState(initialKPIs)

  const filteredKPIs = allKPIs.filter(kpi => {
    const matchesCluster = selectedSubCluster === "All Sub-Clusters" || kpi.subCluster === selectedSubCluster
    const matchesSearch = kpi.title.toLowerCase().includes(searchTerm.toLowerCase()) || kpi.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCluster && matchesSearch
  })

  const stats = {
    totalKPIs: allKPIs.length,
    activeKPIs: allKPIs.filter(kpi => kpi.status === "Active").length,
    activePlans: 17,
    totalTargets: allKPIs.reduce((sum, kpi) => sum + kpi.totalTarget, 0)
  }

  const handleAddKPI = (newKPI: any) => {
    const nextId = allKPIs.length + 1
    setAllKPIs([...allKPIs, { ...newKPI, id: nextId, currentValue: 0, status: "Active" }])
    setSelectedKPI({ ...newKPI, id: nextId, currentValue: 0, status: "Active" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">KPI Management</h1>
          <p className="text-foreground">Manage and track Key Performance Indicators</p>
        </div>
        <Button onClick={onCreateNew} className="transition-all duration-200 hover:scale-[1.02]">
          <Plus className="mr-2 h-4 w-4" />
          Add KPI
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total KPIs</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalKPIs}</div>
            <p className="text-xs text-muted-foreground">Across all sub-clusters</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active KPIs</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.activeKPIs}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.activePlans}</div>
            <p className="text-xs text-muted-foreground">Using these KPIs</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Targets</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.totalTargets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Combined targets</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter KPIs</CardTitle>
          <CardDescription>Search & filter KPIs</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Input 
              placeholder="Search KPIs..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="sm:w-48">
            <Select value={selectedSubCluster} onValueChange={setSelectedSubCluster}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub-Cluster" />
              </SelectTrigger>
              <SelectContent>
                {subClusters.map(cluster => (
                  <SelectItem key={cluster} value={cluster}>
                    {cluster}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KPI List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>KPIs List</CardTitle>
            <CardDescription>{filteredKPIs.length} found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {filteredKPIs.map(kpi => (
              <div 
                key={kpi.id} 
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  selectedKPI.id === kpi.id 
                    ? "bg-primary/10 border-primary" 
                    : "bg-muted/50 border-border hover:bg-muted"
                }`} 
                onClick={() => setSelectedKPI(kpi)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm line-clamp-2 flex-1">{kpi.title}</h4>
                  <Badge variant={kpi.status === "Active" ? "default" : "secondary"}>
                    {kpi.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{kpi.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">{kpi.subCluster}</span>
                  <span className="text-xs font-medium">{kpi.currentValue}/{kpi.totalTarget}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedKPI.title}</CardTitle>
            <CardDescription>{selectedKPI.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Sub-Cluster</Label>
                  <p className="text-sm mt-1">{selectedKPI.subCluster}</p>
                </div>
                <div>
                  <Label>Stakeholder Type</Label>
                  <p className="text-sm mt-1">{selectedKPI.stakeholderType}</p>
                </div>
                <div>
                  <Label>Units</Label>
                  <p className="text-sm mt-1">{selectedKPI.units}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Badge variant={selectedKPI.status === "Active" ? "default" : "secondary"}>
                    {selectedKPI.status}
                  </Badge>
                </div>
                <div>
                  <Label>Progress</Label>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current: {selectedKPI.currentValue}</span>
                      <span>Target: {selectedKPI.totalTarget}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(selectedKPI.currentValue / selectedKPI.totalTarget) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((selectedKPI.currentValue / selectedKPI.totalTarget) * 100).toFixed(1)}% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label>Disaggregation Categories</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedKPI.disaggregation.map((d, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredKPIs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No KPIs Found</h3>
            <p className="text-foreground mb-4">
              {searchTerm || selectedSubCluster !== "All Sub-Clusters"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first KPI"}
            </p>
            <Button onClick={onCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add KPI
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
