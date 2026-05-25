import { createBrowserRouter } from "react-router";
import Protected from "../features/auth/components/Protected";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Cart from "../features/cart/pages/Cart";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Home from "../features/products/pages/Home";
import ProductDetails from "../features/products/pages/ProductDetails";
import SellerProductDetails from "../features/products/pages/SellerProductDetails";
import AppLayout from "./AppLayout";
import WishList from "../features/like/pages/WishList";

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
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },

      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },

      {
        path: "/seller",
        children: [
          {
            path: "/seller/create-product",
            element: (
              <Protected role="seller">
                <CreateProduct />,
              </Protected>
            ),
          },
          {
            path: "/seller/dashboard",
            element: (
              <Protected role="seller">
                <Dashboard />
              </Protected>
            ),
          },
          {
            path: "/seller/product/:productId",
            element: <SellerProductDetails />,
          },
        ],
      },
    ],
  },
]);
