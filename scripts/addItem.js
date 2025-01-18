// @ts-check

import { exit } from "process";
import { sql, nanoid } from "./_deps/db.js";
import { input } from "@inquirer/prompts";

const vendorId = await input({ message: "Enter vendor id: " });
const categoryId = await input({ message: "Enter category id: " });
const name = await input({ message: "Enter item name: " });
const description = await input({ message: "Enter item description: " });
const price = await input({ message: "Enter item price: " });
const properties = await input({ message: "Enter item properties (JSON): " });

try {
  const item =
    await sql`INSERT INTO "item" (id, vendor_id, category_id, name, description, price, properties, created_at)
  VALUES (${nanoid()}, ${vendorId.trim()}, ${categoryId.trim()}, ${name.trim()}, ${description.trim()}, ${price.trim()}, ${properties.trim()}::jsonb, ${new Date()})
  RETURNING *`;
  console.log("[?] New item:\n", item);
  exit(0);
} catch (e) {
  console.error("[!] Error setting user as admin:\n", e);
}
