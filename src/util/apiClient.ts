import axios, { CreateAxiosDefaults } from "axios";
import { responseReject, responseSuccess } from "./interceptor";

const createAxiosConfig = (): CreateAxiosDefaults<any> => {
  axios.defaults.headers.common['Authorization'] = '';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return {
    baseURL: process.env.backendBaseURL
  };
};

const apiClient = axios.create(createAxiosConfig());

apiClient.interceptors.response.use(responseSuccess, responseReject);   // TODO: refresh token

export default apiClient;