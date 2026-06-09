import { useState } from "react";
import { Search, MapPin, Compass, ArrowRight, Sparkles } from "lucide-react";

const Hero = ({ divisions = [], tourTypes = [], onSearchSubmit }) => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    division: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(filters);
  };

  return (
    <div className="relative w-full bg-background flex flex-col items-center  pb-20 px-4 sm:px-6 overflow-hidden border-b border-border">
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

        {/* Smooth Glassmorphism Search Filter Input Matrix */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl mx-auto p-2 sm:p-3 bg-background/80 border border-border rounded-2xl sm:rounded-[32px] shadow-xl shadow-slate-100/50 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 items-center text-left"
        >
          {/* Destination Search Box */}
          <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted rounded-xl sm:rounded-2xl transition-all duration-300 group border-b border-border/50 lg:border-b-0 lg:border-r last:border-0 border-dashed sm:border-b-0 min-w-0 w-full">
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

          {/* Division Filter Dropdown */}
          <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted rounded-xl sm:rounded-2xl transition-all duration-300 group border-b border-border/50 lg:border-b-0 lg:border-r last:border-0 border-dashed sm:border-b-0 min-w-0 w-full">
            <MapPin
              size={18}
              className="text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0"
            />
            <div className="flex-1 min-w-0 w-full">
              <label className="block text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Region
              </label>
              <select
                name="division"
                value={filters.division}
                onChange={handleInputChange}
                className="w-full bg-transparent text-sm text-foreground font-semibold focus:outline-none mt-0.5 cursor-pointer appearance-none min-w-0 truncate"
              >
                <option value="" className="bg-background">
                  Everywhere
                </option>
                {divisions.map((div) => (
                  <option
                    key={div._id || div.id}
                    value={div.name}
                    className="bg-background"
                  >
                    {div.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tour Type/Experience Dropdown */}
          <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted rounded-xl sm:rounded-2xl transition-all duration-300 group border-b border-border/50 lg:border-b-0 last:border-0 border-dashed sm:border-b-0 sm:col-span-2 lg:col-span-1 lg:border-r min-w-0 w-full">
            <Compass
              size={18}
              className="text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0"
            />
            <div className="flex-1 min-w-0 w-full">
              <label className="block text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Experience
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleInputChange}
                className="w-full bg-transparent text-sm text-foreground font-semibold focus:outline-none mt-0.5 cursor-pointer appearance-none min-w-0 truncate"
              >
                <option value="" className="bg-background">
                  All Styles
                </option>
                {tourTypes.map((type) => (
                  <option
                    key={type._id || type.id}
                    value={type.name}
                    className="bg-background"
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clean Interactive Action Button Utilizing Primary Colors */}
          <div className="w-full pt-2 sm:pt-0 sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full h-11 sm:h-12 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl sm:rounded-2xl shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
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
