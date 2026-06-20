import {
  Map,
  Tags,
  MapPinned,
  CalendarCheck2,
  BarChart3,
  User2,
} from "lucide-react";
import TourList from "../pages/TourList";
import TourTypeList from "../pages/TourTypeList";
import DivisionList from "../pages/DivisionList";
import BookingList from "../pages/BookingList";
import Analytic from "../pages/Analytic";
import UserList from "../pages/UserList";

export const AdminSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytic,
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Tours",
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
  {
    title: "Bookings",
    items: [
      {
        title: "BookingList",
        url: "/admin/bookings",
        component: BookingList,
        icon: CalendarCheck2,
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        title: "UserList",
        url: "/admin/users",
        component: UserList,
        icon: User2,
      },
    ],
  },
];
