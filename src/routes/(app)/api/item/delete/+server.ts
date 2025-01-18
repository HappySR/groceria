import { z } from "zod";
import { db } from "$lib/server/db";
import { item } from "$lib/server/db/schema";
import type { RequestHandler } from "./$types";
import { eq, and, inArray } from "drizzle-orm";

const headers = {
  "Content-Type": "application/json",
};
const deleteItemSchema = z.object({
  ids: z.array(z.string().min(64).max(64)),
});

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.session || !["vendor", "admin"].includes(locals.user!.role)) {
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

  try {
    const body = await request.json();
    const result = deleteItemSchema.safeParse(body);

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

    try {
      const deletedItems = await db
        .delete(item)
        .where(and(eq(item.vendorId, locals.session.userId), inArray(item.id, result.data.ids)))
        .returning();

      if (!deletedItems || deletedItems.length === 0) {
        return new Response(
          JSON.stringify({
            res: null,
            status: 404,
            message: "Items not found",
          }),
          {
            status: 404,
            headers,
          },
        );
      }

      return new Response(
        JSON.stringify({
          res: deletedItems,
          status: 200,
          message: "Items deleted successfully",
        }),
        {
          status: 200,
          headers,
        },
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({
          res: null,
          status: 500,
          message: "Database error occurred",
        }),
        {
          status: 500,
          headers,
        },
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({
        res: null,
        status: 500,
        message: "Internal server error",
      }),
      {
        status: 500,
        headers,
      },
    );
  }
};
