import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import "dotenv/config";

async function seed() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection, { schema, mode: "default" });

  await db.insert(schema.tenants).values({ name: "Default Tenant", slug: "default", config: {} });
  await db.insert(schema.processes).values([
    { tenantId: "default", name: "Invoice Processing", status: "active", version: "2.1.0", ir: {} },
    { tenantId: "default", name: "Campaign Approval", status: "active", version: "1.5.0", ir: {} },
  ]);
  await db.insert(schema.actors).values([
    { tenantId: "default", name: "Invoice Agent", type: "agent", capacity: 100, trustScore: 0.94 },
    { tenantId: "default", name: "Manager A", type: "human", capacity: 8, trustScore: 0.78 },
  ]);
  await db.insert(schema.policies).values([
    { tenantId: "default", name: "Auto-approve under $3,000", effect: "ALLOW", active: true },
    { tenantId: "default", name: "Deny blocked vendors", effect: "DENY", active: true },
  ]);

  console.log("Seed complete!");
  await connection.end();
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
