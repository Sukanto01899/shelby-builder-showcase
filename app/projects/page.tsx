import Header from "@/components/header";
import Footer from "@/components/footer";
import { createAdminClient } from "@/utils/supabase/admin";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import { category as categoryOptions } from "@/constant";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const supabase = createAdminClient();
  const [projectsRes, buildersRes, categoriesRes] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("builders").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("category"),
  ]);

  const projectsCount = projectsRes.count ?? 0;
  const buildersCount = buildersRes.count ?? 0;
  const uniqueCategories = new Set(
    (categoriesRes.data || []).map((item) => item.category),
  );

  return (
    <main className="relative min-h-screen bg-base-100">
      <Header />
      <ProjectsPageClient
        categories={categoryOptions}
        projectsCount={projectsCount}
        categoriesCount={uniqueCategories.size}
        buildersCount={buildersCount}
        initialQuery={q ?? ""}
        initialCategory={category ?? "all"}
      />
      <Footer />
    </main>
  );
}
