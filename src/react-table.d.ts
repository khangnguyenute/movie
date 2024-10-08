/// <reference types="@tanstack/table-core" />

import { TableFilterTypeEnum } from "./common";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterBy?: string | string[]; // filterBy: "group.name", "groupName", ... Base on the data structure.
    filterLabel?: string; // Label for the filter. Show on top of the table.
    filterValueBy?: string; // Key to get the value from the data object. Default is the same as filterBy.
    filterType?: TableFilterTypeEnum;
    filterDependOn?: [string, ...unknown];
    defaultValue?: string[];
    isSingleSelection?: boolean;
    skeleton?: JSX.Element;
    filterOptionLabelFactory?: (option: never) => string;
    getFilterOptions?: (
      params?: BaseListQueryType,
    ) => Promise<ResponseDataType<unknown[]> | unknown[]> | unknown[];
    isHiddenColumn?: boolean;
    isHiddenTableHeader?: boolean;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    bodySkeletonClassName?: string;
    onCustomChange?: (option: unknown) => void;
  }
}

export {};
