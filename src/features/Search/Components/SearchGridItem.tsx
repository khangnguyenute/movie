import { memo } from "react";

import { CreditListItem } from "@components/Credit";
import { MotionPictureSummaryCard } from "@components/MotionPicture";
import { SearchEnum } from "@enums/movieEnum";
import { CollectionDataType, MovieDataType, PersonDataType, TVShowDataType } from "@interfaces/Common";

import SearchCollection from "./Collection";

interface SearchGridItemProps {
  data: unknown;
  category: SearchEnum;
}

const SearchGridItem = ({ data, category }: SearchGridItemProps) => {
  if (category === SearchEnum.PERSON) {
    return <CreditListItem credit={data as PersonDataType} />;
  }

  if (category === SearchEnum.COLLECTION) {
    return <SearchCollection collection={data as CollectionDataType} />;
  }

  return <MotionPictureSummaryCard motionPicture={data as MovieDataType | TVShowDataType} />;
};
export default memo(SearchGridItem);
