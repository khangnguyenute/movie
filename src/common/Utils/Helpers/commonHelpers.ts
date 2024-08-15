/* eslint-disable import/no-extraneous-dependencies */
import { get, isArray, isObject, lowerCase, snakeCase } from "lodash";
import defaultConfig from "tailwindcss/defaultConfig";
import tailwindDefaultTheme from "tailwindcss/defaultTheme";
import resolveConfig from "tailwindcss/resolveConfig";
import { object } from "yup";

import { FormValidationSchemaShapeType, MovieDataType, TVShowDataType } from "@interfaces/Common";

const snakelikeNestedObjectKeys = (obj: Record<string, unknown>) => {
  const result: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const newKey = snakeCase(key);
    const value = obj[key];

    if (isObject(value) && !isArray(value)) {
      result[newKey as string] = snakelikeNestedObjectKeys(value as Record<string, unknown>);
      return;
    }

    result[newKey] = value;
  });

  return result;
};

const generateFormSchema = <T>(shape: FormValidationSchemaShapeType<T>) =>
  object().shape<FormValidationSchemaShapeType<T>>(shape);

const getTwScreenWidth = (size: keyof typeof tailwindDefaultTheme.screens) => {
  return Number(tailwindDefaultTheme.screens[size].replace("px", ""));
};

const getTwThemeConfig = (path?: string) => {
  const config = resolveConfig(defaultConfig);

  if (!path) {
    return config.theme;
  }

  const value = get(config.theme, path);

  if (!value) {
    return null;
  }

  if (typeof value !== "string") {
    return value;
  }

  const relativeValue = value;

  if (value.includes("rem")) {
    return Number(relativeValue.replace("rem", "")) * 16;
  }

  if (value.includes("px")) {
    return Number(relativeValue.replace("px", ""));
  }

  return relativeValue;
};

const beautifyNumber = (number: number, separator = ".", prefix?: string) => {
  return `${prefix}${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)}`;
};

const splitPath = (pathName: string) => {
  const pathArray = pathName.split("-");
  return {
    id: Number(pathArray[0]),
    name: pathArray.slice(1).join("-"),
  };
};

const formatNameToPath = (name: string) => {
  return lowerCase(name).replaceAll(" ", "-");
};

const formatPathToName = (path: string) => {
  return path.replaceAll("-", " ");
};

const getNameMotionPicture = (motionPicture: MovieDataType | TVShowDataType) => {
  if ("title" in motionPicture && "original_title" in motionPicture) {
    return motionPicture.title || motionPicture.original_title;
  }
  if ("name" in motionPicture && "original_name" in motionPicture) {
    return motionPicture.name || motionPicture.original_name;
  }
  return "Not Available";
};

const getReleasedDateMotionPicture = (motionPicture: MovieDataType | TVShowDataType) => {
  if ("release_date" in motionPicture) {
    return motionPicture.release_date;
  }
  if ("first_air_date" in motionPicture) {
    return motionPicture.first_air_date;
  }
  return "N/A";
};

export {
  beautifyNumber,
  formatNameToPath,
  formatPathToName,
  generateFormSchema,
  getNameMotionPicture,
  getReleasedDateMotionPicture,
  getTwScreenWidth,
  getTwThemeConfig,
  snakelikeNestedObjectKeys,
  splitPath,
};
