import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { login } from "@/services/auth-service";
import { AUTH_USER_QUERY_KEY } from "./use-auth-user";

const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: login,

        onSuccess: (data) => {
            queryClient.setQueryData(
                AUTH_USER_QUERY_KEY,
                data.user,
            );

            toast.success("Logged in successfully.");
        },

        onError: (error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(
                typeof message === "string"
                    ? message
                    : "Unable to log in. Please try again.",
            );
        },
    });
};

export default useLogin;
