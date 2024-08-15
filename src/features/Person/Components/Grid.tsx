import { memo } from "react";

import { CreditCard, CreditSkeletonCard } from "@components/Credit";
import { PersonDataType } from "@interfaces/Common";

interface PersonGridProps {
  people: PersonDataType[];
  isLoading: boolean;
}

const PersonGrid = ({ people, isLoading }: PersonGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CreditSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      {people.map((person, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CreditCard key={index} credit={person} />
      ))}
    </div>
  );
};
export default memo(PersonGrid);
