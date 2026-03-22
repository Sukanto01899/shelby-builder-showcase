"use client";

import React, { useEffect, useState } from "react";
import SubmissionModalTrigger from "./submission-modal-trigger";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${
        scrolled
          ? "fixed top-0 left-0 right-0 bg-base-100/80 shadow-lg shadow-base-300/40 backdrop-blur border-b border-base-200/70"
          : "absolute top-0 left-0 right-0 bg-transparent"
      } z-50 transition-all duration-300 ease-out`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href={"/"} className="flex items-center gap-3">
          <div className="grid h-10 w-10 rounded-2xl overflow-hidden ">
            <Image src="/logo.png" width={40} height={40} alt="logo" />
          </div>
          <div className="leading-none">
            <p className="text-base font-semibold tracking-tight">Shelby</p>
            <p className="text-xs text-base-content/60">Builder Showcase</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-base-content/80 lg:flex">
          <Link
            className="hover:text-base-content transition-colors"
            href="/projects"
          >
            Explore
          </Link>
          <Link
            href="/builders"
            className="hover:text-base-content transition-colors"
          >
            Builders
          </Link>
          <Link
            className="hover:text-base-content transition-colors"
            href="/categories"
          >
            Categories
          </Link>
          <a
            target="_blank"
            className="hover:text-base-content transition-colors"
            href="https://discord.gg/dyBvVRm5"
          >
            Community
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SubmissionModalTrigger classname="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-content shadow-lg shadow-primary/30 transition hover:brightness-110 sm:px-5 sm:text-sm">
            Submit
          </SubmissionModalTrigger>
          <label className="swap swap-rotate rounded-full border border-base-300/70 p-2 text-base-content/70 transition hover:border-base-300 hover:text-base-content">
            <input
              type="checkbox"
              onChange={(event) => {
                const isLight = event.currentTarget.checked;
                const root = document.body;
                root.setAttribute(
                  "data-theme",
                  isLight ? "shelby-light" : "shelby-dark",
                );
              }}
            />
            <svg
              className="swap-on h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2" />
              <path d="M12 21v2" />
              <path d="M4.22 4.22l1.42 1.42" />
              <path d="M18.36 18.36l1.42 1.42" />
              <path d="M1 12h2" />
              <path d="M21 12h2" />
              <path d="M4.22 19.78l1.42-1.42" />
              <path d="M18.36 5.64l1.42-1.42" />
            </svg>
            <svg
              className="swap-off h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
