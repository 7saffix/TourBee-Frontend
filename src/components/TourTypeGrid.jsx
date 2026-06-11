import { ArrowUpRight, Compass } from "lucide-react";
import { useGetTourTypeQuery } from "../redux/Api/tour.api";
import { useNavigate } from "react-router";

// Cleaned up the colors to look punchy, premium, and contrast-balanced
const colorMap = [
  {
    text: "text-blue-500",
    border: "group-hover:border-blue-500/30",
    bg: "bg-blue-500/5",
    icon: "🏔️",
  },
  {
    text: "text-purple-500",
    border: "group-hover:border-purple-500/30",
    bg: "bg-purple-500/5",
    icon: "🌳",
  },
  {
    text: "text-emerald-500",
    border: "group-hover:border-emerald-500/30",
    bg: "bg-emerald-500/5",
    icon: "🌊",
  },
  {
    text: "text-green-500",
    border: "group-hover:border-green-500/30",
    bg: "bg-green-500/5",
    icon: "🌿",
  },
  {
    text: "text-orange-500",
    border: "group-hover:border-orange-500/30",
    bg: "bg-orange-500/5",
    icon: "🚣",
  },
  {
    text: "text-amber-500",
    border: "group-hover:border-amber-500/30",
    bg: "bg-amber-500/5",
    icon: "🕌",
  },
  {
    text: "text-pink-500",
    border: "group-hover:border-pink-500/30",
    bg: "bg-pink-500/5",
    icon: "⭐",
  },
  {
    text: "text-stone-500",
    border: "group-hover:border-stone-500/30",
    bg: "bg-stone-500/5",
    icon: "👨‍👩‍👧",
  },
];

const TourTypeGrid = () => {
  const navigate = useNavigate();
  const { data: tourTypesResponse, isLoading, isError } = useGetTourTypeQuery();
  const tourTypes = tourTypesResponse?.data || tourTypesResponse || [];

  // Sleek skeletal state matching the exact micro-border layouts
  if (isLoading)
    return (
      <section className="w-full py-16 md:py-24 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-muted/40 border border-border/50 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>
    );

  if (isError || !tourTypes.length) return null;

  return (
    <section className="relative w-full py-16 md:py-24 border-b border-border bg-background overflow-hidden">
      {/* Decorative High-End Cyber Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-10 md:space-y-14">
        {/* Crisp Typographic Hierarchy Header */}
        <div className="space-y-3 text-left md:text-center max-w-2xl md:mx-auto">
          <div className="inline-flex items-center gap-2 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full border border-primary/10 md:mx-auto">
            <Compass size={12} className="animate-spin-slow" />
            <span>What moves you</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground tracking-tight font-normal leading-tight">
            Browse by Experience
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground md:mx-auto">
            Pick a category tailored specifically to match your ultimate
            exploration blueprint.
          </p>
        </div>

        {/* Minimalist Cards System */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tourTypes.map((type, index) => {
            const color = colorMap[index % colorMap.length];
            return (
              <button
                key={type._id}
                onClick={() => navigate(`/tours?tourType=${type._id}`)}
                className={`cursor-pointer group relative bg-background/50 border border-border/80 ${color.border} rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none select-none focus:outline-none`}
              >
                <ArrowUpRight
                  size={14}
                  className="absolute top-4 right-4 text-muted-foreground/0 group-hover:text-muted-foreground/80 transition-all duration-300 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                />
                {/* Glow layer behind the active item */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 blur-xl -z-10 ${color.bg}`}
                />

                {/* Cyber Minimalist Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl border border-border bg-muted/30 group-hover:bg-background group-hover:border-foreground/10 flex items-center justify-center mb-4 text-xl shadow-xs transition-all duration-300 group-hover:scale-110`}
                >
                  <span className="scale-100 group-hover:rotate-[6deg] transition-transform duration-300">
                    {color.icon}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {type.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 font-medium tracking-wide uppercase group-hover:text-muted-foreground transition-colors">
                    Explore Routes &rarr;
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TourTypeGrid;
