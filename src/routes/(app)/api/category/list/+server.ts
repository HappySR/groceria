import { db } from "$lib/server/db";
import type { RequestHandler } from "./$types";

const headers = {
  "Content-Type": "application/json",
};

export const GET: RequestHandler = async () => {
  let res;
  try {
    res = await db.query.category.findMany();
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        res: null,
        status: 500,
        message: "Error listing categories",
      }),
      {
        status: 500,
        headers,
      },
    );
  }

  return new Response(
    JSON.stringify({
      res,
      status: 200,
      message: "Category listed",
    }),
    {
      status: 200,
      headers,
    },
  );
};
