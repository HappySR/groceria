import postgres from "postgres";
import * as schema from "./schema.js";
import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/postgres-js";

if (!env.POSTGRES_HOST) throw new Error("Postgres host is not set");
if (!env.POSTGRES_PORT) throw new Error("Postgres port is not set");
if (!env.POSTGRES_USER) throw new Error("Postgres user is not set");
if (!env.POSTGRES_DB) throw new Error("Postgres database is not set");
if (!env.POSTGRES_PASSWORD) throw new Error("Postgres password is not set");

const client = postgres(
  `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
);
export const db = drizzle(client, { schema });
