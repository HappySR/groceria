import { z } from "zod";
import { db } from "$lib/server/db";
import { nanoid } from "$lib/utils.server";
import { item } from "$lib/server/db/schema";
import type { RequestHandler } from "./$types";

const headers = {
  "Content-Type": "application/json",
};
const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number(),
  properties: z.record(z.string()),
  categoryId: z.string(),
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
    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          res: null,
          status: 400,
          message: "Invalid request body",
          errors: validationResult.error.errors,
        }),
        {
          status: 400,
          headers,
        },
      );
    }

    const { name, description, price, properties, categoryId } = validationResult.data;
    try {
      const newItem = await db
        .insert(item)
        .values({
          id: nanoid(),
          vendorId: locals.session.userId,
          categoryId,
          name,
          description,
          price: price.toString(),
          properties,
          createdAt: new Date(),
        })
        .returning();

      if (!newItem) {
        return new Response(
          JSON.stringify({
            res: null,
            status: 500,
            message: "Failed to create item",
          }),
          {
            status: 500,
            headers,
          },
        );
      }

      return new Response(
        JSON.stringify({
          res: newItem,
          status: 201,
          message: "Item created successfully",
        }),
        {
          status: 201,
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
