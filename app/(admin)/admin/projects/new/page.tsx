import Link from "next/link";
import { createAdminClient } from "@/utils/supabase/admin";
import { category as categoryOptions } from "@/constant";
import BuilderSelect from "@/components/admin/builder-select";

export const revalidate = 0;

export default async function AdminProjectNewPage() {
  const supabase = createAdminClient();
  const { data: builders } = await supabase
    .from("builders")
    .select("id, name, discord_username")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Projects
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Add project</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Create a new project linked to a builder.
          </p>
        </div>
        <Link href="/admin/projects" className="btn btn-ghost btn-sm">
          Back
        </Link>
      </div>

      <form
        method="post"
        action="/admin/projects/create"
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="space-y-4 rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Project Title
            <input
              name="title"
              required
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Description
            <textarea
              name="description"
              rows={4}
              required
              className="textarea textarea-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Category
            <select
              name="category"
              required
              className="select select-bordered w-full bg-base-100"
            >
              <option value="">Select category</option>
              {categoryOptions
                .filter((item) => item.value !== "all")
                .map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Builder
            <BuilderSelect builders={builders || []} />
          </label>
        </div>

        <div className="space-y-4 rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Status
            <select
              name="status"
              defaultValue="draft"
              className="select select-bordered w-full bg-base-100"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Live URL
            <input
              name="live_url"
              type="url"
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            GitHub Repo URL
            <input
              name="github_repo_url"
              type="url"
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Thumbnail URL
            <input
              name="thumbnail_url"
              type="url"
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Guideline Video URL
            <input
              name="guideline_video_url"
              type="url"
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Tech Stack (comma separated)
            <input
              name="tech_stack"
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Tags (comma separated)
            <input
              name="tags"
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-base-content/80">
            <input type="checkbox" name="verified" className="checkbox" />
            Verified
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-base-content/80">
            <input
              type="checkbox"
              name="http_enabled"
              className="checkbox"
              defaultChecked
            />
            HTTP Enabled
          </label>
        </div>

        <div className="lg:col-span-2 flex justify-end gap-2">
          <Link href="/admin/projects" className="btn btn-ghost btn-sm">
            Cancel
          </Link>
          <button className="btn btn-primary btn-sm" type="submit">
            Create project
          </button>
        </div>
      </form>
    </div>
  );
}
