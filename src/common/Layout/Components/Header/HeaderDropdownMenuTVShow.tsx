import { camelCase } from "lodash";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { TVShowEnum } from "@enums/movieEnum";

interface HeaderDropdownMenuTVShowProps {
  onClick?: () => void;
}

const HeaderDropdownMenuTVShow = ({ onClick }: HeaderDropdownMenuTVShowProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="tv/popular">{t(camelCase(TVShowEnum.POPULAR))}</Link>
      </div>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="tv/airing_today">{t(camelCase(TVShowEnum.AIRING_TODAY))}</Link>
      </div>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="tv/on_tv">{t(camelCase(TVShowEnum.ON_TV))}</Link>
      </div>
      <div className="px-4 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClick}>
        <Link to="tv/top_rated">{t(camelCase(TVShowEnum.TOP_RATED))}</Link>
      </div>
    </>
  );
};
export default memo(HeaderDropdownMenuTVShow);
