import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { setAuthExpiredHandler } from "@/lib/server-api";
import useAuthUser, { AUTH_USER_QUERY_KEY } from "@/hooks/mutations/auth/use-auth-user";

const ProtectedRoute = () => {
  const queryClient = useQueryClient();

  const { data: user, isPending, isError } = useAuthUser();

  useEffect(() => {
    setAuthExpiredHandler(() => {
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, null);
    });

    return () => {
      setAuthExpiredHandler(null);
    };
  }, [queryClient]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
