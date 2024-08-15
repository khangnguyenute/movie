import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const CreditListSkeleton = () => {
  return (
    <div className="my-4 flex flex-col space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="flex items-center space-x-3">
          <LoadingSkeleton className="h-16 w-16" />
          <div className="flex w-full flex-col space-y-1">
            <LoadingSkeleton className="h-5 w-24" />
            <LoadingSkeleton className="h-4 w-1/2 min-w-36" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CreditListSkeleton);
