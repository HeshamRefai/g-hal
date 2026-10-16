import { describe, it, expect } from "vitest";

async function loadTest(url: string, concurrent: number, iterations: number) {
  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const batch = Array.from({ length: concurrent }, async () => {
      const start = performance.now();
      const res = await fetch(url);
      const end = performance.now();
      return { status: res.status, time: end - start };
    });
    const results = await Promise.all(batch);
    results.forEach((r) => times.push(r.time));
  }
  return times;
}

describe("Load Test", () => {
  it("ping endpoint handles concurrent requests", async () => {
    const times = await loadTest("http://localhost:3000/api/trpc/ping", 10, 5);
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    expect(times.length).toBe(50);
    expect(avg).toBeLessThan(500);
  });
});
