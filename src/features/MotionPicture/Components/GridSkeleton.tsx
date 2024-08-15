import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { MotionPictureSummarySkeleton, MotionPictureVerticalCardSkeleton } from "@components/MotionPicture";

interface MotionPictureGridSkeletonProps {
  isSummaryCard?: boolean;
}

const MotionPictureGridSkeleton = ({ isSummaryCard = false }: MotionPictureGridSkeletonProps) => {
  return (
    <div className={twMerge("grid grid-cols-5 gap-6", isSummaryCard && "grid grid-cols-1 gap-6")}>
      {Array.from({ length: 10 }).map((_, index) => {
        if (isSummaryCard) {
          // eslint-disable-next-line react/no-array-index-key
          return <MotionPictureSummarySkeleton key={index} className="w-full" />;
        }
        // eslint-disable-next-line react/no-array-index-key
        return <MotionPictureVerticalCardSkeleton key={index} className="w-full" />;
      })}
    </div>
  );
};
export default memo(MotionPictureGridSkeleton);
