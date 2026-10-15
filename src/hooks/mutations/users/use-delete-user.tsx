import type {
  UsersTableColumn,
  ApiPaginatedResponse,
} from "@/types/user";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "@/services/user.service";

// Handles user deletion and updates the query cache.
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,

    onSuccess: async (data, userId) => {
      if (!data.isDeleted) {
        toast.error("Could not confirm user deletion.");
        return;
      }

      // Prevent in-flight list requests from overwriting the cache.
      // await queryClient.cancelQueries({
      //   queryKey: ["users"],
      // });

      // Removes the deleted user from all cached users pages.
      queryClient.setQueriesData<
        ApiPaginatedResponse<UsersTableColumn>
      >(
        { queryKey: ["users"] },
        (oldData) => {
          if (!oldData) return oldData;

          const updatedUsers = oldData.users.filter(
            (user) => user.id !== userId,
          );

          return {
            ...oldData,
            users: updatedUsers,
            total: Math.max(
              0,
              oldData.total -
              (oldData.users.length - updatedUsers.length),
            ),
          };
        },
      );

      toast.success("User deleted successfully.");
    },

    onError: (error) => {
      toast.error(
        error.message || "Failed to delete user.",
      );
    },

  });

  return {
    ...mutation,
    deletingUserId: mutation.isPending
      ? mutation.variables
      : null,
  };
};

export default useDeleteUser;
