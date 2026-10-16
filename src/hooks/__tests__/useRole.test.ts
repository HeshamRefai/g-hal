import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useAuth", () => ({ useAuth: vi.fn() }));

import { useAuth } from "@/hooks/useAuth";
import { useRole } from "../useRole";

describe("useRole", () => {
  it("returns admin role with full permissions", () => {
    (useAuth as any).mockReturnValue({ user: { role: "admin" } });
    const result = useRole();
    expect(result.role).toBe("admin");
    expect(result.isAdmin).toBe(true);
    expect(result.hasRole("user")).toBe(true);
  });

  it("returns manager role with limited permissions", () => {
    (useAuth as any).mockReturnValue({ user: { role: "manager" } });
    const result = useRole();
    expect(result.isAdmin).toBe(false);
    expect(result.isManager).toBe(true);
    expect(result.hasRole("admin")).toBe(false);
  });

  it("returns user role with basic permissions", () => {
    (useAuth as any).mockReturnValue({ user: { role: "user" } });
    const result = useRole();
    expect(result.isManager).toBe(false);
    expect(result.hasRole("user")).toBe(true);
  });

  it("handles missing user gracefully", () => {
    (useAuth as any).mockReturnValue({ user: null });
    const result = useRole();
    expect(result.role).toBe("user");
    expect(result.hasRole("admin")).toBe(false);
  });
});
