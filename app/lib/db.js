import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { Resource } from "sst";
import { schema } from "./schema";

export async function dbClient() {
  const sql = neon(Resource.DATABASE_URL.value);
  return drizzle(sql, { schema });
}
