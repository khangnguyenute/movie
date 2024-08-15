import { PERSON_API_PATH } from "@constants/apiConstant";

import { BaseListQueryType, PersonDataType, ResponseDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const getPeople = async (params?: BaseListQueryType): Promise<ResponseDataType<PersonDataType[]>> => {
  const response = await axiosInstance.get(PERSON_API_PATH.PERSON_LIST, { params });
  return {
    data: response.data.results,
    meta: {
      totalResults: response.data.total_results,
    },
  };
};

const getPersonById = async (id: number): Promise<PersonDataType> => {
  const response = await axiosInstance.get(PERSON_API_PATH.PERSON_DETAIL(id), {
    params: {
      append_to_response: "combined_credits",
    },
  });
  return response.data;
};

export { getPeople, getPersonById };
