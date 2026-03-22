import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { fingerprint } = await request.json().catch(() => ({}));

  if (!slug || typeof fingerprint !== "string" || fingerprint.length < 8) {
    return NextResponse.json(
      { error: "Invalid fingerprint." },
      { status: 400 },
    );
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.rpc("project_add_like", {
    p_slug: slug,
    p_fingerprint: fingerprint,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to record like." },
      { status: 400 },
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({
    like_count: row?.like_count ?? null,
    liked: row?.liked ?? null,
  });
}
