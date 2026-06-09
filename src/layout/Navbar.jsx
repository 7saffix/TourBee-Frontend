import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Rocket, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useProfileQuery, userApi } from "../redux/Api/user.api";
import { useLogOutMutation } from "../redux/Api/auth.api";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useProfileQuery();
  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      dispatch(userApi.util.resetApiState());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Dynamic class generator for active navigation states
  const linkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary font-semibold"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <nav className="w-full bg-background/95 backdrop-blur-md text-foreground border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary p-2 rounded-xl shadow-md transition-transform duration-300 group-hover:rotate-12">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Tour<span className="text-primary">Bee</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={linkStyles}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 min-w-[140px] justify-end">
            {data?.data?.email ? (
              <>
                {data?.data?.role == "USER" && (
                  <Link
                    to="/user"
                    className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary-light rounded-xl transition-all font-bold text-sm group"
                  >
                    <LayoutDashboard
                      size={18}
                      className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                    <span>Dashboard</span>
                  </Link>
                )}
                {data?.data?.role == "ADMIN" ||
                  (data?.data?.role == "SUPER_ADMIN" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2  p-2 text-primary hover:bg-primary-light rounded-xl transition-all font-bold text-sm group"
                    >
                      <LayoutDashboard
                        size={18}
                        className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                      />
                      <span>Dashboard</span>
                    </Link>
                  ))}
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary-light rounded-xl transition-all font-bold text-sm group"
                >
                  <LogOut
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <User size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all duration-200 active:scale-98"
                >
                  Get Start
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary-light/50 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Now hardware accelerated, smooth-transitioning, and floating */}
      <div
        className={`absolute top-full left-0 right-0 md:hidden border-b border-border bg-background shadow-xl transition-all duration-300 ease-out origin-top transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
            : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 sm:px-3 shadow-inner">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-border flex flex-col space-y-3 px-3">
            {data?.data?.email ? (
              <>
                {data?.data?.role == "USER" && (
                  <Link
                    to="/user"
                    className="flex items-center gap-2 px-4 py-2  hover:bg-primary-light rounded-xl transition-all font-bold text-sm group"
                  >
                    <LayoutDashboard
                      size={18}
                      className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                    />
                    <span>Dashboard</span>
                  </Link>
                )}
                {data?.data?.role == "ADMIN" ||
                  (data?.data?.role == "SUPER_ADMIN" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2  p-2  hover:bg-primary-light rounded-xl transition-all font-bold text-sm group"
                    >
                      <LayoutDashboard
                        size={18}
                        className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                      />
                      <span>Dashboard</span>
                    </Link>
                  ))}
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary-light rounded-xl transition-all font-bold text-sm group"
                >
                  <LogOut
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <User size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all duration-200 active:scale-98"
                >
                  Get Start
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
