import { SEARCH_PATH } from "@constants/routeConstant";
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { Input } from "@components/Form";
import { SearchEnum } from "@enums/movieEnum";
import useWatchParam from "@hooks/useWatchParam";

const HeaderSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isFirstRenderRef = useRef(true);

  const [searchValue, setSearchValue] = useState("");
  const [searchParam] = useWatchParam("query");

  const handleChangeSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchValue(value);
  }, []);

  const handleSearch = useCallback(() => {
    navigate(`${SEARCH_PATH.SEARCH(SearchEnum.MOVIE)}?query=${searchValue}`);
  }, [navigate, searchValue]);

  useEffect(() => {
    if (!searchParam?.length || !isFirstRenderRef.current) {
      return;
    }

    setSearchValue(searchParam);
    isFirstRenderRef.current = false;
  }, [searchParam]);

  return (
    <form onSubmit={handleSearch}>
      <Input
        name="query"
        className="z-0 block h-9 w-96 flex-1 border-0 bg-gray-50 duration-100 hover:bg-gray-100"
        size="sm"
        isShowLabelWhenFocusing={false}
        placeholder={t("search")}
        label={t("search")}
        labelPostfix={<BiSearch className="flex-shrink-0 pt-px text-gray-400" size={16} />}
        value={searchValue}
        onChange={handleChangeSearchValue}
      />
    </form>
  );
};

export default memo(HeaderSearch);
