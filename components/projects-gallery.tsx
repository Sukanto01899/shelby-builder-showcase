"use client";

import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/project-card";
import { useLoadingBar } from "@/components/LoadingBarProvider";

type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: string;
  views: number;
  like_count: number;
  thumbnail_url: string | null;
  rating: number | null;
  live_url: string | null;
  github_repo_url: string | null;
  builders: { name: string } | null;
};

type ProjectsGalleryProps = {
  query: string;
  category: string;
};

const ProjectsGallery = ({ query, category }: ProjectsGalleryProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [debouncedCategory, setDebouncedCategory] = useState(category);
  const { startLoading, stopLoading } = useLoadingBar();
  const filterLoadingRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollOnNextLoadRef = useRef(false);

  useEffect(() => {
    const active = loading;
    if (active && !filterLoadingRef.current) {
      startLoading();
      filterLoadingRef.current = true;
    }
    if (!active && filterLoadingRef.current) {
      stopLoading();
      filterLoadingRef.current = false;
    }
  }, [loading, startLoading, stopLoading]);

  const loadMore = async (
    pageOverride?: number,
    queryOverride?: string,
    categoryOverride?: string,
  ) => {
    const pageToLoad = pageOverride ?? nextPage;
    if (loading || pageToLoad === null) return;
    setLoading(true);
    try {
      const effectiveQuery = queryOverride ?? debouncedQuery;
      const effectiveCategory = categoryOverride ?? debouncedCategory;
      const params = new URLSearchParams();
      params.set("page", String(pageToLoad));
      params.set("limit", "12");
      if (effectiveQuery.trim()) params.set("q", effectiveQuery.trim());
      if (effectiveCategory && effectiveCategory !== "all") {
        params.set("category", effectiveCategory);
      }
      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data?.items)) {
        setProjects((prev) => {
          const existing = new Set(prev.map((item) => item.id));
          const merged = [...prev];
          data.items.forEach((item: ProjectItem) => {
            if (!existing.has(item.id)) merged.push(item);
          });
          return merged;
        });
      }
      setNextPage(data?.nextPage ?? null);
      if (pageToLoad === 1 && scrollOnNextLoadRef.current) {
        scrollOnNextLoadRef.current = false;
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    loadMore(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      const nextQuery = query.trim();
      const nextCategory = category || "all";
      setDebouncedQuery(nextQuery);
      setDebouncedCategory(nextCategory);
      setProjects([]);
      setNextPage(1);
      scrollOnNextLoadRef.current = true;
      loadMore(1, nextQuery, nextCategory);
    }, 400);
    return () => window.clearTimeout(handler);
  }, [query, category]);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading && nextPage !== null) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [nextPage, loading, debouncedQuery, debouncedCategory]);

  return (
    <section ref={sectionRef} className="bg-base-100 pb-20" id="projects">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex border-b border-base-200 py-8 justify-between items-center">
          <div>
            <h2 className="mt-3 text-xl lg:text-2xl font-semibold text-base-content sm:text-3xl">
              Project Builder Community
            </h2>
            <p className="mt-2 text-sm text-base-content/70">
              Explore standout launches from builders across the ecosystem.
            </p>
          </div>

          <div className="lg:inline-flex hidden items-center gap-2 rounded-full border border-base-300/60 bg-base-200/40 p-1">
            <button
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                view === "grid"
                  ? "bg-base-100 text-base-content shadow-sm"
                  : "text-base-content/60 hover:text-base-content"
              }`}
              onClick={() => setView("grid")}
            >
              Grid
            </button>
            <button
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                view === "list"
                  ? "bg-base-100 text-base-content shadow-sm"
                  : "text-base-content/60 hover:text-base-content"
              }`}
              onClick={() => setView("list")}
            >
              List
            </button>
          </div>
        </div>

        <div
          className={`mt-10 grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title}
              description={project.description}
              category={project.category}
              status={project.status}
              views={project.views}
              likes={project.like_count}
              thumbnailUrl={project.thumbnail_url}
              rating={project.rating}
              liveUrl={project.live_url}
              githubUrl={project.github_repo_url}
              builderName={project.builders?.name ?? null}
              variant={view}
            />
          ))}
        </div>

        {loading ? (
          <div
            className={`mt-10 grid gap-6 ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-72 rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm animate-pulse"
              >
                <div className="h-36 rounded-2xl bg-base-200" />
                <div className="mt-4 h-3 w-1/2 rounded bg-base-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-base-200" />
                <div className="mt-2 h-3 w-full rounded bg-base-200" />
              </div>
            ))}
          </div>
        ) : null}

        <div ref={sentinelRef} className="h-8" />
        <div className="mt-6 flex justify-center">
          {nextPage ? (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => loadMore()}
              type="button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          ) : (
            <span className="text-sm text-base-content/50">
              No more projects
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
