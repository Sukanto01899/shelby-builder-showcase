"use client";

import React, { useEffect, useState } from "react";
import { Eye, Heart } from "lucide-react";
import { useFingerprint } from "@/context/FingerprintContext";

type ProjectStatsProps = {
  slug: string;
  initialViews: number;
  initialLikes: number;
};

const ProjectStats = ({ slug, initialViews, initialLikes }: ProjectStatsProps) => {
  const { fingerprint, isLoading } = useFingerprint();
  const [views, setViews] = useState(Number(initialViews) || 0);
  const [likes, setLikes] = useState(Number(initialLikes) || 0);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isLoading || !fingerprint) return;
    fetch(`/api/projects/${slug}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.views === "number") setViews(data.views);
      })
      .catch(() => null);

    fetch(`/api/projects/${slug}/like-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.liked === "boolean") {
          setLiked(data.liked);
        }
      })
      .catch(() => null);
  }, [fingerprint, isLoading, slug]);

  const handleLike = async () => {
    if (isLoading || !fingerprint || liked || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/projects/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });
      const data = await res.json();
      if (typeof data?.like_count === "number") {
        setLikes(data.like_count);
        setLiked(true);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
      <span className="inline-flex items-center gap-2">
        <Eye className="h-4 w-4" />
        {views} Views
      </span>
      <span className="inline-flex items-center gap-2">
        <Heart className="h-4 w-4" />
        {likes} Likes
      </span>
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={handleLike}
        disabled={isLoading || busy || liked}
      >
        <Heart className="h-4 w-4" />
        {liked ? "Liked" : "Like"}
      </button>
      {isLoading ? (
        <span className="text-xs text-base-content/50">
          Generating fingerprint...
        </span>
      ) : null}
    </div>
  );
};

export default ProjectStats;
