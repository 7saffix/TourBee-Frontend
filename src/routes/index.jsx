import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
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
