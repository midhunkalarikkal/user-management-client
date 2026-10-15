import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { logout } from "@/services/auth-service";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,

    onSuccess: async () => {
      await queryClient.cancelQueries();

      queryClient.clear();

      toast.success("Logged out successfully.");

      navigate("/login", { replace: true });
    },
  });
};

export default useLogout;
