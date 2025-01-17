import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session || locals.user!.role !== "admin") {
    return redirect(302, "/market");
  }

  return {
    user: locals.user!,
    session: locals.session!,
  };
};
