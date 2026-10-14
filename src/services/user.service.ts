import { api } from "@/lib/axios";
import type {
  User,
  UsersTableColumn,
  GetUsersQueryParams,
  ApiPaginatedResponse,
} from "@/types/user";

// fet paginated list of users.
export async function getUsers(
  queryParams: GetUsersQueryParams,
  signal?: AbortSignal
): Promise<ApiPaginatedResponse<UsersTableColumn>> {
  const {
    page,
    limit,
    sortBy,
    order,
  } = queryParams;

  const skip = (page - 1) * limit;

  const { data } = await api.get<
    ApiPaginatedResponse<UsersTableColumn>
  >("/users", {
    params: {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(sortBy && { order: order ?? "asc" }),
    },
    signal,
  });

  return data;
}

// fetch a single user.
export async function getUserById(
  userId: number,
  signal?: AbortSignal
): Promise<User> {
  const { data } = await api.get<User>(
    `/users/${userId}`,
    { signal }
  );

  return data;
}
