import { ColumnDef } from "@tanstack/react-table";
import { omit } from "lodash";
import { memo, useMemo } from "react";

import { Table, TableProps } from "@common/Components";
import { PersonDataType } from "@interfaces/Common";

export interface PersonTableProps extends Omit<TableProps, "columns"> {
  data: PersonDataType[];
  isLoading?: boolean;
}

const PersonTable = ({ data, isLoading, children, ...props }: PersonTableProps) => {
  const columns: Array<ColumnDef<PersonDataType, string>> = useMemo(() => [], []);

  return (
    <Table
      data={data}
      columns={columns as Array<ColumnDef<PersonDataType>>}
      isLoading={isLoading}
      isShowFilter={false}
      {...omit(props, "columns")}
    >
      {children}
    </Table>
  );
};

export default memo(PersonTable);
