/* eslint-disable react-refresh/only-export-components */
import { Link, NavLink } from "react-router";
import { Rocket, LogOut, ChevronLeft, ChevronRight, User } from "lucide-react";
import { getSidebarItems } from "../utils/getSidebarItems";
import { useProfileQuery } from "../redux/Api/user.api";

export const navLinkStyles = ({ isActive }) =>
  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group relative ${
    isActive
      ? "bg-primary text-white shadow-md shadow-primary/20"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
  }`;

const Sidebar = ({ isCollapsed, setIsCollapsed, user, onLogout }) => {
  const { data } = useProfileQuery();
  const menuItems = getSidebarItems(data?.data?.role);
  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border bg-background sticky top-0 h-screen transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2.5 overflow-hidden select-none"
        >
          <div className="bg-primary p-2 rounded-xl text-white shrink-0 shadow-sm">
            <Rocket size={18} />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-tight">
              Tour<span className="text-primary">Bee</span>
            </span>
          )}
        </Link>

        {/* Collapse Toggle Trigger */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground hidden md:block transition-colors absolute -right-3.5 top-4 shadow-sm z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Grouped Links Navigation Container */}
      <nav className="flex-1 p-3 space-y-6 overflow-y-auto mt-4 no-scrollbar">
        {menuItems.map((group) => (
          <div key={group.title} className="space-y-1.5">
            {/* Section Category Title Header */}
            {!isCollapsed ? (
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 select-none">
                {group.title}
              </h3>
            ) : (
              <div className="border-b border-border/60 mx-2 my-4" />
            )}

            {/* Inner Route Items Loop */}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className={navLinkStyles}
                    end
                  >
                    <Icon size={18} className="shrink-0" />
                    {!isCollapsed && <span>{item.title}</span>}

                    {/* Collapsed Hover Tooltips */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs font-semibold rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                        {item.title}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile Info Footer Block */}
      <div className="p-3 border-t border-border bg-muted/20 shrink-0">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl overflow-hidden ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-semibold border border-primary/20">
            {user?.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User size={16} />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-tight">
                {user?.name || "Explorer"}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {user?.email}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 mt-2 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all group ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut
            size={18}
            className="shrink-0 transition-transform group-hover:-translate-x-0.5"
          />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
