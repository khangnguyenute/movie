import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import { MediaEnum } from "@enums/commonEnum";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { MotionPictureImageDataType } from "@interfaces/Common";
import { motionPictureService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import MotionPictureMediaGrid from "./MediaGrid";

const MotionPictureMediaDetail = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const navigate = useNavigate();

  const { category, id, media } = useParams();

  const [mediaData, setMediaData] = useState<MotionPictureImageDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMediaByMotionPictureId = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await motionPictureService.getMediaByMotionPictureId(
        category as MotionPictureCategoryEnum,
        Number(id),
      );
      setMediaData(response);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [category, id, toast]);

  const handleChangeMedia = useCallback(
    (mediaType: MediaEnum) => {
      navigate(
        MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_MEDIA(
          category as MotionPictureCategoryEnum,
          Number(id),
          mediaType,
        ),
      );
    },
    [category, id, navigate],
  );

  const handleClickBack = useCallback(() => {
    navigate(
      MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_DETAIL(category as MotionPictureCategoryEnum, Number(id)),
    );
  }, [category, id, navigate]);

  useEffect(() => {
    getMediaByMotionPictureId();
  }, [getMediaByMotionPictureId]);

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
      <div className="mx-auto w-full max-w-layout">
        <MotionPictureMediaGrid
          data={mediaData ? mediaData[media as MediaEnum] : []}
          media={media as MediaEnum}
          isLoading={isLoading}
          onChangeMedia={handleChangeMedia}
        />
      </div>
    </div>
  );
};

export default memo(MotionPictureMediaDetail);
