// import { createBrowserRouter } from "react-router";
// import Protected from "../features/auth/components/Protected";
// import Login from "../features/auth/pages/Login";
// import Register from "../features/auth/pages/Register";
// import Cart from "../features/cart/pages/Cart";
// import CreateProduct from "../features/products/pages/CreateProduct";
// import Dashboard from "../features/products/pages/Dashboard";
// import Home from "../features/products/pages/Home";
// import ProductDetails from "../features/products/pages/ProductDetails";
// import SellerProductDetails from "../features/products/pages/SellerProductDetails";
// import AppLayout from "./AppLayout";
// import WishList from "../features/like/pages/WishList";
// import OrderSuccess from "../features/cart/pages/OrderSuccess";
// import { lazy, Suspense } from "react";
// import { Loader } from "lucide-react";

// const login = lazy(() => import("../features/auth/pages/Login"));
// export const routes = createBrowserRouter([
//   {
//     path: "/login",
//     element: (
//       <Suspense fallback={<Loader />}>
//         <Login />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },

//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/wishlist",
//         element: <WishList />,
//       },
//       {
//         path: "/product/:productId",
//         element: <ProductDetails />,
//       },

//       {
//         path: "/cart",
//         element: (
//           <Protected>
//             <Cart />
//           </Protected>
//         ),
//       },
//       {
//         path: "/order-success",
//         element: (
//           <Protected>
//             <OrderSuccess />
//           </Protected>
//         ),
//       },

//       {
//         path: "/seller",
//         children: [
//           {
//             path: "/seller/create-product",
//             element: (
//               <Protected role="seller">
//                 <CreateProduct />,
//               </Protected>
//             ),
//           },
//           {
//             path: "/seller/dashboard",
//             element: (
//               <Protected role="seller">
//                 <Dashboard />
//               </Protected>
//             ),
//           },
//           {
//             path: "/seller/product/:productId",
//             element: <SellerProductDetails />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

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
