import type { USERS_SEARCH_FIELDS } from "@/utils/constant";

export type UserSearchField = (typeof USERS_SEARCH_FIELDS)[number]["value"];
