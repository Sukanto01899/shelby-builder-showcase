import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";
import CopyButton from "@/components/admin/CopyButton";

export default async function SubmissionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("project_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Submission
          </p>
          <h1 className="mt-2 text-2xl font-semibold">{data.project_name}</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Submitted {new Date(data.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/submissions" className="btn btn-ghost btn-sm">
            Back to list
          </Link>
          <form method="post" action={`/admin/submissions/${data.id}/delete`}>
            <button className="btn btn-error btn-sm" type="submit">
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Description</h2>
            <p className="mt-3 text-sm text-base-content/70">
              {data.project_description}
            </p>
          </div>

          <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Links</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <a
                  href={data.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary"
                >
                  Live URL
                </a>
                <CopyButton value={data.live_url} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={data.github_repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary"
                >
                  GitHub Repo
                </a>
                <CopyButton value={data.github_repo_url} />
              </div>
              {data.guideline_video_url ? (
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={data.guideline_video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    Guideline Video
                  </a>
                  <CopyButton value={data.guideline_video_url} />
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-3">
                <a
                  href={data.builder_x_profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary"
                >
                  Builder X Profile
                </a>
                <CopyButton value={data.builder_x_profile_url} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Summary</h2>
            <dl className="mt-4 space-y-3 text-sm text-base-content/70">
              <div className="flex items-center justify-between">
                <dt>Category</dt>
                <dd className="font-medium text-base-content">
                  {data.category}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt>Email</dt>
                <dd className="flex items-center gap-2 font-medium text-base-content">
                  {data.builder_email ?? "—"}
                  {data.builder_email ? (
                    <CopyButton value={data.builder_email} label="Copy" />
                  ) : null}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Discord</dt>
                <dd className="font-medium text-base-content">
                  {data.builder_discord_username}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Tech Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tech_stack?.length ? (
                data.tech_stack.map((item: string) => (
                  <span key={item} className="badge badge-outline">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-base-content/60">None</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Tags</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tags?.length ? (
                data.tags.map((item: string) => (
                  <span key={item} className="badge badge-ghost">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-base-content/60">None</span>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-base-200/70 bg-base-100 shadow-sm">
            <img
              src={data.thumbnail_url}
              alt={data.project_name}
              className="h-48 w-full object-cover"
            />
            <div className="flex items-center justify-between border-t border-base-200/70 px-4 py-3 text-sm">
              <span className="text-base-content/70">Thumbnail URL</span>
              <CopyButton value={data.thumbnail_url} label="Copy link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
