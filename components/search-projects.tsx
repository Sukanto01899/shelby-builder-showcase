"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

type CategoryItem = {
  name: string;
  value: string;
};

type SearchProjectsProps = {
  query: string;
  onQueryChange: (value: string) => void;
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  showCategoryToggle?: boolean;
};

const SearchProjects = ({
  query,
  onQueryChange,
  categories,
  selectedCategory,
  onCategoryChange,
  showCategoryToggle = true,
}: SearchProjectsProps) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = useMemo(
    () => (showAllCategories ? categories : categories.slice(0, 8)),
    [categories, showAllCategories],
  );

  return (
    <div className="rounded-[28px] border border-base-300/60 bg-base-100/80 p-4 shadow-2xl shadow-base-300/30 backdrop-blur sm:p-6">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300/80 bg-base-200/80 px-4 py-3 shadow-lg shadow-base-300/40 ring-1 ring-base-300/40 focus-within:border-base-300 focus-within:ring-2 focus-within:ring-primary/40">
        <Search className="h-5 w-5" />
        <input
          className="w-full bg-transparent text-sm text-base-content placeholder:text-base-content/50 focus:outline-none"
          placeholder="Search by project, builder, category, or tag"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-base-300/50 bg-base-200/40 p-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
          Categories
          <span className="text-[10px] font-semibold text-base-content/40">
            Updated daily
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {visibleCategories.map((item) => {
            const active = selectedCategory === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onCategoryChange(item.value)}
                className={`badge cursor-pointer badge-outline px-3 py-2 text-[11px] font-semibold transition whitespace-normal text-left ${
                  active
                    ? "badge-primary text-primary border-primary/60"
                    : "border-base-300/60 text-base-content/70 hover:border-base-300 hover:text-base-content"
                }`}
              >
                {item.name}
              </button>
            );
          })}
          {showCategoryToggle && categories.length > 8 ? (
            <button
              type="button"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="badge badge-neutral px-3 py-2 text-[11px] font-semibold see-more-badge"
            >
              {showAllCategories ? "Show less" : "See more"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchProjects;
