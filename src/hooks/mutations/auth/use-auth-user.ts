import type { AuthUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth-service";

export const AUTH_USER_QUERY_KEY = ["auth", "user"] as const;

const useAuthUser = () => {
  return useQuery<AuthUser>({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: ({ signal }) => getCurrentUser(signal),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAuthUser;
