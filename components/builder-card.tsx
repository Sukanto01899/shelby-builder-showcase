"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useFingerprint } from "@/context/FingerprintContext";
import { GithubIcon, MailIcon, XIcon } from "./ui/icon";

type BuilderCardProps = {
  id: string;
  name: string;
  email: string | null;
  imageUrl: string | null;
  githubUrl: string | null;
  xProfileUrl: string | null;
  initialLoveCount: number;
  discordUsername: string | null;
};

const BuilderCard = ({
  id,
  name,
  email,
  imageUrl,
  githubUrl,
  xProfileUrl,
  initialLoveCount,
  discordUsername,
}: BuilderCardProps) => {
  const [loveCount, setLoveCount] = useState(initialLoveCount);
  const [busy, setBusy] = useState(false);
  const [liked, setLiked] = useState(false);
  const { fingerprint, isLoading } = useFingerprint();

  useEffect(() => {
    if (isLoading || !fingerprint) return;
    const run = async () => {
      const res = await fetch(`/api/builders/${id}/love-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });
      const data = await res.json().catch(() => ({}));
      if (typeof data?.liked === "boolean") {
        setLiked(data.liked);
      }
    };
    run();
  }, [fingerprint, id, isLoading]);

  const handleLove = async () => {
    if (busy || isLoading || !fingerprint) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/builders/${id}/love`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });
      const data = await res.json().catch(() => ({}));
      if (typeof data?.love_count === "number") {
        setLoveCount(data.love_count);
        setLiked(Boolean(data?.liked));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:border-base-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full border border-base-200 bg-base-200/70">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div>
          <p className="text-lg font-semibold text-base-content">{name}</p>
          <p className="text-xs text-base-content/60">@{discordUsername}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {githubUrl ? (
            <a
              className="btn btn-ghost btn-sm"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          ) : null}
          {xProfileUrl ? (
            <a
              className="btn btn-ghost btn-sm"
              href={xProfileUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <XIcon className="h-4 w-4" />
            </a>
          ) : null}

          {email ? (
            <a
              className="btn btn-ghost btn-sm"
              href={`mailto:${email}`}
              title="email"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleLove}
          className={`btn btn-ghost btn-sm flex items-center gap-2 ${
            liked ? "bg-red-500 text-white hover:bg-red-500/90" : ""
          }`}
          disabled={busy || isLoading}
          aria-label="Send love"
        >
          <Heart className="h-4 w-4" />
          <span className="text-xs">{loveCount}</span>
        </button>
      </div>
    </article>
  );
};

export default BuilderCard;
