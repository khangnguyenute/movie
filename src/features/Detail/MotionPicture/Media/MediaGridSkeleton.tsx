import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "@components/Loading";
import { MediaEnum } from "@enums/commonEnum";

interface MotionPictureMediaGridSkeletonProps {
  media: MediaEnum;
}

const MotionPictureMediaGridSkeleton = ({ media }: MotionPictureMediaGridSkeletonProps) => {
  return (
    <div className="my-8 grid grid-cols-5 gap-6">
      <div className="col-span-1 mb-4 h-fit rounded-lg border-2 shadow-lg">
        <div className="bg-gray-800 px-5 py-4">
          <LoadingSkeleton className="h-7 w-40" />
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex items-center justify-between px-5 py-3">
            <LoadingSkeleton className="h-6 w-20" />
            <LoadingSkeleton className="h-5 w-8" />
          </div>
        ))}
      </div>
      <div className="col-span-4 grid grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="h-fit overflow-hidden rounded-lg border-2 shadow-lg">
            <LoadingSkeleton
              className={twMerge("aspect-16/9 w-full", media === MediaEnum.POSTERS && "aspect-9/16")}
            />

            <div className="border-b-2 px-4 py-2">
              <LoadingSkeleton className="h-5 w-full" />
            </div>

            <div className="flex flex-col space-y-2 px-4 py-2">
              <LoadingSkeleton className="h-5 w-7" />
              <LoadingSkeleton className="h-5 w-16" />
              <LoadingSkeleton className="h-5 w-16" />
              <LoadingSkeleton className="h-5 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MotionPictureMediaGridSkeleton);
