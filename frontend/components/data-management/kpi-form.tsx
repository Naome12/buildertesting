"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Target, Plus, Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface KpiFormProps {
  onClose: () => void
  onSubmit: (kpi: any) => void
}

import { subClusters, kpiCategories, stakeholderCategories, existingDisaggregations } from "@/mocks/mockData"

export function KpiForm({ onClose, onSubmit }: KpiFormProps) {
  const [formData, setFormData] = useState({
    subClusterId: "",
    kpiCategoryId: "",
    stakeholderCategoryId: "",
    name: "",
    description: "",
    unit: "",
    disaggregations: [] as { name: string; options: string[] }[],
  })

  const [currentDisName, setCurrentDisName] = useState("")
  const [currentOption, setCurrentOption] = useState("")

  const filteredCategories = formData.subClusterId
    ? kpiCategories.filter((c) => c.subClusterId === formData.subClusterId)
    : []

  const addDisaggregationOption = () => {
    if (!currentDisName || !currentOption) return

    const existing = formData.disaggregations.find((d) => d.name === currentDisName)

    if (existing) {
      // Only add if option doesn't exist yet
      if (!existing.options.includes(currentOption)) {
        existing.options.push(currentOption)
        setFormData({ ...formData, disaggregations: [...formData.disaggregations] })
      }
    } else {
      setFormData({
        ...formData,
        disaggregations: [...formData.disaggregations, { name: currentDisName, options: [currentOption] }],
      })
    }

    setCurrentOption("")
  }

  const removeOption = (disName: string, option: string) => {
    const updated = formData.disaggregations
      .map((d) => (d.name === disName ? { ...d, options: d.options.filter((o) => o !== option) } : d))
      .filter((d) => d.options.length > 0)
    setFormData({ ...formData, disaggregations: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Create New KPI
            </CardTitle>
            <CardDescription>Define KPI & link categories</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sub-Cluster & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Sub-Cluster *</Label>
                <Select
                  value={formData.subClusterId}
                  onValueChange={(val) => setFormData({ ...formData, subClusterId: val, kpiCategoryId: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub-Cluster" />
                  </SelectTrigger>
                  <SelectContent>
                    {subClusters.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>KPI Category *</Label>
                <Select
                  value={formData.kpiCategoryId}
                  onValueChange={(val) => setFormData({ ...formData, kpiCategoryId: val })}
                  disabled={!formData.subClusterId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select KPI Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stakeholder */}
            <div>
              <Label>Stakeholder Category *</Label>
              <Select
                value={formData.stakeholderCategoryId}
                onValueChange={(val) => setFormData({ ...formData, stakeholderCategoryId: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Stakeholder Category" />
                </SelectTrigger>
                <SelectContent>
                  {stakeholderCategories.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* KPI Info */}
            <div className="space-y-4">
              <div>
                <Label>KPI Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter KPI name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe KPI purpose"
                />
              </div>
              <div>
                <Label>Unit *</Label>
                <Input
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., Number of trainings"
                />
              </div>
            </div>

            <Separator />

            {/* Disaggregations */}
            <div className="space-y-3">
              <Label>Disaggregation & Options</Label>
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={currentDisName}
                  onValueChange={setCurrentDisName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or type disaggregation" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingDisaggregations.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Option / Range e.g., 1-10"
                  value={currentOption}
                  onChange={(e) => setCurrentOption(e.target.value)}
                  className="w-1/3"
                />

                <Button type="button" onClick={addDisaggregationOption}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Display added disaggregations */}
              {formData.disaggregations.map((d) => (
                <div key={d.name} className="mt-2">
                  <div className="font-medium">{d.name}:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {d.options.map((opt) => (
                      <Button
                        key={opt}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(d.name, opt)}
                      >
                        {opt} <Trash className="inline-block h-3 w-3 ml-1" />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create KPI</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
