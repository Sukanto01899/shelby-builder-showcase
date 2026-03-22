import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";

export default async function AdminBuilderEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: builder, error } = await supabase
    .from("builders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !builder) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Builders
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Edit builder</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Update builder profile details.
          </p>
        </div>
        <Link href="/admin/builders" className="btn btn-ghost btn-sm">
          Back
        </Link>
      </div>

      <form
        method="post"
        action={`/admin/builders/${builder.id}/edit/submit`}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="space-y-4 rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Name
            <input
              name="name"
              required
              defaultValue={builder.name}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Email
            <input
              name="email"
              type="email"
              defaultValue={builder.email}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Discord Username
            <input
              name="discord_username"
              required
              defaultValue={builder.discord_username}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
        </div>

        <div className="space-y-4 rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            GitHub URL
            <input
              name="github_url"
              type="url"
              required
              defaultValue={builder.github_url}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Profile Image URL
            <input
              name="image_url"
              type="url"
              defaultValue={builder.image_url ?? ""}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            X Profile URL
            <input
              name="x_profile_url"
              type="url"
              required
              defaultValue={builder.x_profile_url}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
        </div>

        <div className="lg:col-span-2 flex justify-end gap-2">
          <Link href="/admin/builders" className="btn btn-ghost btn-sm">
            Cancel
          </Link>
          <button className="btn btn-primary btn-sm" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
