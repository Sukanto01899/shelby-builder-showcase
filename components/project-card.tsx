import React from "react";
import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: string;
  views: number;
  likes: number;
  thumbnailUrl?: string | null;
  rating?: number | null;
  builderName?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  variant: "grid" | "list";
};

const ProjectCard = ({
  slug,
  title,
  description,
  category,
  status,
  views,
  likes,
  thumbnailUrl,
  rating,
  builderName,
  liveUrl,
  githubUrl,
  variant,
}: ProjectCardProps) => {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:border-base-300 hover:shadow-lg ${
        variant === "list" ? "flex flex-col gap-4 sm:flex-row" : ""
      }`}
    >
      <Link
        href={`/projects/${slug}`}
        className="relative h-44 bg-base-200/70 block"
      >
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/30 to-transparent" />
        <div className="absolute left-4 bottom-4 rounded-full border border-base-200 bg-base-100/90 px-3 py-1 text-xs font-semibold text-base-content/70">
          {category}
        </div>
        {typeof rating === "number" ? (
          <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-base-100/90 px-2 py-1 text-xs font-semibold text-base-content/70">
            <span>Rating</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        ) : null}
      </Link>

      <div className="space-y-4 px-5 py-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
          <span>{status}</span>
          <span className="truncate">{builderName || "@builder"}</span>
        </div>
        <h3 className="text-lg font-semibold text-base-content">{title}</h3>
        <p className="text-sm text-base-content/70 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-outline">{category}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-base-content/60">
          <span>{views} Views</span>
          <span>{likes} Likes</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={githubUrl || "#"}
            target={githubUrl ? "_blank" : undefined}
            rel={githubUrl ? "noreferrer" : undefined}
            className={`btn btn-outline btn-sm ${
              githubUrl ? "" : "btn-disabled"
            }`}
          >
            Code
          </a>
          <a
            href={liveUrl || "#"}
            target={liveUrl ? "_blank" : undefined}
            rel={liveUrl ? "noreferrer" : undefined}
            className={`btn btn-primary btn-sm ${
              liveUrl ? "" : "btn-disabled"
            }`}
          >
            Live
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
