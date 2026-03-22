import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { fingerprint, message } = await request.json().catch(() => ({}));

  if (!slug || typeof fingerprint !== "string" || fingerprint.length < 8) {
    return NextResponse.json(
      { error: "Invalid fingerprint." },
      { status: 400 },
    );
  }

  if (typeof message !== "string" || message.trim().length < 2) {
    return NextResponse.json(
      { error: "Comment is too short." },
      { status: 400 },
    );
  }

  const safeMessage = message.trim().slice(0, 1000);

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.rpc("project_add_comment", {
    p_slug: slug,
    p_fingerprint: fingerprint,
    p_message: safeMessage,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to add comment." },
      { status: 400 },
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ comment: row?.comment ?? null });
}
