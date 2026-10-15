import { toast } from "react-toastify";
import { TEST_USER_TAG } from "@/utils/constant";
import { updateUser } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UsersTableColumn, ApiPaginatedResponse, UpdateUserParams } from "@/types/user";

// User updates and synchronizes cached data.
const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async ({ userId, values }: UpdateUserParams) => {
      const cachedUser = queryClient.getQueryData<User>(["user", userId]);

      if (cachedUser?.tag === TEST_USER_TAG || values.tag === TEST_USER_TAG) {
        return null;
      }

      return updateUser({ userId, values });
    },

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
          id: updatedUser?.id ?? userId,
        };
      });

      toast.success("User details updated successfully.");
    },
  });
};

export default useUpdateUser;
