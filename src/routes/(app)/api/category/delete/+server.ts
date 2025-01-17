import { z } from "zod";
import { db } from "$lib/server/db";
import { eq, and, inArray } from "drizzle-orm";
import type { RequestHandler } from "./$types";
import { category } from "$lib/server/db/schema";

const headers = {
  "Content-Type": "application/json",
};
const deleteSchema = z.object({
  ids: z.array(z.string()),
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
  const result = deleteSchema.safeParse(body);

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

  const { ids } = result.data;

  let res;
  try {
    res = await db
      .delete(category)
      .where(and(eq(category.userId, locals.session!.userId), inArray(category.id, ids)))
      .returning();
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        res: null,
        status: 500,
        message: "Error deleting categories",
      }),
      {
        status: 500,
        headers,
      },
    );
  }

  return new Response(
    JSON.stringify({
      res: res,
      status: 200,
      message: "Categories deleted",
    }),
    {
      status: 200,
      headers,
    },
  );
};
