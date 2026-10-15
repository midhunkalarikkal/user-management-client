import type { UserSearchField } from "@/types/common";
import type { UserFormValues } from "@/schemas/user.schema";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/table/data-table-features";
import type { ApiPaginatedResponse, GetUsersQueryParams, User, UserSortField } from "./user";
import type { FieldPath } from "react-hook-form";

// route handler metadata
export interface RouteMetadata {
  title: string;
  description?: string;
}

// Defines pagination parameters for the users list.
export interface Pagination {
  page?: number;
  limit?: number;
}

// Data table
type SortOption = {
  key: string;
  value: UserSortField;
};
type SearchOption = {
  key: string;
  value: UserSearchField;
};
export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  queryFunction: (
    queryParams: GetUsersQueryParams,
    signal?: AbortSignal,
  ) => Promise<ApiPaginatedResponse<TData>>;
  queryKey: string;
  sortByConstants: readonly SortOption[];
  searchByConstants?: readonly SearchOption[];
  emptyMessage?: string;
  getRowId?: (row: TData) => string;
}

// User form props
export interface UserFormProps {
    user?: User;
    isSubmitting?: boolean;
    onSubmit: (values: UserFormValues) => void | Promise<void>;
}

// User form fields interface
export interface UserFormField {
  name: FieldPath<UserFormValues>;
  label: string;
  type?: "text" | "number" | "email" | "password" | "date" | "url";
  placeholder?: string;
  step?: string;
  autocomplete?: string;
}

// User form sections interface
export interface UserFormSection {
  title: string;
  description: string;
  fields: readonly UserFormField[];
}