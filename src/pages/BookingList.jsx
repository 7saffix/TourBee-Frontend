import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Loader2,
  MapPin,
  Mail,
} from "lucide-react";
import { useGetAllBookingsQuery } from "../redux/Api/booking.api";

const BookingList = () => {
  // Filters & UI Control States
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetching live populated server data
  const {
    data: bookingResponse,
    isLoading,
    isError,
    error,
  } = useGetAllBookingsQuery();
  const bookings = bookingResponse?.data || [];

  // Semantic layout badge mapping for Booking Statuses
  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 ">
            <CheckCircle2 size={12} /> COMPLETED
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 ">
            <Clock size={12} /> PENDING
          </span>
        );
      case "CANCEL":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 ">
            <XCircle size={12} /> CANCELLED
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 ">
            <AlertTriangle size={12} /> FAILED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground border border-border ">
            {status}
          </span>
        );
    }
  };

  // Micro layout badge mapping for Gateway Payment Statuses
  const getPaymentBadge = (status) => {
    switch (status) {
      case "PAID":
        return (
          <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">
            Paid
          </span>
        );
      case "UNPAID":
        return (
          <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
            Unpaid
          </span>
        );
      case "CANCELED":
        return (
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
            Canceled
          </span>
        );
      case "FAILED":
        return (
          <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
            Failed
          </span>
        );
      default:
        return (
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
            {status}
          </span>
        );
    }
  };

  // Multi-field Client Side Filtering Rules
  const filteredBookings = bookings
    .filter((booking) => {
      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      const searchTarget = searchQuery.toLowerCase();
      const matchesSearch =
        booking._id?.toLowerCase().includes(searchTarget) ||
        booking.user?.name?.toLowerCase().includes(searchTarget) ||
        booking.user?.email?.toLowerCase().includes(searchTarget) ||
        booking.tour?.title?.toLowerCase().includes(searchTarget) ||
        booking.payment?.transactionId?.toLowerCase().includes(searchTarget);

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Calculate gross summary values from filtered entries
  const totalGuests = filteredBookings.reduce(
    (sum, item) => sum + (item.guestCount || 0),
    0,
  );
  const totalRevenue = filteredBookings
    .filter((b) => b.payment?.status === "PAID")
    .reduce((sum, item) => sum + (item.payment?.amount || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs  text-muted-foreground uppercase tracking-widest">
          Querying backend ledger...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3 p-4">
        <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
        <h3 className="text-sm font-bold  text-foreground uppercase tracking-wider">
          Sync Error
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm text-center">
          {error?.data?.message ||
            error?.message ||
            "An error occurred while fetching system logs."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Metrics Aggregator */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-border pb-5 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight ">
              Booking Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Trace server logs, verify transactional flow tokens, and audit
              platform reservations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 bg-muted/30 border border-border p-3 rounded-xl  text-xs self-start lg:self-auto">
            <div className="text-left px-1">
              <span className="text-muted-foreground block uppercase text-[9px] font-bold tracking-wider">
                Records
              </span>
              <span className="text-sm font-bold text-primary">
                {filteredBookings.length} units
              </span>
            </div>
            <div className="w-[1px] h-6 bg-border/60 mx-1 hidden sm:block"></div>
            <div className="text-left px-1">
              <span className="text-muted-foreground block uppercase text-[9px] font-bold tracking-wider">
                Seats Reserved
              </span>
              <span className="text-sm font-bold text-foreground">
                {totalGuests} spots
              </span>
            </div>
            <div className="w-[1px] h-6 bg-border/60 mx-1 hidden sm:block"></div>
            <div className="text-left px-1">
              <span className="text-muted-foreground block uppercase text-[9px] font-bold tracking-wider">
                Collected Revenue
              </span>
              <span className="text-sm font-bold text-emerald-500">
                BDT {totalRevenue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Operational Query Bars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="relative md:col-span-6 group">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Filter by Passenger, Tour Title, Reference Hash, Txn ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/20 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm  placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:bg-background transition-all"
            />
          </div>

          <div className="relative md:col-span-3 flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2.5 text-sm  focus:outline-none focus:border-primary focus:bg-background transition-all cursor-pointer"
            >
              <option value="ALL">All Status Blocks</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCEL">Cancelled</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="md:col-span-3 flex items-center justify-center gap-2 w-full bg-muted/20 hover:bg-muted/40 text-foreground border border-border rounded-xl py-2.5 px-4 text-sm  transition-colors active:scale-[0.99]"
          >
            <ArrowUpDown size={14} />
            <span>
              Sort: {sortOrder === "desc" ? "Newest Logs" : "Oldest Logs"}
            </span>
          </button>
        </div>

        {/* Dense System Logs Layout Data Matrix */}
        <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-muted-foreground  text-xs uppercase tracking-wider">
                  <th className="py-4 px-5 font-semibold">
                    Passenger / Account
                  </th>
                  <th className="py-4 px-5 font-semibold">
                    Destination Product
                  </th>
                  <th className="py-4 px-5 font-semibold text-center">Seats</th>
                  <th className="py-4 px-5 font-semibold">
                    Financial Clearance
                  </th>
                  <th className="py-4 px-5 font-semibold">Workflow Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-muted/10 transition-colors group align-middle"
                    >
                      {/* Column 2: User Account Metadata */}
                      <td className="py-4 px-5">
                        <div className=" text-xs">
                          <span className="text-foreground font-semibold block capitalize truncate max-w-[150px]">
                            {booking.user?.name || "Malformed Identity"}
                          </span>
                          <span className="text-muted-foreground text-[10px] flex items-center gap-1 mt-0.5 truncate max-w-[180px]">
                            <Mail size={10} className="shrink-0" />{" "}
                            {booking.user?.email}
                          </span>
                        </div>
                      </td>

                      {/* Column 3: Tour Information Block */}
                      <td className="py-4 px-5">
                        <div className="text-xs">
                          <span
                            className="text-foreground font-medium  block truncate max-w-[200px]"
                            title={booking.tour?.title}
                          >
                            {booking.tour?.title || "Unknown Tour"}
                          </span>
                          <span className="text-[10px] text-muted-foreground  flex items-center gap-0.5 mt-0.5">
                            <MapPin size={10} />{" "}
                            {booking.tour?.location || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Column 4: Allocation Metric */}
                      <td className="py-4 px-5 text-center  font-medium">
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <Users
                            size={13}
                            className="text-muted-foreground/60"
                          />
                          <span>{booking.guestCount || 0}</span>
                        </div>
                      </td>

                      {/* Column 5: Populate Invoice / Financial Metrics */}
                      <td className="py-4 px-5  text-xs">
                        <div className="flex flex-col">
                          <span className="text-foreground font-semibold flex items-center gap-0.5">
                            BDT{" "}
                            {(booking.payment?.amount || 0).toLocaleString()}
                          </span>
                          <span
                            className="mt-0.5 text-[10px] block"
                            title={booking.payment?.transactionId}
                          >
                            {getPaymentBadge(booking.payment?.status)}
                          </span>
                        </div>
                      </td>

                      {/* Column 6: Status Profiler */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Layout Empty Fallback Exception */
                  <tr>
                    <td
                      colSpan={7}
                      className="py-14 px-5 text-center text-muted-foreground "
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangle
                          className="text-muted-foreground/30 animate-pulse"
                          size={24}
                        />
                        <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
                          No logs found matching filter boundaries.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
