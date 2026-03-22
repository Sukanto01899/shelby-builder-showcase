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
  const { data, error } = await supabase.rpc("project_record_view", {
    p_slug: slug,
    p_fingerprint: fingerprint,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to record view." },
      { status: 400 },
    );
  }

  const views = Array.isArray(data) ? (data[0]?.views ?? null) : data?.views;
  return NextResponse.json({ views });
}
