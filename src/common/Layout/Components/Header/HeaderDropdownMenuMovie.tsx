import { camelCase } from "lodash";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { MovieEnum } from "@enums/movieEnum";

interface HeaderDropdownMenuMovieProps {
  onClick?: () => void;
}

const HeaderDropdownMenuMovie = ({ onClick }: HeaderDropdownMenuMovieProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="movie/popular">{t(camelCase(MovieEnum.POPULAR))}</Link>
      </div>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="movie/now_playing">{t(camelCase(MovieEnum.NOW_PLAYING))}</Link>
      </div>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="movie/upcoming">{t(camelCase(MovieEnum.UPCOMING))}</Link>
      </div>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="movie/top_rated">{t(camelCase(MovieEnum.TOP_RATED))}</Link>
      </div>
    </>
  );
};
export default memo(HeaderDropdownMenuMovie);
