import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { TableFilterOptionItemType } from "../interface";

interface TableFilterOptionCheckboxItemProps {
  option: TableFilterOptionItemType;
  selectedFilters: string[];
  onChange: (value: string, checked: boolean) => void;
}

const TableFilterOptionCheckboxItem = ({
  option,
  selectedFilters,
  onChange,
}: TableFilterOptionCheckboxItemProps) => {
  const value = useMemo(() => option.value, [option]);
  const id = useMemo(() => option.id, [option]);

  const handleChangeCheckbox = useCallback(() => {
    onChange(value, !selectedFilters.includes(value));
  }, [onChange, selectedFilters, value]);

  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      onClick={handleChangeCheckbox}
      className={twMerge(
        "text-slte-700 rounded-lg border px-2 duration-300",
        selectedFilters.includes(value) &&
          "bg-gradient-to-r from-tertiary/40 to-secondary/40 hover:from-tertiary/80 hover:to-secondary/80",
      )}
    >
      {option.label}
    </div>
  );
};

export default memo(TableFilterOptionCheckboxItem);
