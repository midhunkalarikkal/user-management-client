import axios from "axios";
import type { AuthUser, CurrentUserResponse, LoginCredentials, LoginResponse } from "@/types/auth";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const { data } = await authApi.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return data;
};

export const getCurrentUser = async (
  signal?: AbortSignal,
): Promise<AuthUser> => {
  const fetchUser = async () => {
    const { data } =
      await authApi.get<CurrentUserResponse>("/auth/me", {
        signal,
      });

    return data.user;
  };

  try {
    return await fetchUser();
  } catch (error) {
    if (
      !axios.isAxiosError(error) ||
      error.response?.status !== 401 ||
      signal?.aborted
    ) {
      throw error;
    }

    await refreshAccessToken();

    return fetchUser();
  }
};


export const logout = async (): Promise<void> => {
  await authApi.post("/auth/logout");
};

export const refreshAccessToken = async (): Promise<void> => {
  await authApi.post("/auth/refresh");
};
