import { SEARCH_PATH } from "@constants/routeConstant";
import { memo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SearchEnum } from "@enums/movieEnum";
import useWatchParam from "@hooks/useWatchParam";

import SearchCategory from "./SearchCategory";
import SearchContainer from "./SearchContainer";

const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { category } = useParams();
  const [searchParam] = useWatchParam("query");

  const handleChangeCategory = useCallback(
    (value: SearchEnum) => {
      navigate(`${SEARCH_PATH.SEARCH(value)}${search}`);
    },
    [navigate, search],
  );

  return (
    <div className="mx-auto w-full max-w-layout py-8">
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-1 mb-4 h-fit overflow-hidden rounded-lg border-2 shadow-lg">
          {Object.values(SearchEnum).map((value) => (
            <SearchCategory
              key={value}
              category={value}
              selectedCategory={category as SearchEnum}
              onChangeCategory={handleChangeCategory}
            />
          ))}
        </div>
        <div className="col-span-4 w-full">
          <SearchContainer category={category as SearchEnum} query={String(searchParam)} />
        </div>
      </div>
    </div>
  );
};

export default memo(Search);
