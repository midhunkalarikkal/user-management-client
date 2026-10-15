import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import UserForm from "@/components/users/UserForm";
import useCreateUser from "@/hooks/mutations/users/use-create-user";
import { Button } from "@/components/ui/button";
import type { UserFormValues } from "@/schemas/user.schema";

const CreateUserPage = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useCreateUser();

  const handleCreateUser = async (values: UserFormValues) => {
    try {
      await mutateAsync(values);
      navigate("/users");
    } catch {
      // Errors are displayed by the mutation hook.
    }
  };

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
          <h1 className="text-2xl font-semibold tracking-tight">Add new user</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter the user's personal, account, address, employment, banking and other details.
          </p>
        </div>
      </div>

      <UserForm onSubmit={handleCreateUser} isSubmitting={isPending} />
    </section>
  );
};

export default CreateUserPage;
