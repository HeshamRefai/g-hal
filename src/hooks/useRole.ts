import { useAuth } from "./useAuth";

export type Role = "user" | "manager" | "admin" | "agent";

const ROLE_WEIGHTS: Record<Role, number> = {
  user: 1,
  agent: 1,
  manager: 2,
  admin: 3,
};

export function useRole() {
  const { user } = useAuth();
  const role = (user?.role as Role) ?? "user";

  const hasRole = (required: Role | Role[]) => {
    const requiredRoles = Array.isArray(required) ? required : [required];
    const userWeight = ROLE_WEIGHTS[role] ?? 0;
    return requiredRoles.some((r) => userWeight >= (ROLE_WEIGHTS[r] ?? 0));
  };

  const isAdmin = role === "admin";
  const isManager = role === "manager" || role === "admin";
  const isOperator = role === "user" || role === "manager" || role === "admin";
  const isAgent = role === "agent" || isOperator;

  return { role, hasRole, isAdmin, isManager, isOperator, isAgent };
}
