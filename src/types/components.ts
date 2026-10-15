import type { ReactNode } from "react";
import type { FieldPath } from "react-hook-form";
import type { UserSearchField } from "@/types/common";
import type { UserFormValues } from "@/schemas/user.schema";
import type { Column, ColumnDef, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/table/DataTableFeatures";
import type {
  ApiPaginatedResponse,
  GetUsersQueryParams,
  User,
  UserSortField,
  UsersTableColumn,
} from "./user";

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
  user?: Omit<User, "password">;
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

// Data item interface
type DetailValue = string | number | null | undefined;
export interface DetailItemProps {
  label: string;
  value: DetailValue;
  sensitive?: boolean;
}

// Details section interface
export interface DetailsSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

// Data table colum header interface
export interface DataTableColumnHeaderProps<
  TData extends RowData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
}

// Delete user confirmation alert interface
export interface DeleteUserConfirmationProps {
  user: UsersTableColumn;
  onConfirm: () => void;
  onCancel: () => void;
}

// Error alert interface
export interface ErrorAlertProps {
  heading: string;
  errorMessage: string;
  error: Error | null;
  refetch: () => void;
}
