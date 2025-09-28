export interface User {
  id: string
  username: string
  email: string
  role: "stakeholder" | "admin" | "subClusterFocalPerson"
  status: "active" | "inactive"
}

export interface Stakeholder {
  id: string
  userId: string
  organizationName: string
  districtId?: string
  provinceId?: string
  countryId: string
  stakeholderCategoryId: string
}

export interface StakeholderCategory {
  id: string
  name: string
  description: string
}

export interface SubCluster {
  id: string
  name: string
  description: string
}

export interface Country {
  id: string
  name: string
}

export interface Province {
  id: string
  name: string
  countryId: string
}

export interface District {
  id: string
  name: string
  provinceId: string
}

export interface KPI {
  id: string
  subClusterId: string
  name: string
  description: string
  unit: string
  kpiCategoryId: string
  stakeholderCategoryId: string
}

export interface FinancialYear {
  id: string
  name: string
  startDate: string
  endDate: string
  planStartDate: string
  planEndDate: string
  reportStartDate: string
  reportEndDate: string
}

export interface ActionPlan {
  id: string
  yearId: string
  stakeholderSubclusterId: string
  document?: string
  comment?: string
  description: string
  planLevel: "country" | "province" | "district"
  districtId?: string
  provinceId?: string
  countryId: string
}

export interface Quarter {
  id: string
  name: string
  startDate: string
  endDate: string
  reportDueDate: string
  yearId: string
}

export interface Report {
  id: string
  actionPlanId: string
  yearId: string
  actualValue: number
  kpiPlanId: string
  quarterId: string
  progressSummary: string
  reportDocument?: string
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}
