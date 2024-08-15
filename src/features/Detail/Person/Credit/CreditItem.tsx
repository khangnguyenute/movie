import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { FaMinus, FaRegCircle, FaRegCircleDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Dropdown } from "@components/Dropdown";
import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { CastOfMotionPictureDataType, CrewOfMotionPictureDataType } from "@interfaces/Common";
import { getNameMotionPicture } from "@utils/Helpers";

import PersonCreditItemTheme from "./CreditItemTheme";

interface PersonCreditItemProps {
  creditOfMotionPicture: CastOfMotionPictureDataType | CrewOfMotionPictureDataType;
  className?: string;
}

const PersonCreditItem = ({ creditOfMotionPicture, className }: PersonCreditItemProps) => {
  const navigate = useNavigate();

  const name = useMemo(() => getNameMotionPicture(creditOfMotionPicture), [creditOfMotionPicture]);

  const subtitle = useMemo(() => {
    if ("character" in creditOfMotionPicture) {
      if (!creditOfMotionPicture.character) {
        return "";
      }
      return (
        <div className="flex space-x-1">
          {Boolean(creditOfMotionPicture.episode_count) && (
            <div>({creditOfMotionPicture.episode_count} episode)</div>
          )}
          <div>as {creditOfMotionPicture.character}</div>
        </div>
      );
    }
    if ("job" in creditOfMotionPicture) {
      return `...${creditOfMotionPicture.job}`;
    }
    return "N/A";
  }, [creditOfMotionPicture]);

  const releasedDate = useMemo(
    () => creditOfMotionPicture.release_date ?? creditOfMotionPicture.first_air_date,
    [creditOfMotionPicture.first_air_date, creditOfMotionPicture.release_date],
  );

  const handleClick = useCallback(() => {
    navigate(
      MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_DETAIL(
        creditOfMotionPicture.media_type as MotionPictureCategoryEnum,
        creditOfMotionPicture.id,
      ),
    );
  }, [creditOfMotionPicture.id, creditOfMotionPicture.media_type, navigate]);

  return (
    <div className={twMerge("flex items-center space-x-4", className)}>
      <div className="flex w-12 justify-center">
        {releasedDate ? dayjs(releasedDate).year() : <FaMinus />}
      </div>
      <Dropdown
        menu={<PersonCreditItemTheme name={name} motionPicture={creditOfMotionPicture} />}
        menuClassName="p-3 w-128 bg-primary"
        position="center"
      >
        <div className="group cursor-pointer">
          <FaRegCircle size={14} className="block group-hover:hidden" />
          <FaRegCircleDot size={14} className="hidden group-hover:block" />
        </div>
      </Dropdown>
      <Title title={name} subtitle={subtitle} titleClassname="text-base" onClick={handleClick} />
    </div>
  );
};

export default memo(PersonCreditItem);
