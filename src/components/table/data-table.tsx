
import * as React from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
    useTable,
    flexRender,
    type RowData,
    type ColumnVisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    features,
} from "./data-table-features";
import { SORT_ORDERS } from "@/utils/constant";

import type {
    SortOrder,
    UserSortField,
    GetUsersQueryParams,
} from "@/types/user";
import { isValidValue } from "@/utils/helper/isValidValue";
import type { DataTableProps } from "@/types/components";

// Reads a positive integer from URL parameters.
function getPositiveInteger(
    value: string | null,
    fallback: number
): number {
    if (!value || !/^\d+$/.test(value)) {
        return fallback;
    }

    const parsed = Number(value);

    return Number.isSafeInteger(parsed) && parsed > 0
        ? parsed
        : fallback;
}

// Renders a reusable API-driven table.
export default function DataTable<TData extends RowData>({
    columns,
    queryFunction,
    queryKey,
    sortByConstants,
    emptyMessage = "No records found.",
    getRowId,
}: DataTableProps<TData>) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Reads pagination from the URL.
    const page = getPositiveInteger(
        searchParams.get("page"),
        1
    );

    const limit = Math.min(
        getPositiveInteger(
            searchParams.get("limit"),
            10
        ),
        100
    );

    // Validates sorting parameters.
    const sortByParam = searchParams.get("sortBy");
    const orderParam = searchParams.get("order");

    const sortByValues = sortByConstants.map(
        (item) => item.value
    );

    const orderValues = SORT_ORDERS.map(
        (item) => item.value
    );

    const sortBy: UserSortField | undefined =
        isValidValue(sortByParam, sortByValues)
            ? sortByParam
            : undefined;

    const order: SortOrder | undefined =
        isValidValue(orderParam, orderValues)
            ? orderParam
            : undefined;

    // Creates the query parameters for the API.
    const queryParams: GetUsersQueryParams = {
        page,
        limit,
        sortBy,
        order,
    };

    // Fetches records inside the reusable table.
    const {
        data,
        error,
        isError,
        isPending,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: [
            queryKey,
            page,
            limit,
            sortBy ?? null,
            order ?? null,
        ],
        queryFn: ({ signal }) =>
            queryFunction(queryParams, signal),
    });

    // Manages column visibility locally.
    const [columnVisibility, setColumnVisibility] =
        React.useState<ColumnVisibilityState>({});

    // Always supplies an array to TanStack Table.
    const tableData = React.useMemo(
        () => data?.users ?? [],
        [data]
    );

    const table = useTable({
        features,
        data: tableData,
        columns,
        ...(getRowId && {
            getRowId: (row: TData) => getRowId(row),
        }),
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
    });

    const rows = table.getRowModel().rows;

    const total = data?.total ?? 0;
    const totalPages = Math.max(
        1,
        Math.ceil(total / limit)
    );

    // Updates sorting and resets pagination.
    function updateSorting(
        key: "sortBy" | "order",
        value: string | null
    ) {
        setSearchParams((previous) => {
            const params = new URLSearchParams(previous);

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            params.delete("page");

            return params;
        });
    }

    // Clears the selected sorting options.
    function clearSorting() {
        setSearchParams((previous) => {
            const params = new URLSearchParams(previous);

            params.delete("sortBy");
            params.delete("order");
            params.delete("page");

            return params;
        });
    }

    // Updates the current page in the URL.
    function changePage(nextPage: number) {
        if (nextPage < 1 || nextPage > totalPages) {
            return;
        }

        setSearchParams((previous) => {
            const params = new URLSearchParams(previous);

            params.set("page", String(nextPage));
            params.set("limit", String(limit));

            return params;
        });
    }

    const start =
        total === 0 ? 0 : (page - 1) * limit + 1;

    const end = Math.min(page * limit, total);

    const columnCount = Math.max(
        table.getVisibleLeafColumns().length,
        1
    );

    return (
        <div className="space-y-4">
            {/* Sorting and column visibility controls */}
            <div className="flex flex-wrap items-center gap-3">
                <Select
                    value={sortBy ?? ""}
                    onValueChange={(value) =>
                        updateSorting("sortBy", value)
                    }
                >
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>

                    <SelectContent>
                        {sortByConstants.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                            >
                                {item.key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={order ?? ""}
                    onValueChange={(value) =>
                        updateSorting("order", value)
                    }
                >
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="Order" />
                    </SelectTrigger>

                    <SelectContent>
                        {SORT_ORDERS.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                            >
                                {item.key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {(sortBy || order) && (
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={clearSorting}
                    >
                        Clear sort
                    </Button>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-auto"
                            />
                        }
                    >
                        Columns
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {table
                            .getAllLeafColumns()
                            .filter((column) =>
                                column.getCanHide()
                            )
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(checked) =>
                                        column.toggleVisibility(checked)
                                    }
                                    className="capitalize"
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(
                            (headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(
                                        (header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    )}
                                </TableRow>
                            )
                        )}
                    </TableHeader>

                    <TableBody>
                        {isPending ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columnCount}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    Loading records...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columnCount}
                                    className="h-32 text-center"
                                >
                                    <div className="space-y-3">
                                        <p className="font-medium">
                                            Failed to load records
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {error.message}
                                        </p>

                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                void refetch()
                                            }
                                        >
                                            Try again
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row
                                        .getVisibleCells()
                                        .map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columnCount}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                    {isPending || isError
                        ? "Results unavailable"
                        : `Showing ${start}-${end} of ${total}`}
                    {isFetching && !isPending
                        ? " · Updating..."
                        : ""}
                </p>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={
                            page <= 1 ||
                            isPending ||
                            isError
                        }
                        onClick={() =>
                            changePage(page - 1)
                        }
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={
                            page >= totalPages ||
                            isPending ||
                            isError
                        }
                        onClick={() =>
                            changePage(page + 1)
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
