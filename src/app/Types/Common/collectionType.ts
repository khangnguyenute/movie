import { BaseDataType, Nullable } from "./commonType";
import { MovieDataType, TVShowDataType } from "./movieType";

export interface CollectionDataType extends BaseDataType {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Array<MovieDataType | TVShowDataType>;
}

export interface CollectionFormDataType extends Nullable<Partial<CollectionDataType>> {}
