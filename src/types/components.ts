import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/table/data-table-features";
import type { ApiPaginatedResponse, GetUsersQueryParams, UserSortField } from "./user";

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
export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  queryFunction: (
    queryParams: GetUsersQueryParams,
    signal?: AbortSignal
  ) => Promise<ApiPaginatedResponse<TData>>;
  queryKey: string;
  sortByConstants: readonly SortOption[];
  emptyMessage?: string;
  getRowId?: (row: TData) => string;
}