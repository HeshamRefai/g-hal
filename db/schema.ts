import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
  float,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

// ============================
// Core: Users & Tenants
// ============================
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "manager", "admin", "agent"]).default("user").notNull(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const tenants = mysqlTable("tenants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  config: json("config"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================
// Phase 1: Core Runtime
// ============================
export const processes = mysqlTable("processes", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["draft", "active", "archived"]).default("draft").notNull(),
  version: varchar("version", { length: 32 }).default("1.0.0").notNull(),
  ir: json("ir"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const cases = mysqlTable("cases", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  caseNumber: varchar("case_number", { length: 64 }).notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "completed", "exception", "escalated"]).default("open").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  payload: json("payload"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  cycleTimeHours: float("cycle_time_hours"),
});

export const caseEvents = mysqlTable("case_events", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  caseId: bigint("case_id", { mode: "number", unsigned: true }).notNull(),
  step: varchar("step", { length: 255 }).notNull(),
  actor: varchar("actor", { length: 255 }).notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["completed", "failed", "skipped", "pending"]).default("pending").notNull(),
  durationMinutes: int("duration_minutes"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// ============================
// Phase 2: Intelligence
// ============================
export const processGenomes = mysqlTable("process_genomes", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  nodes: json("nodes"),
  edges: json("edges"),
  eventSources: json("event_sources"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const frictionEntries = mysqlTable("friction_entries", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  type: mysqlEnum("type", ["wait_time", "handoff_delay", "rework_loop", "approval_bottleneck", "data_gap"]).notNull(),
  count: int("count").default(0).notNull(),
  impactScore: float("impact_score").default(0),
  resolved: int("resolved").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bottlenecks = mysqlTable("bottlenecks", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  avgWaitHours: float("avg_wait_hours").default(0),
  throughputImpact: float("throughput_impact").default(0),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  rootCause: text("root_cause"),
  detectedAt: timestamp("detected_at").defaultNow().notNull(),
});

export const anomalies = mysqlTable("anomalies", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  metric: varchar("metric", { length: 255 }).notNull(),
  expectedValue: float("expected_value"),
  actualValue: float("actual_value"),
  deviation: float("deviation"),
  status: mysqlEnum("status", ["active", "investigating", "resolved"]).default("active").notNull(),
  detectedAt: timestamp("detected_at").defaultNow().notNull(),
});

export const healthMetrics = mysqlTable("health_metrics", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  dimension: mysqlEnum("dimension", [
    "cycle_time", "error_rate", "automation", "throughput", "cost", "complexity"
  ]).notNull(),
  score: float("score").default(0),
  target: float("target").default(0),
  debtHours: float("debt_hours").default(0),
  measuredAt: timestamp("measured_at").defaultNow().notNull(),
});

// ============================
// Phase 3: Redesign
// ============================
export const redesigns = mysqlTable("redesigns", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["draft", "simulating", "approved", "rolled_out", "reverted"]).default("draft").notNull(),
  currentIr: json("current_ir"),
  proposedIr: json("proposed_ir"),
  principles: json("principles"),
  savingsEstimate: float("savings_estimate"),
  cycleTimeReduction: float("cycle_time_reduction"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const simulations = mysqlTable("simulations", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  redesignId: bigint("redesign_id", { mode: "number", unsigned: true }).notNull(),
  runs: int("runs").default(100).notNull(),
  baseTime: float("base_time").default(24),
  variance: float("variance").default(2),
  results: json("results"),
  avgCycleTime: float("avg_cycle_time"),
  p95CycleTime: float("p95_cycle_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================
// Phase 4: Allocation & Attention
// ============================
export const actors = mysqlTable("actors", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["human", "agent", "system"]).default("human").notNull(),
  capacity: int("capacity").default(8),
  currentLoad: int("current_load").default(0),
  queueDepth: int("queue_depth").default(0),
  trustScore: float("trust_score").default(1.0),
  active: boolean("active").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const attentionItems = mysqlTable("attention_items", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  type: mysqlEnum("type", ["bottleneck", "exception", "anomaly", "health_degradation", "sla_breach"]).notNull(),
  status: mysqlEnum("status", ["open", "acknowledged", "resolved"]).default("open").notNull(),
  duration: varchar("duration", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================
// Phase 5: Governance
// ============================
export const policies = mysqlTable("policies", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  effect: mysqlEnum("effect", ["ALLOW", "DENY", "APPROVAL_REQUIRED"]).notNull(),
  condition: json("condition"),
  active: boolean("active").default(true),
  hitCount: int("hit_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditEvents = mysqlTable("audit_events", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  eventId: varchar("event_id", { length: 64 }).notNull().unique(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  actor: varchar("actor", { length: 255 }).notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  caseId: varchar("case_id", { length: 64 }),
  hash: varchar("hash", { length: 64 }).notNull(),
  prevHash: varchar("prev_hash", { length: 64 }),
  details: json("details"),
});

// ============================
// Phase 6: Exception & Evolution
// ============================
export const exceptions = mysqlTable("exceptions", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  caseId: varchar("case_id", { length: 64 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["open", "resolved", "escalated"]).default("open").notNull(),
  assignedTo: varchar("assigned_to", { length: 255 }),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const changeProposals = mysqlTable("change_proposals", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["draft", "pending", "approved", "rejected", "rolled_out"]).default("draft").notNull(),
  proposedBy: varchar("proposed_by", { length: 255 }).notNull(),
  votesApprove: int("votes_approve").default(0),
  votesReject: int("votes_reject").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const evolutionVersions = mysqlTable("evolution_versions", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  processId: bigint("process_id", { mode: "number", unsigned: true }).notNull(),
  version: varchar("version", { length: 32 }).notNull(),
  cycleTime: float("cycle_time"),
  automationRate: float("automation_rate"),
  exceptionRate: float("exception_rate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================
// Phase 7: Memory & Evidence
// ============================
export const processMemories = mysqlTable("process_memories", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  type: mysqlEnum("type", ["lesson", "pattern", "best_practice", "warning"]).notNull(),
  content: text("content").notNull(),
  confidence: float("confidence").default(0.8),
  source: varchar("source", { length: 255 }),
  tags: json("tags"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const evidenceStore = mysqlTable("evidence_store", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  caseId: varchar("case_id", { length: 64 }).notNull(),
  evidenceType: mysqlEnum("evidence_type", ["document", "log", "decision", "image"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  hash: varchar("hash", { length: 64 }).notNull(),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================
// Gap Analysis Modules
// ============================
export const commercialAssessments = mysqlTable("commercial_assessments", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  roiEstimate: float("roi_estimate"),
  annualSavings: float("annual_savings"),
  implementationCost: float("implementation_cost"),
  stakeholderAlignment: mysqlEnum("stakeholder_alignment", ["low", "medium", "high"]).default("medium"),
  status: mysqlEnum("status", ["draft", "reviewing", "approved"]).default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dataReadinessChecks = mysqlTable("data_readiness_checks", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  quality: mysqlEnum("quality", ["poor", "fair", "good", "excellent"]).default("fair"),
  mapped: boolean("mapped").default(false),
  cleansed: boolean("cleansed").default(false),
  issues: json("issues"),
  checkedAt: timestamp("checked_at").defaultNow().notNull(),
});

export const adoptionMetrics = mysqlTable("adoption_metrics", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 64 }).notNull(),
  phase: varchar("phase", { length: 64 }).notNull(),
  trainingCompletion: float("training_completion").default(0),
  resistanceScore: float("resistance_score").default(0),
  feedbackCount: int("feedback_count").default(0),
  measuredAt: timestamp("measured_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Process = typeof processes.$inferSelect;
export type Case = typeof cases.$inferSelect;
export type CaseEvent = typeof caseEvents.$inferSelect;
export type Bottleneck = typeof bottlenecks.$inferSelect;
export type Anomaly = typeof anomalies.$inferSelect;
export type Redesign = typeof redesigns.$inferSelect;
export type Actor = typeof actors.$inferSelect;
export type Policy = typeof policies.$inferSelect;
export type AuditEvent = typeof auditEvents.$inferSelect;
export type Exception = typeof exceptions.$inferSelect;
export type ChangeProposal = typeof changeProposals.$inferSelect;
export type ProcessMemory = typeof processMemories.$inferSelect;
export type Evidence = typeof evidenceStore.$inferSelect;
