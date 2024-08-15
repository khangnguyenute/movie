import { MediaEnum } from "@enums/commonEnum";
import { MotionPictureCategoryEnum, SearchEnum } from "@enums/movieEnum";

export const AUTH_PATH = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  RESET_PASSWORD: "/auth/reset-password",
};

export const MY_PATH = {
  HOME: "/",
  MOVIE_TAB: (tab: string) => `/movie/${tab}`,
};

export const HOME_PATH = {
  ABOUT: "/about",
  BLOGS: "/blogs",
  PARTNERS: "/partners",
  CONTACT: "/contact",
  COMPANY: "/company",
  FEATURES: "/features",
  GETTING_STARTED: "/getting-started",
  DOCUMENTATION: "/documentations",
  GUIDE: "/guides",
  FAQ: "/faqs",
  TERM: "/terms",
  NOTICE: "/notices",
  CLAIM: "/claims",
  NOT_FOUND: "/*",
};

export const MOTION_PICTURE_LIST_PATH = {
  MOTION_PICTURE_LIST: (category: MotionPictureCategoryEnum) => `/${category}`,
  MOTION_PICTURE_DETAIL: (category: MotionPictureCategoryEnum, id: number) => `/${category}/detail/${id}`,
  MOTION_PICTURE_CAST: (category: MotionPictureCategoryEnum, id: number) =>
    `/${category}/detail/${id}/credit`,
  MOTION_PICTURE_MEDIA: (category: MotionPictureCategoryEnum, id: number, type: MediaEnum) =>
    `/${category}/detail/${id}/${type}`,
  MOTION_PICTURE_REVIEW: (category: MotionPictureCategoryEnum, id: number) =>
    `/${category}/detail/${id}/review`,
};

export const GENRE_PATH = {
  MOTION_PICTURE: (id: number, name: string, category: MotionPictureCategoryEnum) =>
    `/genre/${id}-${name}/${category}`,
};

export const KEYWORD_PATH = {
  MOTION_PICTURE: (id: number, name: string, category: MotionPictureCategoryEnum) =>
    `/keyword/${id}-${name}/${category}`,
};

export const SEARCH_PATH = {
  SEARCH: (category: SearchEnum) => `/search/${category}`,
};

export const PERSON_PATH = {
  PERSON_LIST: "/person",
  PERSON_DETAIL: (id: number) => `/person/${id}`,
};

export const COLLECTION_PATH = {
  COLLECTION_DETAIL: (id: number) => `/collection/${id}`,
};
