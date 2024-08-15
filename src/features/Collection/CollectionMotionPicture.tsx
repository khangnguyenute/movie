import { memo } from "react";
import { useTranslation } from "react-i18next";

import { MotionPictureSummaryCard } from "@components/MotionPicture";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";

interface CollectionMotionPictureProps {
  motionPictures: Array<MovieDataType | TVShowDataType>;
}

const CollectionMotionPicture = ({ motionPictures }: CollectionMotionPictureProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-2 text-2xl font-semibold">{t("movie")}</div>
      <div className="grid grid-cols-1 gap-8">
        {motionPictures.map((motionPicture) => (
          <MotionPictureSummaryCard key={motionPicture.id} motionPicture={motionPicture} />
        ))}
      </div>
    </div>
  );
};

export default memo(CollectionMotionPicture);
