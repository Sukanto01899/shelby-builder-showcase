import React from "react";
import { Skeleton } from "./skeleton";

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-base-100">
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-5 pt-32 text-center sm:px-6 sm:pt-36 lg:flex-row lg:gap-16 lg:px-8 lg:pt-28 lg:text-left">
        <div className="w-full max-w-xl space-y-5">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-12 w-full max-w-md rounded-2xl" />
          <Skeleton className="h-12 w-full max-w-sm rounded-2xl" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Skeleton className="h-11 w-full rounded-full sm:w-32" />
            <Skeleton className="h-11 w-full rounded-full sm:w-32" />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-lg" />
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="rounded-[28px] border border-base-300/60 bg-base-100/80 p-4 shadow-2xl shadow-base-300/30 backdrop-blur sm:p-6">
            <div className="flex items-center gap-3 rounded-2xl border border-base-300/60 bg-base-100 px-4 py-3 shadow-sm">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="hidden h-5 w-12 rounded-lg sm:block" />
            </div>

            <div className="mt-5 rounded-2xl border border-base-300/50 bg-base-200/40 p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24 rounded-lg" />
                <Skeleton className="h-3 w-16 rounded-lg" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 rounded-full" />
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-base-300/50 bg-base-100 px-4 py-3 text-sm shadow-sm"
                >
                  <Skeleton className="h-4 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-10 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
