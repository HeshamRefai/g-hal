import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { processRouter } from "./routers/process";
import { intelligenceRouter } from "./routers/intelligence";
import { redesignRouter } from "./routers/redesign";
import { allocationRouter } from "./routers/allocation";
import { governanceRouter } from "./routers/governance";
import { exceptionRouter } from "./routers/exception";
import { memoryRouter } from "./routers/memory";
import { aiRouter } from "./routers/ai";
import { realtimeRouter } from "./routers/realtime";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  process: processRouter,
  intelligence: intelligenceRouter,
  redesign: redesignRouter,
  allocation: allocationRouter,
  governance: governanceRouter,
  exception: exceptionRouter,
  memory: memoryRouter,
  ai: aiRouter,
  realtime: realtimeRouter,
});

export type AppRouter = typeof appRouter;
