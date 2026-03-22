import React from "react";

type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-full bg-base-200/80 ${className}`}
    />
  );
};
