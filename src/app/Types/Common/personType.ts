// eslint-disable-next-line import/no-cycle
import { MovieDataType, TVShowDataType } from "./movieType";

export interface PersonDataType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for: Array<MovieDataType | TVShowDataType>;
  known_for_department: string;
  name: string;
  original_name?: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  combined_credits: {
    cast: CastOfMotionPictureDataType[];
    crew: CrewOfMotionPictureDataType[];
  };
}

export interface CastOfMotionPictureDataType extends MovieDataType, TVShowDataType {
  credit_id: string;
  character: string;
  episode_count: number;
  year: number;
}

export interface CrewOfMotionPictureDataType extends MovieDataType, TVShowDataType {
  credit_id: string;
  department: string;
  job: string;
  year: number;
}
