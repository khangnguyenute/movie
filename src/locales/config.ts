import { DEFAULT_PAGE_LANGUAGE } from "@constants/commonConstant";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./en/common.json";

export const resources = {
  en: {
    common: commonEn,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: DEFAULT_PAGE_LANGUAGE,
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
