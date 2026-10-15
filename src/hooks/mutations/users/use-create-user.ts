import type { User, UsersTableColumn, ApiPaginatedResponse } from "@/types/user";
import { toast } from "react-toastify";
import { createUser } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// User creation and updates the query cache.
const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,

    onSuccess: async (createdUser) => {
      // Prevent ongoing requests from overwriting cached data.
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      // Updates existing cached users table queries.
      queryClient.setQueriesData<ApiPaginatedResponse<UsersTableColumn>>(
        { queryKey: ["users"] },
        (oldData) => {
          if (!oldData) return oldData;

          const alreadyExists = oldData.users.some((user) => user.id === createdUser.id);

          if (alreadyExists) return oldData;

          const newUser: UsersTableColumn = {
            id: createdUser.id,
            image: createdUser.image,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            email: createdUser.email,
            age: createdUser.age,
            role: createdUser.role,
          };

          // Only insert the new user into the first page.
          const updatedUsers =
            oldData.skip === 0
              ? [newUser, ...oldData.users].slice(0, oldData.limit)
              : oldData.users;

          return {
            ...oldData,
            users: updatedUsers,
            total: oldData.total + 1,
          };
        },
      );

      // Cache the newly created user's details.
      queryClient.setQueryData<User>(["user", createdUser.id], createdUser);

      toast.success("User created successfully.");
    },
  });
};

export default useCreateUser;
