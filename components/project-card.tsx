import React from "react";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { ExternalUrl, GithubIcon } from "./ui/icon";

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
  builderImage?: string | null;
  discordUsername?: string | null;
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
  builderImage,
  discordUsername,
  liveUrl,
  githubUrl,
  variant,
}: ProjectCardProps) => {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:border-base-300 hover:shadow-xl ${
        variant === "list" ? "flex flex-col gap-4 sm:flex-row" : ""
      }`}
    >
      <Link
        href={`/projects/${slug}`}
        className="relative h-44 bg-base-200/70 block overflow-hidden flex-shrink-0 sm:w-64"
      >
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : null}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />

        {/* Quick action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-ghost text-white hover:bg-white/20 flex items-center justify-center"
              title="View on GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-ghost text-white hover:bg-white/20 flex items-center justify-center"
              title="Visit Live Site"
            >
              <ExternalUrl className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="badge badge-ghost text-xs font-bold">
            {category}
          </span>
        </div>

        {/* Rating badge */}
        {typeof rating === "number" ? (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-base-100/95 px-3 py-1 text-xs font-bold text-amber-500 shadow-lg">
            <span>★</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        ) : null}
      </Link>

      <div className="space-y-4 px-5 py-4 flex-1 flex flex-col">
        {/* Builder Info */}
        {builderName ? (
          <div className="flex items-center gap-2 text-xs">
            <div className="w-8 h-8 rounded-full ring-primary ring-1 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white flex-shrink-0 overflow-hidden border border-base-300">
              {builderImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={builderImage}
                  alt={builderName}
                  className="w-full h-full object-cover"
                />
              ) : (
                builderName[0]?.toUpperCase()
              )}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-semibold text-base-content truncate">
                {builderName}
              </span>
              {discordUsername && (
                <span className="text-base-content/60 truncate">
                  @{discordUsername}
                </span>
              )}
            </div>
          </div>
        ) : (
          <span className="text-xs text-base-content/60">@builder</span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-base-content line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-3 flex-1">
          {description}
        </p>

        {/* Engagement metrics with icons */}
        <div className="flex items-center gap-6 text-sm text-base-content/60 font-medium">
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {views}
          </span>
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            {likes}
          </span>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={githubUrl || "#"}
            target={githubUrl ? "_blank" : undefined}
            rel={githubUrl ? "noreferrer" : undefined}
            className={`btn btn-outline btn-sm transition-all ${
              githubUrl ? "hover:btn-primary" : "btn-disabled"
            }`}
          >
            <GithubIcon className="w-4 h-4" />
            Code
          </a>
          <a
            href={liveUrl || "#"}
            target={liveUrl ? "_blank" : undefined}
            rel={liveUrl ? "noreferrer" : undefined}
            className={`btn btn-primary btn-sm transition-all ${
              liveUrl ? "" : "btn-disabled"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
