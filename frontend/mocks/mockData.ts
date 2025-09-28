import type { User, KPI } from "@/types"

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@migeprof.gov.rw",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    username: "stakeholder1",
    email: "stakeholder@ngo.org",
    role: "stakeholder",
    status: "active",
  },
  {
    id: "3",
    username: "focal1",
    email: "focal@migeprof.gov.rw",
    role: "subClusterFocalPerson",
    status: "active",
  },
]

export const auditLogs = [
  { ts: new Date().toISOString(), actor: "admin", action: "LOGIN", details: "Admin signed in" },
  { ts: new Date().toISOString(), actor: "admin", action: "CREATE_USER", details: "stakeholder2" },
]

export const subClusters = [
  "All Sub-Clusters",
  "Family Promotion & Anti-GBV",
  "Child Protection",
  "Women Empowerment",
  "Youth Development",
  "Social Protection",
]

export const initialKPIs: Array<{
  id: number
  title: string
  description: string
  subCluster: string
  stakeholderType: string
  units: string
  status: string
  currentValue: number
  totalTarget: number
  disaggregation: string[]
}> = [
  {
    id: 1,
    title: "Number of GBV trainings",
    description: "Training for community leaders",
    subCluster: "Family Promotion & Anti-GBV",
    stakeholderType: "Partner",
    units: "trainings",
    status: "Active",
    currentValue: 75,
    totalTarget: 100,
    disaggregation: ["Gender", "Age Group"],
  },
  {
    id: 2,
    title: "Children receiving psychosocial support",
    description: "Children accessing support services",
    subCluster: "Child Protection",
    stakeholderType: "Government",
    units: "children",
    status: "Active",
    currentValue: 320,
    totalTarget: 500,
    disaggregation: ["Age Group", "Disability Status"],
  },
]

export const plansData = [
  { month: "Jul", plans: 8 },
  { month: "Aug", plans: 10 },
  { month: "Sep", plans: 9 },
  { month: "Oct", plans: 11 },
  { month: "Nov", plans: 12 },
  { month: "Dec", plans: 13 },
]

export const reportsData = [
  { quarter: "Q1", reports: 12 },
  { quarter: "Q2", reports: 9 },
  { quarter: "Q3", reports: 7 },
  { quarter: "Q4", reports: 10 },
]

export const stakeholdersData = [
  { name: "Family Promotion", value: 10 },
  { name: "Child Protection", value: 8 },
  { name: "Women Empowerment", value: 6 },
  { name: "Youth Development", value: 3 },
]

export const samplePlans = [
  {
    id: "p1",
    title: "GBV Prevention Training",
    stakeholder: "CARE Rwanda",
    district: "Gasabo",
    province: "Kigali City",
    kpi: "# trainings",
    status: "Active",
  },
  {
    id: "p2",
    title: "Women Empowerment Program",
    stakeholder: "UN Women",
    district: "Kicukiro",
    province: "Kigali City",
    kpi: "# beneficiaries",
    status: "Planning",
  },
  {
    id: "p3",
    title: "Youth Leadership Initiative",
    stakeholder: "World Vision",
    district: "Nyarugenge",
    province: "Kigali City",
    kpi: "# camps",
    status: "Submitted",
  },
]

