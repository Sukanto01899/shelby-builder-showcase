import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function BuildersPage() {
  const supabase = createClient(await cookies());
  const { data: builders } = await supabase
    .from("builders")
    .select("id, name, image_url, github_url, x_profile_url, email")
    .order("created_at", { ascending: false });

  return (
    <main className="bg-base-100 pb-20">
      <Header />
      <section className="relative overflow-hidden pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 lg:px-8">
          <div className="rounded-3xl border border-base-200/70 bg-base-100/90 p-8 shadow-2xl shadow-base-300/30 backdrop-blur">
            <p className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/70">
              Shelby Builders
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-base-content sm:text-5xl">
              Meet the people shipping on Shelby
            </h1>
            <p className="mt-4 max-w-2xl text-base text-base-content/70">
              Explore builder profiles, connect with teams, and discover the
              creators behind the most ambitious storage experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-outline btn-sm">
                Back to showcase
              </Link>
              <Link href="/projects" className="btn btn-primary btn-sm">
                Browse projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-12 w-full max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-base-content">Builders</h2>
          <span className="text-sm text-base-content/60">
            {builders?.length ?? 0} profiles
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(builders || []).map((builder) => (
            <article
              key={builder.id}
              className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:border-base-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-base-200 bg-base-200/70">
                  {builder.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={builder.image_url}
                      alt={builder.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-lg font-semibold text-base-content">
                    {builder.name}
                  </p>
                  <p className="text-xs text-base-content/60">
                    {builder.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                {builder.github_url ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={builder.github_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M16 18l-4-4 4-4" />
                      <path d="M8 6l4 4-4 4" />
                    </svg>
                  </a>
                ) : null}
                {builder.x_profile_url ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={builder.x_profile_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 4l16 16" />
                      <path d="M20 4L4 20" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
