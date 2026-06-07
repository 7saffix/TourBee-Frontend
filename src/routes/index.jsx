import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";

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
]);

export default router;
