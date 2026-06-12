import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useGetMyBookingsQuery } from "../redux/Api/booking.api";

const MyBookings = () => {
  const { data: bookingResponse, isLoading, error } = useGetMyBookingsQuery();
  const bookings = bookingResponse?.data || [];
  console.log(bookings);

  // Status mapping configuration matrix for tag styling
  const statusConfig = {
    PENDING: {
      style: "bg-amber-500/5 text-amber-500 border-amber-500/20",
      icon: Clock,
    },
    COMPLETED: {
      style: "bg-emerald-500/5 text-emerald-500 border-emerald-500/20",
      icon: CheckCircle2,
    },
    REJECTED: {
      style: "bg-destructive/5 text-destructive border-destructive/20",
      icon: AlertCircle,
    },
  };

  const proceedPending = (id) => {
    console.log(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Querying Booking Matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-sm text-destructive font-light">
        Failed to synchronize remote booking records.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl tracking-tight font-medium mb-1">
          My Bookings
        </h1>
        <p className="text-xs text-muted-foreground font-light">
          Archived and active travel itineraries associated with your account
          configuration.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-12 text-center">
          <p className="text-sm text-muted-foreground font-light">
            No active booking instances located.
          </p>
        </div>
      ) : (
        /* Bookings Grid Layout */
        <div className="grid grid-cols-1 gap-2">
          {bookings.map((booking) => {
            const status = booking.status?.toUpperCase() || "PENDING";
            const config = statusConfig[status] || {
              style: "bg-muted text-foreground border-border",
              icon: HelpCircle,
            };
            const StatusIcon = config.icon;

            // Format ISO datetime string to localized clean framework
            const bookingDate = new Date(booking.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            );

            return (
              <div
                key={booking._id}
                className="border border-border rounded-2xl bg-muted/[0.02] hover:bg-muted/[0.04] transition-colors p-5 flex flex-col justify-between space-y-5"
              >
                {/* Meta Header Group */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium text-base tracking-tight leading-snug">
                      {booking.tour?.title || "Unknown Destination"}
                    </h3>
                  </div>

                  {/* Status Node Tag */}
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-lg flex items-center gap-1.5 shrink-0 ${config.style}`}
                  >
                    <StatusIcon size={12} />
                    {status}
                  </span>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin size={14} className="opacity-70" />
                    <span className="text-xs font-medium truncate">
                      {booking.tour?.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar size={14} className="opacity-70" />
                    <span className="text-xs font-medium">{bookingDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground">
                    <Users size={14} className="opacity-70" />
                    <span className="text-xs font-medium">
                      {booking.guestCount}{" "}
                      {booking.guestCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <span className="text-xs font-mono ">
                      ৳
                      {(
                        (booking.tour?.costForm || 0) * booking.guestCount
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Separation Node Rule */}
                <hr className="border-border/50 border-dashed" />

                {/* Interaction Footer Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-[10px] text-muted-foreground/60 font-mono">
                    Updated:{" "}
                    {new Date(booking.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <button
                    disabled={status === "COMPLETED"}
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 h-8 rounded-xl transition-all border select-none ${
                      status === "COMPLETED"
                        ? "border-emerald-500/10 bg-emerald-500/[0.02] text-emerald-500/60 cursor-not-allowed"
                        : "border-border hover:border-foreground/20 hover:bg-muted text-foreground cursor-pointer"
                    }`}
                    onClick={() => proceedPending(booking._id)}
                  >
                    {status === "COMPLETED"
                      ? "Payment Settled"
                      : "Proceed to Pay"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
