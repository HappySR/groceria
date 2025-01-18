import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  if (!locals.session || locals.user!.role !== "admin") {
    return redirect(302, "/sign-in");
  }

  const body = await fetch("/api/category/list", {
    method: "GET",
  });
  const response = await body.json();

  return {
    user: locals.user!,
    session: locals.session!,
    categories: response.res as {
      id: string;
      name: string;
      createdAt: Date;
      description: string;
      userId: string;
      properties: {
        [key: string]: string;
      };
    }[],
  };
};
