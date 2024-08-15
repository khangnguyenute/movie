import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType } from "@interfaces/Common";
import { beautifyNumber } from "@utils/Helpers";

import { MotionPictureKeyword } from "../Components";

interface MovieInformationProps {
  movie: MovieDataType;
}

const MovieInformation = ({ movie }: MovieInformationProps) => {
  const { t } = useTranslation();
  const languages = useMemo(
    () => movie.spoken_languages.map((language) => language.name).join(", "),
    [movie.spoken_languages],
  );

  return (
    <div className="flex flex-col items-start space-y-6">
      <Title title={t("status")} subtitle={movie.status} />
      <Title title={t("originalLanguage")} subtitle={languages} />
      <Title title={t("budget")} subtitle={beautifyNumber(movie.budget, ",", "$")} />
      <Title title={t("revenue")} subtitle={beautifyNumber(movie.revenue, ",", "$")} />
      <MotionPictureKeyword keywords={movie.keywords.keywords} mediaType={MotionPictureCategoryEnum.MOVIE} />
    </div>
  );
};

export default memo(MovieInformation);
