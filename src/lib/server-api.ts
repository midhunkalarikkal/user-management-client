import axios from "axios";
import { env } from "@/config/env";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/common";

declare module "axios" {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

const baseURL = env.serverUrl;

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

let onAuthExpired: (() => void) | null = null;

export const setAuthExpiredHandler = (handler: (() => void) | null) => {
  onAuthExpired = handler;
};

let refreshPromise: Promise<void> | null = null;
let sessionExpired = false;

export const resetAuthSession = () => {
  sessionExpired = false;
};

export const refreshAccessToken = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${baseURL}/auth/refresh`, undefined, {
        withCredentials: true,
        timeout: 10000,
      })
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const getErrorMessage = (error: AxiosError<ApiErrorResponse>): string => {
  const serverMessage = error.response?.data?.message;
  const status = error.response?.status;

  if (!error.response) {
    return error.code === "ECONNABORTED"
      ? "Request timed out. Please try again."
      : "Unable to connect to the server.";
  }

  if (status === 401) {
    return serverMessage ?? "Your session has expired.";
  }

  if (status === 403) {
    return serverMessage ?? "Access denied.";
  }

  if (status === 429) {
    return "Too many requests. Please try again later.";
  }

  if (status === 500) {
    return "Something went wrong on the server.";
  }

  if (status && status >= 502) {
    return serverMessage ?? "Service temporarily unavailable.";
  }

  return serverMessage ?? "Something went wrong.";
};

const notifySessionExpired = () => {
  if (sessionExpired) return;

  sessionExpired = true;
  onAuthExpired?.();

  toast.error("Your session has expired. Please log in again.", { toastId: "session-expired" });
};

serverApi.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    if (!axios.isAxiosError<ApiErrorResponse>(error)) {
      toast.error("An unexpected error occurred.");
      return Promise.reject(error);
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const config = error.config;

    if (!config) {
      toast.error(getErrorMessage(error));
      return Promise.reject(error);
    }

    const url = config.url ?? "";

    const isLoginRequest = url.includes("/auth/login");
    const isRefreshRequest = url.includes("/auth/refresh");
    const isLogoutRequest = url.includes("/auth/logout");
    const isMeRequest = url.includes("/auth/me");

    const isAuthAction = isLoginRequest || isRefreshRequest || isLogoutRequest;

    const shouldRefresh =
      error.response?.status === 401 &&
      !config._retry &&
      !config.skipAuthRefresh &&
      !isAuthAction &&
      !sessionExpired;

    if (shouldRefresh) {
      config._retry = true;

      try {
        await refreshAccessToken();

        if (sessionExpired) {
          return Promise.reject(error);
        }

        return serverApi(config);
      } catch (refreshError) {
        if (axios.isCancel(refreshError)) {
          return Promise.reject(refreshError);
        }

        if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
          if (isMeRequest) {
            sessionExpired = true;
            onAuthExpired?.();
          } else {
            notifySessionExpired();
          }

          return Promise.reject(error);
        }

        if (!config.skipErrorToast && !isMeRequest) {
          toast.error("Unable to restore your session. Please try again.", {
            toastId: "session-refresh-failed",
          });
        }

        return Promise.reject(refreshError);
      }
    }

    if (!config.skipErrorToast && !isMeRequest && !sessionExpired) {
      toast.error(getErrorMessage(error));
    }

    return Promise.reject(error);
  },
);
