import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/lib/upload";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("thumbnail") as File | null;

    const projectName = String(formData.get("projectName") || "").trim();
    const liveLink = String(formData.get("liveLink") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const discord = String(formData.get("discord") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const xProfile = String(formData.get("xProfile") || "").trim();
    const videoLink = String(formData.get("videoLink") || "").trim();
    const githubRepo = String(formData.get("githubRepo") || "").trim();
    const techStack = String(formData.get("techStack") || "").trim();
    const tags = String(formData.get("tags") || "").trim();

    if (
      !projectName ||
      !liveLink ||
      !category ||
      !description ||
      !discord ||
      !githubRepo ||
      !xProfile
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const urlFields = [
      { label: "Live link", value: liveLink, required: true },
      { label: "GitHub repo", value: githubRepo, required: true },
      { label: "Guideline video", value: videoLink, required: false },
      { label: "X profile", value: xProfile, required: true },
    ];

    for (const field of urlFields) {
      if (!field.value && !field.required) continue;
      try {
        // eslint-disable-next-line no-new
        new URL(field.value);
      } catch {
        return NextResponse.json(
          { error: `${field.label} must be a valid URL.` },
          { status: 400 },
        );
      }
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Project thumbnail is required." },
        { status: 400 },
      );
    }

    let thumbnailUrl: string | null = null;
    const { secure_url } = await uploadImage(file, "project-thumbnails");
    thumbnailUrl = secure_url;

    const techStackList = techStack
      ? techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    const tagsList = tags
      ? tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const payload = {
      project_name: projectName,
      live_url: liveLink,
      github_repo_url: githubRepo,
      thumbnail_url: thumbnailUrl,
      guideline_video_url: videoLink || null,
      category,
      tech_stack: techStackList,
      tags: tagsList,
      project_description: description,
      builder_discord_username: discord,
      builder_x_profile_url: xProfile,
      builder_email: email || null,
    };

    const supabase = createClient(await cookies());

    const { error } = await supabase.from("project_submissions").insert({
      project_name: payload.project_name,
      project_description: payload.project_description,
      category: payload.category,
      tech_stack: payload.tech_stack,
      tags: payload.tags,
      github_repo_url: payload.github_repo_url,
      thumbnail_url: payload.thumbnail_url,
      guideline_video_url: payload.guideline_video_url,
      live_url: payload.live_url,
      builder_x_profile_url: payload.builder_x_profile_url,
      builder_discord_username: payload.builder_discord_username,
      builder_email: payload.builder_email,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to save submission." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
