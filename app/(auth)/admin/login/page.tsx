type AdminLoginSearchParams = {
  next?: string;
  error?: string;
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<AdminLoginSearchParams>;
}) {
  const { next, error } = await searchParams;
  const nextPath = next && next.startsWith("/admin") ? next : "/admin";

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="rounded-3xl border border-base-200/70 bg-base-100 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
          Admin Access
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Enter access key</h1>
        <p className="mt-2 text-sm text-base-content/70">
          This area is restricted. Provide the admin key to continue.
        </p>

        {error ? (
          <div className="mt-4 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
            Invalid key. Please try again.
          </div>
        ) : null}

        <form
          method="post"
          action="/admin/login/submit"
          className="mt-6 space-y-4"
        >
          <input type="hidden" name="next" value={nextPath} />
          <label className="form-control w-full">
            <span className="label-text text-sm font-medium">Access key</span>
            <input
              type="password"
              name="key"
              className="input input-bordered w-full"
              placeholder="Enter admin access key"
              autoFocus
              required
            />
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Continue to dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
