import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { PosterImage } from "@components/Image";
import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { getNameMotionPicture, getReleasedDateMotionPicture } from "@utils/Helpers";

interface MotionPictureSummaryCardProps {
  motionPicture: MovieDataType | TVShowDataType;
  mediaType?: MotionPictureCategoryEnum;
  className?: string;
}

const MotionPictureSummaryCard = ({
  motionPicture,
  mediaType = MotionPictureCategoryEnum.MOVIE,
  className,
}: MotionPictureSummaryCardProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const name = useMemo(() => getNameMotionPicture(motionPicture), [motionPicture]);

  const releasedDate = useMemo(() => getReleasedDateMotionPicture(motionPicture), [motionPicture]);

  const handleClick = useCallback(() => {
    navigate(MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_DETAIL(mediaType, motionPicture.id));
  }, [mediaType, motionPicture.id, navigate]);

  return (
    <div
      className={twMerge(
        "flex h-36 w-full items-center space-x-10 overflow-hidden rounded-lg border-2 shadow-lg",
        className,
      )}
    >
      <PosterImage
        alt={name}
        src={motionPicture.poster_path}
        className="aspect-2/3 h-full flex-none border-r-2 shadow-lg"
      />

      <div className="my-auto flex flex-col space-y-2 pr-10">
        <Title title={name} subtitle={dayjs(releasedDate).format(t("dateFormat"))} onClick={handleClick} />
        <div className="line-clamp-2">{motionPicture.overview}</div>
      </div>
    </div>
  );
};

export default memo(MotionPictureSummaryCard);
