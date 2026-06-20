import { useState, useMemo } from "react";
import {
  Search,
  Shield,
  User,
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useGetAllUsersQuery } from "../redux/Api/user.api";

const UserList = () => {
  const { data: response, isLoading, isError } = useGetAllUsersQuery(undefined);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  //   const [activeDropdown, setActiveDropdown] = useState(null);

  const usersList = response?.data || [];
  const totalCount = response?.meta?.total || usersList.length;

  // 3. Process calculations using real state changes
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        (user.phone && user.phone.includes(search));

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [usersList, search, roleFilter]);

  const getRoleBadge = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs  font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldAlert size={12} /> SUPER ADMIN
          </span>
        );
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs  font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Shield size={12} /> ADMIN
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs  font-bold bg-muted text-muted-foreground border border-border">
            <User size={12} /> USER
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Block */}
        <div>
          <h1 className="text-xl font-bold  tracking-tight">User Management</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review accounts, check verification logs, and manage structural
            roles.
          </p>
        </div>

        {/* Filters Matrix */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/10 border border-border rounded-xl p-4">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={14}
            />
            <input
              type="text"
              placeholder="Search name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs  focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs  text-muted-foreground whitespace-nowrap">
              Filter Role:
            </span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs  focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="ALL">All Accounts</option>
              <option value="SUPER_ADMIN">Super Admins</option>
              <option value="ADMIN">Admins</option>
              <option value="USER">Standard Users</option>
            </select>
          </div>
        </div>

        {/* Data Layout Grid Table Container */}
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/10 text-muted-foreground  text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-5 font-semibold">User Info</th>
                  <th className="py-3 px-5 font-semibold">Security Role</th>
                  <th className="py-3 px-5 font-semibold">Status Flags</th>
                  <th className="py-3 px-5 font-semibold">Registered</th>
                  {/* <th className="py-3 px-5 font-semibold text-right">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60  text-xs">
                {/* A. Loading State */}
                {isLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-muted-foreground text-xs "
                    >
                      <span className="inline-block animate-pulse">
                        Syncing user database registry...
                      </span>
                    </td>
                  </tr>
                )}

                {/* B. Error Catch State */}
                {isError && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-destructive text-xs "
                    >
                      Error pipeline failed to retrieve user logs.
                    </td>
                  </tr>
                )}

                {/* C. Successful Content Data Mapping */}
                {!isLoading &&
                  !isError &&
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-muted/5 transition-colors group"
                    >
                      <td className="py-3.5 px-5 space-y-1">
                        <div className="font-bold text-foreground flex items-center gap-1.5">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex flex-col gap-0.5">
                          <span className="flex items-center gap-1">
                            <Mail size={10} /> {user.email}
                          </span>
                          {user.phone && (
                            <span className="flex items-center gap-1 text-primary">
                              <Phone size={10} /> {user.phone}
                            </span>
                          )}
                          {user.address && (
                            <span className="flex items-center gap-1">
                              <MapPin size={10} /> {user.address}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-5 vertical-middle">
                        {getRoleBadge(user.role)}
                      </td>

                      <td className="py-3.5 px-5 space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-[11px]">
                            {user.isVerified ? (
                              <span className="text-emerald-500 flex items-center gap-1">
                                <CheckCircle size={11} /> Verified
                              </span>
                            ) : (
                              <span className="text-muted-foreground flex items-center gap-1">
                                <XCircle size={11} /> Unverified
                              </span>
                            )}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px]">
                            {user.isActive === "ACTIVE" ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground inline-block" />
                            )}
                            <span className="text-[11px] uppercase">
                              {user.isActive || "INACTIVE"}
                            </span>
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-muted-foreground text-[11px]">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      {/* <td className="py-3.5 px-5 text-right relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === user._id ? null : user._id,
                            )
                          }
                          className="p-1.5 hover:bg-muted rounded-md border border-transparent hover:border-border transition-colors inline-block"
                        >
                          <MoreVertical
                            size={14}
                            className="text-muted-foreground"
                          />
                        </button>

                        {activeDropdown === user._id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveDropdown(null)}
                            />
                            <div className="absolute right-5 mt-1 w-40 bg-background border border-border rounded-lg shadow-lg py-1 z-20 text-left">
                              <button className="w-full px-3 py-1.5 hover:bg-muted transition-colors flex items-center gap-2 text-left text-xs ">
                                <Shield size={12} className="text-primary" />{" "}
                                Modify Role
                              </button>
                              <button className="w-full px-3 py-1.5 hover:bg-muted text-amber-500 transition-colors flex items-center gap-2 text-left text-xs ">
                                <UserX size={12} /> Suspend User
                              </button>
                              <hr className="border-border my-1" />
                              <button className="w-full px-3 py-1.5 hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-2 text-left text-xs ">
                                <Trash2 size={12} /> Remove Account
                              </button>
                            </div>
                          </>
                        )}
                      </td> */}
                    </tr>
                  ))}

                {/* D. Empty Query Results State */}
                {!isLoading && !isError && filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-muted-foreground text-xs "
                    >
                      No matching records found in database registry.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Meta Summary Bar */}
          <div className="p-4 bg-muted/5 border-t border-border flex items-center justify-between  text-[11px] text-muted-foreground">
            <span>
              Showing {filteredUsers.length} of {totalCount} registered users
            </span>
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />{" "}
              Live Pipeline Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
