import { AxiosError, AxiosResponse } from "axios";
import { Key } from "react";
import { AnySchema } from "yup";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableGenericDataType = any;

export interface TableFilterStateType {
  filterBy: string;
  values: Array<string | number | Date>;
}

export interface BaseListQueryType extends Record<string, unknown> {
  pageIndex?: number;
  pageSize?: number;
  filterParams?: TableFilterStateType[];
}

export interface ResponseMetaType {
  totalPages?: number;
  totalResults: number;
}

export interface ResponseDataType<T = unknown> extends Partial<AxiosResponse> {
  data: T;
  meta: ResponseMetaType;
}

export interface AxiosErrorResponseMessageType {
  [key: string]: string[];
}

export interface AxiosErrorResponseType {
  statusCode: number;
  message: string;
  data: {
    errors: AxiosErrorResponseMessageType;
  };
  code: string;
}

export type AxiosErrorType = AxiosError<AxiosErrorResponseType>;

export interface AxiosResponseType<T> extends AxiosResponse {
  statusCode: number;
  message: string;
  meta: ResponseMetaType;
  data: {
    data: T;
  };
}

export type ServiceGetManyFunctionType<T> = (query?: BaseListQueryType) => Promise<ResponseDataType<T[]>>;
export type ServiceGetAllFunctionType<T> = (query?: BaseListQueryType) => Promise<T[]>;
export type ServiceAddFunctionType<T> = (data: T) => Promise<unknown>;
export type ServiceUpdateFunctionType<T> = (id: Key, data: T) => Promise<unknown>;
export type ServiceDeleteFunctionType = (id: Key) => Promise<unknown>;

export type TableOnclickFunctionType = (id: Key) => void;

export interface ImageDataType {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface VideoDataType {
  iso_639_1: string | null;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
}

export interface CommonDataType {
  id: number;
  name: string;
}

export interface SelectOptionType {
  value?: string | number;
  label?: string;
}

export type FormValidationSchemaShapeType<T> = {
  [P in keyof T]: AnySchema;
};

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface BaseDataType {
  update_at?: Date;
  created_at?: Date;
}

export type RequestListFunction<T> = (query?: BaseListQueryType) => Promise<ResponseDataType<T[]>>;
export type RequestAddFunction<T, R = unknown> = (data: T) => Promise<R>;
export type RequestUpdateFunction<T, R = unknown> = (id: Key, data: T) => Promise<R>;
export type RequestDeleteFunction = (id: Key) => Promise<void> | Promise<unknown>;
export type PromiseVoidFunction = () => Promise<void>;

// Convert all props from T to optional: never
export type CloneElementProps<T> = { [P in keyof T]?: never };

export type AlertType = "default" | "success" | "warning" | "error";
export type TableRowActionStatusType = "normal" | "danger" | "success";
