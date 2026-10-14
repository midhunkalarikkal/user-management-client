import {
    Navigate,
  createBrowserRouter,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import UsersPage from "@/pages/users/users-page";
import AppLayout from "@/components/layout/app-layout";
import NotFoundPage from "@/pages/errors/not-found-page";
import UserDetailsPage from "@/pages/users/user-details-page";

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

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