export const sampleReports = [
  {
    id: "1",
    actionPlanTitle: "GBV Prevention Training Program",
    quarter: "Q1 2024",
    quarterPeriod: "Jul-Sep 2024",
    kpi: "Number of GBV trainings",
    plannedValue: 15,
    actualValue: 8,
    achievement: 53,
    status: "Submitted",
    submittedDate: "2024-10-05",
    dueDate: "2024-10-15",
    stakeholder: "CARE Rwanda",
    location: "Gasabo District",
    hasDocument: true,
    progressSummary: "Successfully conducted 8 training sessions reaching 240 community members...",
  },
  {
    id: "2",
    actionPlanTitle: "Women Economic Empowerment Initiative",
    quarter: "Q1 2024",
    quarterPeriod: "Jul-Sep 2024",
    kpi: "Number of beneficiaries reached",
    plannedValue: 500,
    actualValue: 320,
    achievement: 64,
    status: "Submitted",
    submittedDate: "2024-09-28",
    dueDate: "2024-10-15",
    stakeholder: "UN Women",
    location: "Kigali City",
    hasDocument: true,
    progressSummary: "Reached 320 women through skills training and microfinance programs...",
  },
  {
    id: "3",
    actionPlanTitle: "Youth Leadership Development",
    quarter: "Q2 2024",
    quarterPeriod: "Oct-Dec 2024",
    kpi: "Number of awareness sessions",
    plannedValue: 25,
    actualValue: null,
    achievement: 0,
    status: "Due",
    submittedDate: null,
    dueDate: "2025-01-15",
    stakeholder: "World Vision",
    location: "Rwanda",
    hasDocument: false,
    progressSummary: null,
  },
  {
    id: "4",
    actionPlanTitle: "Community Health Program",
    quarter: "Q1 2024",
    quarterPeriod: "Jul-Sep 2024",
    kpi: "Number of health sessions",
    plannedValue: 20,
    actualValue: null,
    achievement: 0,
    status: "Overdue",
    submittedDate: null,
    dueDate: "2024-10-15",
    stakeholder: "Partners in Health",
    location: "Eastern Province",
    hasDocument: false,
    progressSummary: null,
  },
]

export const actionPlans = [
  {
    id: "1",
    title: "GBV Prevention Training Program",
    description: "Comprehensive training program for community leaders on GBV prevention",
    subCluster: "Family Promotion & Anti-GBV",
    kpi: "Number of GBV trainings",
    plannedValue: 15,
    actualValue: 8,
    progress: 53,
    status: "Active",
    level: "District",
    location: "Gasabo District",
    financialYear: "2024-2025",
    dueDate: "2025-03-15",
    stakeholder: "CARE Rwanda",
  },
  {
    id: "2",
    title: "Women Economic Empowerment Initiative",
    description: "Supporting women entrepreneurs through skills training and microfinance",
    subCluster: "Gender Equality & Women Empowerment",
    kpi: "Number of beneficiaries reached",
    plannedValue: 500,
    actualValue: 320,
    progress: 64,
    status: "Active",
    level: "Province",
    location: "Kigali City",
    financialYear: "2024-2025",
    dueDate: "2025-04-20",
    stakeholder: "UN Women",
  },
  {
    id: "3",
    title: "Youth Leadership Development",
    description: "Building leadership capacity among young people in rural communities",
    subCluster: "Youth Development",
    kpi: "Number of awareness sessions",
    plannedValue: 25,
    actualValue: 0,
    progress: 0,
    status: "Planning",
    level: "Country",
    location: "Rwanda",
    financialYear: "2025-2026",
    dueDate: "2025-07-01",
    stakeholder: "World Vision",
  },
]

export const sampleStakeholders = [
  {
    id: "1",
    organizationName: "CARE Rwanda",
    contactPerson: "Jean Baptiste Uwimana",
    email: "j.uwimana@care.org",
    phone: "+250 788 123 456",
    category: "Implementing Partner",
    subClusters: ["Family Promotion & Anti-GBV", "GEWE"],
    district: "Gasabo",
    province: "Kigali City",
    status: "Active",
    activePlans: 3,
    completedReports: 8,
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    organizationName: "UN Women Rwanda",
    contactPerson: "Marie Claire Mukamana",
    email: "marie.mukamana@unwomen.org",
    phone: "+250 788 234 567",
    category: "Development Partner",
    subClusters: ["GEWE"],
    district: "Nyarugenge",
    province: "Kigali City",
    status: "Active",
    activePlans: 2,
    completedReports: 12,
    joinDate: "2022-08-20",
  },
  {
    id: "3",
    organizationName: "World Vision Rwanda",
    contactPerson: "David Nkurunziza",
    email: "david.nkurunziza@wvi.org",
    phone: "+250 788 345 678",
    category: "Implementing Partner",
    subClusters: ["Youth Development", "Family Promotion & Anti-GBV"],
    district: "Kicukiro",
    province: "Kigali City",
    status: "Inactive",
    activePlans: 0,
    completedReports: 5,
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    organizationName: "Partners in Health Rwanda",
    contactPerson: "Agnes Binagwaho",
    email: "a.binagwaho@pih.org",
    phone: "+250 788 456 789",
    category: "Implementing Partner",
    subClusters: ["Family Promotion & Anti-GBV"],
    district: "Burera",
    province: "Northern Province",
    status: "Active",
    activePlans: 1,
    completedReports: 3,
    joinDate: "2023-06-01",
  },
]

