import axios, { type AxiosRequestHeaders } from "axios";
import { getAuthHeader } from "../store/authStorage";
import API_URL from "./apiCalorNoche";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuthHeader(),
  } as AxiosRequestHeaders;

  return config;
});

export default api;