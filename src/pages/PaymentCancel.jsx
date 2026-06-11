import { useNavigate } from "react-router";
import { AlertTriangle, ArrowRight, Undo2, Info } from "lucide-react";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Interruption Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 bg-amber-500/5 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 mb-6">
              <AlertTriangle size={36} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-3xl tracking-tight font-medium mb-2">
            Checkout Aborted
          </h1>
          <p className="text-sm text-muted-foreground font-light px-4">
            The data validation process was safely terminated at the client's
            request.
          </p>
        </div>

        {/* Information Message Notice */}
        <div className="border border-border rounded-2xl p-5 bg-muted/[0.02] flex items-start gap-3.5 text-left">
          <div className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
            <Info size={14} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold">
              Your Session remains Active
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              Your structural booking parameters are preserved as a{" "}
              <span className="font-mono text-primary">PENDING</span>{" "}
              placeholder record. You can finalize authentication whenever you
              choice.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/tours")}
            className="h-11 border border-border rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
          >
            <Undo2 size={14} />
            Browse Tours
          </button>

          <button
            onClick={() => navigate("/dashboard/my-bookings")}
            className="h-11 bg-foreground text-background rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            View Bookings
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default PaymentCancel;
