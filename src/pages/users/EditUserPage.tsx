import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import UserForm from "@/components/users/UserForm";
import { useNavigate, useParams } from "react-router";
import { getUserById } from "@/services/user.service";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import LoadingPage from "@/components/layout/LoadingPage";
import type { UserFormValues } from "@/schemas/user.schema";
import useUpdateUser from "@/hooks/mutations/users/use-update-user";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const id = Number(userId);
  const isValidId = Number.isSafeInteger(id) && id > 0;

  const {
    data: user,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: ({ signal }) => getUserById(id, signal),
    enabled: isValidId,
  });

  const { mutateAsync, isPending: isUpdating } = useUpdateUser();

  // Updates the selected user's details.
  const handleUpdateUser = async (values: UserFormValues) => {
    if (!isValidId) return;

    try {
      await mutateAsync({
        userId: id,
        values,
      });

      navigate("/users");
    } catch {
      // Errors are displayed by the mutation hook.
    }
  };

  if (!isValidId) {
    return (
      <ErrorAlert
        heading="Unable to load user details."
        errorMessage="Invalid user id"
        error={error}
        refetch={refetch}
      />
    );
  }

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError || !user) {
    return (
      <ErrorAlert
        heading="Unable to load user details."
        errorMessage="Something went wrong"
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-full space-y-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/users")}
          className="cursor-pointer -ml-2"
        >
          <ArrowLeft className="size-4" />
          Back to users
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit user</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update the information for {user.firstName} {user.lastName}.
          </p>
        </div>
      </div>

      <UserForm key={user.id} user={user} onSubmit={handleUpdateUser} isSubmitting={isUpdating} />
    </section>
  );
};

export default EditUserPage;
