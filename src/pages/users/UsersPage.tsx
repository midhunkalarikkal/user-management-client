import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { getUsers } from "@/services/user.service";
import type { UsersTableColumn } from "@/types/user";
import DataTable from "@/components/table/DataTable";
import { useCallback, useMemo, useState } from "react";
import useDeleteUser from "@/hooks/mutations/users/use-delete-user";
import { USERS_SEARCH_FIELDS, USERS_SORT_BY } from "@/utils/constant";
import UsersTableColumns from "@/components/table/columns/UsersTableColumns";
import DeleteUserConfirmation from "@/components/alerts/DeleteUserConfirmation";

const UsersPage = () => {

  const navigate = useNavigate();
  const {
    mutate: deleteUser,
    isPending: isDeleting,
    deletingUserId,
  } = useDeleteUser();
  const [selectedUser, setSelectedUser] = useState<UsersTableColumn | null>(null);

  const handleViewDetails = useCallback(
    (userId: number) => {
      navigate(`/users/${userId}`);
    },
    [navigate],
  );

  const handleEditUser = useCallback(
    (userId: number) => {
      navigate(`/users/${userId}/edit`);
    },
    [navigate],
  );

  const handleDeleteUser = useCallback(
    (user: UsersTableColumn) => {
      if (isDeleting) return;

      toast(
        ({ closeToast }) => (
          <DeleteUserConfirmation
            user={user}
            onCancel={closeToast}
            onConfirm={() => {
              closeToast();
              deleteUser(user.id);
            }}
          />
        ),
        {
          toastId: "confirm-delete-user",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
          position: "top-center",
        },
      );
    },
    [deleteUser, isDeleting],
  );

  const columns = useMemo(
    () => UsersTableColumns(handleViewDetails, handleEditUser, handleDeleteUser, deletingUserId),
    [handleViewDetails, handleEditUser, handleDeleteUser, deletingUserId],
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>

          <p className="text-sm text-muted-foreground">Manage your users and their information.</p>
        </div>

        <Button nativeButton={false} render={<Link to="/users/new" />}>
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      <DataTable
        queryKey="users"
        queryFunction={getUsers}
        columns={columns}
        sortByConstants={USERS_SORT_BY}
        searchByConstants={USERS_SEARCH_FIELDS}
        getRowId={(row) => String(row.id)}
        emptyMessage="No users found"
      />

      {selectedUser && (
        <div role="status" className="rounded-lg border p-4 text-sm">
          Selected for deletion:{" "}
          <strong>
            {selectedUser.firstName} {selectedUser.lastName}
          </strong>
          . Deletion is not yet implemented.
          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() => setSelectedUser(null)}
          >
            Dismiss
          </Button>
        </div>
      )}
    </section>
  );
};

export default UsersPage;
