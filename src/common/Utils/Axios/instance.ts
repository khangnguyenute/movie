import axios from "axios";

import { normalizeQuery } from "../Helpers/requestHelpers";
import errorHandler from "./errorHandler";

declare module "axios" {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "723c69bfe23dd99cddadcde7359742d0";
export const API_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjNjNjliZmUyM2RkOTljZGRhZGNkZTczNTk3NDJkMCIsInN1YiI6IjY1ZTQ4YmE1MmFjNDk5MDEzMGVjZmUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q1oz0Qrkw90AWeLVB-Br7MioX66o4TIoJCDkCpzBS6k";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  httpAgent: config,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const { params, url } = request;

    if (!url) {
      return request;
    }

    request.url = `${url}?api_key=${API_KEY}`;

    if (!params) {
      return request;
    }

    request.params = normalizeQuery(params);

    return request;
  },
  async (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => errorHandler(error),
);

export default axiosInstance;
