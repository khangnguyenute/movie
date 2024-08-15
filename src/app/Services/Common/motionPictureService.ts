import { MOTION_PICTURE_API_PATH } from "@constants/apiConstant";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import {
  BaseListQueryType,
  MotionPictureCreditDataType,
  MotionPictureImageDataType,
  MovieDataType,
  ResponseDataType,
  ReviewDataType,
  TVShowDataType,
} from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const getMotionPictures = async (
  category: MotionPictureCategoryEnum,
  motionPictureParam?: Record<string, unknown>,
  params?: BaseListQueryType,
): Promise<ResponseDataType<MovieDataType[] | TVShowDataType[]>> => {
  const formatMotionPictureParam = Object.entries(motionPictureParam ?? {}).map(([key, values]) => {
    return {
      filterBy: key,
      values: [values],
    };
  });

  const response = await axiosInstance.get(MOTION_PICTURE_API_PATH.DISCOVER(category), {
    params: {
      ...params,
      filterParams: [
        ...(params?.filterParams ?? []),
        ...formatMotionPictureParam,
        {
          filterBy: "sort_by",
          values: [
            params?.filterParams?.find((item) => item.filterBy === "sort_by")?.values[0] ??
              motionPictureParam?.sort_by ??
              "popularity.desc",
          ],
        },
      ],
    },
  });

  return {
    data: response.data.results,
    meta: {
      totalResults: response.data.total_results,
    },
  };
};

const getMotionPictureById = async (
  category: MotionPictureCategoryEnum,
  id: number,
): Promise<MovieDataType | TVShowDataType> => {
  const response = await axiosInstance.get(MOTION_PICTURE_API_PATH.MOTION_PICTURE_DETAIL(category, id), {
    params: {
      append_to_response: "credits,keywords,similar,images,videos,reviews,external_ids,recommendations",
    },
  });
  return response.data;
};

const getCreditsByMotionPictureId = async (
  category: MotionPictureCategoryEnum,
  id: number,
): Promise<MotionPictureCreditDataType> => {
  const response = await axiosInstance.get(MOTION_PICTURE_API_PATH.MOTION_PICTURE_CAST(category, id));
  return response.data;
};

const getMediaByMotionPictureId = async (
  category: MotionPictureCategoryEnum,
  id: number,
): Promise<MotionPictureImageDataType> => {
  const response = await axiosInstance.get(MOTION_PICTURE_API_PATH.MOTION_PICTURE_MEDIA(category, id));
  return response.data;
};

const getReviewsByMotionPictureId = async (
  category: MotionPictureCategoryEnum,
  id: number,
): Promise<ResponseDataType<ReviewDataType[]>> => {
  const response = await axiosInstance.get(MOTION_PICTURE_API_PATH.MOTION_PICTURE_REVIEW(category, id));
  return {
    data: response.data.results,
    meta: {
      totalResults: response.data.total_results,
    },
  };
};

export {
  getCreditsByMotionPictureId,
  getMediaByMotionPictureId,
  getMotionPictureById,
  getMotionPictures,
  getReviewsByMotionPictureId,
};
