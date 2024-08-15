import { Header, flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import _, { get, isFunction } from "lodash";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { Select } from "@components/Form";
import useTableFilterParam from "@hooks/useTableFilter";
import { BaseListQueryType, TableGenericDataType } from "@interfaces/Common";

import { TableFilterOptionItemType, TableFilterTypeEnum } from "../interface";
import TableFilterOptionCheckbox from "./TableFilterOptionCheckbox";

export interface TableFilterOptionProps {
  header: Header<TableGenericDataType, unknown>;
  className?: string;
  onChangeFilters?: (filterBy: string | string[], selectedItems: string[] | Date[]) => void;
}

interface TableFilterOptionParamType extends BaseListQueryType {
  filterBy: string;
}

const TableFilterOption = (
  { header, className, onChangeFilters }: TableFilterOptionProps,
  ref: ForwardedRef<unknown>,
) => {
  const { t } = useTranslation();

  const headerColumnDef = header.column.columnDef;

  const label = useMemo(
    () => headerColumnDef.meta?.filterLabel ?? flexRender(headerColumnDef.header, header.getContext()),
    [header, headerColumnDef.header, headerColumnDef.meta?.filterLabel],
  );

  const filterBy = useMemo(() => {
    const originalFilterBy = headerColumnDef.meta?.filterBy ?? headerColumnDef.id;
    return (Array.isArray(originalFilterBy) ? _.first(originalFilterBy) : originalFilterBy) ?? "";
  }, [headerColumnDef]);

  const [searchValueParam] = useTableFilterParam(filterBy, headerColumnDef.meta?.filterType);

  const isFirstRenderRef = useRef(true);
  const filterOptionLabelFactory = useMemo(
    () => headerColumnDef.meta?.filterOptionLabelFactory ?? ((option: never) => `${option}`),
    [headerColumnDef.meta?.filterOptionLabelFactory],
  );

  const filterValueBy = useMemo(
    () => headerColumnDef.meta?.filterValueBy ?? filterBy,
    [filterBy, headerColumnDef.meta?.filterValueBy],
  );

  const [filterOptions, setFilterOptions] = useState<TableFilterOptionItemType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Array<string | Date>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<TableFilterOptionParamType>({
    filterBy,
    filterValue: "",
  });

  const filterType = useMemo(() => headerColumnDef.meta?.filterType, [headerColumnDef]);

  // const rawGetFilterOptions = useMemo(() => headerColumnDef.meta?.getFilterOptions, [headerColumnDef]);

  const formatFilterOptions = useCallback(
    (options: Record<string, string>[]): TableFilterOptionItemType[] => {
      return options
        .map((option) => {
          let filterValue = "";
          const result = {
            id: option.id || option.uuid || option.value || option.name || option.label || option,
            label: "",
            value: "",
          };

          filterValue = _.get(option, filterValueBy);

          if (filterValue === undefined || filterValue === null) {
            return null;
          }

          result.value = filterValue;
          result.label = filterOptionLabelFactory(option as never);

          return result;
        })
        .filter(Boolean) as TableFilterOptionItemType[];
    },
    [filterOptionLabelFactory, filterValueBy],
  );

  const getFilterOptions = useCallback(
    async (query?: TableFilterOptionParamType) => {
      if (headerColumnDef.meta?.filterType === TableFilterTypeEnum.DATE_RANGE) {
        return;
      }

      setIsLoading(true);

      try {
        const options = await headerColumnDef.meta?.getFilterOptions?.(query);

        if (!options) {
          return;
        }

        if ("data" in options) {
          setFilterOptions(formatFilterOptions(options.data as Record<string, string>[]));
          return;
        }

        if (Array.isArray(options)) {
          setFilterOptions(formatFilterOptions(options as Record<string, string>[]));
        }
      } catch (error) {
        setFilterOptions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [formatFilterOptions, headerColumnDef.meta],
  );

  const handleChangeFilters = useCallback(
    (filters: string[] | Date[] | Date) => {
      if (filters instanceof Date) {
        return;
      }

      setSelectedFilters(filters);

      if (isFunction(headerColumnDef.meta?.onCustomChange)) {
        headerColumnDef.meta?.onCustomChange(filters[0]);
        return;
      }

      if (filterType === TableFilterTypeEnum.DATE_RANGE) {
        onChangeFilters?.(
          [`${filterBy}.from`, `${filterBy}.to`],
          [dayjs(filters[0]).format(t("dateFormat")), dayjs(filters[1]).format(t("dateFormat"))],
        );
        return;
      }

      onChangeFilters?.(filterBy, filters);
    },
    [filterBy, filterType, headerColumnDef.meta, onChangeFilters, t],
  );

  const handleFormatValueSelect = useCallback((value: unknown) => [String(get(value, "value"))], []);

  const handleClickClearAll = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onClickClearAll: handleClickClearAll,
    }),
    [handleClickClearAll],
  );

  useEffect(() => {
    if (searchValueParam.length && filterOptions.length === 0) {
      getFilterOptions();
    }
  }, [filterOptions, filterOptions.length, getFilterOptions, searchValueParam]);

  useEffect(() => {
    const newQueryParams = {
      filterBy,
    };
    if (_.isEqual(newQueryParams, queryParams)) {
      return;
    }
    setQueryParams(newQueryParams);
    getFilterOptions(newQueryParams);
  }, [filterBy, getFilterOptions, queryParams]);

  useEffect(() => {
    if (!searchValueParam.length && !isFirstRenderRef.current && !headerColumnDef.meta?.defaultValue) {
      return;
    }

    isFirstRenderRef.current = false;
    setSelectedFilters(headerColumnDef.meta?.defaultValue ?? searchValueParam);
  }, [headerColumnDef.meta?.defaultValue, searchValueParam]);

  return (
    <div className={className}>
      <div className="line-clamp-1 font-semibold">{label}</div>
      {filterType === TableFilterTypeEnum.SELECT && (
        <Select
          className="w-full text-sm"
          name="sort_by"
          placeholder={label}
          options={filterOptions}
          value={selectedFilters[0]}
          onExternalChange={handleChangeFilters as (filters: unknown) => void}
          onFormatValueSelect={handleFormatValueSelect}
        />
      )}
      {filterType !== TableFilterTypeEnum.SELECT && (
        <TableFilterOptionCheckbox
          filterOptions={filterOptions}
          isSingleSelection={headerColumnDef.meta?.isSingleSelection}
          isLoading={isLoading}
          selectedFilters={selectedFilters as string[]}
          onChangeFilters={handleChangeFilters}
        />
      )}
    </div>
  );
};

export default forwardRef(TableFilterOption);
