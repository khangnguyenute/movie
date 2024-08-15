import { COLLECTION_PATH } from "@constants/routeConstant";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { PosterImage } from "@components/Image";
import { Title } from "@components/Title";
import { CollectionDataType } from "@interfaces/Common";

interface SearchCollectionProps {
  collection: CollectionDataType;
}

const SearchCollection = ({ collection }: SearchCollectionProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(COLLECTION_PATH.COLLECTION_DETAIL(collection.id));
  }, [collection.id, navigate]);

  return (
    <div className="flex h-36 w-full items-center space-x-10 overflow-hidden rounded-lg border-2 shadow-lg">
      <PosterImage
        alt={collection.name}
        src={collection.poster_path}
        className="aspect-2/3 h-full flex-none border-r-2 shadow-lg"
      />

      <Title
        title={collection.name}
        subtitle={collection.overview}
        titleClassname="font-bold text-base mb-2"
        onClick={handleClick}
      />
    </div>
  );
};
export default memo(SearchCollection);
