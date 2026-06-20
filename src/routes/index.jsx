import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layout/DashboardLayout";
import { UserSideBarItems } from "./UserSidebarItems";
import { generateRoutes } from "../utils/generateRoutes";
import { AdminSideBarItems } from "./AdminSidebarItems";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure";
import PaymentCancel from "../pages/PaymentCancel";
import AuthCheck from "../utils/AuthCheck";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
    ],
  },
  {
    Component: AuthCheck(DashboardLayout, ["USER"]),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/my-bookings" /> },
      ...generateRoutes(UserSideBarItems),
    ],
  },
  {
    Component: AuthCheck(DashboardLayout, ["ADMIN", "SUPER_ADMIN"]),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(AdminSideBarItems),
    ],
  },

  {
    Component: AuthCheck(Checkout),
    path: "/checkout",
  },
  {
    Component: AuthCheck(PaymentSuccess),
    path: "/payment/success",
  },
  {
    Component: AuthCheck(PaymentFailure),
    path: "/payment/fail",
  },
  {
    Component: AuthCheck(PaymentCancel),
    path: "/payment/cancel",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);

export default router;
