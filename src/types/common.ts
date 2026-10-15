import type { USERS_SEARCH_FIELDS } from "@/utils/constant";

// Users filter value type
export type UserSearchField = (typeof USERS_SEARCH_FIELDS)[number]["value"];

// Error interface
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
