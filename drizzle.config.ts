import { defineConfig } from "drizzle-kit";

if (!process.env.POSTGRES_HOST) throw new Error("Postgres host is not set");
if (!process.env.POSTGRES_PORT) throw new Error("Postgres port is not set");
if (!process.env.POSTGRES_USER) throw new Error("Postgres user is not set");
if (!process.env.POSTGRES_DB) throw new Error("Postgres database is not set");
if (!process.env.POSTGRES_PASSWORD) throw new Error("Postgres password is not set");

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  verbose: true,
  strict: true,
});
