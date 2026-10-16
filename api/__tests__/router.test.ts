import { describe, it, expect } from "vitest";
import { appRouter } from "../router";

describe("appRouter", () => {
  it("has all required routers registered", () => {
    const routerKeys = Object.keys(appRouter._def.procedures);
    const expected = [
      "ping", "auth.me", "auth.logout",
      "process.stats", "intelligence.stats",
      "ai.discover", "ai.redesign",
    ];
    for (const key of expected) {
      expect(routerKeys).toContain(key);
    }
  });

  it("ping responds with ok", async () => {
    const caller = appRouter.createCaller({ req: new Request("http://localhost"), resHeaders: new Headers() });
    const result = await caller.ping();
    expect(result.ok).toBe(true);
    expect(result.ts).toBeTypeOf("number");
  });
});
