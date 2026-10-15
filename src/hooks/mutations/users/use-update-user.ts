import type { User, UsersTableColumn, ApiPaginatedResponse } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "@/services/user.service";

// User updates and synchronizes cached data.
const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: updateUser,

    onSuccess: async (updatedUser, variables) => {
      const { userId, values } = variables;

      // this will cancell these queries while we updating an user , for maintaining the data fresh.
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["users"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user", userId],
        }),
      ]);

      // Update the selected user in every cached table page.
      queryClient.setQueriesData<ApiPaginatedResponse<UsersTableColumn>>(
        { queryKey: ["users"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            users: oldData.users.map((user) =>
              user.id === userId
                ? {
                    ...user,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    age: values.age,
                    role: values.role,
                    image: values.image,
                  }
                : user,
            ),
          };
        },
      );

      // Update cached details without storing form passwords.
      queryClient.setQueryData<User>(["user", userId], (oldUser) => {
        if (!oldUser) return oldUser;

        const { password: _password, ...safeValues } = values;
        void _password;

        return {
          ...oldUser,
          ...safeValues,
          id: updatedUser.id,
        };
      });

      toast.success("User details updated successfully.");
    },
  });
};

export default useUpdateUser;
