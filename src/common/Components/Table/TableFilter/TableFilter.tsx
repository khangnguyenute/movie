/* eslint-disable @typescript-eslint/no-unused-vars */
import { DEFAULT_API_DEBOUNCE_TIME } from "@constants/commonConstant";
import { HeaderGroup, OnChangeFn } from "@tanstack/react-table";
import { debounce, isArray, isEmpty } from "lodash";
import { MutableRefObject, createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import useWatchParam from "@hooks/useWatchParam";
import { TableFilterStateType, TableGenericDataType } from "@interfaces/Common";

import TableFilterOtion from "./TableFilterOption";

export interface TableRefType {
  onClickClearAll: () => void;
}

export interface TableFilterProps<TData = TableGenericDataType> {
  isLoading?: boolean;
  filterClassName?: string;
  filterOptionClassName?: string;
  columnFilter: TableFilterStateType[];
  headerGroups: Array<HeaderGroup<TData>>;
  isShowClearAll: boolean;
  onChangeFilter?: (filter: TableFilterStateType[]) => void;
}

const TableFilter = ({
  isLoading,
  filterClassName,
  filterOptionClassName,
  columnFilter,
  headerGroups,
  isShowClearAll,
  onChangeFilter,
}: TableFilterProps) => {
  const { t } = useTranslation();

  const [isReady, setIsReady] = useState(false);
  const [filterParam, setFilterParam] = useWatchParam("filter");
  const tableFilterRef = useRef<MutableRefObject<TableRefType | null>[]>([]);

  const isReadyRef = useRef<boolean>(false);

  const filterHeaders = useMemo(() => {
    return headerGroups[0].headers.filter(
      ({
        column: {
          columnDef: { meta },
        },
      }) => {
        if (!meta) {
          return false;
        }

        const { getFilterOptions, filterType, filterDependOn } = meta;

        if (!getFilterOptions && !filterType) {
          return false;
        }

        if (filterDependOn) {
          const [dependOn, ...dependValues] = filterDependOn;
          const columnFilterValues =
            columnFilter.find((item) => item.filterBy.includes(dependOn))?.values ?? [];
          return columnFilterValues.some((value) => dependValues.includes(value));
        }

        return true;
      },
    );
  }, [columnFilter, headerGroups]);

  const defaultFilter = useMemo<TableFilterStateType[] | null>(() => {
    if (!filterParam) {
      return null;
    }

    const decoded = decodeURIComponent(filterParam);

    const filterStrings = decoded.split(";");
    const filters: TableFilterStateType[] = filterStrings.map((filterString) => {
      const [filterBy, value] = filterString.split("=");
      return { filterBy, values: value.split(",").map((item) => item.replace(/\+/g, " ")) };
    });

    return filters;
  }, [filterParam]);

  const syncFilter = useCallback(
    (state: TableFilterStateType[]) => {
      const tmpSearchParams = new URLSearchParams();

      state.forEach((filter) => {
        const { filterBy, values } = filter;

        if (values?.length) {
          tmpSearchParams.set(filterBy, values.join(","));
        }
      });

      const searchParamsString = tmpSearchParams.toString().replace(/&/g, ";");

      setFilterParam(searchParamsString);
    },
    [setFilterParam],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeFilterDebounce = useCallback(
    debounce(onChangeFilter as OnChangeFn<TableFilterStateType[]>, DEFAULT_API_DEBOUNCE_TIME),
    [],
  );

  const handleChangeFilter = useCallback(
    (key: string | string[], values: Array<string | Date | number>) => {
      onChangeFilterDebounce?.((prev) => {
        const newColumnFilter = prev.filter((item) => {
          if (isArray(key)) {
            return !key.includes(item.filterBy);
          }

          return item.filterBy !== key;
        });

        if (values.length) {
          if (isArray(key)) {
            values.forEach((value, index) => newColumnFilter.push({ filterBy: key[index], values: [value] }));
          } else {
            newColumnFilter.push({ filterBy: key, values });
          }
        }

        if (isReadyRef.current) {
          syncFilter(newColumnFilter);
        }

        return newColumnFilter;
      });
    },
    [onChangeFilterDebounce, syncFilter],
  );

  tableFilterRef.current = filterHeaders.map((_, index) => tableFilterRef.current[index] ?? createRef());

  const handleClickClearAll = useCallback(() => {
    if (isEmpty(columnFilter)) {
      return;
    }

    tableFilterRef.current.forEach((ref) => ref.current?.onClickClearAll());

    onChangeFilter?.([]);
    setFilterParam("");
  }, [columnFilter, onChangeFilter, setFilterParam]);

  useEffect(() => {
    if (isReadyRef.current) {
      return;
    }

    if (defaultFilter) {
      onChangeFilterDebounce?.(defaultFilter);
    }

    setIsReady(true);
    isReadyRef.current = true;
  }, [defaultFilter, onChangeFilterDebounce]);

  // if (!isReady || (isReady && isLoading)) {
  //   return (
  //     <div
  //       className={twMerge(
  //         "grid grid-cols-1 gap-2 rounded-lg border bg-white py-4 shadow-lg",
  //         filterClassName,
  //       )}
  //     >
  //       {filterHeaders.map((header) => (
  //         <TableFilterSkeleton key={header.id} header={header} className={filterOptionClassName} />
  //       ))}
  //       {isShowClearAll && (
  //         <div className="mt-3 border-t px-4 font-semibold duration-100 hover:text-slate-500">
  //           <LoadingSkeleton className="mt-3 h-6 w-24" />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div
      className={twMerge("grid grid-cols-1 gap-2 rounded-lg border bg-white py-4 shadow-lg", filterClassName)}
    >
      {filterHeaders.map((header, index) => (
        <TableFilterOtion
          key={header.id}
          className={twMerge("hidden md:block", filterOptionClassName)}
          header={header}
          onChangeFilters={handleChangeFilter}
          ref={tableFilterRef.current[index]}
        />
      ))}
      {isShowClearAll && (
        <div className="mt-3 border-t px-4 font-semibold duration-100 hover:text-slate-500">
          <div role="button" tabIndex={0} onClick={handleClickClearAll} className="mt-3 w-fit">
            {t("clearAll")}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;
