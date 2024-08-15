import { KEYWORD_PATH } from "@constants/routeConstant";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { CommonDataType } from "@interfaces/Common";
import { formatNameToPath } from "@utils/Helpers";

interface MotionPictureKeywordItemProps {
  mediaType: MotionPictureCategoryEnum;
  keyword: CommonDataType;
}

const MotionPictureKeywordItem = ({ mediaType, keyword }: MotionPictureKeywordItemProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(KEYWORD_PATH.MOTION_PICTURE(keyword.id, formatNameToPath(keyword.name), mediaType));
  }, [keyword, mediaType, navigate]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      className="text-slte-700 rounded-lg border bg-gradient-to-r from-tertiary/40 to-secondary/40 px-2 duration-300 hover:from-tertiary/80 hover:to-secondary/80"
    >
      #{keyword.name}
    </div>
  );
};

export default memo(MotionPictureKeywordItem);
