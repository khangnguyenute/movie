import { memo } from "react";
import { useTranslation } from "react-i18next";

import { MotionPictureSlider } from "@components/MotionPicture";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";

interface MotionPictureSimilarProps {
  similarMovies: MovieDataType[] | TVShowDataType[];
  mediaType: MotionPictureCategoryEnum;
}

const MotionPictureSimilar = ({ similarMovies, mediaType }: MotionPictureSimilarProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-3 text-2xl font-semibold">{t("similar")}</div>
      <MotionPictureSlider sliders={similarMovies} mediaType={mediaType} slidesPerView={6} />
    </div>
  );
};

export default memo(MotionPictureSimilar);
