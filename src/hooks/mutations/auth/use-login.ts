import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login } from "@/services/auth-service";
import { resetAuthSession } from "@/lib/server-api";

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,

    onSuccess: (data) => {
      resetAuthSession();

      queryClient.setQueryData(["auth", "user"], data.user);

      toast.success("Logged in successfully.");
    },
  });
};

export default useLogin;
