import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/services/user.service";
import type {
  UsersTableColumn,
  ApiPaginatedResponse,
} from "@/types/user";

// Handles user deletion and updates the query cache.
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const [deletingUserId, setDeletingUserId] = useState<
    number | null
  >(null);

  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,

    onMutate: (userId) => {
      setDeletingUserId(userId);
    },

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

    onSettled: () => {
      setDeletingUserId(null);
    },
  });

  // Shows confirmation before deleting the selected user.
  const confirmDelete = (user: UsersTableColumn) => {
    if (mutation.isPending) return;

    const toastId = toast(
      ({ closeToast }) => (
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="font-semibold">
              Delete user?
            </p>

            <p className="text-sm">
              Are you sure you want to delete{" "}
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              ?
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => closeToast()}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                toast.dismiss(toastId);
                mutation.mutate(user.id);
              }}
            >
              Yes, delete
            </Button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        position: "top-center",
        toastId: "confirm-delete-user",
      },
    );
  };

  return {
    ...mutation,
    confirmDelete,
    deletingUserId,
  };
};

export default useDeleteUser;
