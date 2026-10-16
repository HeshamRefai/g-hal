# G-HAL User Guide

## Getting Started

### Login
1. Navigate to `/login`
2. Click "Sign In" to authenticate via OAuth
3. You will be redirected to the Dashboard

### Dashboard
The Dashboard provides an overview of total cases, active cases, average cycle time, and system health.

## Navigation

The sidebar is organized into 7 engine groups plus Gap Analysis.

### Intelligence (E1)
- **Genome Builder** — Map process DNA
- **Query Interface** — Natural language queries
- **Friction Taxonomy** — Categorized friction points
- **Bottleneck Detection** — Top ranked bottlenecks
- **Root Cause Analysis** — 5-Why analysis
- **Anomaly Detection** — Statistical monitoring
- **Health & Debt** — Process health scoring
- **Discovery Agent** — AI-powered discovery chatbot

### Redesign (E2) — Manager+
- **ZBPR Engine** — Zero-Based Process Redesign
- **IR Generator** — Process Intermediate Representation
- **What-If Simulator** — Scenario simulation
- **Impact Assessment** — Before/after comparison
- **Redesign Agent** — AI-powered redesign chatbot

### Simulation (E3)
- **Simulation Engine** — Monte-Carlo simulation
- **Resource Allocator** — Workload distribution
- **Attention Monitor** — Attention tracking

### Governance (E5) — Manager+
- **Policy Engine** — Policy-as-Code rules (Admin only)
- **Trust Scoring** — Actor performance metrics
- **Audit Chain** — SHA-256 tamper-proof audit trail

### Exception (E6)
- **Exception Handler** — Resolve exceptions
- **Change Proposals** — Vote on changes (Manager+)
- **Evolution Tracker** — Version history (Manager+)

### Memory (E7)
- **Process Memory** — Lessons learned
- **Evidence Store** — Decision evidence
- **Case History** — Full case timeline

### Gap Analysis — Manager+
- **Commercial Validation** — ROI calculator
- **Data Readiness** — Data quality assessment
- **A.G.E.N.T Methodology** — Interactive guide
- **Process Harness** — Step-by-step execution
- **Human Adoption** — Change management tracker

## Role-Based Access

| Role | Access |
|------|--------|
| **Admin** | Full system access |
| **Manager** | Intelligence, Redesign, Simulation, Governance, Gap Analysis |
| **Operator** | Intelligence (read), Simulation, Exception, Memory |
| **Agent** | Operational tasks, Process Harness |

## AI Agents

### Discovery Agent
Ask questions like: "What is my top bottleneck?" or "How can I reduce cycle time?"

### Redesign Agent
Describe goals like: "Reduce invoice processing from 35h to under 10h"
