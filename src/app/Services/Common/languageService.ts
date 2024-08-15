import { LANGUAGE_API_PATH } from "@constants/apiConstant";
import { DEFAULT_PAGE_LANGUAGE } from "@constants/commonConstant";

import { BaseListQueryType, LanguageDataType, ResponseDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const setPageLanguage = async (language: string) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({}), 1000);
    localStorage.setItem("currentLanguage", language);
  });

const getPageLanguage = () => {
  const currentLanguage = localStorage.getItem("currentLanguage");

  if (!currentLanguage) {
    return DEFAULT_PAGE_LANGUAGE;
  }

  return currentLanguage;
};

const getLanguages = async (params?: BaseListQueryType): Promise<ResponseDataType<LanguageDataType[]>> => {
  const response = await axiosInstance.get(LANGUAGE_API_PATH.LANGUAGES, { params });

  return {
    data: response.data,
    meta: {
      totalResults: response.data.length,
    },
  };
};

export { getLanguages, getPageLanguage, setPageLanguage };
