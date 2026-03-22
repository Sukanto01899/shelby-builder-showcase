import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(
    24,
    Math.max(1, Number(searchParams.get("limit") || 12)),
  );
  const query = String(searchParams.get("q") || "").trim();
  const category = String(searchParams.get("category") || "").trim();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = createClient(await cookies());
  let requestBuilder = supabase
    .from("projects")
    .select(
      "id, title, description, category, status, views, like_count, thumbnail_url, slug, rating, live_url, github_repo_url, builders(id, name, discord_username, image_url)",
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category && category !== "all") {
    requestBuilder = requestBuilder.eq("category", category);
  }

  if (query) {
    const safe = query.replace(/[^\w\s-]/g, " ").trim();
    const tokens = safe.split(/\s+/).filter(Boolean);
    const orFilters: string[] = [
      `title.ilike.%${safe}%`,
      `builders.name.ilike.%${safe}%`,
    ];

    tokens.forEach((token) => {
      orFilters.push(`tags.cs.{${token}}`);
      orFilters.push(`tech_stack.cs.{${token}}`);
    });

    requestBuilder = requestBuilder.or(orFilters.join(","));
  }

  const { data, error } = await requestBuilder;

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load projects." },
      { status: 400 },
    );
  }

  const items = data ?? [];
  const hasMore = items.length === limit;
  return NextResponse.json({ items, nextPage: hasMore ? page + 1 : null });
}
