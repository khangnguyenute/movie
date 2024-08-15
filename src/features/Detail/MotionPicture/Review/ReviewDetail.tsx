import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { isEmpty, lowerCase } from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { ReviewDataType } from "@interfaces/Common";
import { motionPictureService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import MotionPictureReviewItem from "../Components/ReviewItem";
import MotionPictureReviewSkeleton from "./ReviewSkeleton";

const MotionPictureReviewDetail = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const { category, id } = useParams();

  const [reviewData, setReviewData] = useState<ReviewDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getReviewByMovieId = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await motionPictureService.getReviewsByMotionPictureId(
        category as MotionPictureCategoryEnum,
        Number(id),
      );

      setReviewData(data);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [category, id, toast]);

  const handleClickBack = useCallback(() => {
    navigate(
      MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_DETAIL(category as MotionPictureCategoryEnum, Number(id)),
    );
  }, [category, id, navigate]);

  const children = useMemo(() => {
    if (isLoading) {
      return <MotionPictureReviewSkeleton />;
    }
    if (isEmpty(reviewData)) {
      return (
        <div>{t("emptyReview", { category: lowerCase(t(category ?? MotionPictureCategoryEnum.MOVIE)) })}</div>
      );
    }
    return (
      <>
        {reviewData.map((review) => (
          <MotionPictureReviewItem key={review.id} review={review} />
        ))}
      </>
    );
  }, [category, isLoading, reviewData, t]);

  useEffect(() => {
    getReviewByMovieId();
  }, [getReviewByMovieId]);

  return (
    <div>
      <div className="bg-secondary py-3">
        <div
          role="button"
          tabIndex={0}
          className="mx-auto flex max-w-layout items-center justify-start space-x-2 text-xl text-white"
          onClick={handleClickBack}
        >
          <FaArrowLeft />
          <div className="font-semibold">{t("back")}</div>
        </div>
      </div>
      <div className="mx-auto my-8 grid w-full max-w-layout grid-cols-1 gap-8">{children}</div>
    </div>
  );
};

export default memo(MotionPictureReviewDetail);
