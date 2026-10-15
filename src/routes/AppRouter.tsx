import { lazy, Suspense } from "react";
import { RouterProvider } from "react-router/dom";
import { Navigate, createBrowserRouter } from "react-router";

import AppLayout from "@/components/layout/AppLayout";

const UsersPage = lazy(() => import("@/pages/users/UsersPage"));
const CreateUserPage = lazy(() => import("@/pages/users/CreateUserPage"));
const EditUserPage = lazy(() => import("@/pages/users/EditUserPage"));
const NotFoundPage = lazy(() => import("@/pages/errors/NotFoundPage"));
const UserDetailsPage = lazy(() => import("@/pages/users/UserDetailsPage"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" replace />,
      },
      {
        path: "/users",
        element: <UsersPage />,
        handle: {
          title: "Users",
          description: "Manage and view user records.",
        },
      },
      {
        path: "/users/:userId",
        element: <UserDetailsPage />,
        handle: {
          title: "User Details",
          description: "View user information.",
        },
      },
      {
        path: "/users/new",
        element: <CreateUserPage />,
        handle: {
          title: "Add User",
          description: "Create a new user",
        },
      },
      {
        path: "/users/:userId/edit",
        element: <EditUserPage />,
        handle: {
          title: "Edit User",
          description: "Update user information",
        },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: {
          title: "Page Not Found",
          description: "The requested page could not be found.",
        },
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading page...
          </p>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default AppRouter;