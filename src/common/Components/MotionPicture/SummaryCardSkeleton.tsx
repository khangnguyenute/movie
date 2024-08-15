import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "@components/Loading";

interface MotionPictureSummarySkeletonProps {
  className?: string;
}

const MotionPictureSummarySkeleton = ({ className }: MotionPictureSummarySkeletonProps) => {
  return (
    <div
      className={twMerge(
        "flex h-36 w-full items-center space-x-10 overflow-hidden rounded-lg border-2 shadow-lg",
        className,
      )}
    >
      <LoadingSkeleton className="aspect-2/3 h-full flex-none border-r-2 shadow-lg" />

      <div className="my-auto w-full pr-10">
        <LoadingSkeleton className="mb-2 h-7 w-56" />
        <LoadingSkeleton className="h-4 w-20" />
        <LoadingSkeleton className="mb-2 mt-3 h-4 w-full" />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default memo(MotionPictureSummarySkeleton);
