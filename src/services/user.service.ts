
import { api } from "@/lib/axios";
import type { UsersResponse } from "@/types/user";

export async function getUsers(
  signal?: AbortSignal
): Promise<UsersResponse> {
  const { data } = await api.get<UsersResponse>("/users", {
    signal,
  });
  return data;
}
