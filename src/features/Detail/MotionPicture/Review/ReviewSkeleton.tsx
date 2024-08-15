import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { Star } from "@components/Form/Star";
import { LoadingSkeleton } from "@components/Loading";

const MotionPictureReviewSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={twMerge("rounded-lg border p-4 shadow-lg")}>
          <div className="mb-4 flex items-center space-x-4">
            <div className="h-10 w-10 flex-none rounded-full">
              <LoadingSkeleton className="h-10 w-10 rounded-full" />
            </div>

            <div>
              <LoadingSkeleton className="mb-1 h-5 w-20" />
              <div className="flex items-center space-x-2">
                <Star name="star" value={3} isLoading />
                <LoadingSkeleton className="h-5 w-20" />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <LoadingSkeleton className="h-5 w-full" />
            <LoadingSkeleton className="h-5 w-full" />
            <LoadingSkeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(MotionPictureReviewSkeleton);
