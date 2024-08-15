import { TRENDING_API_PATH } from "@constants/apiConstant";

import { MotionPictureCategoryEnum, TrendingTimeEnum } from "@enums/movieEnum";
import { BaseListQueryType, MovieDataType, ResponseDataType, TVShowDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const getTrendings = async (
  mediaType: MotionPictureCategoryEnum,
  params?: BaseListQueryType,
): Promise<ResponseDataType<MovieDataType[] | TVShowDataType[]>> => {
  const response = await axiosInstance.get(TRENDING_API_PATH.TREDNING(mediaType, TrendingTimeEnum.DAY), {
    params,
  });
  return {
    data: response.data.results,
    meta: {
      totalResults: response.data.total_results,
    },
  };
};

export { getTrendings };
