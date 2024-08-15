import { memo } from "react";
import { useTranslation } from "react-i18next";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { CommonDataType } from "@interfaces/Common";

import MotionPictureKeywordItem from "./KeywordItem";

interface MotionPictureKeywordProps {
  mediaType: MotionPictureCategoryEnum;
  keywords?: CommonDataType[];
}

const MotionPictureKeyword = ({ mediaType, keywords = [] }: MotionPictureKeywordProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-lg font-semibold">{t("keywords")}</div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <MotionPictureKeywordItem key={keyword.id} keyword={keyword} mediaType={mediaType} />
        ))}
      </div>
    </div>
  );
};

export default memo(MotionPictureKeyword);
