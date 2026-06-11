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
