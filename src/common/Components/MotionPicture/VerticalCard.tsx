import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { PosterImage } from "@components/Image";
import { ProgressBar } from "@components/Progress";
import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { getNameMotionPicture, getReleasedDateMotionPicture } from "@utils/Helpers";

interface MotionPictureVerticalCardProps {
  motionPicture: MovieDataType | TVShowDataType;
  mediaType?: MotionPictureCategoryEnum;
  isBorder?: boolean;
  className?: string;
}

const MotionPictureVerticalCard = ({
  motionPicture,
  mediaType,
  isBorder = true,
  className,
}: MotionPictureVerticalCardProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const name = useMemo(() => getNameMotionPicture(motionPicture), [motionPicture]);

  const releasedDate = useMemo(() => getReleasedDateMotionPicture(motionPicture), [motionPicture]);

  const handleClick = useCallback(() => {
    navigate(
      MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_DETAIL(
        mediaType as MotionPictureCategoryEnum,
        motionPicture.id,
      ),
    );
  }, [mediaType, motionPicture.id, navigate]);

  return (
    <div
      className={twMerge(
        "relative w-40 overflow-hidden rounded-lg",
        isBorder && "border pb-2 shadow-md",
        className,
      )}
    >
      <div role="button" tabIndex={0} onClick={handleClick}>
        <PosterImage
          alt={name}
          src={motionPicture.poster_path}
          className={twMerge("aspect-2/3 w-full", !isBorder && "rounded-lg")}
        />
      </div>
      <ProgressBar
        percentage={Number((motionPicture.vote_average * 10).toFixed(0))}
        className="absolute ml-2 h-12 w-12 -translate-y-1/2"
      />

      <Title
        title={name}
        subtitle={dayjs(releasedDate).format(t("dateFormat")) || "N/A"}
        className="mt-6 px-3"
        titleClassname="hover:text-secondary leading-none"
        onClick={handleClick}
      />
    </div>
  );
};

export default memo(MotionPictureVerticalCard);
