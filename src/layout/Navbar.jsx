// import { useState } from "react";
// import { Link, NavLink } from "react-router";
// import {
//   Rocket,
//   Menu,
//   X,
//   User,
//   LogOut,
//   LayoutDashboard,
//   Home,
//   Compass,
//   Info,
//   Phone,
// } from "lucide-react";
// import { useProfileQuery, userApi } from "../redux/Api/user.api";
// import { useLogOutMutation } from "../redux/Api/auth.api";
// import { useDispatch } from "react-redux";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { data } = useProfileQuery();
//   const [logOut] = useLogOutMutation();
//   const dispatch = useDispatch();

//   const handleLogOut = async () => {
//     try {
//       const res = await logOut();
//       dispatch(userApi.util.resetApiState());
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Added corresponding high-class icons to the array map
//   const navLinks = [
//     { name: "Home", path: "/", icon: Home },
//     { name: "Tours", path: "/tours", icon: Compass },
//     { name: "About Us", path: "/about", icon: Info },
//     { name: "Contact", path: "/contact", icon: Phone },
//   ];

//   // Refined style configuration supporting inline horizontal icon alignments
//   const linkStyles = ({ isActive }) =>
//     `relative text-sm font-medium tracking-wide transition-colors duration-300 py-1.5 px-1.5 select-none flex items-center gap-1.5 ${
//       isActive
//         ? "text-primary font-semibold"
//         : "text-muted-foreground/80 hover:text-foreground"
//     }`;

//   return (
//     <nav className="w-full bg-background/80 backdrop-blur-md text-foreground border-b border-border/60 sticky top-0 z-50 transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Brand Identity */}
//           <Link
//             to="/"
//             className="flex items-center gap-2.5 group focus:outline-none"
//           >
//             <div className="bg-primary text-background p-2 rounded-xl transition-all duration-300 group-hover:bg-primary-hover group-hover:text-white shadow-2xs">
//               <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
//             </div>
//             <span className="font-bold text-lg tracking-tight transition-colors">
//               Tour<span className="text-primary font-medium">Bee</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation Links with Integrated Icons */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navLinks.map((link) => {
//               const LinkIcon = link.icon;
//               return (
//                 <NavLink key={link.name} to={link.path} className={linkStyles}>
//                   <LinkIcon size={15} className="opacity-80" />
//                   <span>{link.name}</span>
//                 </NavLink>
//               );
//             })}
//           </div>

//           {/* Premium Right Side Menu Controls */}
//           <div className="hidden md:flex items-center space-x-3 min-w-[140px] justify-end">
//             {data?.data?.email ? (
//               <>
//                 {data?.data?.role == "USER" && (
//                   <Link
//                     to="/user"
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-foreground border border-border/50 hover:border-foreground/20 rounded-xl bg-muted/20 transition-all font-semibold text-xs group focus:outline-none"
//                   >
//                     <LayoutDashboard
//                       size={14}
//                       className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 text-muted-foreground/70 group-hover:text-foreground"
//                     />
//                     <span>Dashboard</span>
//                   </Link>
//                 )}
//                 {(data?.data?.role == "ADMIN" ||
//                   data?.data?.role == "SUPER_ADMIN") && (
//                   <Link
//                     to="/admin"
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-foreground border border-border/50 hover:border-foreground/20 rounded-xl bg-muted/20 transition-all font-semibold text-xs group focus:outline-none"
//                   >
//                     <LayoutDashboard
//                       size={14}
//                       className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 text-muted-foreground/70 group-hover:text-foreground"
//                     />
//                     <span>Dashboard</span>
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogOut}
//                   className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-destructive bg-destructive/[0.03] hover:bg-destructive/10 border border-destructive/10 rounded-xl transition-all font-semibold text-xs group focus:outline-none"
//                 >
//                   <LogOut
//                     size={14}
//                     className="group-hover:-translate-x-0.5 transition-transform duration-300"
//                   />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
//                 >
//                   <User size={15} className="text-muted-foreground/60" />
//                   Sign in
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-foreground hover:bg-foreground/90 text-background text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-2xs"
//                 >
//                   Get started
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Refined Mobile Navigation Toggle Button */}
//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all focus:outline-none"
//               aria-label="Toggle navigation menu"
//             >
//               {isOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Clean Drawer Menu overlay */}
//       <div
//         className={`absolute top-full left-0 right-0 md:hidden border-b border-border bg-background shadow-xl transition-all duration-300 ease-out origin-top transform ${
//           isOpen
//             ? "opacity-100 translate-y-0 pointer-events-auto"
//             : "opacity-0 -translate-y-2 pointer-events-none"
//         }`}
//       >
//         <div className="px-4 pt-3 pb-6 space-y-1.5">
//           {navLinks.map((link) => {
//             const LinkIcon = link.icon;
//             return (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2.5 ${
//                     isActive
//                       ? "bg-muted text-foreground font-semibold"
//                       : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
//                   }`
//                 }
//               >
//                 <LinkIcon size={16} />
//                 <span>{link.name}</span>
//               </NavLink>
//             );
//           })}

