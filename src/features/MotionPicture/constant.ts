import dayjs from "dayjs";

import { MovieEnum, TVShowEnum } from "@enums/movieEnum";

const keywordParam = (id: number) => {
  return { with_keywords: id };
};

const genreParam = (id: number) => {
  return { with_genres: id };
};

const movieParam = (type: MovieEnum) => {
  switch (type) {
    case MovieEnum.POPULAR:
      return { sort_by: "popularity.desc" };
    case MovieEnum.TOP_RATED:
      return {
        sort_by: "vote_average.desc",
        without_genres: "99,10755",
        "vote_count.gte": 200,
      };
    default:
      return {
        sort_by: "popularity.desc",
        with_release_type: "2|3",
        "release_date.gte": dayjs().add(1, "day"),
      };
  }
};

const tvShowParam = (type: TVShowEnum) => {
  switch (type) {
    case TVShowEnum.POPULAR:
      return { sort_by: "popularity.desc" };
    case TVShowEnum.TOP_RATED:
      return {
        sort_by: "vote_average.desc",
        "vote_count.gte": 200,
      };
    default:
      return {
        sort_by: "popularity.desc",
        "air_date.gte": dayjs(),
        "air_date.lte": dayjs(),
      };
  }
};

export { genreParam, keywordParam, movieParam, tvShowParam };
