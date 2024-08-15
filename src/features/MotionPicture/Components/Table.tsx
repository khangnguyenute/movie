import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { get, lowerCase, omit, snakeCase } from "lodash";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Table, TableFilterTypeEnum, TableProps } from "@common/Components";
import { MotionPictureCategoryEnum, SortEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { genreService } from "@services/index";

export interface MotionPictureTableProps extends Omit<TableProps, "columns"> {
  data: MovieDataType[] | TVShowDataType[];
  onChangeCategory?: (option: unknown) => void;
}

const MotionPictureTable = ({
  data,
  children,
  columnVisibility,
  position = "left",
  onChangeCategory,
  ...props
}: MotionPictureTableProps) => {
  const { t } = useTranslation();
  const { category } = useParams();

  const getSortValue = useCallback(() => {
    return Object.entries(SortEnum).map(([key, value]) => ({
      value,
      label: t(snakeCase(lowerCase(key))),
    }));
  }, [t]);

  const getCategoryValue = useCallback(() => {
    return Object.entries(MotionPictureCategoryEnum).map(([key, value]) => ({
      value,
      label: t(lowerCase(key)),
    }));
  }, [t]);

  const getGenres = useCallback(() => {
    return genreService.getGenres(category as MotionPictureCategoryEnum);
  }, [category]);

  const columnHelper = useMemo(() => createColumnHelper<MovieDataType | TVShowDataType>(), []);

  const columns: Array<ColumnDef<MovieDataType | TVShowDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.id), {
        id: "id",
        header: t("id"),
      }),
      columnHelper.display({
        id: "category",
        header: t("category"),
        meta: {
          filterValueBy: "value",
          filterType: TableFilterTypeEnum.SELECT,
          defaultValue: [category ?? ""],
          onCustomChange: onChangeCategory,
          getFilterOptions: getCategoryValue,
          filterOptionLabelFactory: (option) => get(option, "label"),
        },
      }),
      columnHelper.display({
        id: "sort_by",
        header: t("sort"),
        meta: {
          filterBy: "sort_by",
          filterValueBy: "value",
          filterLabel: t("sort"),
          isSingleSelection: true,
          filterType: TableFilterTypeEnum.SELECT,
          getFilterOptions: getSortValue,
          filterOptionLabelFactory: (option) => get(option, "label"),
        },
      }),
      columnHelper.display({
        id: "with_genres",
        header: t("genres"),
        meta: {
          filterBy: "with_genres",
          filterValueBy: "id",
          filterLabel: t("genres"),
          getFilterOptions: getGenres,
          filterOptionLabelFactory: (option) => get(option, "name"),
        },
      }),
    ],
    [category, columnHelper, getCategoryValue, getGenres, getSortValue, onChangeCategory, t],
  );

  return (
    <Table
      data={data}
      columns={columns as Array<ColumnDef<MovieDataType>>}
      columnVisibility={columnVisibility}
      position={position}
      filterClassName={twMerge(position !== "left" && "flex items-center")}
      filterOptionClassName={twMerge(
        position === "left" ? "px-4 md:flex flex-col gap-2" : "md:flex gap-4 items-center px-4",
      )}
      {...omit(props, "columns")}
    >
      {children}
    </Table>
  );
};

export default MotionPictureTable;
