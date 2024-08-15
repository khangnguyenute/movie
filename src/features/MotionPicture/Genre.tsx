import { GENRE_PATH } from "@constants/routeConstant";
import { capitalize } from "lodash";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { formatPathToName, splitPath } from "@utils/Helpers";

import MotionPictureContainer from "./Components/Container";
import { genreParam } from "./constant";

const GenreManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { genreId, category } = useParams();
  const { id, name } = useMemo(() => splitPath(String(genreId)), [genreId]);

  const title = useMemo(() => capitalize(formatPathToName(name)), [name]);
  const motionPictureParam = useMemo(() => genreParam(id), [id]);

  const handleChangeCategory = useCallback(
    (option: unknown) => {
      navigate(GENRE_PATH.MOTION_PICTURE(id, name, option as MotionPictureCategoryEnum));
    },
    [id, name, navigate],
  );

  const columnVisibility = useMemo(() => {
    return {
      with_genres: false,
    };
  }, []);

  useDocumentTitle(t("genre"));

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

export default memo(GenreManagement);
