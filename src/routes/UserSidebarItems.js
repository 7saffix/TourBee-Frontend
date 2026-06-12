import { Compass } from "lucide-react";
import MyBookings from "../pages/MyBooking";

export const UserSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "MY Bookings",
        url: "/user/my-bookings",
        component: MyBookings,
        icon: Compass,
      },
    ],
  },
];
