import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { BackdropImage } from "@components/Image";
import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { getNameMotionPicture, getReleasedDateMotionPicture } from "@utils/Helpers";

interface MotionPictureHorizontalCardProps {
  motionPicture: MovieDataType | TVShowDataType;
  mediaType?: MotionPictureCategoryEnum;
  isBorder?: boolean;
  className?: string;
}

const MotionPictureHorizontalCard = ({
  motionPicture,
  mediaType,
  isBorder = true,
  className,
}: MotionPictureHorizontalCardProps) => {
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
    <div className={twMerge("rounded-lg", isBorder && "border shadow-md", className)}>
      <div role="button" tabIndex={0} onClick={handleClick} className="group relative overflow-hidden">
        <BackdropImage
          alt={name}
          src={motionPicture.backdrop_path}
          className={twMerge("aspect-16/9 w-full", !isBorder && "rounded-lg")}
        />

        <div className="absolute bottom-0 hidden w-full items-center space-x-2 rounded-b-lg bg-gray-200 px-4 py-2 opacity-80 duration-300 group-hover:flex">
          <IoCalendar />
          <i>{dayjs(releasedDate).format(t("dateFormat")) || "N/A"}</i>
        </div>
      </div>

      <Title
        title={name}
        subtitle={`${Number((motionPicture.vote_average * 10).toFixed(0))}%`}
        className="flex items-start justify-between"
        titleClassname="hover:text-secondary text-base"
        onClick={handleClick}
      />
    </div>
  );
};

export default memo(MotionPictureHorizontalCard);
