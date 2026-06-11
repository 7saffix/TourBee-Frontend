import { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const Hero = ({ onSearchSubmit }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ searchQuery: "" });

  const handleSearch = (e) => {
    e.preventDefault();
    const q = filters.searchQuery.trim();
    if (onSearchSubmit) {
      onSearchSubmit(q);
    } else {
      navigate(`/tours${q ? `?search=${encodeURIComponent(q)}` : ""}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative bg-background flex flex-col items-center pb-20 px-4 sm:px-6 overflow-hidden border-b border-border w-full max-w-full overflow-x-hidden">
      {/* Soft Ambient Travel Glow Effects utilizing your Brand Primary */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/[0.03] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Hero Core Content Layout */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
        {/* Curated Travel Vibe Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-muted border border-border rounded-full shadow-xs max-w-full">
            <Sparkles size={12} className="text-primary shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground tracking-wider italic font-serif truncate">
              Your definitive gateway to unexplored horizons
            </span>
          </div>
        </div>

        {/* Elegant Content Headings */}
        <div className="space-y-4 md:space-y-5">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-foreground leading-[1.2] lg:leading-[1.15]">
            Collect beautiful moments <br className="hidden sm:inline" />
            <span className="font-sans font-black text-primary block sm:inline sm:ml-2">
              Across Bangladesh.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-muted-foreground font-medium leading-relaxed px-2">
            Immerse yourself in vibrant culture, deep green hill paths, and
            serene riverscapes. Discover handpicked local itineraries crafted
            thoughtfully for true travelers.
          </p>
        </div>

        {/* Smooth Glassmorphism Search Input Box */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl mx-auto p-2 bg-background/80 border border-border rounded-2xl sm:rounded-full shadow-xl shadow-slate-100/50 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2 text-left"
        >
          {/* Destination Search Box */}
          <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 rounded-xl sm:rounded-full transition-all duration-300 group min-w-0 flex-1 w-full">
            <Search
              size={18}
              className="text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0"
            />
            <div className="flex-1 min-w-0 w-full">
              <label className="block text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Where to?
              </label>
              <input
                type="text"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleInputChange}
                placeholder="e.g., Cox's Bazar..."
                className="w-full bg-transparent text-sm text-foreground font-semibold placeholder:text-muted-foreground/50 focus:outline-none mt-0.5 min-w-0 truncate"
              />
            </div>
          </div>

          {/* Clean Interactive Action Button */}
          <div className="w-full sm:w-auto shrink-0">
            <button
              type="submit"
              className="w-full h-11 sm:h-12 px-6 bg-primary hover:bg-primary/95 text-white font-bold text-sm rounded-xl sm:rounded-full shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className="truncate">Explore Journeys</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300 shrink-0"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
