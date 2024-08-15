import { SEARCH_API_PATH } from "@constants/apiConstant";

import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

import { SearchEnum } from "../../Enums/movieEnum";

const getSearchData = async (
  category: SearchEnum,
  query: string,
  params?: BaseListQueryType,
): Promise<ResponseDataType<unknown[]>> => {
  const response = await axiosInstance.get(SEARCH_API_PATH.SEARCH(category), {
    params: { ...params, query },
  });

  return {
    data: response.data.results,
    meta: {
      totalResults: response.data.total_results,
    },
  };
};

export { getSearchData };
