import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const [categoriesResponse, itemsResponse] = await Promise.all([
    fetch("/api/category/list", {
      method: "GET",
    }),
    fetch("/api/item/list", {
      method: "POST",
    }),
  ]);

  const items = await itemsResponse.json();
  const categories = await categoriesResponse.json();

  return {
    user: locals.user,
    session: locals.session,
    categories: categories.res as {
      id: string;
      name: string;
      createdAt: Date;
      description: string;
      userId: string;
      properties: {
        [key: string]: string;
      };
    }[],
    items: items as {
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
