
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>

        <Button nativeButton={false} render={<Link to="/users/new" />}>
          Add User
        </Button>
      </div>

      <p className="mt-4 text-muted-foreground">
        User listing table will be implemented here.
      </p>
    </main>
  );
}
