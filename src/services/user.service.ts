import { api } from "@/lib/axios";
import type {
  User,
  UsersTableColumn,
  DeleteUserResponse,
  GetUsersQueryParams,
  ApiPaginatedResponse,
} from "@/types/user";

// fetch paginated list of users.
export async function getUsers(
  queryParams: GetUsersQueryParams,
  signal?: AbortSignal,
): Promise<ApiPaginatedResponse<UsersTableColumn>> {
  const { page, limit, sortBy, order, searchKey, searchValue } = queryParams;

  const skip = (page - 1) * limit;
  let params;

  if (searchKey || searchValue) {
    const value = searchValue?.trim();
    params = {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(sortBy && { order: order ?? "asc" }),
      key: value,
    };
  } else {
    params = {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(sortBy && { order: order ?? "asc" }),
    };
  }

  const { data } = await api.get<ApiPaginatedResponse<UsersTableColumn>>("/users", {
    params,
    signal,
  });

  return data;
}

// fetch a single user.
export async function getUserById(userId: number, signal?: AbortSignal): Promise<User> {
  const { data } = await api.get<User>(`/users/${userId}`, { signal });

  return data;
}


// Delete request for the selected user.
export const deleteUser = async (
  userId: User["id"],
): Promise<DeleteUserResponse> => {
  const { data } = await api.delete<DeleteUserResponse>(
    `/users/${userId}`,
  );

  return data;
};