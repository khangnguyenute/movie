import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useWatchParam = (paramName: string) => {
  const [searchParam, setSearchParam] = useSearchParams();

  const searchParamValue = useMemo(() => searchParam.get(paramName), [paramName, searchParam]);

  const handleSetParamValue = useCallback(
    (value: string | null) => {
      if (value === null) {
        searchParam.delete(paramName);
      } else {
        searchParam.set(paramName, value);
      }

      setSearchParam(searchParam);
    },
    [paramName, searchParam, setSearchParam],
  );

  return [searchParamValue, handleSetParamValue] as const;
};

export default useWatchParam;
