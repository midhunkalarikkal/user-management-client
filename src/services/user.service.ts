import type {
  User,
  UsersTableColumn,
  UpdateUserParams,
  DeleteUserResponse,
  GetUsersQueryParams,
  ApiPaginatedResponse,
  UserDetailsResponse,
} from "@/types/user";
import { serverApi } from "@/lib/server-api";
import type { UserFormValues } from "@/schemas/user.schema";

// fetch paginated list of users.
export async function getUsers(
  queryParams: GetUsersQueryParams,
  signal?: AbortSignal,
): Promise<ApiPaginatedResponse<UsersTableColumn>> {
  const { page, limit, sortBy, order, searchKey, searchValue } = queryParams;

  const skip = (page - 1) * limit;
  const search = searchValue?.trim();

  const normalizedSearch =
    searchKey === "role" || searchKey === "gender" ? search?.toLowerCase() : search;

  const endpoint = search ? (searchKey ? "/users/filter" : "/users/search") : "/users";

  const params = {
    limit,
    skip,
    ...(sortBy && { sortBy, order: order ?? "asc" }),
    ...(search &&
      (searchKey ? { key: searchKey, value: normalizedSearch } : { q: normalizedSearch })),
  };

  const { data } = await serverApi.get<ApiPaginatedResponse<UsersTableColumn>>(endpoint, {
    params,
    signal,
  });

  return data;
}

// fetch a single user.
export async function getUserById(
  userId: number,
  signal?: AbortSignal,
): Promise<UserDetailsResponse> {
  const { data } = await serverApi.get<User>(`/users/${userId}`, { signal });
  return data;
}

// Delete request for the selected user.
export const deleteUser = async (userId: User["id"]): Promise<DeleteUserResponse> => {
  const { data } = await serverApi.delete<DeleteUserResponse>(`/users/${userId}`);
  return data;
};

// Creates a user with all entered details.
export const createUser = async (values: UserFormValues): Promise<User> => {
  const { data } = await serverApi.post<User>("/users/", values);
  return data;
};

// Updates a users details.
export const updateUser = async ({ userId, values }: UpdateUserParams): Promise<User> => {
  const { data } = await serverApi.put<User>(`/users/${userId}`, values);
  return data;
};
