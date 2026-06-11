import { useSearchParams, useNavigate } from "react-router";
import {
  XCircle,
  RotateCcw,
  HelpCircle,
  Hash,
  ShieldAlert,
} from "lucide-react";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = searchParams.get("transactionId") || "N/A";
  const message =
    searchParams.get("message") ||
    "Transaction authorization declined by issuer.";

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Error Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 bg-destructive/10 border border-destructive/20 rounded-full flex items-center justify-center text-destructive mb-6">
              <XCircle size={40} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-3xl tracking-tight font-medium mb-2">
            Transaction Failed
          </h1>
          <p className="text-sm text-muted-foreground font-light px-4">
            The external secure gateway was unable to clear the allocated
            settlement framework.
          </p>
        </div>

        {/* Diagnostic Error Log Card */}
        <div className="border border-border rounded-2xl bg-muted/[0.03] overflow-hidden">
          <div className="bg-muted/[0.05] border-b border-border p-4 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              System Diagnostics
            </span>
            <div className="flex items-center gap-1.5 text-destructive text-[10px] font-bold uppercase">
              <ShieldAlert size={12} />
              <span>Rejected</span>
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

            <hr className="border-border/50 border-dashed" />

            <div className="space-y-1.5 pt-1 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Gateway Response
              </span>
              <p className="text-xs font-medium text-destructive bg-destructive/5 border border-destructive/10 p-3 rounded-xl leading-relaxed">
                {decodeURIComponent(message)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/tours")}
            className="h-11 border border-border rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
          >
            <HelpCircle size={14} />
            Change Tour
          </button>

          <button
            onClick={() => navigate(-1)}
            className="h-11 bg-foreground text-background rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={14} />
            Retry Checkout
          </button>
        </div>

        <p className="mt-8 text-[10px] text-center text-muted-foreground/50 font-light italic">
          No credit points or local assets were deducted from your primary
          configuration.
        </p>
      </div>
    </main>
  );
};

export default PaymentFailure;
