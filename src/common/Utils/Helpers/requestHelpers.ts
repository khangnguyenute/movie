import { get, isNaN, omit, set } from "lodash";

import { BaseListQueryType } from "@interfaces/Common";

import { snakelikeNestedObjectKeys } from "./commonHelpers";

const generateSearchQuery = (params: BaseListQueryType) => {
  const searchParams = new URLSearchParams();

  if (params.filterParams) {
    params.filterParams.forEach((filterParam) => {
      const { filterBy } = filterParam;
      const filterValue = filterParam.values.join(",");

      searchParams.append(`filter[${filterBy}]`, filterValue);
    });
    // eslint-disable-next-line no-param-reassign
    delete params.filterParams;
  }

  const snakedParams = snakelikeNestedObjectKeys(params);

  Object.keys(snakedParams).forEach((keyParam) => {
    const key = keyParam;
    const value = snakedParams[keyParam];

    if (value === undefined) {
      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      searchParams.append(key, String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, String(item));
      });
    }
  });

  return searchParams;
};

const normalizeQuery = (params: BaseListQueryType) => {
  const { filterParams = [] } = params;
  const normalizedFilterParams = filterParams?.reduce<Record<string, string | number>>(
    (acc, { filterBy, values }) => {
      let value: string | number = values.join(",");

      if (filterBy === "page_index") {
        return acc;
      }

      if (!isNaN(Number(value))) {
        value = Number(value);
      }

      const [field, range] = filterBy.split(".");

      if (range) {
        acc[`${field}.${range}`] = value;
      } else {
        acc[field] = value;
      }

      return acc;
    },
    {},
  );

  set(normalizedFilterParams, "page", get(params, "pageIndex", 0) + 1);

  return {
    ...normalizedFilterParams,
    ...omit(params, ["pageIndex", "pageSize", "filterParams"]),
  };
};

export { generateSearchQuery, normalizeQuery };
