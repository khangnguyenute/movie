import { DEFAULT_PAGE_SIZE } from "@constants/commonConstant";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { first, isEmpty } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import useWatchParam from "@hooks/useWatchParam";
import { TableFilterStateType } from "@interfaces/Common";
import { normalizeTableColumns } from "@utils/Helpers";

import { TablePaginationType, TableProps } from "./interface";
import TableFilter from "./TableFilter/TableFilter";
import TableFooter from "./TableFooter/TableFooter";

interface PaginationRefType {
  onChangePageIndex: (Page: number) => void;
}

const Table = ({
  columns,
  columnVisibility,
  children,
  data,
  footerClassName,
  filterClassName,
  filterOptionClassName,
  isLoading = false,
  isShowFooter = true,
  isShowFilter,
  isShowClearAll = true,
  totalRows = 0,
  pageSizes,
  position,
  onChangeState,
}: TableProps) => {
  const paginationRef = useRef<PaginationRefType | null>(null);

  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState<TablePaginationType>({
    pageIndex: 0,
    pageSize: first(pageSizes) ?? DEFAULT_PAGE_SIZE,
  });
  const [columnFilter, setColumnFilter] = useState<TableFilterStateType[]>([]);
  const [filterParam] = useWatchParam("filter");

  const table = useReactTable({
    columns: normalizeTableColumns(columns),
    data,
    manualSorting: true,
    manualPagination: true,
    state: {
      pagination,
      columnVisibility,
    },
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
  });

  const tableFilterGroup = useMemo(() => table.getHeaderGroups(), [table]);

  const handleChangePageIndex = useCallback((page: number) => {
    paginationRef.current?.onChangePageIndex(page);
  }, []);

  const handleChangeFilter = useCallback(
    (filter: TableFilterStateType[]) => {
      setColumnFilter?.(filter);
      handleChangePageIndex?.(0);
    },
    [handleChangePageIndex],
  );

  useEffect(() => {
    const paginationOptions = pagination;
    const newTotalPages = Math.ceil(totalRows / paginationOptions.pageSize) || 1;

    setTotalPages(newTotalPages);
  }, [pagination, totalRows]);

  useEffect(() => {
    if (filterParam && isEmpty(columnFilter)) {
      return;
    }

    onChangeState?.({
      filterParams: columnFilter,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  }, [pagination, columnFilter, filterParam, onChangeState]);

  return (
    <div>
      <div className={twMerge("flex gap-6", position === "top" && "flex-col")}>
        {isShowFilter !== false && (
          <div className={twMerge(position === "left" && "w-1/5 flex-none")}>
            <TableFilter
              isLoading={isLoading}
              filterClassName={filterClassName}
              filterOptionClassName={filterOptionClassName}
              columnFilter={columnFilter}
              headerGroups={tableFilterGroup}
              isShowClearAll={isShowClearAll}
              onChangeFilter={handleChangeFilter}
            />
          </div>
        )}
        <div className="flex min-h-fit-layout w-full flex-col justify-between">
          {children}
          {isShowFooter && (
            <TableFooter
              ref={paginationRef}
              dataLength={data.length}
              className={footerClassName}
              isLoading={isLoading}
              totalRows={totalRows ?? 0}
              totalPages={totalPages}
              pageIndex={table.getState().pagination.pageIndex}
              pageSize={table.getState().pagination.pageSize}
              onChangePageIndex={table.setPageIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
