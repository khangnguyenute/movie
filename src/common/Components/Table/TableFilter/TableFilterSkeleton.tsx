import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const TableFilterSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <LoadingSkeleton className="h-6 w-14 p-1" />
      <LoadingSkeleton className="h-6 w-20 p-1" />
      <LoadingSkeleton className="h-6 w-14 p-1" />
      <LoadingSkeleton className="h-6 w-24 p-1" />
      <LoadingSkeleton className="h-6 w-20 p-1" />
      <LoadingSkeleton className="h-6 w-24 p-1" />
      <LoadingSkeleton className="h-6 w-14 p-1" />
      <LoadingSkeleton className="h-6 w-20 p-1" />
      <LoadingSkeleton className="h-6 w-24 p-1" />
    </div>
  );
};

export default memo(TableFilterSkeleton);
