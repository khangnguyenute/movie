import { ColumnDef, PaginationState, TableState } from "@tanstack/react-table";
import { ReactElement } from "react";

import { BaseListQueryType, TableOnclickFunctionType } from "@interfaces/Common";

export enum TableFilterTypeEnum {
  DATE_RANGE = "date_range",
  ENUM = "enum",
  SELECT = "select",
  UNDEFINE = "undefine",
}

export interface TableProps<TData = TableDataGenericType> {
  columns: Array<ColumnDef<TData, unknown>>;
  columnVisibility?: TableState["columnVisibility"];
  children?: ReactElement;
  data: TData[];
  isLoading?: boolean;
  isShowFilter?: boolean;
  isShowFooter?: boolean;
  isShowClearAll?: boolean;
  position?: "top" | "left";
  filterClassName?: string;
  filterOptionClassName?: string;
  footerClassName?: string;
  totalRows?: number;
  pageSizes?: number[];
  onChangeState?: (state: BaseListQueryType) => void;
}

export type TableDataGenericType = any;

export interface TableFilterOptionItemType extends Record<string, string> {
  id: string;
  label: string;
  value: string;
}

export interface TablePaginationType extends Omit<PaginationState, "pageIndex" | "pageSize"> {
  pageIndex: number;
  pageSize: number;
  totalRows?: number;
  totalPages?: number;
}

export interface TableRowActionDropdownItemType extends Record<string, unknown> {
  key: string;
  label: string;
  icon?: JSX.Element;
  className?: string;
  isDisabled?: boolean;
  onClick: TableOnclickFunctionType;
}
