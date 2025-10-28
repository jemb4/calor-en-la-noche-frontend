import axios, { type AxiosRequestHeaders } from "axios";
import { getAuthHeader } from "../store/authStorage";

const API_URL: string = "http://localhost:8080/api/v1";

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