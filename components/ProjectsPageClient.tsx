"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchProjects from "@/components/search-projects";
import ProjectsGallery from "@/components/projects-gallery";

type CategoryItem = {
  name: string;
  value: string;
};

type ProjectsPageClientProps = {
  categories: CategoryItem[];
  projectsCount: number;
  categoriesCount: number;
  buildersCount: number;
  initialQuery: string;
  initialCategory: string;
};

const ProjectsPageClient = ({
  categories,
  projectsCount,
  categoriesCount,
  buildersCount,
  initialQuery,
  initialCategory,
}: ProjectsPageClientProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "all",
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const formatCount = (value: number) => formatter.format(value);

  const displayCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }
    const next = params.toString();
    router.replace(next ? `/projects?${next}` : "/projects");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedCategory]);

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-1">
            {/* <div className="rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-8 border border-base-200/70 bg-base-100/90 p-8 shadow-2xl shadow-base-300/30 backdrop-blur"> */}
            <div className="">
              <p className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/70">
                Projects
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-base-content sm:text-5xl">
                Community project directory
              </h1>
              <p className="mt-4 max-w-2xl text-base text-base-content/70">
                Search and filter every public project submitted to the Shelby
                showcase.
              </p>
            </div>

            <SearchProjects
              query={query}
              onQueryChange={setQuery}
              categories={displayCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            {/* </div> */}
          </div>
        </div>
      </section>

      <ProjectsGallery query={query} category={selectedCategory} />
    </>
  );
};

export default ProjectsPageClient;
