import { memo } from "react";
import { useTranslation } from "react-i18next";

import { MotionPictureSlider } from "@components/MotionPicture";
import { DirectionEnum } from "@enums/commonEnum";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";

interface MotionPictureRecommendationProps {
  recommendations: MovieDataType[] | TVShowDataType[];
  mediaType: MotionPictureCategoryEnum;
}

const MotionPictureRecommendation = ({ recommendations, mediaType }: MotionPictureRecommendationProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-3 text-2xl font-semibold">{t("recommendations")}</div>
      <MotionPictureSlider
        sliders={recommendations}
        mediaType={mediaType}
        direction={DirectionEnum.HORIZONTAL}
        slidesPerView={4}
      />
    </div>
  );
};

export default memo(MotionPictureRecommendation);
