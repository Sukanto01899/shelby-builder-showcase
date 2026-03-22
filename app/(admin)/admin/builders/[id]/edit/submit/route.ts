import { redirect } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const discord = String(formData.get("discord_username") || "").trim();
  const githubUrl = String(formData.get("github_url") || "").trim();
  const imageUrl = String(formData.get("image_url") || "").trim();
  const xProfileUrl = String(formData.get("x_profile_url") || "").trim();

  if (!name || !email || !discord || !githubUrl || !xProfileUrl) {
    return new Response("Missing required fields.", { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("builders")
    .update({
      name,
      email,
      discord_username: discord,
      github_url: githubUrl,
      image_url: imageUrl || null,
      x_profile_url: xProfileUrl,
    })
    .eq("id", id);

  if (error) {
    return new Response(error.message || "Failed to update builder.", {
      status: 400,
    });
  }

  redirect(`/admin/builders/${id}/edit`);
}
