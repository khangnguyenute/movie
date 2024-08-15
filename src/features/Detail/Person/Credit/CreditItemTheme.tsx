import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaListUl } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import { ButtonTooltip } from "@components/Button";
import { PosterImage } from "@components/Image";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MotionPictureDataType } from "@interfaces/Common";

interface PersonCreditItemThemeProps {
  name: string;
  motionPicture: MotionPictureDataType;
}

const PersonCreditItemTheme = ({ name, motionPicture }: PersonCreditItemThemeProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(
      MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_DETAIL(
        motionPicture.media_type as MotionPictureCategoryEnum,
        motionPicture.id,
      ),
    );
  }, [motionPicture.id, motionPicture.media_type, navigate]);

  return (
    <div className="relative mx-auto text-white">
      <div className="grid grid-cols-4 gap-4">
        <PosterImage
          alt={name}
          src={motionPicture.poster_path}
          className="col-span-1 aspect-2/3 w-full rounded-lg"
        />

        <div className="col-span-3 flex flex-col justify-between">
          <div className="flex items-center space-x-4 text-white">
            <div role="button" tabIndex={0} onClick={handleClick} className="truncate text-xl font-bold">
              {name}
            </div>
            <div className="flex w-fit items-center rounded-lg bg-secondary px-3 font-semibold">
              {motionPicture.vote_average}
            </div>
          </div>

          <div className="line-clamp-3 text-sm">{motionPicture.overview}</div>

          <div className="flex items-center space-x-2">
            <ButtonTooltip label={<FaListUl />} content={t("addToList")} className="bg-secondary" size="sm" />
            <ButtonTooltip
              label={<FaHeart />}
              content={t("markAsFavorite")}
              className="bg-secondary"
              size="sm"
            />
            <ButtonTooltip
              label={<PiTagSimpleFill className="rotate-90" />}
              content={t("addToWatchList")}
              className="bg-secondary"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PersonCreditItemTheme);
