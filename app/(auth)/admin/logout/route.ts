import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "sb_admin";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/admin",
  });
  redirect("/admin/login");
}
