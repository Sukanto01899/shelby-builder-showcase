import React from "react";
import { Skeleton } from "./skeleton";

const HeaderSkeleton = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded-lg" />
            <Skeleton className="h-2 w-24 rounded-lg" />
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Skeleton className="h-3 w-14 rounded-lg" />
          <Skeleton className="h-3 w-16 rounded-lg" />
          <Skeleton className="h-3 w-20 rounded-lg" />
          <Skeleton className="h-3 w-16 rounded-lg" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Skeleton className="hidden h-9 w-20 rounded-full sm:block" />
          <Skeleton className="h-9 w-20 rounded-full sm:w-24" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
