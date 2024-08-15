import { ColumnDef } from "@tanstack/react-table";
import { omit } from "lodash";
import { memo, useMemo } from "react";

import { Table, TableProps } from "@common/Components";

export interface SearchTableProps extends Omit<TableProps, "columns"> {
  data: unknown[];
  isLoading?: boolean;
}

const SearchTable = ({ data, isLoading, children, ...props }: SearchTableProps) => {
  const columns: Array<ColumnDef<unknown, string>> = useMemo(() => [], []);

  return (
    <Table
      data={data}
      columns={columns as Array<ColumnDef<unknown>>}
      isLoading={isLoading}
      isShowFilter={false}
      {...omit(props, "columns")}
    >
      {children}
    </Table>
  );
};

export default memo(SearchTable);