// Additional common domain mocks
export const kpis = [
  {
    id: "gbv-trainings",
    name: "Number of GBV trainings",
    unit: "trainings",
    disaggregations: [
      {
        id: "gender",
        name: "Gender",
        options: [
          { id: "male", name: "Male" },
          { id: "female", name: "Female" },
        ],
      },
    ],
  },
  {
    id: "beneficiaries",
    name: "Number of beneficiaries reached",
    unit: "people",
    disaggregations: [
      {
        id: "age",
        name: "Age Group",
        options: [
          { id: "5-10", name: "5–10" },
          { id: "11-15", name: "11–15" },
          { id: "16-20", name: "16–20" },
        ],
      },
      {
        id: "gender",
        name: "Gender",
        options: [
          { id: "male", name: "Male" },
          { id: "female", name: "Female" },
        ],
      },
    ],
  },
  {
    id: "teachers-trained",
    name: "Number of teachers trained",
    unit: "teachers",
    disaggregations: [
      {
        id: "age",
        name: "Age Group",
        options: [
          { id: "21-30", name: "21–30" },
          { id: "31-40", name: "31–40" },
          { id: "41-50", name: "41–50" },
        ],
      },
    ],
  },
]

export const existingPlans = [
  {
    id: "1",
    stakeholder: "CARE Rwanda",
    kpi: "Number of GBV trainings",
    location: "Kigali District",
    plannedValue: 15,
    status: "Active",
  },
  {
    id: "2",
    stakeholder: "UN Women",
    kpi: "Number of GBV trainings",
    location: "Kigali District",
    plannedValue: 8,
    status: "Planning",
  },
]

export const financialYears = [
  { id: "2024-2025", name: "July 2024 - June 2025" },
  { id: "2025-2026", name: "July 2025 - June 2026" },
]

export const provinces = [
  { id: "kigali", name: "Kigali City" },
  { id: "eastern", name: "Eastern Province" },
  { id: "western", name: "Western Province" },
  { id: "northern", name: "Northern Province" },
  { id: "southern", name: "Southern Province" },
]

export const districts = [
  { id: "gasabo", name: "Gasabo District", provinceId: "kigali" },
  { id: "kicukiro", name: "Kicukiro District", provinceId: "kigali" },
  { id: "nyarugenge", name: "Nyarugenge District", provinceId: "kigali" },
]

export const quarters = [
  { id: "q1", name: "Q1 (July - September)", period: "Jul-Sep 2024" },
  { id: "q2", name: "Q2 (October - December)", period: "Oct-Dec 2024" },
  { id: "q3", name: "Q3 (January - March)", period: "Jan-Mar 2025" },
  { id: "q4", name: "Q4 (April - June)", period: "Apr-Jun 2025" },
]

export const kpiCategories = [
  { id: "awareness", name: "Awareness", subClusterId: "fp-agbv" },
  { id: "training", name: "Training", subClusterId: "fp-agbv" },
]

export const stakeholderCategories = [
  { id: "ngo", name: "NGO" },
  { id: "gov", name: "Government" },
  { id: "cso", name: "Civil Society" },
]

export const existingDisaggregations = ["Gender", "Age Group", "Location"]

export const sampleComments = [
  { id: "c1", target: "Plan #1", text: "Please align targets with district capacity", author: "focal1" },
  { id: "c2", target: "Report Q1 - Plan #3", text: "Include gender disaggregation details", author: "focal1" },
]
