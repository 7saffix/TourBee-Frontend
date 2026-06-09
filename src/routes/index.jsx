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

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...generateRoutes(UserSideBarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/tours" /> },
      ...generateRoutes(AdminSideBarItems),
    ],
  },

  {
    Component: Login,
    path: "login",
  },
  {
    Component: Register,
    path: "register",
  },
]);

export default router;
