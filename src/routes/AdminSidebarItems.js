import { Compass } from "lucide-react";
import Tours from "../pages/Tours";

export const AdminSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Tours",
        url: "/admin/tours",
        component: Tours,
        icon: Compass,
      },
    ],
  },
];
