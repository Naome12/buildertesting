"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { X, AlertCircle, Target, Calendar, MapPin } from "lucide-react"

interface ActionPlanFormProps {
  onClose: () => void
  onSubmit: (plan: any) => void
}

import { kpis, existingPlans, financialYears, provinces, districts, subClusters } from "@/mocks/mockData"

export function ActionPlanForm({ onClose, onSubmit }: ActionPlanFormProps) {
  const [formData, setFormData] = useState({
    financialYear: "",
    subCluster: "",
    planLevel: "",
    country: "Rwanda",
    province: "",
    district: "",
    kpi: "",
    plannedValue: "",
    description: "",
    disaggregation: {} as Record<string, Record<string, string>>, // { disaggId: { optionId: value } }
  })

  // Use centralized constants from mocks (existingPlans, financialYears, provinces, districts, subClusters imported above)

  // Auto-populate disaggregations when KPI changes
  useEffect(() => {
    if (!formData.kpi) return
    const selectedKpi = kpis.find((k) => k.id === formData.kpi)
    if (!selectedKpi) return

    const initialDisagg: Record<string, Record<string, string>> = {}
    selectedKpi.disaggregations.forEach((d) => {
      initialDisagg[d.id] = {}
      d.options.forEach((opt) => {
        initialDisagg[d.id][opt.id] = ""
      })
    })

    setFormData((prev) => ({
      ...prev,
      disaggregation: initialDisagg,
    }))
  }, [formData.kpi])

  const updateDisaggregationValue = (disaggId: string, optionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      disaggregation: {
        ...prev.disaggregation,
        [disaggId]: {
          ...prev.disaggregation[disaggId],
          [optionId]: value,
        },
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const showExistingPlans = formData.kpi && formData.planLevel && (formData.district || formData.province)

  const selectedKpi = kpis.find((k) => k.id === formData.kpi)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Create New Action Plan
            </CardTitle>
            <CardDescription>Define your organization's planned activities and targets</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Planning Period */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Planning Period & Scope</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="financialYear">Financial Year *</Label>
                  <Select
                    value={formData.financialYear}
                    onValueChange={(value) => setFormData({ ...formData, financialYear: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select financial year" />
                    </SelectTrigger>
                    <SelectContent>
                      {financialYears.map((year) => (
                        <SelectItem key={year.id} value={year.id}>
                          {year.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subCluster">Sub-Cluster *</Label>
                  <Select
                    value={formData.subCluster}
                    onValueChange={(value) => setFormData({ ...formData, subCluster: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      {subClusters.map((cluster) => (
                        <SelectItem key={cluster.id} value={cluster.id}>
                          {cluster.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Geographic Scope */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Geographic Scope</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planLevel">Implementation Level *</Label>
                  <Select
                    value={formData.planLevel}
                    onValueChange={(value) => setFormData({ ...formData, planLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="country">Country Level</SelectItem>
                      <SelectItem value="province">Province Level</SelectItem>
                      <SelectItem value="district">District Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.planLevel === "province" || formData.planLevel === "district") && (
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
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.planLevel === "district" && formData.province && (
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
                        {districts
                          .filter((district) => district.provinceId === formData.province)
                          .map((district) => (
                            <SelectItem key={district.id} value={district.id}>
                              {district.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* KPI and Targets */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Performance Indicator & Targets</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kpi">KPI *</Label>
                  <Select value={formData.kpi} onValueChange={(value) => setFormData({ ...formData, kpi: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select KPI" />
                    </SelectTrigger>
                    <SelectContent>
                      {kpis.map((kpi) => (
                        <SelectItem key={kpi.id} value={kpi.id}>
                          {kpi.name} ({kpi.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plannedValue">Planned Target Value *</Label>
                  <Input
                    id="plannedValue"
                    type="number"
                    value={formData.plannedValue}
                    onChange={(e) => setFormData({ ...formData, plannedValue: e.target.value })}
                    placeholder="Enter target number"
                  />
                </div>
              </div>

              {/* Auto Disaggregation */}
              {selectedKpi && selectedKpi.disaggregations.length > 0 && (
                <div className="space-y-4">
                  <Label>Disaggregated Targets (Optional)</Label>
                  {selectedKpi.disaggregations.map((d) => (
                    <div key={d.id} className="p-3 border rounded space-y-3">
                      <h4 className="font-medium">{d.name}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {d.options.map((opt) => (
                          <div key={opt.id} className="space-y-1">
                            <Label>{opt.name}</Label>
                            <Input
                              type="number"
                              value={formData.disaggregation[d.id]?.[opt.id] || ""}
                              onChange={(e) => updateDisaggregationValue(d.id, opt.id, e.target.value)}
                              placeholder={`Enter ${opt.name}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Plan Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your planned activities and approach..."
                rows={4}
              />
            </div>

            {/* Existing Plans Warning */}
            {showExistingPlans && existingPlans.length > 0 && (
              <Alert className="border-secondary/20 bg-secondary/5">
                <AlertCircle className="h-4 w-4 text-secondary" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p className="font-medium text-secondary">Similar plans found in this area for the same KPI:</p>
                    <div className="space-y-2">
                      {existingPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="flex items-center justify-between p-2 bg-background rounded border"
                        >
                          <div>
                            <p className="font-medium">{plan.stakeholder}</p>
                            <p className="text-sm text-foreground">
                              {plan.location} • Target: {plan.plannedValue}
                            </p>
                          </div>
                          <Badge variant={plan.status === "Active" ? "default" : "secondary"}>{plan.status}</Badge>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-foreground">
                      Consider coordinating with these stakeholders to avoid duplication.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="transition-all duration-200 hover:scale-[1.02]">
                Create Action Plan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
