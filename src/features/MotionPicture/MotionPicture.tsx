import { camelCase } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { MotionPictureCategoryEnum, MovieEnum, TVShowEnum } from "@enums/movieEnum";
import useDocumentTitle from "@hooks/useDocumentTitle";

import MotionPictureContainer from "./Components/Container";
import { movieParam, tvShowParam } from "./constant";

const MotionPictureManagement = () => {
  const { t } = useTranslation();
  const { category, type: typeParam } = useParams();

  const type = useMemo(() => {
    if (category === MotionPictureCategoryEnum.MOVIE) {
      return typeParam ?? MovieEnum.POPULAR;
    }
    return typeParam ?? TVShowEnum.POPULAR;
  }, [category, typeParam]);

  const motionPictureParam = useMemo(() => {
    if (category === MotionPictureCategoryEnum.MOVIE) {
      return movieParam(type as MovieEnum);
    }
    return tvShowParam(type as TVShowEnum);
  }, [category, type]);

  const columnVisibility = useMemo(() => {
    return {
      category: false,
    };
  }, []);

  useDocumentTitle(t(String(category)));

  return (
    <MotionPictureContainer
      title={t("movieType", { type: t(camelCase(type)) })}
      category={category as MotionPictureCategoryEnum}
      motionPictureParam={motionPictureParam}
      columnVisibility={columnVisibility}
    />
  );
};

export default memo(MotionPictureManagement);
