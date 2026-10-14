
import {
  createColumnHelper,
} from "@tanstack/react-table";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  UsersTableColumn,
} from "@/types/user";

import type {
  DataTableFeatures,
} from "../data-table-features";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const columnHelper =
  createColumnHelper<
    DataTableFeatures,
    UsersTableColumn
  >();

// Builds user columns with action callbacks.
const UsersTableColumns = (
  onViewDetails: (userId: number) => void,
  onEditUser: (userId: number) => void,
  onDeleteUser: (user: UsersTableColumn) => void
) =>
  columnHelper.columns([
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.firstName}{" "}
          {row.original.lastName}
        </span>
      ),
    }),

    columnHelper.accessor("email", {
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
      ),
    }),

    columnHelper.accessor("age", {
      header: "Age",
    }),

    columnHelper.accessor("role", {
      header: "Role",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.role}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      enableHiding: false,

      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 cursor-pointer"
                  aria-label={`Actions for ${user.firstName}`}
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Actions
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  onViewDetails(user.id)
                }
              >
                <Eye className="size-4" />
                Details
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  onEditUser(user.id)
                }
              >
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  onDeleteUser(user)
                }
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);

export default UsersTableColumns;
