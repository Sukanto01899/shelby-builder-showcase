import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BuilderCard from "@/components/builder-card";

type BuilderRow = {
  id: string;
  name: string;
  image_url: string | null;
  github_url: string | null;
  x_profile_url: string | null;
  email: string | null;
  love?: string | null;
  discord_username: string | null;
};

export default async function BuildersPage() {
  const supabase = createClient(await cookies());
  const { data: buildersWithLove, error: buildersError } = await supabase
    .from("builders")
    .select(
      "id, name, image_url, github_url, x_profile_url, email, love, discord_username",
    )
    .order("created_at", { ascending: false });

  let builders: BuilderRow[] = (buildersWithLove || []) as BuilderRow[];
  if (buildersError) {
    const { data: fallbackBuilders } = await supabase
      .from("builders")
      .select(
        "id, name, image_url, github_url, x_profile_url, email, discord_username",
      )
      .order("created_at", { ascending: false });
    builders = (fallbackBuilders || []) as BuilderRow[];
  }

  const { data: loveRows, error: loveError } = await supabase
    .from("builder_loves")
    .select("builder_id");

  const loveCounts = new Map<string, number>();
  if (!loveError && Array.isArray(loveRows)) {
    loveRows.forEach((row) => {
      const id = String((row as { builder_id?: string }).builder_id || "");
      if (!id) return;
      loveCounts.set(id, (loveCounts.get(id) || 0) + 1);
    });
  }

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
            {builders.length} profiles
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builders.map((builder) => (
            <BuilderCard
              key={builder.id}
              id={builder.id}
              name={builder.name}
              email={builder.email}
              imageUrl={builder.image_url}
              githubUrl={builder.github_url}
              xProfileUrl={builder.x_profile_url}
              initialLoveCount={loveCounts.get(builder.id) || 0}
              discordUsername={builder.discord_username}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
