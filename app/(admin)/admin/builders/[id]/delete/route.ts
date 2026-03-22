import { redirect } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from("builders").delete().eq("id", id);

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  redirect("/admin/builders");
}
