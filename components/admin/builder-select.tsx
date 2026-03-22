"use client";

import React, { useMemo, useState } from "react";

type BuilderOption = {
  id: string;
  name: string;
  discord_username: string | null;
};

type BuilderSelectProps = {
  builders: BuilderOption[];
  initialId?: string | null;
  initialLabel?: string | null;
};

const BuilderSelect = ({
  builders,
  initialId = null,
  initialLabel = null,
}: BuilderSelectProps) => {
  const [query, setQuery] = useState(initialLabel || "");
  const [selectedId, setSelectedId] = useState<string | null>(
    initialId || null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return builders
      .filter((builder) => {
        const name = builder.name.toLowerCase();
        const discord = (builder.discord_username || "").toLowerCase();
        return name.includes(q) || discord.includes(q);
      })
      .slice(0, 8);
  }, [builders, query]);

  return (
    <div className="space-y-2">
      <input
        className="input input-bordered w-full bg-base-100"
        placeholder="Search builder by name or username"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSelectedId(null);
        }}
        autoComplete="off"
      />
      <input type="hidden" name="builder_id" value={selectedId || ""} required />
      {query.trim().length === 0 ? null : filtered.length ? (
        <div className="rounded-xl border border-base-200/70 bg-base-100 p-2 shadow-sm">
          {filtered.map((builder) => (
            <button
              key={builder.id}
              type="button"
              onClick={() => {
                setSelectedId(builder.id);
                const label = builder.discord_username
                  ? `${builder.name} @${builder.discord_username}`
                  : builder.name;
                setQuery(label);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-base-200/60"
            >
              <span className="font-medium text-base-content">
                {builder.name}
              </span>
              <span className="text-xs text-base-content/60">
                {builder.discord_username
                  ? `@${builder.discord_username}`
                  : ""}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-base-content/60">
          No builders match your search.
        </p>
      )}
    </div>
  );
};

export default BuilderSelect;
