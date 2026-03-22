"use client";

import React, { useMemo, useState } from "react";
import { useFingerprint } from "@/context/FingerprintContext";

type CommentItem = {
  id: string;
  message: string;
  created_at: string;
};

type ProjectCommentsProps = {
  slug: string;
  initialComments: CommentItem[];
};

const PAGE_SIZE = 5;

const ProjectComments = ({ slug, initialComments }: ProjectCommentsProps) => {
  const { fingerprint, isLoading } = useFingerprint();
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canPost = useMemo(
    () => !isLoading && Boolean(fingerprint) && message.trim().length >= 2,
    [fingerprint, isLoading, message],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canPost || submitting) return;
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
        setVisibleCount((count) => Math.max(count, PAGE_SIZE));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const visibleComments = comments.slice(0, visibleCount);
  const canLoadMore = visibleCount < comments.length;

  return (
    <div className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-base-content">Comments</h2>
        <p className="text-sm text-base-content/60">
          Share feedback anonymously. Your fingerprint is used to identify entries.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="textarea textarea-bordered w-full bg-base-100"
          rows={3}
          placeholder="Write a comment"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!canPost || submitting}
        >
          {submitting ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="space-y-3">
        {visibleComments.length === 0 ? (
          <p className="text-sm text-base-content/60">No comments yet.</p>
        ) : (
          visibleComments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl bg-base-200/60 px-4 py-3 text-sm"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-base-content/60">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-base-100 text-[10px]">
                  A
                </span>
                <span>By Anonymous</span>
              </div>
              <p className="text-base-content/80">{comment.message}</p>
              <p className="mt-2 text-xs text-base-content/50">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {canLoadMore ? (
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Load more
        </button>
      ) : null}
    </div>
  );
};

export default ProjectComments;
