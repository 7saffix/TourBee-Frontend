import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { Rocket, Menu, X, LogOut } from "lucide-react";

import Sidebar, { navLinkStyles } from "./Sidebar";
import { useProfileQuery } from "../redux/Api/user.api";
import { getSidebarItems } from "../utils/getSidebarItems";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data } = useProfileQuery();
  const navigate = useNavigate();

  const user = data?.data;
  const menuItems = getSidebarItems(user?.role);

  const handleLogout = async () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-background flex text-foreground antialiased">
      {/* Desktop Sidebar Frame */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        user={user}
        onLogout={handleLogout}
      />

      {/* Core Body Container Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header Top Block */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-border bg-background/95 backdrop-blur-md md:hidden shrink-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Rocket size={16} />
            </div>
            <span className="font-bold text-md tracking-tight">TourBee</span>
          </Link>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Flyout Backdrop Cover Panel */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* 📱 MOBILE NAVIGATION SLIDE OUT DRAWER MENU */}
        <div
          className={`fixed top-16 bottom-0 left-0 w-64 bg-background border-r border-border z-40 p-4 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Grouped Mobile Navigation Links */}
          <nav className="space-y-5 overflow-y-auto pr-1">
            {menuItems.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.title}
                        to={item.url}
                        className={navLinkStyles}
                        onClick={() => setIsMobileOpen(false)}
                        end
                      >
                        <Icon size={18} className="shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Profile Actions Card Footer */}
          <div className="pt-4 border-t border-border bg-background shrink-0">
            <div className="flex items-center gap-3 p-2 mb-3 rounded-xl bg-muted/30">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "E"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate leading-none">
                  {user?.name || "Explorer"}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-1.5">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut size={18} />
              <span>Logout Account</span>
            </button>
          </div>
        </div>

        {/* Nested Content Router Component Port */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
