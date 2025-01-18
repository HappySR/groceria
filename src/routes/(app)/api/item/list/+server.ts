import { z } from "zod";
import { desc } from "drizzle-orm";
import { db } from "$lib/server/db";
import { item } from "$lib/server/db/schema";
import type { RequestHandler } from "./$types";

const headers = {
  "Content-Type": "application/json",
};
const schema = z.object({
  cursor: z.string().datetime().nullable().optional(),
  pageSize: z.number().int().min(1).max(20).default(5),
  direction: z.enum(["next", "prev"]).default("next"),
  order: z.enum(["asc", "desc"]).default("desc"),
  vendorId: z.string().optional(),
  categoryId: z.string().optional(),
});

export const POST: RequestHandler = async ({ url }) => {
  try {
    const queryParams = Object.fromEntries(url.searchParams);
    const validationResult = schema.safeParse(queryParams);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          res: null,
          meta: null,
          status: 400,
          message: "Invalid query parameters",
          errors: validationResult.error.errors,
        }),
        {
          status: 400,
          headers,
        },
      );
    }

    const { cursor, pageSize, direction, order, vendorId, categoryId } = validationResult.data;
    const limit = pageSize;

    try {
      const items = await db.query.item.findMany({
        where: cursor
          ? (fields, { eq, and, lt, gt }) => {
              const conditions = [
                direction === "next"
                  ? lt(fields.createdAt, new Date(cursor))
                  : gt(fields.createdAt, new Date(cursor)),
              ];
              if (vendorId) conditions.push(eq(fields.vendorId, vendorId));
              if (categoryId) conditions.push(eq(fields.categoryId, categoryId));
              return and(...conditions);
            }
          : (fields, { eq, and }) => {
              const conditions = [];
              if (vendorId) conditions.push(eq(fields.vendorId, vendorId));
              if (categoryId) conditions.push(eq(fields.categoryId, categoryId));
              return conditions.length ? and(...conditions) : undefined;
            },
        orderBy: [
          direction === "next"
            ? order === "desc"
              ? desc(item.createdAt)
              : item.createdAt
            : item.createdAt,
        ],
        limit: limit + 1,
      });

      if (!items) {
        return new Response(
          JSON.stringify({
            res: null,
            meta: null,
            status: 404,
            message: "Items not found",
          }),
          {
            status: 404,
            headers,
          },
        );
      }

      const hasMore = items.length > limit;
      const results = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2].createdAt : null;

      return new Response(
        JSON.stringify({
          res: results,
          meta: {
            count: results.length,
            hasMore,
            nextCursor,
            pageSize,
          },
          status: 200,
          message: "Items listed successfully",
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
          meta: null,
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
        meta: null,
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
