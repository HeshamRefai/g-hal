import { createRouter, publicQuery } from "../middleware";
import { observable } from "@trpc/server/observable";

export const realtimeRouter = createRouter({
  onStatsUpdate: publicQuery.subscription(() => {
    return observable<{ type: string; data: unknown }>((emit) => {
      const interval = setInterval(() => {
        emit.next({
          type: "stats",
          data: {
            timestamp: Date.now(),
            activeCases: Math.floor(Math.random() * 100) + 50,
            avgCycleTime: parseFloat((Math.random() * 20 + 5).toFixed(1)),
          },
        });
      }, 5000);
      return () => clearInterval(interval);
    });
  }),
});
