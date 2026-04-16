import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import Profile from "../features/auth/pages/Profile";
import Dashboard from "../features/buyer/dashboard/pages/Dashboard";
import SellerLayout from "../features/seller/dashboard/layout/SellerLayout";
import SellerDashboardHome from "../features/seller/dashboard/pages/SellerDashboardHome";
import ProductsPage from "../features/seller/dashboard/pages/ProductsPage";
import CategoriesPage from "../features/seller/dashboard/pages/CategoriesPage";
import ProductVariantsPage from "../features/seller/dashboard/pages/ProductVariantsPage";
import ProductDetailsPage from "../features/buyer/dashboard/pages/ProductDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailsPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      {
        path: "dashboard",
        element: <SellerDashboardHome />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "variants",
        element: <ProductVariantsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);