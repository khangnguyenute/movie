import _ from "lodash";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { TableFilterOptionItemType } from "../interface";
import TableFilterOptionCheckboxItem from "./TableFilterOptionCheckboxItem";
import TableFilterSkeleton from "./TableFilterSkeleton";

export interface TableFilterOptionCheckboxProps {
  filterOptions: TableFilterOptionItemType[];
  isSingleSelection?: boolean;
  isLoading?: boolean;
  selectedFilters: string[];
  onChangeFilters: (selectedItems: string[]) => void;
}

const TableFilterOptionCheckbox = ({
  isSingleSelection = false,
  isLoading,
  filterOptions,
  selectedFilters,
  onChangeFilters,
}: TableFilterOptionCheckboxProps) => {
  const { t } = useTranslation(["campany"]);

  const handleGetNewSelectedFilter = useCallback(
    (value: string, checked: boolean, customValue?: string) => {
      if (isSingleSelection) {
        return [customValue || value];
      }
      const newSelectedFilters = [...selectedFilters];
      if (checked) {
        newSelectedFilters.push(customValue || value);
      } else {
        const index = newSelectedFilters.indexOf(value);
        if (index > -1) {
          newSelectedFilters.splice(index, 1);
        }
      }
      return _.uniq(newSelectedFilters);
    },
    [isSingleSelection, selectedFilters],
  );

  const handleChangeSelectedFilter = useCallback(
    (value: string, checked: boolean) => {
      const newSelectedFilters = handleGetNewSelectedFilter(value, checked);

      onChangeFilters?.(newSelectedFilters);
    },
    [handleGetNewSelectedFilter, onChangeFilters],
  );

  return (
    <div className="flex flex-wrap gap-2">
      {isLoading && <TableFilterSkeleton />}
      {!isLoading && !filterOptions.length && <div>{t("nothingHere")}</div>}
      {!isLoading &&
        !!filterOptions.length &&
        filterOptions?.map((option) => (
          <TableFilterOptionCheckboxItem
            key={option.id || option.code || option.uuid}
            option={option}
            selectedFilters={selectedFilters}
            onChange={handleChangeSelectedFilter}
          />
        ))}
    </div>
  );
};

export default memo(TableFilterOptionCheckbox);
