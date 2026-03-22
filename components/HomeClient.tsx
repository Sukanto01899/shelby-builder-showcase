"use client";

import React, { useMemo, useState } from "react";
import Hero from "@/components/hero";
import ProjectsGallery from "@/components/projects-gallery";
import { category as categoryOptions } from "@/constant";

type HomeClientProps = {
  projectsCount: number;
  categoriesCount: number;
  buildersCount: number;
};

const HomeClient = ({
  projectsCount,
  categoriesCount,
  buildersCount,
}: HomeClientProps) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => categoryOptions, []);

  return (
    <>
      <Hero
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        projectsCount={projectsCount}
        categoriesCount={categoriesCount}
        buildersCount={buildersCount}
      />
      <ProjectsGallery query={query} category={selectedCategory} />
    </>
  );
};

export default HomeClient;
