/* eslint-disable react/no-array-index-key */
import { isEmpty } from "lodash";
import { memo } from "react";

import { SearchEnum } from "@enums/movieEnum";

import SearchGridItem from "./SearchGridItem";
import SearchGridSkeleton from "./SearchGridSkeleton";

interface SearchGridProps {
  searchData: unknown[];
  category: SearchEnum;
  isLoading?: boolean;
}

const SearchGrid = ({ searchData, category, isLoading }: SearchGridProps) => {
  if (isLoading) {
    return <SearchGridSkeleton category={category} />;
  }

  if (isEmpty(searchData)) {
    return <div />;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {searchData.map((searchItem, index) => (
        <SearchGridItem key={index} data={searchItem} category={category} />
      ))}
    </div>
  );
};
export default memo(SearchGrid);