//           <div className="pt-4 mt-2 border-t border-border/60 flex flex-col space-y-2">
//             {data?.data?.email ? (
//               <>
//                 {data?.data?.role == "USER" && (
//                   <Link
//                     to="/user"
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-muted/40"
//                   >
//                     <LayoutDashboard size={16} />
//                     <span>Dashboard</span>
//                   </Link>
//                 )}
//                 {(data?.data?.role == "ADMIN" ||
//                   data?.data?.role == "SUPER_ADMIN") && (
//                   <Link
//                     to="/admin"
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-muted/40"
//                   >
//                     <LayoutDashboard size={16} />
//                     <span>Dashboard</span>
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     handleLogOut();
//                     setIsOpen(false);
//                   }}
//                   className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-sm text-destructive font-medium rounded-xl hover:bg-destructive/5 text-left"
//                 >
//                   <LogOut size={16} />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <div className="flex flex-col gap-2 pt-1">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full text-center px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground border border-border hover:text-foreground transition-all"
//                 >
//                   Sign in
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full text-center bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold transition-all"
//                 >
//                   Get started
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  Rocket,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Home,
  Compass,
  Info,
} from "lucide-react";
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
    { name: "Home", path: "/", icon: Home },
    { name: "Tours", path: "/tours", icon: Compass },
    { name: "About Us", path: "/about", icon: Info },
    // { name: "Contact", path: "/contact", icon: Phone },
  ];

  const linkStyles = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 py-1.5 px-1.5 select-none flex items-center gap-1.5 ${
      isActive
        ? "text-primary font-semibold"
        : "text-muted-foreground/80 hover:text-foreground"
    }`;

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md text-foreground border-b border-border/60 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="bg-primary text-background p-2 rounded-xl transition-all duration-300 group-hover:bg-primary-hover group-hover:text-white shadow-2xs">
              <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="font-bold text-lg tracking-tight transition-colors">
              Tour<span className="text-primary font-medium">Bee</span>
            </span>
          </Link>

          {/* Right Group: Combined Desktop NavLinks and Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Navigation Links aligned right beside login button */}
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={linkStyles}
                  >
                    <LinkIcon size={15} className="opacity-80" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Right Side Menu Controls */}
            <div className="flex items-center space-x-4 min-w-[140px] justify-end">
              {data?.data?.email ? (
                <>
                  {(data?.data?.role === "USER" ||
                    data?.data?.role === "ADMIN" ||
                    data?.data?.role === "SUPER_ADMIN") && (
                    <Link
                      to={data?.data?.role === "USER" ? "/user" : "/admin"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-foreground border border-border/50 hover:border-foreground/20 rounded-xl bg-muted/20 transition-all font-semibold text-xs group focus:outline-none"
                    >
                      <LayoutDashboard
                        size={14}
                        className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 text-muted-foreground/70 group-hover:text-foreground"
                      />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogOut}
                    className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-destructive bg-destructive/[0.03] hover:bg-destructive/10 border border-destructive/10 rounded-xl transition-all font-semibold text-xs group focus:outline-none"
                  >
                    <LogOut
                      size={14}
                      className="group-hover:-translate-x-0.5 transition-transform duration-300"
                    />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <User size={15} className="text-muted-foreground/60" />
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary hover:bg-primary-hover text-background text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-2xs"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Drawer Menu overlay - Restored precisely to top layout structure */}
      <div
        className={`absolute top-full left-0 right-0 md:hidden border-b border-border bg-background shadow-xl transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1.5">
          {navLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2.5 ${
                    isActive
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`
                }
              >
                <LinkIcon size={16} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-2 border-t border-border/60 flex flex-col space-y-2">
            {data?.data?.email ? (
              <>
                {data?.data?.role == "USER" && (
                  <Link
                    to="/user"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-muted/40"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                )}
                {(data?.data?.role == "ADMIN" ||
                  data?.data?.role == "SUPER_ADMIN") && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-muted/40"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-sm text-destructive font-medium rounded-xl hover:bg-destructive/5 text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground border border-border hover:text-foreground transition-all"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-primary text-background px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
