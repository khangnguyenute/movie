import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { MotionPictureCreditDataType } from "@interfaces/Common";
import { motionPictureService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import MotionPictureCast from "./Cast";
import MotionPictureCrew from "./Crew";

const MotionPictureCreditDetail = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const { category, id } = useParams();

  const [creditData, setCreditData] = useState<MotionPictureCreditDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCreditsByMovieId = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await motionPictureService.getCreditsByMotionPictureId(
        category as MotionPictureCategoryEnum,
        Number(id),
      );
      setCreditData(response);
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

  useEffect(() => {
    getCreditsByMovieId();
  }, [getCreditsByMovieId]);

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
      <div className="mx-auto grid w-full max-w-layout grid-cols-2 gap-8">
        <MotionPictureCast casts={creditData?.cast ?? []} isLoading={isLoading} />
        <MotionPictureCrew crews={creditData?.crew ?? []} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default memo(MotionPictureCreditDetail);
