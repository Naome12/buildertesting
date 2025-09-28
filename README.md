```text
                     ███████╗ ███╗   ███╗ ████████╗
                    ██ ╔════╝ ████╗ ████║ ╚══██╔══╝
                    ███████╗  ██╔████╔██║    ██║   
                    ╚════██║  ██║╚██╔╝██║    ██║   
                    ███████║  ██║ ╚═╝ ██║    ██║   
                    ╚══════╝  ╚═╝     ╚═╝    ╚═╝   
```

# MIGEPROF-SMT
Stakeholders Mapping Tool (SMT), a reporting platform for MIGEPROF partners.

# Features Overview

## 📋 Project Overview
The **Stakeholder Mapping Tool (SMT)** is a web-based application designed to facilitate planning, reporting, and coordination among stakeholders working with MIGEPROF across various sub-clusters. The system aims to prevent duplication of efforts, ensure transparency, and enable data-driven analysis.

---

## 👥 User Roles
- **Stakeholder User**: Create action plans, submit quarterly reports, view other plans.
- **Stakeholder Admin**: Manage stakeholder users, create plans, submit reports.
- **Sub-Cluster Focal Person**: View all plans/reports in their sub-cluster, add comments, export data, stakeholders registration and management.
- **System Administrator**: Manage user accounts, roles, permissions, and system configuration.

---

## 🚀 Core Features to Implement

### 1. User Authentication and Authorization (UA)
- Login with email and password
- Role-based access control (Stakeholder, Focal Person, Admin)
- Admin capabilities to manage users and system resources

### 2. Administrative Level Management (ADM)
- Pre-defined hierarchy: Country → Provinces → Districts
- Selection of administrative levels when creating plans

### 3. KPI and Sub-Cluster Management (KPI)
- Admin/Focal Person can define and manage sub-clusters
- Define standard KPIs with units for each sub-cluster
- Configurable disaggregation fields (e.g., gender, age) as Option Sets & Options

### 4. Action Plan Management (AP)
- Create action plans for specific sub-clusters and financial years (July–June)
- Select financial year, sub-cluster, geographic area, KPI, and targets
- View existing plans for the same KPI and area to avoid duplication
- Edit/delete plans before planning deadlines

### 5. Reporting Module (RM)
- Quarterly reporting for active plans
- Enter actual vs. planned values, disaggregated data, and progress summaries
- Upload supporting documents (PDF, Word, Excel) - Optional
- View report history

### 6. Coordination and Commentary (CC)
- Focal Persons can view all plans and reports in their sub-cluster
- Add comments to plans/reports
- Email notifications for new comments

### 7. Data Export (DE)
- Export plan and report data for sub-clusters
- Include stakeholder name, KPI, geographic area, planned/actual values, disaggregations, and comments

---

## 🧩 Additional User Stories to Implement

### For Stakeholders:
- Search existing plans by KPI and district
- Dashboard overview of plans and reporting status
- Email reminders for upcoming report deadlines

### For Sub-Cluster Focal Persons:
- Filter plans/reports by province, district, and stakeholder
- Visual summaries (charts) of planned vs. actual achievements
- Download all supporting documents in a zip file

### For Admins:
- Bulk import users via CSV
- View audit logs for logins and critical actions

---

## 🛠️ Non-Functional Requirements
- **Usability**: Interactive interface, minimal training required, English language support
- **Security**: Password encryption, role-based data access
- **Data Integrity**: Form validation to prevent incorrect data entry

---

## 🌐 TechStack

| Module         | TechStack                            |
| -------------- | ------------------------------------ |
| Frontend       | React + Typescript                   |
| Backend        | Node + Typescript                    |
| Database       | Mysql                                |

---

*We may update this file as development progresses...*