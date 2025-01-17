import { z } from "zod";
import { db } from "$lib/server/db";
import { nanoid } from "$lib/utils.server";
import type { RequestHandler } from "./$types";
import { category } from "$lib/server/db/schema";

const headers = {
  "Content-Type": "application/json",
};
const createSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().min(3).max(1000),
  properties: z.record(z.string()),
});

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.session || locals.user!.role !== "admin") {
    return new Response(
      JSON.stringify({
        res: null,
        status: 403,
        message: "Action not allowed",
      }),
      {
        status: 403,
        headers,
      },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        res: null,
        status: 400,
        message: "Invalid JSON body",
      }),
      {
        status: 400,
        headers,
      },
    );
  }
  const result = createSchema.safeParse(body);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        res: null,
        status: 400,
        message: result.error.errors[0].message,
      }),
      {
        status: 400,
        headers,
      },
    );
  }

  const { name, description, properties } = result.data;

  let res;
  try {
    res = await db
      .insert(category)
      .values({
        id: nanoid(),
        userId: locals.session.userId,
        name,
        description,
        properties,
        createdAt: new Date(),
      })
      .returning();
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        res: null,
        status: 500,
        message: "Error creating category",
      }),
      {
        status: 500,
        headers,
      },
    );
  }

  return new Response(
    JSON.stringify({
      res: res[0],
      status: 200,
      message: "Category created",
    }),
    {
      status: 200,
      headers,
    },
  );
};
