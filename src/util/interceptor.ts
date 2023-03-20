import { AxiosResponse } from "axios";
import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "linkWithBackend/services/auth_service";
import container from "linkWithBackend/services/inversify.config";

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseReject = async (error: Error) => {
  const signService = container.get<AuthService>(TYPES.AuthService)
  if (!signService.isTokenValid()) {
    // redirect to login page
    window.location.href = "/login";
  }
  return Promise.reject(error); 
};