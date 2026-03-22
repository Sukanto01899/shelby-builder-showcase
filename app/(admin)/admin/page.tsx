const stats = [
  { label: "Active builders", value: "412", trend: "+12%" },
  { label: "Projects live", value: "1,204", trend: "+4.2%" },
  { label: "Review queue", value: "38", trend: "-6%" },
  { label: "Revenue", value: "$18.4k", trend: "+9%" },
];

const activity = [
  {
    title: "New builder submitted",
    detail: "Hyperstack Studio - Web3 product design",
    time: "12 min ago",
  },
  {
    title: "Project approved",
    detail: "Orbit Wallet redesign",
    time: "1 hour ago",
  },
  {
    title: "Message received",
    detail: "3 new inquiries",
    time: "3 hours ago",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl bg-base-200/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Welcome back, Admin
          </h1>
          <p className="mt-2 text-sm text-base-content/70">
            Track builder submissions, approvals, and the Shelby showcase
            performance from one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-sm">View insights</button>
          <button className="btn btn-primary btn-sm">Create spotlight</button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm"
          >
            <p className="text-xs text-base-content/60">{stat.label}</p>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <span className="badge badge-ghost">{stat.trend}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Recent submissions</h2>
            <button className="btn btn-ghost btn-xs">View all</button>
          </div>
          <div className="mt-4 space-y-3">
            {[
              {
                name: "Nova Labs",
                category: "Infrastructure",
                status: "Pending",
              },
              { name: "Lumen AI", category: "AI tooling", status: "Approved" },
              {
                name: "Chainlight",
                category: "Security",
                status: "Review",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-base-200/70 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-base-content/60">
                    {item.category}
                  </p>
                </div>
                <span className="badge badge-outline">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-base-200/70 bg-base-100 p-5 shadow-sm">
          <h2 className="text-sm font-semibold">Activity</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {activity.map((item) => (
              <li key={item.title} className="rounded-xl bg-base-200/50 p-3">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-base-content/60">{item.detail}</p>
                <p className="mt-2 text-xs text-base-content/50">
                  {item.time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
