import React from "react";
import SubmissionModalTrigger from "./submission-modal-trigger";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-base-200 bg-base-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-base-100 font-semibold">
                S
              </div>
              <div>
                <p className="text-base font-semibold tracking-tight">Shelby</p>
                <p className="text-xs text-base-content/60">Builder Showcase</p>
              </div>
            </div>
            <p className="text-sm text-base-content/70">
              Discover bold web3 projects, curated by the community. Submit your
              launch and get discovered by founders, builders, and investors.
            </p>
            <div className="flex items-center gap-3">
              <SubmissionModalTrigger classname="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-content shadow-lg shadow-primary/30 transition hover:brightness-110">
                Submit Project
              </SubmissionModalTrigger>

              <button className="rounded-full border border-base-300/70 px-4 py-2 text-xs font-semibold text-base-content/80 transition hover:border-base-300 hover:text-base-content">
                Explore
              </button>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
              Platform
            </p>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Categories
            </a>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Top Builders
            </a>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Latest Projects
            </a>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Pricing
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
              Resources
            </p>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Submission Guide
            </a>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Community
            </a>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              API Access
            </a>
            <a
              className="block text-base-content/70 hover:text-base-content"
              href="#"
            >
              Status
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
              Stay in the loop
            </p>
            <p className="text-sm text-base-content/70">
              Get weekly drops of standout launches and founder notes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="input input-bordered w-full bg-base-100"
                placeholder="you@example.com"
                type="email"
              />
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-content shadow-lg shadow-primary/30 transition hover:brightness-110">
                Join
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs text-base-content/60">
              <span>Twitter</span>
              <span>Discord</span>
              <span>GitHub</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-base-200 pt-6 text-xs text-base-content/60 sm:flex-row sm:items-center">
          <span>© 2026 Shelby Builder Showcase. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-base-content" href="#">
              Privacy
            </a>
            <a className="hover:text-base-content" href="#">
              Terms
            </a>
            <a className="hover:text-base-content" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
