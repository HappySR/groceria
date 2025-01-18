// @ts-check

import { exit } from "process";
import { sql } from "./_deps/db.js";
import { input } from "@inquirer/prompts";

const userId = await input({ message: "Enter target user id: " });

try {
  const user = await sql`WITH updated AS (
    UPDATE "user" SET role = 'admin'
    WHERE id = ${userId.trim()}
    RETURNING *
  )
  SELECT * FROM updated`;
  console.log("[?] New values:\n", user[0]);
  exit(0);
} catch (e) {
  console.error("[!] Error setting user as admin:\n", e);
}
