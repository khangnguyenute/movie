import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Dropdown } from "@components/Dropdown";

import HeaderDropdownMenuMovie from "./HeaderDropdownMenuMovie";
import HeaderDropdownMenuTVShow from "./HeaderDropdownMenuTVShow";

const HeaderNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className="ml-8 flex cursor-pointer items-center space-x-6 font-semibold text-white">
      <Dropdown menu={<HeaderDropdownMenuMovie />} menuClassName="px-0 py-3 overflow-hidden" position="left">
        <div>{t("movies")}</div>
      </Dropdown>
      <Dropdown menu={<HeaderDropdownMenuTVShow />} menuClassName="px-0 py-3 overflow-hidden" position="left">
        <div>{t("tvShows")}</div>
      </Dropdown>
      <Link to="person">{t("people")}</Link>
    </div>
  );
};
export default memo(HeaderNavbar);
