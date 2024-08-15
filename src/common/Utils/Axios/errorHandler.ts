import { AUTH_PATH } from "@constants/routeConstant";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { UNAUTHORIZED } from "http-status";
import _ from "lodash";

const errorHandler = async (error: { response: AxiosResponse; config: AxiosRequestConfig }) => {
  const { response, config } = error;

  let redirectURL = "";

  const redirectWhenError = config?.redirectWhenError;

  if (_.keys(response).length !== 0) {
    const { status } = response;

    if (redirectWhenError !== false) {
      switch (status) {
        case UNAUTHORIZED: {
          redirectURL = AUTH_PATH.LOGIN;
          break;
        }
        default:
          break;
      }
    }
  }

  if (redirectURL !== "" && (redirectWhenError ?? false)) {
    const currentURL = window.location.pathname;
    if (currentURL !== redirectURL) {
      window.location.href = `${redirectURL}?from=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
