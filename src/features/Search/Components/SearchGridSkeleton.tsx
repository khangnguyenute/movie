import { memo } from "react";

import { CreditListSkeleton } from "@components/Credit";
import { MotionPictureSummarySkeleton } from "@components/MotionPicture";
import { SearchEnum } from "@enums/movieEnum";

interface SearchGridSkeletonProps {
  category: SearchEnum;
}

const SearchGridSkeleton = ({ category }: SearchGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 10 }).map((_, index) => {
        if (category === SearchEnum.PERSON) {
          // eslint-disable-next-line react/no-array-index-key
          return <CreditListSkeleton key={index} />;
        }
        // eslint-disable-next-line react/no-array-index-key
        return <MotionPictureSummarySkeleton key={index} className="w-full" />;
      })}
    </div>
  );
};
export default memo(SearchGridSkeleton);
