import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "@components/Loading";

interface MotionPictureVerticalCardSkeletonProps {
  isBorder?: boolean;
  className?: string;
}

const MotionPictureVerticalCardSkeleton = ({
  isBorder = true,
  className,
}: MotionPictureVerticalCardSkeletonProps) => {
  return (
    <div
      className={twMerge(
        "relative w-40 overflow-hidden rounded-lg",
        isBorder && "border pb-2 shadow-md",
        className,
      )}
    >
      <LoadingSkeleton className={twMerge("aspect-2/3 w-full", isBorder && "rounded-b-none")} />
      <LoadingSkeleton className="absolute left-3 h-10 w-10 -translate-y-1/2 rounded-full" />

      <div className="mt-6 flex flex-col space-y-1 px-3">
        <LoadingSkeleton className="h-5 w-full" />
        <LoadingSkeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export default memo(MotionPictureVerticalCardSkeleton);
