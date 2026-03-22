"use client";

import React from "react";
import SubmissionModalTrigger from "@/components/submission-modal-trigger";
import SearchProjects from "@/components/search-projects";
import Link from "next/link";

type CategoryItem = {
  name: string;
  value: string;
};

type HeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  projectsCount: number;
  categoriesCount: number;
  buildersCount: number;
};

const Hero = ({
  query,
  onQueryChange,
  categories,
  selectedCategory,
  onCategoryChange,
  projectsCount,
  categoriesCount,
  buildersCount,
}: HeroProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const formatCount = (value: number) => formatter.format(value);
  return (
    <section className="relative min-h-screen overflow-hidden bg-base-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-10 top-8 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-5 pt-32 text-center sm:px-6 sm:pt-36 lg:flex-row lg:gap-16 lg:px-8 lg:pt-28 lg:text-left">
        <div className="w-full max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/70">
            Community Showcase
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-base-content sm:text-5xl lg:text-6xl">
            Discover what builders ship on{" "}
            <span className="text-primary">Shelby</span>
          </h1>
          <p className="mt-4 text-base text-base-content/70 sm:text-lg">
            Explore real projects from the Shelby communit. Submit your project
            and get discovered by the people who matter.
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/projects"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-content shadow-lg shadow-primary/30 transition hover:brightness-110 sm:w-auto"
            >
              Explore
            </Link>
            <SubmissionModalTrigger>Submit Your Build</SubmissionModalTrigger>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-base-content/60 lg:justify-start">
            <div>
              <span className="text-base-content font-semibold">
                {formatCount(projectsCount)}
              </span>{" "}
              Projects
            </div>
            <div>
              <span className="text-base-content font-semibold">
                {formatCount(categoriesCount)}
              </span>{" "}
              Categories
            </div>
            <div>
              <span className="text-base-content font-semibold">
                {formatCount(buildersCount)}
              </span>{" "}
              Builders
            </div>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <SearchProjects
            query={query}
            onQueryChange={onQueryChange}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
