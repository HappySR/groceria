// @ts-check

import { exit } from "process";
import { sql, nanoid } from "./_deps/db.js";
import { input } from "@inquirer/prompts";

const userId = await input({ message: "Enter target user id: " });
const vendorname = await input({ message: "Enter vendor name: " });
const openAt = await input({ message: "Enter open time: " });
const closeAt = await input({ message: "Enter close time: " });
const days = await input({ message: "Enter days (comma separated): " });
const description = await input({ message: "Enter description: " });
const address = await input({ message: "Enter address: " });
const phone = await input({ message: "Enter phone: " });
const email = await input({ message: "Enter email: " });
const socialMedia = await input({ message: "Enter social media (JSON): " });

try {
  const vendor = await sql.begin(async (sql) => {
    const userRow = await sql`SELECT role FROM "user" WHERE id = ${userId.trim()}`;
    if (userRow[0]?.role === "user") {
      await sql`UPDATE "user" SET role = 'vendor' WHERE id = ${userId.trim()}`;
    }
    const vendor = await sql`
      INSERT INTO "vendor" (
        id,
        user_id,
        name,
        start_at,
        close_at,
        weekday,
        description,
        address,
        phone,
        email,
        social_media,
        created_at
      ) VALUES (
        ${nanoid()},
        ${userId.trim()},
        ${vendorname.trim()},
        ${openAt.trim()}::time,
        ${closeAt.trim()}::time,
        ${days.split(",").map((d) => d.trim())}::weekday[],
        ${description.trim()},
        ${address.trim()},
        ${phone.trim()},
        ${email.trim()},
        ${socialMedia.trim()}::jsonb,
        ${new Date()}
      ) RETURNING *`;
    return vendor;
  });
  console.log("[?] New vendor:\n", vendor);
  exit(0);
} catch (e) {
  console.error("[!] Error creating vendor:\n", e);
}
