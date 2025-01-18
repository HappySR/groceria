import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const body = await fetch("/api/item/list", {
    method: "POST",
  });
  const response = await body.json();

  return {
    user: locals.user,
    session: locals.session,
    items: response as {
      res: {
        id: string;
        name: string;
        createdAt: Date;
        description: string;
        properties: {
          [key: string]: string;
        };
        vendorId: string;
        categoryId: string;
        price: string;
      }[];
      meta: {
        count: number;
        hasMore: boolean;
        nextCursor: Date | null;
        pageSize: number;
      };
    },
  };
};
