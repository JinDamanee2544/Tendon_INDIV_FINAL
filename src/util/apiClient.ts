import axios, { CreateAxiosDefaults } from "axios";
import { responseRejectHandler, responseSuccessHandler } from "./interceptor";

const createAxiosConfig = (): CreateAxiosDefaults<any> => {
  axios.defaults.headers.common['Authorization'] = '';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return {
    baseURL: process.env.backendBaseURL
  };
};

const apiClient = axios.create(createAxiosConfig());

apiClient.interceptors.response.use(responseSuccessHandler, responseRejectHandler);   // TODO: refresh token

export default apiClient;