import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";
import { category as categoryOptions } from "@/constant";

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !project) {
    notFound();
  }

  const { data: builders } = await supabase
    .from("builders")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Projects
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Edit project</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Update project details and status.
          </p>
        </div>
        <Link href="/admin/projects" className="btn btn-ghost btn-sm">
          Back
        </Link>
      </div>

      <form
        method="post"
        action={`/admin/projects/${project.id}/edit/submit`}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="space-y-4 rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Project Title
            <input
              name="title"
              required
              defaultValue={project.title}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Description
            <textarea
              name="description"
              rows={4}
              required
              defaultValue={project.description}
              className="textarea textarea-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Category
            <select
              name="category"
              required
              defaultValue={project.category}
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
            <select
              name="builder_id"
              required
              defaultValue={project.builder_id}
              className="select select-bordered w-full bg-base-100"
            >
              <option value="">Select builder</option>
              {builders?.map((builder) => (
                <option key={builder.id} value={builder.id}>
                  {builder.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4 rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Status
            <select
              name="status"
              defaultValue={project.status}
              className="select select-bordered w-full bg-base-100"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Live URL
            <input
              name="live_url"
              type="url"
              defaultValue={project.live_url ?? ""}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            GitHub Repo URL
            <input
              name="github_repo_url"
              type="url"
              defaultValue={project.github_repo_url ?? ""}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Thumbnail URL
            <input
              name="thumbnail_url"
              type="url"
              defaultValue={project.thumbnail_url ?? ""}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Guideline Video URL
            <input
              name="guideline_video_url"
              type="url"
              defaultValue={project.guideline_video_url ?? ""}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Tech Stack (comma separated)
            <input
              name="tech_stack"
              defaultValue={(project.tech_stack || []).join(", ")}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-base-content/80">
            Tags (comma separated)
            <input
              name="tags"
              defaultValue={(project.tags || []).join(", ")}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-base-content/80">
            <input
              type="checkbox"
              name="verified"
              className="checkbox"
              defaultChecked={Boolean(project.verified)}
            />
            Verified
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-base-content/80">
            <input
              type="checkbox"
              name="http_enabled"
              className="checkbox"
              defaultChecked={Boolean(project.http_enabled)}
            />
            HTTP Enabled
          </label>
        </div>

        <div className="lg:col-span-2 flex justify-end gap-2">
          <Link href="/admin/projects" className="btn btn-ghost btn-sm">
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
