import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/table/data-table-features";
import type { ApiPaginatedResponse, GetUsersQueryParams, UserSortField } from "./user";
import type { UserSearchField } from "@/utils/constant";

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
