"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useFingerprint } from "@/context/FingerprintContext";

type ProjectEngagementProps = {
  slug: string;
  initialViews?: number;
  initialLikes?: number;
  initialComments?: Array<{
    id: string;
    message: string;
    created_at: string;
  }>;
};

const ProjectEngagement = ({
  slug,
  initialViews = 0,
  initialLikes = 0,
  initialComments = [],
}: ProjectEngagementProps) => {
  const { fingerprint, isLoading } = useFingerprint();
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  const canSend = useMemo(
    () => !isLoading && Boolean(fingerprint) && message.trim().length >= 2,
    [fingerprint, isLoading, message],
  );

  useEffect(() => {
    if (isLoading || !fingerprint) return;
    fetch(`/api/projects/${slug}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.views === "number") {
          setViews(data.views);
        }
      })
      .catch(() => null);
  }, [fingerprint, isLoading, slug]);

  const handleLike = async () => {
    if (isLoading || !fingerprint || liked) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });
      const data = await res.json();
      if (typeof data?.like_count === "number") {
        setLikes(data.like_count);
        setLiked(Boolean(data?.liked));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint, message }),
      });
      const data = await res.json();
      if (data?.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setMessage("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-base-200/70 bg-base-100 p-5 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-base-content/70">
        <span>Views: {views}</span>
        <span>Likes: {likes}</span>
        <span>Comments: {comments.length}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleLike}
          className="btn btn-outline btn-sm"
          disabled={isLoading || submitting || liked}
        >
          {liked ? "Liked" : "Like"}
        </button>
        {isLoading ? (
          <span className="text-xs text-base-content/50">
            Generating fingerprint...
          </span>
        ) : null}
      </div>

      <form onSubmit={handleComment} className="space-y-3">
        <textarea
          className="textarea textarea-bordered w-full bg-base-100"
          rows={3}
          placeholder="Leave a comment"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!canSend || submitting}
        >
          {submitting ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-base-content/60">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl bg-base-200/60 px-4 py-3 text-sm"
            >
              <p className="text-base-content/80">{comment.message}</p>
              <p className="mt-2 text-xs text-base-content/50">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectEngagement;
