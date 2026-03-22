import Link from "next/link";
import { createAdminClient } from "@/utils/supabase/admin";

type SearchParams = {
  page?: string;
};

const PAGE_SIZE = 10;

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Number(page || 1));
  const from = (pageNumber - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createAdminClient();
  const { data, error, count } = await supabase
    .from("project_submissions")
    .select(
      "id, project_name, category, builder_discord_username, created_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Submissions
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            Project submissions
          </h1>
          <p className="mt-2 text-sm text-base-content/70">
            Review, open, and delete submitted projects.
          </p>
        </div>
        <div className="rounded-2xl bg-base-200/60 px-4 py-3 text-sm">
          Total: <span className="font-semibold">{total}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-base-200/70 bg-base-100">
        <div className="grid grid-cols-12 gap-3 border-b border-base-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-base-content/60">
          <span className="col-span-4">Project</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-3">Discord</span>
          <span className="col-span-2 text-right">Submitted</span>
        </div>

        {error ? (
          <div className="px-4 py-6 text-sm text-error">
            Failed to load submissions: {error.message}
          </div>
        ) : data && data.length > 0 ? (
          <div className="divide-y divide-base-200">
            {data.map((item) => (
              <Link
                key={item.id}
                href={`/admin/submissions/${item.id}`}
                className="grid grid-cols-12 gap-3 px-4 py-4 text-sm transition hover:bg-base-200/50"
              >
                <span className="col-span-4 font-medium text-base-content">
                  {item.project_name}
                </span>
                <span className="col-span-3 text-base-content/70">
                  {item.category}
                </span>
                <span className="col-span-3 text-base-content/70">
                  {item.builder_discord_username}
                </span>
                <span className="col-span-2 text-right text-base-content/60">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-4 py-6 text-sm text-base-content/60">
            No submissions yet.
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-base-content/60">
          Page {pageNumber} of {totalPages}
        </p>
        <div className="flex gap-2">
          {pageNumber > 1 ? (
            <Link
              className="btn btn-outline btn-sm"
              href={`/admin/submissions?page=${pageNumber - 1}`}
            >
              Previous
            </Link>
          ) : (
            <span className="btn btn-outline btn-sm btn-disabled">
              Previous
            </span>
          )}
          {pageNumber < totalPages ? (
            <Link
              className="btn btn-outline btn-sm"
              href={`/admin/submissions?page=${pageNumber + 1}`}
            >
              Next
            </Link>
          ) : (
            <span className="btn btn-outline btn-sm btn-disabled">Next</span>
          )}
        </div>
      </div>
    </div>
  );
}
