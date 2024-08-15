import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const CreditCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden rounded-lg border shadow-md">
      <LoadingSkeleton className="aspect-3/4 w-full rounded-b-none" />
      <div className="mt-1 flex w-full flex-col space-y-1 px-3 py-2">
        <LoadingSkeleton className="h-5 w-24" />
        <LoadingSkeleton className="h-4 w-1/2 min-w-36" />
      </div>
    </div>
  );
};

export default memo(CreditCardSkeleton);
