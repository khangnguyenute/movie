import { KEYWORD_PATH } from "@constants/routeConstant";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { formatPathToName, splitPath } from "@utils/Helpers";

import MotionPictureContainer from "./Components/Container";
import { keywordParam } from "./constant";

const KeywordManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { keywordId, category } = useParams();
  const { id, name } = useMemo(() => splitPath(String(keywordId)), [keywordId]);

  const title = useMemo(() => formatPathToName(name), [name]);
  const motionPictureParam = useMemo(() => keywordParam(id), [id]);

  const handleChangeCategory = useCallback(
    (option: unknown) => {
      navigate(KEYWORD_PATH.MOTION_PICTURE(id, name, option as MotionPictureCategoryEnum));
    },
    [id, name, navigate],
  );

  const columnVisibility = useMemo(() => {
    return {
      with_genres: false,
    };
  }, []);

  useDocumentTitle(t("keyword"));

  return (
    <MotionPictureContainer
      title={title}
      category={category as MotionPictureCategoryEnum}
      motionPictureParam={motionPictureParam}
      columnVisibility={columnVisibility}
      isSummaryCard
      isShowClearAll={false}
      onChangeCategory={handleChangeCategory}
    />
  );
};

export default memo(KeywordManagement);
