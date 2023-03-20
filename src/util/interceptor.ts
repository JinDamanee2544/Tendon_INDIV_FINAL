import { AxiosResponse } from "axios";
import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "linkWithBackend/services/auth_service";
import container from "linkWithBackend/services/inversify.config";

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseReject = async (error: Error) => {
  const authService = container.get<AuthService>(TYPES.AuthService)
  if (!authService.isTokenValid()) {
    const resp = await authService.renewAccessToken()
    console.log("renewAccessToken")
    // redirect to login page
    if (resp === "") window.location.href = "/login";
  }
  return Promise.reject(error);
};