import Link from "next/link";
import { createAdminClient } from "@/utils/supabase/admin";

type SearchParams = {
  page?: string;
  q?: string;
};

const PAGE_SIZE = 10;

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, q } = await searchParams;
  const pageNumber = Math.max(1, Number(page || 1));
  const from = (pageNumber - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const query = q?.trim() ?? "";

  const supabase = createAdminClient();
  let request = supabase
    .from("projects")
    .select(
      "id, title, slug, category, status, created_at, verified",
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (query) {
    request = request.or(`title.ilike.%${query}%,slug.ilike.%${query}%`);
  }

  const { data, error, count } = await request.range(from, to);
  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Projects
          </p>
          <h1 className="mt-2 text-2xl font-semibold">All projects</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Manage live and draft projects.
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary btn-sm">
          Add project
        </Link>
      </div>

      <form
        method="get"
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-base-200/70 bg-base-100 p-4"
      >
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search by title or slug"
          className="input input-bordered w-full max-w-sm bg-base-100"
        />
        <button className="btn btn-outline btn-sm" type="submit">
          Search
        </button>
        {query ? (
          <Link href="/admin/projects" className="btn btn-ghost btn-sm">
            Clear
          </Link>
        ) : null}
      </form>

      <div className="overflow-hidden rounded-2xl border border-base-200/70 bg-base-100">
        <div className="grid grid-cols-12 gap-3 border-b border-base-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-base-content/60">
          <span className="col-span-4">Title</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2 text-right">Verified</span>
          <span className="col-span-1 text-right">Edit</span>
        </div>

        {error ? (
          <div className="px-4 py-6 text-sm text-error">
            Failed to load projects: {error.message}
          </div>
        ) : data && data.length > 0 ? (
          <div className="divide-y divide-base-200">
            {data.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-12 gap-3 px-4 py-4 text-sm"
              >
                <div className="col-span-4">
                  <p className="font-medium text-base-content">
                    {project.title}
                  </p>
                  <p className="text-xs text-base-content/60">
                    {project.slug}
                  </p>
                </div>
                <span className="col-span-3 text-base-content/70">
                  {project.category}
                </span>
                <span className="col-span-2">
                  <span className="badge badge-outline">{project.status}</span>
                </span>
                <span className="col-span-2 text-right text-base-content/70">
                  {project.verified ? "Yes" : "No"}
                </span>
                <div className="col-span-1 text-right">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="btn btn-ghost btn-xs"
                  >
                    Edit
                  </Link>
                </div>
                <div className="col-span-12 flex justify-end">
                  <form
                    method="post"
                    action={`/admin/projects/${project.id}/delete`}
                  >
                    <button className="btn btn-error btn-xs" type="submit">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-6 text-sm text-base-content/60">
            No projects yet.
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
              href={`/admin/projects?page=${pageNumber - 1}${
                query ? `&q=${encodeURIComponent(query)}` : ""
              }`}
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
              href={`/admin/projects?page=${pageNumber + 1}${
                query ? `&q=${encodeURIComponent(query)}` : ""
              }`}
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
