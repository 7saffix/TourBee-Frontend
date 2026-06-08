import { AdminSideBarItems } from "../routes/AdminSidebarItems";
import { UserSideBarItems } from "../routes/UserSidebarItems";

export const getSidebarItems = (role) => {
  switch (role) {
    case "USER":
      return [...UserSideBarItems];

    case "ADMIN":
      return [...AdminSideBarItems];

    case "SUPER_ADMIN":
      return [...AdminSideBarItems];

    default:
      return [];
  }
};
