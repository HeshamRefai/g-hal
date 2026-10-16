# G-HAL — Adaptive Process Redesign System

**G-HAL** (Governance-Harnessed Adaptive Layer) is a full-stack infrastructure for understanding, redesigning, governing, executing, measuring, and evolving organizational work. It is built around 7 core engines and 5 gap analysis modules, providing a complete Process Intelligence Platform.

## Architecture

### 7 Engines (28 Dashboards)
| Engine | Description | Modules |
|--------|-------------|---------|
| **E1 Intelligence** | Process understanding and health monitoring | Genome Builder, Query Interface, Friction Taxonomy, Bottleneck Detection, Root Cause Analysis, Anomaly Detection, Health & Debt, Discovery Agent |
| **E2 Redesign** | Zero-Based Process Redesign | ZBPR Engine, IR Generator, What-If Simulator, Impact Assessment, Redesign Agent |
| **E3 Simulation** | Monte-Carlo simulation and resource optimization | Simulation Engine, Resource Allocator, Attention Monitor |
| **E5 Governance** | Policy-as-Code and trust framework | Policy Engine, Trust Scoring, Audit Chain |
| **E6 Exception** | Exception handling and process evolution | Exception Handler, Change Proposals, Evolution Tracker |
| **E7 Memory** | Organizational knowledge and evidence | Process Memory, Evidence Store, Case History |

### 5 Gap Analysis Modules
- **Commercial Validation** — Business case, ROI calculator, stakeholder alignment
- **Data Readiness** — Data quality assessment and source mapping
- **A.G.E.N.T Methodology** — Interactive guide: Audit → Gauge → Engineer → Navigate → Track
- **Process Harness** — Step-by-step case execution UI
- **Human Adoption** — Change management tracker and resistance metrics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| Backend | tRPC 11.x + Hono + Drizzle ORM |
| Database | MySQL |
| AI | AI SDK (OpenAI-compatible gateway) |
| Auth | OAuth 2.0 (Kimi platform) |
| Charts | Recharts |

## Key Features

- **33 Routes** — Complete navigation across all engines and gap analysis
- **Role-Based Access Control** — Admin, Manager, Operator, Agent roles
- **Real LLM Integration** — Discovery Agent and Redesign Agent with streaming
- **SHA-256 Audit Chain** — Tamper-proof audit trail (P10 Protocol)
- **Multi-Tenancy** — `tenant_id` in every table
- **Dark Theme** — Slate-950 based UI

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Push database schema
npm run db:push

# Start development
npm run dev
```

## Role-Based Access Matrix

| Module | Admin | Manager | Operator | Agent |
|--------|-------|---------|----------|-------|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Intelligence | ✓ | ✓ | ✓ | ✗ |
| Redesign | ✓ | ✓ | ✗ | ✗ |
| Simulation | ✓ | ✓ | ✓ | ✗ |
| Governance | ✓ | ✓* | ✗ | ✗ |
| Exception | ✓ | ✓* | ✓ | ✗ |
| Memory | ✓ | ✓ | ✓ | ✗ |
| Gap Analysis | ✓ | ✓ | ✗ | ✗ |

*Partial access (e.g., Policy Engine requires Admin)

## Project Structure

```
├── api/                # tRPC routers & backend
│   ├── routers/        # 8 tRPC sub-routers
│   ├── ai/            # AI SDK provider
│   └── kimi/          # OAuth & platform integration
├── db/                # Drizzle schema & migrations
├── src/               # Frontend
│   ├── pages/         # 33 page components
│   ├── components/    # UI components
│   └── hooks/         # useAuth, useRole
└── contracts/         # Shared types
```

## API Endpoints (tRPC)

| Router | Endpoints |
|--------|-----------|
| `auth` | me, logout |
| `process` | stats, list, create, update |
| `intelligence` | stats, frictionList, bottleneckList |
| `redesign` | stats, list, create, simulate |
| `allocation` | stats, simulate |
| `governance` | stats, policyList, trustScores |
| `exception` | stats, list, resolve |
| `memory` | stats, memories, evidence |
| `ai` | discover, redesign, chat |

## License

MIT
