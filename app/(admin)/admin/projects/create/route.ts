import { redirect } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";

const toList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const builderId = String(formData.get("builder_id") || "").trim();
  const status = String(formData.get("status") || "draft").trim();

  if (!title || !description || !category || !builderId) {
    return new Response("Missing required fields.", { status: 400 });
  }

  const payload = {
    title,
    description,
    category,
    builder_id: builderId,
    status,
    live_url: String(formData.get("live_url") || "").trim() || null,
    github_repo_url:
      String(formData.get("github_repo_url") || "").trim() || null,
    thumbnail_url: String(formData.get("thumbnail_url") || "").trim() || null,
    guideline_video_url:
      String(formData.get("guideline_video_url") || "").trim() || null,
    tech_stack: toList(String(formData.get("tech_stack") || "")),
    tags: toList(String(formData.get("tags") || "")),
    verified: Boolean(formData.get("verified")),
    http_enabled: Boolean(formData.get("http_enabled")),
  };

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("id")
    .single();

  if (error || !data) {
    return new Response(error?.message || "Failed to create project.", {
      status: 400,
    });
  }

  redirect(`/admin/projects/${data.id}/edit`);
}
