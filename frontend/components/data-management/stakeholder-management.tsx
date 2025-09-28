"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Users,
  Building,
  MapPin,
  Mail,
  Phone,
  UserCheck,
  UserX,
} from "lucide-react"

import { sampleStakeholders, subClusters } from "@/mocks/mockData"

export function StakeholderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const stakeholders = sampleStakeholders

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-accent text-accent-foreground"
      case "Inactive":
        return "bg-muted text-foreground"
      case "Suspended":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-foreground"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Implementing Partner":
        return "bg-primary text-primary-foreground"
      case "Development Partner":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-foreground"
    }
  }

  const filteredStakeholders = stakeholders.filter((stakeholder) => {
    const matchesSearch =
      stakeholder.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stakeholder.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || stakeholder.status.toLowerCase() === filterStatus
    const matchesCategory = filterCategory === "all" || stakeholder.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stakeholder Management</h1>
          <p className="text-foreground">Manage partner organizations and their information</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="transition-all duration-200 hover:scale-[1.02]">
              <Plus className="mr-2 h-4 w-4" />
              Add Stakeholder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Stakeholder</DialogTitle>
              <DialogDescription>Register a new partner organization in the system</DialogDescription>
            </DialogHeader>
            <AddStakeholderForm onClose={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Total Stakeholders</p>
                <p className="text-2xl font-bold text-primary">{stakeholders.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Active</p>
                <p className="text-2xl font-bold text-accent">
                  {stakeholders.filter((s) => s.status === "Active").length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Implementing Partners</p>
                <p className="text-2xl font-bold text-primary">
                  {stakeholders.filter((s) => s.category === "Implementing Partner").length}
                </p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Development Partners</p>
                <p className="text-2xl font-bold text-secondary">
                  {stakeholders.filter((s) => s.category === "Development Partner").length}
                </p>
              </div>
              <Building className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  placeholder="Search stakeholders..."
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Implementing Partner">Implementing Partner</SelectItem>
                  <SelectItem value="Development Partner">Development Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stakeholders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStakeholders.map((stakeholder) => (
          <Card key={stakeholder.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{stakeholder.organizationName}</CardTitle>
                  <CardDescription className="mt-1">{stakeholder.contactPerson}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(stakeholder.status)}>{stakeholder.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCheck className="mr-2 h-4 w-4" />
                        View Plans
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-secondary">
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{stakeholder.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{stakeholder.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {stakeholder.district}, {stakeholder.province}
                  </span>
                </div>
              </div>

              {/* Category and Sub-clusters */}
              <div className="space-y-2">
                <Badge className={getCategoryColor(stakeholder.category)} variant="outline">
                  {stakeholder.category}
                </Badge>
                <div className="flex flex-wrap gap-1">
                  {stakeholder.subClusters.map((cluster, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cluster}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{stakeholder.activePlans}</p>
                  <p className="text-xs text-foreground">Active Plans</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-accent">{stakeholder.completedReports}</p>
                  <p className="text-xs text-foreground">Reports</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground">Joined</p>
                  <p className="text-sm font-medium">{new Date(stakeholder.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStakeholders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Stakeholders Found</h3>
            <p className="text-foreground mb-4">
              {searchTerm || filterStatus !== "all" || filterCategory !== "all"
                ? "Try adjusting your search or filters"
                : "No stakeholders registered yet"}
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Stakeholder
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddStakeholderForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "",
    province: "",
    district: "",
    subClusters: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding stakeholder:", formData)
    onClose()
  }

  const toggleSubCluster = (cluster: string) => {
    setFormData({
      ...formData,
      subClusters: formData.subClusters.includes(cluster)
        ? formData.subClusters.filter((c) => c !== cluster)
        : [...formData.subClusters, cluster],
    })
  }

  // Reuse centralized sub-cluster list
  // subClusters imported from mocks above

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="clusters">Sub-Clusters</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="organizationName">Organization Name *</Label>
            <Input
              id="organizationName"
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              placeholder="Enter organization name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="Enter contact person name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Implementing Partner">Implementing Partner</SelectItem>
                <SelectItem value="Development Partner">Development Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">Province *</Label>
              <Select
                value={formData.province}
                onValueChange={(value) => setFormData({ ...formData, province: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kigali City">Kigali City</SelectItem>
                  <SelectItem value="Eastern Province">Eastern Province</SelectItem>
                  <SelectItem value="Western Province">Western Province</SelectItem>
                  <SelectItem value="Northern Province">Northern Province</SelectItem>
                  <SelectItem value="Southern Province">Southern Province</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <Select
                value={formData.district}
                onValueChange={(value) => setFormData({ ...formData, district: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gasabo">Gasabo</SelectItem>
                  <SelectItem value="Kicukiro">Kicukiro</SelectItem>
                  <SelectItem value="Nyarugenge">Nyarugenge</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clusters" className="space-y-4">
          <div className="space-y-2">
            <Label>Sub-Clusters *</Label>
            <p className="text-sm text-foreground">Select the sub-clusters this stakeholder will work in</p>
            <div className="space-y-2">
              {subClusters.map((cluster) => (
                <div key={cluster} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={cluster}
                    checked={formData.subClusters.includes(cluster)}
                    onChange={() => toggleSubCluster(cluster)}
                    className="rounded border-border"
                  />
                  <Label htmlFor={cluster} className="text-sm">
                    {cluster}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Stakeholder</Button>
      </div>
    </form>
  )
}
