import {
  X,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  Compass,
} from "lucide-react";

const ViewTourModal = ({ isOpen, onClose, tour }) => {
  if (!isOpen || !tour) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <div>
            <h2 className="font-bold text-md tracking-tight text-foreground">
              {tour.title}
            </h2>
            <p className="text-xs text-primary font-bold uppercase mt-0.5 tracking-wider">
              {tour.tourType?.name ||
                tour.tourType ||
                "Standard Classification"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          {/* Optional Image Banner Block */}
          {tour.images && tour.images.length > 0 && (
            <div className="w-full h-44 rounded-xl overflow-hidden relative border border-border">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-3">
                <span className="text-[10px] bg-background/90 border border-border px-2 py-0.5 rounded-full font-mono text-muted-foreground">
                  ID: {tour._id || tour.id}
                </span>
              </div>
            </div>
          )}

          {/* Core Metadata Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center gap-2.5">
              <MapPin size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Location Pin
                </p>
                <p className="font-semibold text-foreground">
                  {tour.location || "Flexible Destination"}
                </p>
              </div>
            </div>

            <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center gap-2.5">
              <DollarSign size={16} className="text-emerald-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Base Pricing
                </p>
                <p className="font-bold text-foreground">
                  ${tour.cost || tour.costForm || "0.00"}
                </p>
              </div>
            </div>

            <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center gap-2.5">
              <Calendar size={16} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Schedule Setup
                </p>
                <p className="font-semibold text-foreground text-xs">
                  {tour.startDate
                    ? new Date(tour.startDate).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })
                    : "Flexible Operational Track"}
                </p>
              </div>
            </div>

            <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center gap-2.5">
              <Users size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Max Slots Cap
                </p>
                <p className="font-semibold text-foreground">
                  {tour.maxGuest || tour.slots || "—"} Allowed
                </p>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Compass size={12} className="text-muted-foreground" />
              Itinerary Description Context
            </h4>
            <p className="text-muted-foreground bg-muted/10 p-3 rounded-xl border border-border/40 leading-relaxed text-xs whitespace-pre-line">
              {tour.description ||
                "No context description summarized on data node."}
            </p>
          </div>

          {/* Dynamic Inclusion / Exclusion Breakdown Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
            {/* What's Included */}
            <div className="space-y-2">
              <h5 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide text-[10px] flex items-center gap-1">
                <CheckCircle2 size={12} />
                What's Included
              </h5>
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl space-y-1.5 min-h-[80px]">
                {tour.whatsIncluded && tour.whatsIncluded.length > 0 ? (
                  <ul className="space-y-1 text-muted-foreground">
                    {tour.whatsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground/60 italic text-[11px]">
                    Standard package services managed successfully.
                  </p>
                )}
              </div>
            </div>

            {/* What's Excluded */}
            <div className="space-y-2">
              <h5 className="font-bold text-destructive uppercase tracking-wide text-[10px] flex items-center gap-1">
                <XCircle size={12} />
                What's Excluded
              </h5>
              <div className="bg-destructive/5 border border-destructive/10 p-3 rounded-xl space-y-1.5 min-h-[80px]">
                {tour.whatsExcluded && tour.whatsExcluded.length > 0 ? (
                  <ul className="space-y-1 text-muted-foreground">
                    {tour.whatsExcluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-destructive font-bold">×</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground/60 italic text-[11px]">
                    Personal expenditure variables apply.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-muted/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-background border border-border text-xs font-bold rounded-xl hover:bg-muted transition-colors"
          >
            Close View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTourModal;
