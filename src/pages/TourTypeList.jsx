import { useState } from "react";
import { Tags, Plus, X, Edit2, Trash2 } from "lucide-react";
import { useGetTourTypeQuery } from "../redux/Api/tour.api";
import Loader from "../components/Loader";

const TourTypeList = () => {
  // 1. Fetch live classification data from RTK Query
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetTourTypeQuery();

  // Extract tour types list array from response payload
  const tourTypes = responseData?.data || [];

  // Local modal interactive states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  // Modal Control Operations
  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (type) => {
    setEditingId(type._id || type.id);
    setFormData({ name: type.name });
    setIsModalOpen(true);
  };

  const handleSaveTourType = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // TODO: Wire up your useCreateTourTypeMutation / useUpdateTourTypeMutation hooks here
    console.log("Saving Tour Type payload:", { editingId, formData });

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    // TODO: Wire up your useDeleteTourTypeMutation hook here
    if (
      window.confirm(
        "Are you sure you want to permanently delete this tour type classification?",
      )
    ) {
      console.log("Deleting Tour Type ID:", id);
    }
  };

  // 2. Loading State Block
  if (isLoading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <Loader size="lg" label="Loading category items..." />
      </div>
    );
  }

  // 3. Error Handling Display Block
  if (isError) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl max-w-xl mx-auto text-center mt-8">
        <p className="font-semibold">Failed to load tour types</p>
        <p className="text-xs opacity-80 mt-1">
          {error?.data?.message || "An unexpected network error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Tags className="text-primary" size={24} />
            Tour Types
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your package classifications and tour themes (e.g., Hiking,
            Honeymoon, Adventure).
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary/10 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Tour Type
        </button>
      </div>

      {/* Clean Dynamic Category Data Table */}
      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden max-w-2xl m-auto">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
                <th className="p-4">Category Name</th>
                <th className="p-4 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {tourTypes.length > 0 ? (
                tourTypes.map((type) => (
                  <tr
                    key={type._id || type.id}
                    className="hover:bg-muted/10 transition-colors group"
                  >
                    <td className="p-4 font-semibold text-foreground tracking-wide align-middle">
                      <span className="bg-muted/60 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground mr-2">
                        #
                      </span>
                      {type.name}
                    </td>
                    <td className="p-4 text-right align-middle whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(type)}
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/20"
                          title="Edit Type"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(type._id || type.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all border border-transparent hover:border-destructive/20"
                          title="Delete Type"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-12 text-muted-foreground font-medium italic"
                  >
                    No active tour types configured inside database models.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🛠️ ADD / MODIFY CATEGORY TYPE SLIDEOUT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md">
          <div className="w-full max-w-sm bg-background border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
              <h2 className="font-bold text-md tracking-tight flex items-center gap-2">
                <Tags size={18} className="text-primary" />
                {editingId ? "Modify Classification" : "Add Tour Category"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTourType} className="p-5 space-y-4">
              {/* Name Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Adventure, Eco-Tourism"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors font-medium"
                />
              </div>

              {/* Action Operations Control Buttons Row */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-semibold shadow-md shadow-primary/10 transition-colors"
                >
                  {editingId ? "Apply Changes" : "Create Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourTypeList;
