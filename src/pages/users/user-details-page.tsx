import { Link, useParams } from "react-router";

export default function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <main className="container mx-auto p-6">
      <Link to="/users" className="text-sm underline">
        Back to Users
      </Link>

      <h1 className="mt-6 text-3xl font-bold">User Details</h1>

      <p className="mt-4">Selected User ID: {userId}</p>
    </main>
  );
}
