import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Loader } from "lucide-react";

import Protected from "../features/auth/components/Protected";
import AppLayout from "./AppLayout";

// Lazy loaded pages
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));

const Home = lazy(() => import("../features/products/pages/Home"));
const ProductDetails = lazy(
  () => import("../features/products/pages/ProductDetails"),
);

const Cart = lazy(() => import("../features/cart/pages/Cart"));
const OrderSuccess = lazy(() => import("../features/cart/pages/OrderSuccess"));

const WishList = lazy(() => import("../features/like/pages/WishList"));

const CreateProduct = lazy(
  () => import("../features/products/pages/CreateProduct"),
);
const Dashboard = lazy(() => import("../features/products/pages/Dashboard"));
const SellerProductDetails = lazy(
  () => import("../features/products/pages/SellerProductDetails"),
);

const LoaderFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Loader className="animate-spin" />
  </div>
);

const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<LoaderFallback />}>{component}</Suspense>
);

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/register",
    element: withSuspense(<Register />),
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(<Home />),
      },
      {
        path: "/wishlist",
        element: withSuspense(<WishList />),
      },
      {
        path: "/product/:productId",
        element: withSuspense(<ProductDetails />),
      },
      {
        path: "/cart",
        element: withSuspense(
          <Protected>
            <Cart />
          </Protected>,
        ),
      },
      {
        path: "/order-success",
        element: withSuspense(
          <Protected>
            <OrderSuccess />
          </Protected>,
        ),
      },
      {
        path: "/seller/create-product",
        element: withSuspense(
          <Protected role="seller">
            <CreateProduct />
          </Protected>,
        ),
      },
      {
        path: "/seller/dashboard",
        element: withSuspense(
          <Protected role="seller">
            <Dashboard />
          </Protected>,
        ),
      },
      {
        path: "/seller/product/:productId",
        element: withSuspense(<SellerProductDetails />),
      },
    ],
  },
]);
