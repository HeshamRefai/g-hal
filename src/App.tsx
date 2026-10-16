import { Routes, Route } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { GenomeBuilder } from "./pages/GenomeBuilder";
import { QueryInterface } from "./pages/QueryInterface";
import { FrictionTaxonomy } from "./pages/FrictionTaxonomy";
import { BottleneckDetection } from "./pages/BottleneckDetection";
import { RootCauseAnalysis } from "./pages/RootCauseAnalysis";
import { AnomalyDetection } from "./pages/AnomalyDetection";
import { HealthDebt } from "./pages/HealthDebt";
import { DiscoveryAgent } from "./pages/DiscoveryAgent";
import { ZBPREngine } from "./pages/ZBPREngine";
import { IRGenerator } from "./pages/IRGenerator";
import { WhatIfSimulator } from "./pages/WhatIfSimulator";
import { ImpactAssessment } from "./pages/ImpactAssessment";
import { RedesignAgent } from "./pages/RedesignAgent";
import { SimulationEngine } from "./pages/SimulationEngine";
import { ResourceAllocator } from "./pages/ResourceAllocator";
import { AttentionMonitor } from "./pages/AttentionMonitor";
import { PolicyEngine } from "./pages/PolicyEngine";
import { TrustScoring } from "./pages/TrustScoring";
import { AuditChain } from "./pages/AuditChain";
import { ExceptionHandler } from "./pages/ExceptionHandler";
import { ChangeProposals } from "./pages/ChangeProposals";
import { EvolutionTracker } from "./pages/EvolutionTracker";
import { ProcessMemory } from "./pages/ProcessMemory";
import { EvidenceStore } from "./pages/EvidenceStore";
import { CaseHistory } from "./pages/CaseHistory";
import { CommercialValidation } from "./pages/CommercialValidation";
import { DataReadiness } from "./pages/DataReadiness";
import { AgentMethodology } from "./pages/AgentMethodology";
import { ProcessHarness } from "./pages/ProcessHarness";
import { HumanAdoption } from "./pages/HumanAdoption";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { RoleGuard } from "./components/RoleGuard";

function ProtectedRoutes() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [user, isLoading, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Phase 2: Intelligence */}
        <Route path="/intelligence/genome" element={<GenomeBuilder />} />
        <Route path="/intelligence/query" element={<QueryInterface />} />
        <Route path="/intelligence/friction" element={<FrictionTaxonomy />} />
        <Route path="/intelligence/bottlenecks" element={<BottleneckDetection />} />
        <Route path="/intelligence/rca" element={<RootCauseAnalysis />} />
        <Route path="/intelligence/anomalies" element={<AnomalyDetection />} />
        <Route path="/intelligence/health" element={<HealthDebt />} />
        <Route path="/intelligence/discovery" element={<DiscoveryAgent />} />
        {/* Phase 3: Redesign */}
        <Route path="/redesign/zbpr" element={<RoleGuard required="manager"><ZBPREngine /></RoleGuard>} />
        <Route path="/redesign/ir" element={<RoleGuard required="manager"><IRGenerator /></RoleGuard>} />
        <Route path="/redesign/simulator" element={<RoleGuard required="manager"><WhatIfSimulator /></RoleGuard>} />
        <Route path="/redesign/impact" element={<RoleGuard required="manager"><ImpactAssessment /></RoleGuard>} />
        <Route path="/redesign/agent" element={<RoleGuard required="manager"><RedesignAgent /></RoleGuard>} />
        {/* Phase 4: Simulation & Allocation */}
        <Route path="/simulation/engine" element={<SimulationEngine />} />
        <Route path="/simulation/allocator" element={<ResourceAllocator />} />
        <Route path="/simulation/attention" element={<AttentionMonitor />} />
        {/* Phase 5: Governance */}
        <Route path="/governance/policies" element={<RoleGuard required="admin"><PolicyEngine /></RoleGuard>} />
        <Route path="/governance/trust" element={<RoleGuard required="manager"><TrustScoring /></RoleGuard>} />
        <Route path="/governance/audit" element={<RoleGuard required="manager"><AuditChain /></RoleGuard>} />
        {/* Phase 6: Exception & Evolution */}
        <Route path="/exception/handler" element={<ExceptionHandler />} />
        <Route path="/exception/changes" element={<RoleGuard required="manager"><ChangeProposals /></RoleGuard>} />
        <Route path="/exception/evolution" element={<RoleGuard required="manager"><EvolutionTracker /></RoleGuard>} />
        {/* Phase 7: Memory & Evidence */}
        <Route path="/memory/store" element={<ProcessMemory />} />
        <Route path="/memory/evidence" element={<EvidenceStore />} />
        <Route path="/memory/history" element={<CaseHistory />} />
        {/* Gap Analysis */}
        <Route path="/gap/commercial" element={<RoleGuard required="manager"><CommercialValidation /></RoleGuard>} />
        <Route path="/gap/data" element={<RoleGuard required="manager"><DataReadiness /></RoleGuard>} />
        <Route path="/gap/methodology" element={<RoleGuard required="manager"><AgentMethodology /></RoleGuard>} />
        <Route path="/gap/harness" element={<RoleGuard required="manager"><ProcessHarness /></RoleGuard>} />
        <Route path="/gap/adoption" element={<RoleGuard required="manager"><HumanAdoption /></RoleGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}
