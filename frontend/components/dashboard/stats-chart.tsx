"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const barData = [
  { name: "Q1", planned: 120, actual: 95 },
  { name: "Q2", planned: 140, actual: 132 },
  { name: "Q3", planned: 160, actual: 155 },
  { name: "Q4", planned: 180, actual: 165 },
]

const pieData = [
  { name: "Male", value: 45, color: "hsl(var(--primary))" },
  { name: "Female", value: 55, color: "hsl(var(--secondary))" },
]

interface StatsChartProps {
  type: "bar" | "pie"
  title: string
  data?: any[]
}

export default function StatsChart({ type, title, data }: StatsChartProps) {
  if (type === "bar") {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data || barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="planned" fill="hsl(var(--primary))" name="Planned" radius={[2, 2, 0, 0]} />
              <Bar dataKey="actual" fill="hsl(var(--secondary))" name="Actual" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data || pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" stroke="none">
              {(data || pieData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {(data || pieData).map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-muted-foreground">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
