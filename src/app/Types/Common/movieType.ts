import { MotionPictureCategoryEnum } from "@enums/movieEnum";

import { CommonDataType, ImageDataType, VideoDataType } from "./commonType";
import { CompanyDataType } from "./companyType";
import { CountryDataType, LanguageDataType } from "./configurationType";
import { GenreDataType } from "./genreType";
// eslint-disable-next-line import/no-cycle
import { PersonDataType } from "./personType";

export interface SocialDataType {
  id: 1011985;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface NetworkDataType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  headquarters: string;
  homepage: string;
}

export interface ReviewDataType {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface CastDataType extends PersonDataType {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewDataType extends PersonDataType {
  department: string;
  job: string;
}

export interface MotionPictureImageDataType {
  backdrops: ImageDataType[];
  logos: ImageDataType[];
  posters: ImageDataType[];
}

export interface MotionPictureCreditDataType {
  cast: CastDataType[];
  crew: CrewDataType[];
}

export interface MotionPictureDataType {
  adult: boolean;
  backdrop_path: string;
  genres: GenreDataType[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: CompanyDataType[];
  production_countries: CountryDataType[];
  spoken_languages: LanguageDataType[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  credits: MotionPictureCreditDataType;
  keywords: {
    keywords?: CommonDataType[];
    results?: CommonDataType[];
  };
  similar: {
    results: MovieDataType[] | TVShowDataType[];
  };
  recommendations: {
    results: MovieDataType[] | TVShowDataType[];
  };
  images: MotionPictureImageDataType;
  videos: {
    results: VideoDataType[];
  };
  reviews: {
    results: ReviewDataType[];
  };
  external_ids: SocialDataType;
  media_type?: MotionPictureCategoryEnum;
}

export interface MovieDataType extends MotionPictureDataType {
  title: string;
  original_title: string;
  belongs_to_collection: MovieDataType[] | null;
  budget: number;
  imdb_id: string;
  original_language: string;
  release_date: string;
  revenue: number;
  runtime: number;
  video: boolean;
}

export interface TVShowDataType extends MotionPictureDataType {
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  networks: NetworkDataType[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  type: string;
}
