import { useRole } from "@/hooks/useRole";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import type { Role } from "@/hooks/useRole";

export function RoleGuard({
  required,
  children,
}: {
  required: Role | Role[];
  children: ReactNode;
}) {
  const { hasRole } = useRole();

  if (!hasRole(required)) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] text-slate-400">
        <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" />
        <h2 className="text-xl font-bold text-slate-200 mb-2">Access Denied</h2>
        <p className="text-sm">You do not have permission to access this module.</p>
      </div>
    );
  }

  return <>{children}</>;
}
