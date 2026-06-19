import { useEffect, useState } from "react";
import {
  SlidersHorizontal,
  ArrowLeftRight,
  Grid,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  Compass,
  Search,
  MapPin,
} from "lucide-react";
import {
  useGetToursQuery,
  useGetDivisionQuery,
  useGetTourTypeQuery,
} from "../redux/Api/tour.api";
import TourFilter from "../components/TourFilter";
import { Link, useSearchParams } from "react-router";

const Tours = () => {
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);
  const [searchParams] = useSearchParams();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("search") || "",
  );

  const [filters, setFilters] = useState({
    division: searchParams.get("division") || "",
    tourType: searchParams.get("tourType") || "",
    maxCost: "",
    sortBy: "",
  });

  const ITEMS_PER_PAGE = 6;

  // Primary API Query Hooks Engine Connection
  const {
    data: toursResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetToursQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    sortBy: filters.sortBy || undefined,
    division: filters.division || undefined,
    tourType: filters.tourType || undefined,
    maxCost: filters.maxCost || undefined,
  });

  const { data: divisionsResponse } = useGetDivisionQuery();
  const { data: tourTypesResponse } = useGetTourTypeQuery();

  const tours = toursResponse?.data || [];
  console.log(tours);

  const totalItems = toursResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const divisions = divisionsResponse?.data || divisionsResponse || [];
  const tourTypes = tourTypesResponse?.data || tourTypesResponse || [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDebouncedSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setFilters({ division: "", tourType: "", maxCost: "", sortBy: "" });
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top Context Section Banner */}
      <div className="w-full border-b border-border bg-muted/30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <Compass size={14} />
            <span>Exploration Engine</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight">
            Archived Journeys
          </h1>
          <p className="max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed">
            Filter through carefully calculated routes, base camps, and cultural
            packages across major national sectors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Core Control Toolbar */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-border pb-4 mb-6 md:mb-8 gap-4">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md w-full"
          >
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
            />
            <input
              type="text"
              placeholder="Search title or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-muted border border-border rounded-xl pl-10 pr-20 text-xs font-semibold focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 px-3 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary/95 transition-colors"
            >
              Find
            </button>
          </form>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 h-10 bg-muted border border-border rounded-xl text-xs font-bold tracking-wide hover:bg-muted/80"
            >
              <SlidersHorizontal size={14} />
              <span>Filters Matrix</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 bg-muted border border-border p-0.5 rounded-lg text-muted-foreground">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded-md transition-colors ${viewMode === "grid" ? "bg-background text-primary shadow-xs" : "hover:text-foreground"}`}
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 rounded-md transition-colors ${viewMode === "list" ? "bg-background text-primary shadow-xs" : "hover:text-foreground"}`}
                >
                  <LayoutList size={15} />
                </button>
              </div>

              <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-2.5 h-10 text-xs font-semibold">
                <ArrowLeftRight size={12} className="text-muted-foreground" />
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="bg-transparent focus:outline-none cursor-pointer h-full text-foreground"
                >
                  <option value="">Newest Additions</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout Block Grid Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* DESKTOP SIDEBAR PANEL DISPLAY */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-6 bg-background border border-border p-5 rounded-2xl space-y-6 shadow-xs">
            <TourFilter
              filters={filters}
              divisions={divisions}
              tourTypes={tourTypes}
              onFilterChange={handleFilterChange}
              onReset={handleClearFilters}
            />
          </aside>

          {/* MAIN TOURS RESPONSE GRID ELEMENT CONTAINER */}
          <main className="w-full min-w-0 lg:col-span-3">
            {isLoading || isFetching ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                  <SkeletonCard key={idx} viewMode={viewMode} />
                ))}
              </div>
            ) : isError ? (
              <div className="w-full bg-muted border border-dashed border-border p-12 text-center rounded-2xl">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">
                  Failed to communicate with database parameters.
                </p>
              </div>
            ) : tours.length === 0 ? (
              <div className="w-full bg-muted border border-dashed border-border py-16 px-4 text-center rounded-2xl space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  No active expeditions match your parameters grid selector
                  mapping.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Clear Query Parameters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {tours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination Controls Layer */}
            {totalPages > 1 && (
              <div className="w-full border-t border-border mt-12 pt-6 flex items-center justify-between">
                <button
                  disabled={currentPage === 1 || isFetching}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border hover:bg-muted disabled:opacity-40 rounded-xl text-xs font-semibold transition-colors disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>

                <div className="hidden sm:flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        disabled={isFetching}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${currentPage === pageNum ? "bg-primary text-white shadow-xs" : "bg-transparent hover:bg-muted disabled:opacity-50"}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages || isFetching}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border hover:bg-muted disabled:opacity-40 rounded-xl text-xs font-semibold transition-colors disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE DRAWER SHEET RENDERING OVERLAY */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in duration-200">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0"
          />
          <div className="relative w-full max-w-xs h-full bg-background border-l border-border p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="space-y-6 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-serif text-lg">Filter Systems</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-primary"
                >
                  Clear
                </button>
              </div>
              <TourFilter
                filters={filters}
                divisions={divisions}
                tourTypes={tourTypes}
                onFilterChange={handleFilterChange}
                onReset={handleClearFilters}
              />
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-6 py-3 bg-primary text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
            >
              See Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Individual Tour Cards Presentation Module mapping database response attributes */
const TourCard = ({ tour, viewMode }) => {
  const { _id, title, description, images, location, costForm, tourPlan } =
    tour;
  const isGrid = viewMode === "grid";

  const routeIdentifier = _id;

  const displayImage =
    images && images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600";

  const calculatedDuration =
    tourPlan && tourPlan.length > 0
      ? `${tourPlan.length} Stages`
      : "Flexible Duration";

  return (
    <Link
      to={`/tours/${routeIdentifier}`}
      className={`group bg-background border border-border rounded-xl md:rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex ${isGrid ? "flex-col" : "flex-row h-44 sm:h-48"}`}
    >
      <div
        className={`relative bg-muted overflow-hidden shrink-0 ${isGrid ? "w-full h-48" : "w-1/3 sm:w-1/4 h-full"}`}
      >
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-xs">
          <MapPin size={10} className="text-primary" />
          <span className="truncate max-w-[110px]">{location}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left min-w-0">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-serif text-foreground tracking-wide font-normal truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-2 gap-2">
          <div className="min-w-0">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
              Per Traveler
            </p>
            <p className="text-xs sm:text-sm font-sans font-black text-foreground ">
              ৳{costForm?.toLocaleString()} BDT
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* <span className="inline-flex items-center gap-1 text-[9px] font-bold text-muted-foreground px-2 py-1 bg-muted rounded-lg border border-border/40">
              <Users size={10} />
              <span>Max {maxGuest}</span>
            </span> */}
            <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-lg border border-primary/20">
              {calculatedDuration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* Loading Skeleton State Element Card block blueprint */
const SkeletonCard = ({ viewMode }) => {
  const isGrid = viewMode === "grid";
  return (
    <div
      className={`bg-muted/40 border border-border/40 rounded-2xl animate-pulse flex ${isGrid ? "flex-col h-80" : "flex-row h-44"}`}
    >
      <div
        className={`bg-muted/70 ${isGrid ? "w-full h-48" : "w-1/4 h-full"}`}
      />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="w-1/4 h-2 bg-muted/70 rounded-sm" />
          <div className="w-3/4 h-4 bg-muted/70 rounded-md" />
        </div>
        <div className="w-full h-8 bg-muted/60 rounded-xl" />
      </div>
    </div>
  );
};

export default Tours;
