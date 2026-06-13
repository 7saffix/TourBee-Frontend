import { useSearchParams, useNavigate } from "react-router";
import {
  CheckCircle,
  Printer,
  ArrowRight,
  Hash,
  Calendar,
  BadgeCheck,
} from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");
  //   const status = searchParams.get("status");
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Animated Success Icon Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-6">
              <CheckCircle size={40} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-3xl tracking-tight font-medium mb-2">
            Payment Verified
          </h1>
          <p className="text-sm text-muted-foreground font-light px-4">
            Transaction node completed successfully. Your booking is now
            authorized and confirmed.
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="border border-border rounded-2xl bg-muted/[0.03] overflow-hidden">
          <div className="bg-muted/[0.05] border-b border-border p-4 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Digital Receipt
            </span>
            <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold uppercase">
              <BadgeCheck size={12} />
              <span>Paid</span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hash size={14} />
                <span className="text-xs font-light">Transaction ID</span>
              </div>
              <span className="text-xs font-mono font-medium truncate max-w-[180px] select-all">
                {transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={14} />
                <span className="text-xs font-light">Verification Date</span>
              </div>
              <span className="text-xs font-medium">{date}</span>
            </div>

            <hr className="border-border/50 border-dashed" />

            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-medium">Total Settled</span>
              <span className="text-xl font-mono text-primary font-bold">
                ৳{Number(amount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Interface */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => window.print()}
            className="h-11 border border-border rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
          >
            <Printer size={14} />
            Print
          </button>

          <button
            onClick={() => navigate("/user/my-bookings")}
            className="h-11 bg-foreground text-background rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Manage Booking
            <ArrowRight size={14} />
          </button>
        </div>

        <p className="mt-8 text-[10px] text-center text-muted-foreground/50 font-light italic">
          A confirmation matrix has been dispatched to your registered email
          address.
        </p>
      </div>
    </main>
  );
};

export default PaymentSuccess;
