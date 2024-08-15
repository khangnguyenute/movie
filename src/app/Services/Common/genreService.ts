import { GENRE_API_PATH } from "@constants/apiConstant";

import { GenreDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

import { MotionPictureCategoryEnum } from "../../Enums/movieEnum";

const getGenres = async (category: MotionPictureCategoryEnum): Promise<GenreDataType[]> => {
  const response = await axiosInstance.get(GENRE_API_PATH.GENRE(category));
  return response.data.genres;
};

const getMovieGenres = async (): Promise<GenreDataType[]> => {
  const response = await getGenres(MotionPictureCategoryEnum.MOVIE);
  return response;
};

const getTVShowGenres = async (): Promise<GenreDataType[]> => {
  const response = await getGenres(MotionPictureCategoryEnum.TV);
  return response;
};

export { getGenres, getMovieGenres, getTVShowGenres };
