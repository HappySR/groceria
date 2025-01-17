import { exit } from "process";
import postgres from "postgres";
import { input } from "@inquirer/prompts";

const userId = await input({ message: "Enter target user id: " });
const sql = postgres({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  pass: process.env.POSTGRES_PASSWORD,
  db: process.env.POSTGRES_DB,
});

try {
  await sql`UPDATE "user" SET role = 'admin' WHERE id = ${userId.trim()}`;
  const user = await sql`SELECT * FROM "user" WHERE id = ${userId.trim()}`;
  console.log("[?] New values:\n", user[0]);
  exit(0);
} catch (e) {
  console.error("[!] Error setting user as admin:\n", e);
}
