import { AxiosError, AxiosResponse } from "axios";
import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "linkWithBackend/services/auth_service";
import container from "linkWithBackend/services/inversify.config";
import Router from "next/router";

export const responseSuccessHandler = (response: AxiosResponse) => {
  return response;
};

export const responseRejectHandler = async (error: AxiosError) => {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    const authService = container.get<AuthService>(TYPES.AuthService)
    if (!authService.isTokenValid()) {
      const resp = await authService.renewAccessToken()
      console.log("renewAccessToken")
      // redirect to login page
      if (resp === "") {
        window.location.href = "/login"
      } else {
        Router.reload()
      }
    }
  }
  return Promise.reject(error);
};