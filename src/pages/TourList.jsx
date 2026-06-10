import { useState } from "react";
import {
  Map,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CircleDollarSign,
  Calendar,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  useGetDivisionQuery,
  useGetToursQuery,
  useGetTourTypeQuery,
} from "../redux/Api/tour.api";
import Loader from "../components/Loader";
import CreateTourModal from "../components/CreateTourModal";
import EditTourModal from "../components/EditTourModal";
import ViewTourModal from "../components/ViewTourModal";

const TourList = () => {
  const [queryParams, setQueryParams] = useState({
    search: "",
    sortBy: "default",
    page: 1,
    limit: 5,
  });

  // Track specific states for control dialog visibility and target data nodes
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    view: false,
  });
  const [selectedTour, setSelectedTour] = useState(null);

  const { data: tourData, isLoading, isError } = useGetToursQuery(queryParams);
  const { data: divisionData } = useGetDivisionQuery();
  const { data: tourTypeData } = useGetTourTypeQuery();

  const tours = tourData?.data || [];

  const meta = tourData?.meta || { page: 1, limit: 5, total: 0 };
  const categories = tourTypeData?.data || [];
  const divisions = divisionData?.data || [];

  const totalPages = Math.ceil(meta.total / queryParams.limit);

  const updateQueryField = (field, value) => {
    setQueryParams((prev) => ({
      ...prev,
      [field]: value,
      page: field === "page" ? value : 1,
    }));
  };

  const triggerViewDialog = (tour) => {
    setSelectedTour(tour);
    setModalState((prev) => ({ ...prev, view: true }));
  };
  const triggerEditDialog = (tour) => {
    setSelectedTour(tour);
    setModalState((prev) => ({ ...prev, edit: true }));
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => updateQueryField("page", i)}
          className={`h-8 w-8 text-xs font-bold rounded-lg transition-all ${
            queryParams.page === i
              ? "bg-primary text-white shadow-md"
              : "bg-background border border-border text-muted-foreground hover:bg-muted"
          }`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  if (isLoading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader size="lg" label="Syncing dataset models..." />
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-destructive p-4 border border-destructive/20 bg-destructive/10 rounded-xl">
        Network error synchronization failed.
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Upper Control Bar Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Map className="text-primary" size={24} /> Tour Catalog
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live grid profile displaying system operational packages.
          </p>
        </div>
        <button
          onClick={() => setModalState((prev) => ({ ...prev, create: true }))}
          className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary/10 transition-all"
        >
          <Plus size={16} /> Add New Tour
        </button>
      </div>

      {/* Query Filter Actions Grid panel */}
      <div className="bg-background border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3 shadow-sm">
        <div className="relative md:col-span-2">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tours..."
            value={queryParams.search}
            onChange={(e) => updateQueryField("search", e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div className="relative">
          <ArrowUpDown
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <select
            value={queryParams.sortBy}
            onChange={(e) => updateQueryField("sortBy", e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-primary text-foreground font-medium"
          >
            <option value="default">Sort By: Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Table grid space view */}
      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="p-4">Tour Identity</th>
                <th className="p-4 w-44">Location</th>
                <th className="p-4 w-36">Budget Base</th>
                <th className="p-4 w-44">Schedule Track</th>
                <th className="p-4 w-36 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {tours.map((tour) => (
                <tr
                  key={tour._id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-bold text-foreground tracking-wide">
                      {tour.title}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded">
                      {tour.tourType?.name || "Standard Class"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground font-medium">
                    📍 {tour.location}
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    <div className="flex items-center gap-1">
                      <CircleDollarSign
                        size={15}
                        className="text-emerald-500"
                      />{" "}
                      ${tour.costForm}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-primary/70" />{" "}
                      {tour.startDate
                        ? new Date(tour.startDate).toLocaleDateString()
                        : "Flexible"}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => triggerViewDialog(tour)}
                        title="View Details"
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => triggerEditDialog(tour)}
                        title="Edit Records"
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        title="Delete"
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Numbered Pagination controls layout */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10 select-none">
            <button
              onClick={() =>
                updateQueryField("page", Math.max(queryParams.page - 1, 1))
              }
              disabled={queryParams.page === 1}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold border border-border rounded-lg bg-background hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft size={14} /> Back
            </button>
            <div className="hidden sm:flex items-center gap-1.5">
              {renderPageNumbers()}
            </div>
            <button
              onClick={() =>
                updateQueryField(
                  "page",
                  Math.min(queryParams.page + 1, totalPages),
                )
              }
              disabled={queryParams.page === totalPages}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold border border-border rounded-lg bg-background hover:bg-muted disabled:opacity-40"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Modular Separate Component Injectors */}
      <CreateTourModal
        isOpen={modalState.create}
        onClose={() => setModalState((prev) => ({ ...prev, create: false }))}
        categories={categories}
        divisions={divisions}
      />
      <EditTourModal
        isOpen={modalState.edit}
        onClose={() => setModalState((prev) => ({ ...prev, edit: false }))}
        categories={categories}
        divisions={divisions}
        tourData={selectedTour}
      />
      <ViewTourModal
        isOpen={modalState.view}
        onClose={() => setModalState((prev) => ({ ...prev, view: false }))}
        tour={selectedTour}
      />
    </div>
  );
};

export default TourList;
