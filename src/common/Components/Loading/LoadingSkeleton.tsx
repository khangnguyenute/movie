import { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return <div className={twMerge("animate-pulse rounded-lg bg-gray-200", className)} />;
};

export default memo(LoadingSkeleton);
