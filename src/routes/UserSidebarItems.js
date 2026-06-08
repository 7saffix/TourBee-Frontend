import { Compass } from "lucide-react";
import Booking from "../pages/Booking";

export const UserSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "MY Bookings",
        url: "/user/booking",
        component: Booking,
        icon: Compass,
      },
    ],
  },
];
