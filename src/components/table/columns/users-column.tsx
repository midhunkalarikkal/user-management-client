
import { createColumnHelper } from "@tanstack/react-table";
import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  LoaderCircle,
} from "lucide-react";

import type { UsersTableColumn } from "@/types/user";
import type { DataTableFeatures } from "../data-table-features";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const columnHelper = createColumnHelper<
  DataTableFeatures,
  UsersTableColumn
>();

// User columns with action handlers and loading states.
const UsersTableColumns = (
  onViewDetails: (userId: number) => void,
  onEditUser: (userId: number) => void,
  onDeleteUser: (user: UsersTableColumn) => void,
  deletingUserId: number | null = null,
  editingUserId: number | null = null,
) =>
  columnHelper.columns([
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.firstName} {row.original.lastName}
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

        const isDeleting = deletingUserId === user.id;
        const isEditing = editingUserId === user.id;
        const isUpdating = isDeleting || isEditing;

        if (isUpdating) {
          return (
            <div
              role="status"
              aria-live="polite"
              className="flex min-w-36 items-center gap-2"
            >
              <LoaderCircle
                aria-hidden="true"
                className={`size-4 shrink-0 animate-spin ${
                  isDeleting
                    ? "text-destructive"
                    : "text-primary"
                }`}
              />

              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isDeleting
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {isDeleting
                  ? "Deleting user..."
                  : "Updating user..."}
              </span>
            </div>
          );
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Actions for ${user.firstName}`}
                  className="size-8 cursor-pointer"
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  User actions
                </DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => onViewDetails(user.id)}
                  className="cursor-pointer"
                >
                  <Eye className="size-4" />
                  View details
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onEditUser(user.id)}
                  className="cursor-pointer"
                >
                  <Pencil className="size-4" />
                  Edit user
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDeleteUser(user)}
                className="cursor-pointer"
              >
                <Trash2 className="size-4" />
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);

export default UsersTableColumns;
