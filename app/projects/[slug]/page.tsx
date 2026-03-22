import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ProjectStats from "@/components/project/ProjectStats";
import ProjectComments from "@/components/project/ProjectComments";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GithubIcon, MailIcon, XIcon } from "@/components/ui/icon";

type CommentItem = {
  id: string;
  message: string;
  created_at: string;
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("projects")
    .select(
      "title, description, category, status, views, like_count, tags, tech_stack, live_url, github_repo_url, thumbnail_url, guideline_video_url, rating, comments, builders(name, discord_username, email, image_url, github_url, x_profile_url)",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const commentsRaw = Array.isArray(data.comments) ? data.comments : [];
  const comments = commentsRaw
    .filter((comment: CommentItem) => comment?.id && comment?.message)
    .sort(
      (a: CommentItem, b: CommentItem) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  const views = data.views || 0;
  const likes = data.like_count || 0;
  const builder = Array.isArray(data.builders)
    ? data.builders[0]
    : data.builders;

  return (
    <main className="bg-base-100 pb-20">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-24 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="btn btn-ghost btn-sm">
            {"<- Back to gallery"}
          </Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge badge-outline">{data.status}</span>
                <span className="badge badge-ghost">{data.category}</span>
              </div>
              <h1 className="text-3xl font-semibold text-base-content">
                {data.title}
              </h1>
              <p className="text-sm text-base-content/70">{data.description}</p>
              <ProjectStats
                slug={slug}
                initialViews={data.views ?? 0}
                initialLikes={data.like_count ?? 0}
              />
            </div>

            {data.thumbnail_url ? (
              <div className="overflow-hidden rounded-3xl border border-base-200/70 bg-base-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.thumbnail_url}
                  alt={data.title}
                  className="h-80 w-full object-cover"
                />
              </div>
            ) : null}

            {data.tech_stack?.length > 0 || data.tags?.length > 0 ? (
              <div className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm space-y-4">
                {data.tech_stack?.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-base-content mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.tech_stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="badge badge-primary badge-outline text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {data.tags?.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold text-base-content mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="badge badge-secondary badge-outline text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {data.guideline_video_url ? (
              <div className="overflow-hidden rounded-3xl border border-base-200/70 bg-base-100 shadow-sm">
                <div className="border-b border-base-200/70 px-4 py-3 text-sm font-semibold">
                  Guideline Video
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={data.guideline_video_url}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Guideline video"
                  />
                </div>
              </div>
            ) : null}

            <div className="hidden lg:block">
              <ProjectComments slug={slug} initialComments={comments} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-0 h-fit space-y-6">
            <div className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-base-content">
                Builder
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-base-200 bg-base-200/70">
                  {builder?.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={builder.image_url}
                      alt={builder.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="font-semibold text-base-content">
                    {builder?.name ?? "Builder"}
                  </p>
                  {builder?.discord_username && (
                    <p className="text-xs text-base-content/60">
                      @{builder.discord_username}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {builder?.github_url ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={builder.github_url}
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                ) : null}
                {builder?.x_profile_url ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={builder.x_profile_url}
                    target="_blank"
                    rel="noreferrer"
                    title="X (Twitter)"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                ) : null}
                {builder?.email ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={`mailto:${builder.email}`}
                    title="Email"
                  >
                    <MailIcon className="w-4 h-4" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-base-content">
                  Project Links
                </span>
                <span className="text-xs text-base-content/60">
                  {views} views · {likes} likes
                </span>
              </div>
              <div className="grid gap-2">
                {data.github_repo_url ? (
                  <a
                    href={data.github_repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View Code
                  </a>
                ) : null}
                {data.live_url ? (
                  <a
                    href={data.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Live Demo
                  </a>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
        <div className="mt-6 lg:hidden">
          <ProjectComments slug={slug} initialComments={comments} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
