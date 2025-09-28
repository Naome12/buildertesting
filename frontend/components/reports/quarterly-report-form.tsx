"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { X, Upload, FileText, Target, Calendar, TrendingUp, AlertCircle } from "lucide-react"

interface QuarterlyReportFormProps {
  onClose: () => void
  onSubmit: (report: any) => void
  actionPlan?: any
}

import { quarters, actionPlans } from "@/mocks/mockData"

export function QuarterlyReportForm({ onClose, onSubmit, actionPlan }: QuarterlyReportFormProps) {
  const [formData, setFormData] = useState({
    quarter: "",
    actualValue: "",
    progressSummary: "",
    challenges: "",
    supportingDocument: null as File | null,
    disaggregation: [] as { type: string; value: string }[],
  })

  const [dragActive, setDragActive] = useState(false)

  // Use centralized quarters

  // Mock action plan data if not provided, prefer first action plan from mocks
  const plan = actionPlan || actionPlans[0] || {
    title: "GBV Prevention Training Program",
    kpi: "Number of GBV trainings",
    plannedValue: 15,
    actualValue: 8,
    stakeholder: "CARE Rwanda",
    location: "Gasabo District",
    subCluster: "Family Promotion & Anti-GBV",
  }

  const progressPercentage = Math.round(((plan as any).actualValue / (plan as any).plannedValue) * 100)
  const newProgressPercentage = formData.actualValue
    ? Math.round((Number(formData.actualValue) / (plan as any).plannedValue) * 100)
    : progressPercentage

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, supportingDocument: e.dataTransfer.files[0] })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, supportingDocument: e.target.files[0] })
    }
  }

  const addDisaggregation = () => {
    setFormData({
      ...formData,
      disaggregation: [...formData.disaggregation, { type: "", value: "" }],
    })
  }

  const removeDisaggregation = (index: number) => {
    setFormData({
      ...formData,
      disaggregation: formData.disaggregation.filter((_, i) => i !== index),
    })
  }

  const updateDisaggregation = (index: number, field: string, value: string) => {
    const updated = formData.disaggregation.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setFormData({ ...formData, disaggregation: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, actionPlanId: plan.id })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Quarterly Progress Report
            </CardTitle>
            <CardDescription>Submit your quarterly progress against the planned targets</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Action Plan Summary */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Action Plan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Plan Title</Label>
                  <p className="font-medium">{plan.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Stakeholder</Label>
                  <p className="font-medium">{plan.stakeholder}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">KPI</Label>
                  <p className="font-medium">{plan.kpi}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Location</Label>
                  <p className="font-medium">{plan.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-foreground">Current Progress</Label>
                  <span className="text-sm font-medium">
                    {plan.currentProgress} / {plan.plannedValue} ({progressPercentage}%)
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <Badge variant="outline" className="w-fit">
                {plan.subCluster}
              </Badge>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reporting Period */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Reporting Period</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quarter">Quarter *</Label>
                <Select
                  value={formData.quarter}
                  onValueChange={(value) => setFormData({ ...formData, quarter: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reporting quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    {quarters.map((quarter) => (
                      <SelectItem key={quarter.id} value={quarter.id}>
                        {quarter.name} - {quarter.period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Achievement Data */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Achievement Data</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actualValue">Actual Achievement *</Label>
                  <Input
                    id="actualValue"
                    type="number"
                    value={formData.actualValue}
                    onChange={(e) => setFormData({ ...formData, actualValue: e.target.value })}
                    placeholder="Enter actual number achieved"
                  />
                  <p className="text-sm text-foreground">
                    Planned target: {plan.plannedValue} {plan.kpi.toLowerCase()}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Updated Progress</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {formData.actualValue || plan.currentProgress} / {plan.plannedValue}
                      </span>
                      <span className="text-sm font-medium">{newProgressPercentage}%</span>
                    </div>
                    <Progress value={newProgressPercentage} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Disaggregated Data */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Disaggregated Data (Optional)</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addDisaggregation}>
                    <Target className="h-4 w-4 mr-2" />
                    Add Breakdown
                  </Button>
                </div>

                {formData.disaggregation.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Select value={item.type} onValueChange={(value) => updateDisaggregation(index, "type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gender">Gender</SelectItem>
                          <SelectItem value="age">Age Group</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="disability">Disability Status</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Value (e.g., Male: 25, Female: 30)"
                        value={item.value}
                        onChange={(e) => updateDisaggregation(index, "value", e.target.value)}
                      />
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeDisaggregation(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Progress Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Progress Summary</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="progressSummary">Progress Summary *</Label>
                  <Textarea
                    id="progressSummary"
                    value={formData.progressSummary}
                    onChange={(e) => setFormData({ ...formData, progressSummary: e.target.value })}
                    placeholder="Describe the key achievements, activities completed, and progress made during this quarter..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges & Lessons Learned</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    placeholder="Describe any challenges faced, how they were addressed, and lessons learned..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Supporting Documents */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Supporting Documents</h3>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {formData.supportingDocument ? (
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 text-primary mx-auto" />
                    <p className="font-medium">{formData.supportingDocument.name}</p>
                    <p className="text-sm text-foreground">
                      {(formData.supportingDocument.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, supportingDocument: null })}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-foreground mx-auto" />
                    <p className="font-medium">Upload Supporting Document</p>
                    <p className="text-sm text-foreground">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-foreground">PDF, Word, Excel files up to 10MB</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Browse Files
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Alert */}
            {formData.actualValue && Number(formData.actualValue) < plan.plannedValue * 0.5 && (
              <Alert className="border-secondary/20 bg-secondary/5">
                <AlertCircle className="h-4 w-4 text-secondary" />
                <AlertDescription>
                  <p className="font-medium text-secondary">Low Performance Alert</p>
                  <p className="text-sm text-foreground mt-1">
                    Achievement is significantly below target. Consider providing detailed explanation in the challenges
                    section and outlining corrective measures.
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="transition-all duration-200 hover:scale-[1.02]">
                Submit Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
