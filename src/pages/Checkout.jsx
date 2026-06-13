import { useLocation, useNavigate } from "react-router";
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Users,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const bookingData = location.state?.booking;
  const paymentUrl = location.state?.paymentUrl;

  if (!bookingData) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <ShieldAlert className="text-primary mb-2" size={32} />
        <h3 className="font-serif text-lg font-medium">
          No Active Session Found
        </h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs text-center">
          We couldn't parse an active checkout sequence. Please return to your
          intended tour route.
        </p>
        <button
          onClick={() => navigate("/tours")}
          className="mt-4 text-xs font-bold bg-foreground text-background px-4 py-2 rounded-xl"
        >
          Return to Matrix Base
        </button>
      </div>
    );
  }

  const { tour, guestCount, payment, user } = bookingData;

  const handlePayNow = () => {
    if (paymentUrl) {
      setIsProcessing(true);
      window.location.href = paymentUrl;
    } else {
      alert(
        "Payment gateway URL missing. Please recreate your booking instance.",
      );
    }
  };

  return (
    <main className="w-full min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Backtrack Control */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>Back to Configuration</span>
        </button>

        {/* Step Status Indicator Banner */}
        <div className="border border-border/60 rounded-2xl p-5 bg-muted/[0.03] flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-foreground">
              Booking Order Reserved
            </h2>
            <p className="text-xs text-muted-foreground font-light">
              Your seat layout is logged as{" "}
              <span className="font-mono text-primary font-medium">
                PENDING
              </span>
              . Finalize transaction matrix to lock verification.
            </p>
          </div>
        </div>

        {/* Main Split Checkout Breakdown Layer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Invoice Structure Section (Left Column) */}
          <div className="md:col-span-3 space-y-6 border border-border/80 rounded-2xl p-6 bg-background">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground/80 tracking-widest uppercase block">
                Invoice Node ID: {bookingData._id?.slice(-8).toUpperCase()}
              </span>
              <h3 className="font-serif text-xl tracking-tight font-normal">
                {tour?.title}
              </h3>
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} className="text-primary" />
                <span>{tour?.location || "Global Node"}</span>
              </p>
            </div>

            <hr className="border-border/60" />

            {/* Client Context Details */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                Lead Explorer Profile
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground/70 font-light">Name</p>
                  <p className="font-semibold mt-0.5 text-foreground capitalize">
                    {user?.name}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground/70 font-light">
                    Email Address
                  </p>
                  <p className="font-semibold mt-0.5 text-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-border/60" />

            {/* Metric Allocations */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                Deployment Meta
              </h4>
              <div className="flex items-center gap-6 text-xs">
                <div className="flex items-center gap-2 font-medium">
                  <Users size={14} className="text-primary" />
                  <span>{guestCount} Seats Assigned</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="font-mono">
                    ৳{tour?.costForm?.toLocaleString()} / base rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Summary & Action Panel (Right Column) */}
          <div className="md:col-span-2 space-y-4 lg:sticky lg:top-6">
            <div className="border border-border rounded-2xl p-5 bg-muted/[0.02] space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
                Settlement Statement
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Subtotal Calculation</span>
                  <span className="font-mono">
                    ৳{payment?.amount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Processing Overhead</span>
                  <span className="font-mono">৳0</span>
                </div>
                <hr className="border-border/60 my-1" />
                <div className="flex justify-between text-sm font-black text-foreground pt-1">
                  <span>Aggregate Total</span>
                  <span className="font-mono text-primary text-base">
                    ৳{payment?.amount?.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className={`w-full h-11 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs ${
                  isProcessing
                    ? "bg-primary/70 cursor-not-allowed select-none"
                    : "bg-primary hover:bg-primary/90 active:scale-[0.98] cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={14} />
                    <span>Initialize Secure SSL</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground/60 text-center font-light px-2 leading-relaxed">
              By initializing SSL payment streams, you authorize external
              protocol routing to encrypted merchant financial clusters.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
