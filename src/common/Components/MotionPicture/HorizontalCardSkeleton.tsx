import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "@components/Loading";

interface MotionPictureHorizontalCardSkeletonProps {
  isBorder?: boolean;
  className?: string;
}

const MotionPictureHorizontalCardSkeleton = ({
  isBorder = true,
  className,
}: MotionPictureHorizontalCardSkeletonProps) => {
  return (
    <div className={twMerge("rounded-lg", isBorder && "border shadow-md", className)}>
      <LoadingSkeleton className={twMerge("aspect-16/9 w-full", !isBorder && "rounded-b-none")} />

      <div className="mt-1 flex items-start justify-between px-3">
        <LoadingSkeleton className="h-5 w-full" />
        <LoadingSkeleton className="h-5 w-7" />
      </div>
    </div>
  );
};

export default memo(MotionPictureHorizontalCardSkeleton);
