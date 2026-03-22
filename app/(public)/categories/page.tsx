import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { category as categoryOptions } from "@/constant";

export default function CategoriesPage() {
  return (
    <main className="bg-base-100 pb-20">
      <Header />
      <section className="relative overflow-hidden pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 lg:px-8">
          <div className="rounded-3xl border border-base-200/70 bg-base-100/90 p-8 shadow-2xl shadow-base-300/30 backdrop-blur">
            <p className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/70">
              Categories
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-base-content sm:text-5xl">
              Explore Shelby categories
            </h1>
            <p className="mt-4 max-w-2xl text-base text-base-content/70">
              Browse the different categories of projects being built on Shelby.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-primary btn-sm">
                Browse projects
              </Link>
              <Link href="/" className="btn btn-outline btn-sm">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-12 w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryOptions.map((item) => (
            <Link
              key={item.value}
              href={`/projects?category=${item.value}`}
              className="rounded-2xl border border-base-200/70 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:border-base-300 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold text-base-content">
                {item.name}
              </h2>
              <p className="mt-2 text-sm text-base-content/60">
                Explore {item.name} projects and builders.
              </p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
