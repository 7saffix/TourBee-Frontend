import { ArrowUpRight, Compass } from "lucide-react";
import { useGetDivisionQuery } from "../redux/Api/tour.api";

const FeaturedDestination = ({ onRegionClick }) => {
  const { data: divisionResponse, isLoading, isError } = useGetDivisionQuery();

  const divisions = divisionResponse?.data;

  if (isLoading) {
    return (
      <div className="w-full bg-background py-12 md:py-20 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Loading Curated Journeys...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-background py-12 md:py-20 text-center text-xs font-bold text-primary uppercase tracking-widest">
        Failed to pull active regional parameters.
      </div>
    );
  }

  return (
    // Enforcing strict container sizing boundaries at the root level of the section
    <section className="w-full max-w-full bg-background py-12 md:py-20 border-b border-border overflow-x-hidden block">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 md:space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 md:space-y-3">
            <div className="inline-flex items-center gap-1.5 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
              <Compass size={14} className="shrink-0" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-foreground tracking-tight">
              Regions Worth Wandering
            </h2>
          </div>
          <p className="max-w-xs text-xs md:text-sm text-muted-foreground leading-relaxed">
            Explore Bangladesh through distinct geographical divisions, each
            offering unique local ecosystems and cultural heritage.
          </p>
        </div>
      </div>

      <div className="mt-8 md:mt-12 grid grid-cols-1 min-w-0 w-full overflow-hidden">
        <div
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory overflow-y-hidden w-full px-4 sm:px-6
          [&::-webkit-scrollbar]:h-1
          md:[&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-muted
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-border
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-primary/40
          transition-colors"
        >
          {divisions?.map((div, index) => {
            const displayImage =
              div.thumbnail ||
              div.imageUrl ||
              "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=800";

            const widthClass =
              index === 0 || index === 3
                ? "w-[260px] sm:w-[420px] md:w-[460px] shrink-0 snap-start"
                : "w-[260px] sm:w-[300px] md:w-[320px] shrink-0 snap-start";

            return (
              <div
                key={div._id || div.id || index}
                onClick={() => onRegionClick && onRegionClick(div)}
                className={`group relative h-[360px] sm:h-[400px] md:h-[440px] rounded-xl md:rounded-2xl overflow-hidden border border-border bg-muted cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60 ${widthClass}`}
              >
                {/* Visual Imagery Layer */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={displayImage}
                    alt={div.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
                </div>

                {/* Floating Meta Badges */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                  <span className="text-[9px] md:text-[10px] font-bold bg-white/95 text-slate-900 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {div.tourCount || 0} Experiences
                  </span>
                </div>

                {/* Card Content Footer Section */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10 flex items-end justify-between text-white">
                  <div className="space-y-0.5 md:space-y-1 min-w-0 flex-1">
                    <p className="text-[9px] md:text-[10px] font-bold text-white/60 uppercase tracking-widest font-mono truncate">
                      Division Map // 0{index + 1}
                    </p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif tracking-wide font-normal truncate">
                      {div.name}
                    </h3>
                  </div>

                  {/* Clean Up-Right Navigation Arrow Circle */}
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary shrink-0 ml-3">
                    <ArrowUpRight
                      size={14}
                      className="text-white transform transition-transform duration-300 md:group-hover:rotate-45"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestination;
