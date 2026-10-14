import {
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USERS_SORT_BY } from "@/utils/constant";
import { getUsers } from "@/services/user.service";
import DataTable from "@/components/table/data-table";
import type { UsersTableColumn } from "@/types/user";
import UsersTableColumns from "@/components/table/columns/users-column";

const UsersPage = () => {

  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<UsersTableColumn | null>(null);

  const handleViewDetails = useCallback(
    (userId: number) => {
      navigate(`/users/${userId}`);
    },
    [navigate]
  );

  const handleEditUser = useCallback(
    (userId: number) => {
      navigate(`/users/${userId}/edit`);
    },
    [navigate]
  );

  const handleDeleteUser = useCallback(
    (user: UsersTableColumn) => {
      setSelectedUser(user);
    },
    []
  );

  const columns = useMemo(
    () =>
      UsersTableColumns(
        handleViewDetails,
        handleEditUser,
        handleDeleteUser
      ),
    [
      handleViewDetails,
      handleEditUser,
      handleDeleteUser,
    ]
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Users
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your users and their information.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link to="/users/new" />}
        >
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      <DataTable
        queryKey="users"
        queryFunction={getUsers}
        columns={columns}
        sortByConstants={USERS_SORT_BY}
        getRowId={(row) => String(row.id)}
        emptyMessage="No users found"
      />

      {selectedUser && (
        <div
          role="status"
          className="rounded-lg border p-4 text-sm"
        >
          Selected for deletion:{" "}
          <strong>
            {selectedUser.firstName}{" "}
            {selectedUser.lastName}
          </strong>
          . Deletion is not yet implemented.

          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() =>
              setSelectedUser(null)
            }
          >
            Dismiss
          </Button>
        </div>
      )}
    </section>
  );
};

export default UsersPage;
