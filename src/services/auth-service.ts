import axios from "axios";
import type { AuthUser, CurrentUserResponse, LoginCredentials, LoginResponse } from "@/types/auth";
import { refreshAccessToken, serverApi } from "@/lib/server-api";

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await serverApi.post<LoginResponse>("/auth/login", credentials);

  return data;
};

export const getCurrentUser = async (signal?: AbortSignal): Promise<AuthUser> => {
  const fetchUser = async () => {
    const { data } = await serverApi.get<CurrentUserResponse>("/auth/me", {
      signal,
    });

    return data.user;
  };

  try {
    return await fetchUser();
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || signal?.aborted) {
      throw error;
    }

    await refreshAccessToken();
    return fetchUser();
  }
};

export const logout = async (): Promise<void> => {
  await serverApi.post("/auth/logout");
};
