import { BaseDataType, Nullable } from "./commonType";

export interface GenreDataType extends BaseDataType {
  id: number;
  name: string;
}

export interface GenraFormDataType extends Nullable<Partial<GenreDataType>> {}
