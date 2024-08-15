import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { TVShowDataType } from "@interfaces/Common";

import { MotionPictureKeyword } from "../Components";
import TVShowNetwork from "./TVShowNetwork";

interface TVShowInformationProps {
  tvShow: TVShowDataType;
}

const TVShowInformation = ({ tvShow }: TVShowInformationProps) => {
  const { t } = useTranslation();
  const languages = useMemo(
    () => tvShow.spoken_languages.map((language) => language.name).join(", "),
    [tvShow.spoken_languages],
  );

  return (
    <div className="flex flex-col items-start space-y-6">
      <Title title={t("status")} subtitle={tvShow.status} />
      <Title title={t("networks")} subtitle={<TVShowNetwork networks={tvShow.networks} />} />
      <Title title={t("type")} subtitle={tvShow.type} />
      <Title title={t("originalLanguage")} subtitle={languages} />
      <MotionPictureKeyword keywords={tvShow.keywords.results} mediaType={MotionPictureCategoryEnum.TV} />
    </div>
  );
};

export default memo(TVShowInformation);
