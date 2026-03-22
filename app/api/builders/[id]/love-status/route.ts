import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { fingerprint } = await request.json().catch(() => ({}));

  if (!id) {
    return NextResponse.json({ error: "Missing builder id." }, { status: 400 });
  }
  if (
    !fingerprint ||
    typeof fingerprint !== "string" ||
    fingerprint.length < 8
  ) {
    return NextResponse.json(
      { error: "Invalid fingerprint." },
      { status: 400 },
    );
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.rpc("builder_has_loved", {
    p_builder_id: id,
    p_fingerprint: fingerprint,
  });

  if (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Failed to check love status." },
      { status: 400 },
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ liked: Boolean(row?.liked) });
}
