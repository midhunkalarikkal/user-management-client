import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import useAuthUser from "@/hooks/mutations/auth/use-auth-user";

const ProtectedRoute = () => {
  const { data: user, isPending, isError } = useAuthUser();

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <LoaderCircle className="size-6 animate-spin text-muted-foreground" />

        <p className="text-sm text-muted-foreground">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
