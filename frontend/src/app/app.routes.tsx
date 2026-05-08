import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <h1 className="text-center mt-20">Welcome to the Home Page</h1>,
  },

  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/seller/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
