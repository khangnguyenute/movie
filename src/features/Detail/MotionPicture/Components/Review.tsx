import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { isEmpty, lowerCase } from "lodash";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { ReviewDataType } from "@interfaces/Common";

import MotionPictureReviewItem from "./ReviewItem";

interface MotionPictureReviewProps {
  id: number;
  reviews: ReviewDataType[];
  mediaType: MotionPictureCategoryEnum;
}

const MotionPictureReview = ({ id, reviews, mediaType }: MotionPictureReviewProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleSeeMore = useCallback(() => {
    navigate(MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_REVIEW(mediaType, id));
  }, [navigate, mediaType, id]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between space-x-6 font-semibold">
        <div className="text-2xl">
          {t("reviews")} ({reviews.length})
        </div>
        <div role="button" tabIndex={0} className="hover:text-slate-500" onClick={handleSeeMore}>
          {t("seeAll", { name: "review" })}
        </div>
      </div>
      {isEmpty(reviews) && <div>{t("emptyReview", { category: lowerCase(t(mediaType)) })}</div>}
      {!isEmpty(reviews) && (
        <div className="grid grid-cols-1 gap-4">
          {reviews.slice(0, 2).map((review) => {
            return <MotionPictureReviewItem key={review.id} review={review} />;
          })}
        </div>
      )}
    </div>
  );
};

export default memo(MotionPictureReview);
