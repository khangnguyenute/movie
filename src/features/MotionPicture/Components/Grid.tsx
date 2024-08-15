import { isEmpty } from "lodash";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { MotionPictureSummaryCard, MotionPictureVerticalCard } from "@components/MotionPicture";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";

import MotionPictureGridSkeleton from "./GridSkeleton";

interface MotionPictureGridProps {
  motionPictures: MovieDataType[] | TVShowDataType[];
  mediaType: MotionPictureCategoryEnum;
  isLoading?: boolean;
  isSummaryCard?: boolean;
}

const MotionPictureGrid = ({
  motionPictures,
  mediaType,
  isLoading,
  isSummaryCard = false,
}: MotionPictureGridProps) => {
  if (isLoading) {
    return <MotionPictureGridSkeleton isSummaryCard={isSummaryCard} />;
  }

  if (isEmpty(motionPictures)) {
    return <div />;
  }

  return (
    <div className={twMerge("grid grid-cols-5 gap-6", isSummaryCard && "grid grid-cols-1 gap-6")}>
      {motionPictures.map((motionPicture, index) => {
        if (isSummaryCard) {
          // eslint-disable-next-line react/no-array-index-key
          return <MotionPictureSummaryCard key={index} motionPicture={motionPicture} mediaType={mediaType} />;
        }
        return (
          <MotionPictureVerticalCard
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            motionPicture={motionPicture}
            mediaType={mediaType}
            className="w-full"
          />
        );
      })}
    </div>
  );
};
export default memo(MotionPictureGrid);
