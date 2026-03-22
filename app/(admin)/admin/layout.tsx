import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Overview", icon: "O" },
  { href: "/admin/submissions", label: "Submissions", icon: "U" },
  { href: "/admin/projects", label: "Projects", icon: "P" },
  { href: "/admin/builders", label: "Builders", icon: "B" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-base-200/60 bg-base-100/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <label
                htmlFor="admin-drawer"
                className="btn btn-ghost btn-sm lg:hidden"
                aria-label="Open navigation"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-base-100 font-semibold">
                  S
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Shelby Admin</p>
                  <p className="text-xs text-base-content/60">
                    Builder Showcase
                  </p>
                </div>
              </div>

              <div className="ml-auto hidden w-full max-w-md lg:block">
                <label className="input input-bordered flex items-center gap-2 bg-base-200/50">
                  <span className="text-sm text-base-content/60">Search</span>
                  <input
                    type="text"
                    className="grow bg-transparent text-sm"
                    placeholder="Builders, projects, tags"
                  />
                </label>
              </div>

              <div className="ml-auto flex items-center gap-2 lg:ml-4">
                <button
                  className="btn btn-ghost btn-circle"
                  aria-label="Notifications"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
                    <path d="M9 17a3 3 0 0 0 6 0" />
                  </svg>
                </button>
                <button className="btn btn-ghost btn-circle" aria-label="Inbox">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </button>
                <a
                  href="/admin/logout"
                  className="btn btn-outline btn-sm"
                  aria-label="Log out"
                >
                  Log out
                </a>
                <div className="flex items-center gap-3 rounded-full bg-base-200/60 px-3 py-2">
                  <div className="avatar placeholder">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-content">
                      <span className="text-xs font-semibold">AD</span>
                    </div>
                  </div>
                  <div className="hidden text-left text-xs sm:block">
                    <p className="font-semibold">Admin</p>
                    <p className="text-base-content/60">admin@shelby.io</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>

        <div className="drawer-side border-r border-base-200/60">
          <label htmlFor="admin-drawer" className="drawer-overlay" />
          <aside className="min-h-screen w-72 bg-base-200/60 px-4 py-6">
            <div className="mb-6 rounded-2xl bg-base-100 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                This week
              </p>
              <p className="mt-2 text-2xl font-semibold">128</p>
              <p className="text-xs text-base-content/60">
                new builder submissions
              </p>
              <button className="btn btn-primary btn-sm mt-4 w-full">
                Review queue
              </button>
            </div>

            <nav className="menu gap-1 rounded-2xl bg-base-100 p-3 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 font-medium text-base-content/80 transition hover:bg-base-200 hover:text-base-content"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-base-200 text-xs font-semibold text-base-content/70">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 space-y-3 rounded-2xl bg-base-100 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Quick actions
              </p>
              <button className="btn btn-outline btn-sm w-full">
                Invite builder
              </button>
              <button className="btn btn-outline btn-sm w-full">
                Publish highlight
              </button>
              <button className="btn btn-outline btn-sm w-full">
                Export report
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
