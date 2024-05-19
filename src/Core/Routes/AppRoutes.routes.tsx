import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.routes";

const Layout = React.lazy(() => import("@Layout/index"));
const HomePage = React.lazy(() => import("@Pages/Home/index"));
const AdvertisementsPage = React.lazy(() => import("@Pages/Advertisements"));
const LoginPage = React.lazy(() => import("@Pages/Authentication/index"));
const DiscountsPage = React.lazy(() => import("@Pages/Discounts/index"));
const CategoriesPage = React.lazy(() => import("@Pages/Categories/index"));
const RolesPage = React.lazy(() => import("@Pages/Roles/index"));
const OperatorsPage = React.lazy(() => import("@Pages/Operators/index"));
const ProductsPage = React.lazy(() => import("@Pages/Products/index"));
const NotAuthorizedPage = React.lazy(
  () => import("@Pages/NotAuthorized/index")
);
const NotFoundPage = React.lazy(() => import("@Pages/PageNotFound/index"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/roles",
        element: (
          <ProtectedRoute
            requiredPermission="viewRole"
            children={
              <Suspense fallback={<></>}>
                <RolesPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/operators",
        element: (
          <ProtectedRoute
            requiredPermission="viewOperator"
            children={
              <Suspense fallback={<></>}>
                <OperatorsPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/advertisements",
        element: (
          <ProtectedRoute
            requiredPermission="viewAd"
            children={
              <Suspense fallback={<></>}>
                <AdvertisementsPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/discounts",
        element: (
          <ProtectedRoute
            requiredPermission="viewDiscount"
            children={
              <Suspense fallback={<></>}>
                <DiscountsPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute
            requiredPermission="viewCategory"
            children={
              <Suspense fallback={<></>}>
                <CategoriesPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute
            requiredPermission="viewProduct"
            children={
              <Suspense fallback={<></>}>
                <ProductsPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/not-authorized",
        element: (
          <Suspense fallback={<></>}>
            <NotAuthorizedPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<></>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: sessionStorage.getItem("token") ? (
      <Navigate to="/" />
    ) : (
      <Suspense fallback={<></>}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export default router;
