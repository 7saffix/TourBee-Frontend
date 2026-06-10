const TourFilter = ({
  filters,
  divisions,
  tourTypes,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="space-y-6 text-left">
      {/* Sidebar Header for Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between border-b border-border pb-2">
        <h3 className="font-serif text-sm font-semibold text-foreground">
          Filter Systems
        </h3>
        <button
          onClick={onReset}
          className="text-[10px] font-bold text-primary hover:underline transition-all"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-5">
        {/* Dynamic Geographical Sectors (Divisions) Selector */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Geographical Sector (location)
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            className="w-full h-10 bg-muted border border-border rounded-xl px-3 text-xs font-semibold focus:outline-none focus:border-primary cursor-pointer text-foreground transition-colors"
          >
            <option value="">Everywhere</option>
            {divisions.map((div) => (
              <option key={div._id} value={div._id}>
                {div.name || div.title || "Unnamed Region"}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Experience Category Styles Selector */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Experience Class (tourType)
          </label>
          <select
            name="tourType"
            value={filters.tourType}
            onChange={onFilterChange}
            className="w-full h-10 bg-muted border border-border rounded-xl px-3 text-xs font-semibold focus:outline-none focus:border-primary cursor-pointer text-foreground transition-colors"
          >
            <option value="">All Categories</option>
            {tourTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name || type.title || "Standard Style"}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Max Cost Parameter Selection */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Max Budget Limit (maxCost)
          </label>
          <select
            name="maxCost"
            value={filters.maxCost}
            onChange={onFilterChange}
            className="w-full h-10 bg-muted border border-border rounded-xl px-3 text-xs font-semibold focus:outline-none focus:border-primary cursor-pointer text-foreground transition-colors"
          >
            <option value="">No Limit</option>
            <option value="2000">Under ৳2,000 BDT</option>
            <option value="6000">Under ৳6,000 BDT</option>
            <option value="10000">Under ৳10,000 BDT</option>
            <option value="16000">Under ৳16,000 BDT</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TourFilter;
