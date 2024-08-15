import { memo, useCallback, useEffect, useState } from "react";

import { SearchEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { BaseListQueryType } from "@interfaces/Common";
import { searchService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import SearchGrid from "./Components/SearchGrid";
import SearchTable from "./Components/SearchTable";

interface SearchContainerProps {
  category: SearchEnum;
  query: string;
}

const SearchContainer = ({ category, query }: SearchContainerProps) => {
  const toast = useToast();

  const [searchData, setSearchData] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [queryParam, setQueryParam] = useState<BaseListQueryType | null>(null);
  const [totalRows, setTotalRows] = useState<number>(0);

  const getSearchData = useCallback(async () => {
    if (!queryParam) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, meta } = await searchService.getSearchData(category, query, queryParam);

      setSearchData(data);
      setTotalRows(meta.totalResults);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [category, query, queryParam, toast]);

  useEffect(() => {
    getSearchData();
  }, [getSearchData]);

  return (
    <SearchTable data={searchData} isLoading={isLoading} totalRows={totalRows} onChangeState={setQueryParam}>
      <SearchGrid isLoading={isLoading} searchData={searchData} category={category} />
    </SearchTable>
  );
};

export default memo(SearchContainer);
