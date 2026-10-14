import type { SortOrder, UserSortField } from "@/types/user";
import { UserPlus, UsersRound, type LucideIcon } from "lucide-react";

// Sidebar navigation options
export const navigationItems: {
    title: string;
    url: string;
    icon: LucideIcon
}[] = [
        {
            title: "Users",
            url: "/users",
            icon: UsersRound,
        },
        {
            title: "Add User",
            url: "/users/new",
            icon: UserPlus,
        },
    ];

// User sorting fields
export const USERS_SORT_BY = [
  { key: "First name", value: "firstName" },
  { key: "Age", value: "age" },
  { key: "Email", value: "email" },
] as const satisfies ReadonlyArray<{
  key: string;
  value: UserSortField;
}>;

// User sorting orders
export const SORT_ORDERS = [
  { key: "Ascending", value: "asc" },
  { key: "Descending", value: "desc" },
] as const satisfies ReadonlyArray<{
  key: string;
  value: SortOrder;
}>;


export const USERS_FILTER_BY = [
  { key: "Gender", value: "gender" },
  { key: "Role", value: "role" },
  { key: "Hair color", value: "hair.color" },
  { key: "Eye color", value: "eyeColor" },
] as const;

// User fields available for searching and filtering.
export const USERS_SEARCH_FIELDS = [
  { key: "User ID", value: "id" },
  { key: "First name", value: "firstName" },
  { key: "Last name", value: "lastName" },
  { key: "Maiden name", value: "maidenName" },
  { key: "Age", value: "age" },
  { key: "Gender", value: "gender" },
  { key: "Email", value: "email" },
  { key: "Phone", value: "phone" },
  { key: "Username", value: "username" },
  { key: "Date of birth", value: "birthDate" },
  { key: "Profile image", value: "image" },
  { key: "Blood group", value: "bloodGroup" },
  { key: "Height", value: "height" },
  { key: "Weight", value: "weight" },
  { key: "Eye color", value: "eyeColor" },
  { key: "University", value: "university" },
  { key: "Role", value: "role" },
  { key: "Hair color", value: "hair.color" },
  { key: "Hair type", value: "hair.type" },
  { key: "Street address", value: "address.address" },
  { key: "City", value: "address.city" },
  { key: "State", value: "address.state" },
  { key: "State code", value: "address.stateCode" },
  { key: "Postal code", value: "address.postalCode" },
  { key: "Country", value: "address.country" },
  { key: "Latitude", value: "address.coordinates.lat" },
  { key: "Longitude", value: "address.coordinates.lng" },
  { key: "Company name", value: "company.name" },
  { key: "Department", value: "company.department" },
  { key: "Job title", value: "company.title" },
  { key: "Company street address", value: "company.address.address" },
  { key: "Company city", value: "company.address.city" },
  { key: "Company state", value: "company.address.state" },
  { key: "Company state code", value: "company.address.stateCode" },
  { key: "Company postal code", value: "company.address.postalCode" },
  { key: "Company country", value: "company.address.country" },
  { key: "Company latitude", value: "company.address.coordinates.lat" },
  { key: "Company longitude", value: "company.address.coordinates.lng" },
] as const;

export type UserSearchField =
  (typeof USERS_SEARCH_FIELDS)[number]["value"];

export type UserSearchLabel =
  (typeof USERS_SEARCH_FIELDS)[number]["key"];