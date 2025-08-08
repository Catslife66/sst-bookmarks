import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

import { schema } from "../lib/schema";

import ws from "ws";

neonConfig.webSocketConstructor = ws;
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsFolder = path.join(__dirname, "drizzle");

async function performMigrate() {
  console.log("Running migrations from:", migrationsFolder);
  await migrate(db, { migrationsFolder });
  console.log("Migrations completed");
}

performMigrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
