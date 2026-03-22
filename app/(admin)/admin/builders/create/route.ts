import { redirect } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const discord = String(formData.get("discord_username") || "").trim();
  const githubUrl = String(formData.get("github_url") || "").trim();
  const imageUrl = String(formData.get("image_url") || "").trim();
  const xProfileUrl = String(formData.get("x_profile_url") || "").trim();

  if (!name || !discord || !githubUrl || !xProfileUrl) {
    return new Response("Missing required fields.", { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("builders")
    .insert({
      name,
      email: email || null,
      discord_username: discord,
      github_url: githubUrl,
      image_url: imageUrl || null,
      x_profile_url: xProfileUrl,
    })
    .select("id")
    .single();

  if (error || !data) {
    return new Response(error?.message || "Failed to create builder.", {
      status: 400,
    });
  }

  redirect("/admin/builders");
}
