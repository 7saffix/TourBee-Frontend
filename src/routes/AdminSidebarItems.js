import { Map, Tags, MapPinned } from "lucide-react";
import TourList from "../pages/TourList";
import TourTypeList from "../pages/TourTypeList";
import DivisionList from "../pages/DivisionList";

export const AdminSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Tours",
        url: "/admin/tours",
        component: TourList,
        icon: Map,
      },
      {
        title: "Tour Types",
        url: "/admin/tour-types",
        component: TourTypeList,
        icon: Tags,
      },
      {
        title: "Tour Division",
        url: "/admin/division",
        component: DivisionList,
        icon: MapPinned,
      },
    ],
  },
];
