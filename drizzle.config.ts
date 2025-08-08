import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/lib/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: Resource.DATABASE_URL.value!,
  },
});
