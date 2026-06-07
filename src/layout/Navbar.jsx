import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Rocket, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Clean helper array for navigation links
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
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <User size={16} />
              Login
            </Link>
            <Link
              to="/tours"
              className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all duration-200 active:scale-98"
            >
              Book Now
            </Link>
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

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background animate-in fade-in slide-in-from-top-5 duration-200">
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
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-2"
              >
                <User size={18} />
                Login / Account
              </Link>
              <Link
                to="/tours"
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary-hover text-white text-center font-semibold py-2.5 rounded-xl shadow-md transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
