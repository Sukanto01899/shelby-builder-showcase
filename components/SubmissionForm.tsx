"use client";

import React, { useState } from "react";
import { category } from "@/constant";

type SubmissionFormProps = {
  onClose?: () => void;
};

const SubmissionForm = ({ onClose }: SubmissionFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const projectName = String(formData.get("projectName") || "").trim();
      const liveLink = String(formData.get("liveLink") || "").trim();
      const category = String(formData.get("category") || "").trim();
      const description = String(formData.get("description") || "").trim();
      const discord = String(formData.get("discord") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const xProfile = String(formData.get("xProfile") || "").trim();
      const videoLink = String(formData.get("videoLink") || "").trim();
      const githubRepo = String(formData.get("githubRepo") || "").trim();

      if (
        !projectName ||
        !liveLink ||
        !category ||
        !description ||
        !discord ||
        !githubRepo ||
        !xProfile
      ) {
        throw new Error("Please fill all required fields.");
      }

      const urlFields = [
        { label: "Live link", value: liveLink, required: true },
        { label: "GitHub repo", value: githubRepo, required: true },
        { label: "Guideline video", value: videoLink, required: false },
        { label: "X profile", value: xProfile, required: true },
      ];

      for (const field of urlFields) {
        if (!field.value && !field.required) continue;
        try {
          // eslint-disable-next-line no-new
          new URL(field.value);
        } catch {
          throw new Error(`${field.label} must be a valid URL.`);
        }
      }

      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed.");
      }

      setSuccess(true);
      form.reset();
      setTimeout(() => onClose?.(), 800);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* <div>
        <h3 className="text-lg font-semibold text-base-content">
          Submit Your Project
        </h3>
        <p className="text-sm text-base-content/60">
          Share the basics and we will review your submission within 48 hours.
        </p>
      </div> */}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Project Name
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="Shelby Builder Hub"
            name="projectName"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Category
          <select
            className="select select-bordered w-full bg-base-100"
            name="category"
            required
          >
            <option value="">Choose one</option>
            {category
              .filter((item) => item.value !== "all")
              .map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Live Link
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="https://yourproject.xyz"
            name="liveLink"
            type="url"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          GitHub Repo
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="https://github.com/you/project"
            name="githubRepo"
            type="url"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Builder Discord Username
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="username#1234"
            name="discord"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Builder Email (optional)
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="builder@email.com"
            name="email"
            type="email"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          X Profile Link
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="https://x.com/username"
            name="xProfile"
            type="url"
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-base-content/80">
        Project Thumbnail
        <input
          className="file-input file-input-bordered w-full bg-base-100"
          name="thumbnail"
          type="file"
          accept="image/*"
          required
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-base-content/80">
        Guideline Video Link (optional)
        <input
          className="input input-bordered w-full bg-base-100"
          placeholder="https://loom.com/..."
          name="videoLink"
          type="url"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Tech Stack (optional)
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="Next.js, Solidity, Supabase"
            name="techStack"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-base-content/80">
          Tags (optional)
          <input
            className="input input-bordered w-full bg-base-100"
            placeholder="Payments, NFT, DAO"
            name="tags"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-base-content/80">
        Short Description
        <textarea
          className="textarea textarea-bordered w-full bg-base-100"
          placeholder="One or two sentences describing the project."
          name="description"
          rows={4}
          required
        />
      </label>

      {error && (
        <div className="rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          Submission received. We will review it soon.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost sm:btn-sm"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary sm:btn-sm"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Project"}
        </button>
      </div>
    </form>
  );
};

export default SubmissionForm;
