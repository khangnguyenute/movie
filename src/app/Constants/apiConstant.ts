import { MotionPictureCategoryEnum, SearchEnum } from "@enums/movieEnum";

export const LANGUAGE_API_PATH = {
  LANGUAGES: "configuration/languages",
};

export const AUTH_API_PATH = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: "/auth/refresh-token",
  ME: "/auth/me",
  LOGOUT: "/auth/logout",
};

export const COMMON_API_PATH = {
  UPLOAD_IMAGE: "v1/upload",
};

export const PERSON_API_PATH = {
  PERSON_LIST: "person/popular",
  PERSON_DETAIL: (id: number) => `person/${id}`,
};

export const TRENDING_API_PATH = {
  TREDNING: (category: MotionPictureCategoryEnum, timeWindow: string) => `trending/${category}/${timeWindow}`,
};

export const SEARCH_API_PATH = {
  SEARCH: (category: SearchEnum) => `search/${category}`,
};

export const MOTION_PICTURE_API_PATH = {
  DISCOVER: (category: MotionPictureCategoryEnum) => `discover/${category}`,
  MOTION_PICTURE_DETAIL: (category: MotionPictureCategoryEnum, id: number) => `${category}/${id}`,
  MOTION_PICTURE_CAST: (category: MotionPictureCategoryEnum, id: number) => `${category}/${id}/credits`,
  MOTION_PICTURE_MEDIA: (category: MotionPictureCategoryEnum, id: number) => `${category}/${id}/images`,
  MOTION_PICTURE_REVIEW: (category: MotionPictureCategoryEnum, id: number) => `${category}/${id}/reviews`,
};

export const GENRE_API_PATH = {
  GENRE: (category: MotionPictureCategoryEnum) => `genre/${category}/list`,
};

export const COLLECTION_API_PATH = {
  COLLECTION_DETAIL: (id: number) => `collection/${id}`,
};
