import { toast } from "react-toastify";
import { TEST_USER_TAG } from "@/utils/constant";
import { deleteUser } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UsersTableColumn, ApiPaginatedResponse } from "@/types/user";

// Handles user deletion and updates the query cache.
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (user: UsersTableColumn) =>
      user.tag === TEST_USER_TAG ? Promise.resolve(null) : deleteUser(user.id),

    onSuccess: async (data, user) => {
      if (data && !data.isDeleted) {
        toast.error("Could not confirm user deletion.");
        return;
      }

      // Prevent in-flight requests from overwriting the cache.
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["users"] }),
        queryClient.cancelQueries({ queryKey: ["user", user.id] }),
      ]);

      // Removes the deleted user from all cached users pages.
      queryClient.setQueriesData<ApiPaginatedResponse<UsersTableColumn>>(
        { queryKey: ["users"] },
        (oldData) => {
          if (!oldData) return oldData;

          const updatedUsers = oldData.users.filter((cachedUser) => cachedUser.id !== user.id);

          return {
            ...oldData,
            users: updatedUsers,
            total: Math.max(0, oldData.total - (oldData.users.length - updatedUsers.length)),
          };
        },
      );

      queryClient.removeQueries({ queryKey: ["user", user.id], exact: true });

      toast.success("User deleted successfully.");
    },
  });

  return {
    ...mutation,
    deletingUserId: mutation.isPending ? (mutation.variables?.id ?? null) : null,
  };
};

export default useDeleteUser;
